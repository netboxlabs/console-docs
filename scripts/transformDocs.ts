const { readFile, writeFile, mkdir, copyFile } = require('fs/promises');
const glob = require('glob');
const { exec } = require('child_process');
const { promisify } = require('util');
const path = require('path');
const yaml = require('js-yaml');

// Custom YAML schema to handle !ENV tags
const EnvYamlType = new yaml.Type('!ENV', {
    kind: 'scalar',
    construct: () => null, // Treat !ENV tags as null
});

// Custom YAML type for !!python/name:* tags
const PythonNameYamlType = new yaml.Type('tag:yaml.org,2002:python/name', {
    kind: 'scalar', // Or 'mapping'/'sequence' if these tags can apply to complex structures
    multi: true, // Indicates this type can match multiple specific tags if needed, but here it's for the prefix
    representName: (tag) => tag.startsWith('tag:yaml.org,2002:python/name:'),
    construct: () => null, // Treat these Python-specific tags as null
});

const CUSTOM_YAML_SCHEMA = yaml.DEFAULT_SCHEMA.extend({
    explicit: [EnvYamlType, PythonNameYamlType],
});

const execAsync = promisify(exec);

interface TransformRule {
    find: string | RegExp;
    replace: string | ((...args: string[]) => string);
}

const transformRules: TransformRule[] = [
    // Convert :material-icon-name: to an <i> tag
    {
        find: /:material-([a-zA-Z0-9_-]+):/g,
        replace: (match: string, iconName: string): string => {
         return '';
        }
    },
    // Escape bare <> symbols.
    { find: /<>/g, replace: '\\<\\>' },
    // Standardise <br> and </br> to self-closing <br/> with a newline.
    { find: /<\/?br>/g, replace: '<br/>\n' },
    // Convert markdown image with simple width percentage to a styled div.
    { find: /!\[(.*?)\]\((.*?)\)\{ width=(\d+)% \}/g, replace: '<div style={{ width: "$3%" }}>![$1]($2)</div>' },
    // Convert markdown image with max-width style to a styled div.
    { find: /!\[(.*?)\]\((.*?)\)\{\s*style="max-width:\s*(\d+)\s*%"\s*\}/g, replace: '<div style={{ maxWidth: "$3%" }}>![$1]($2)</div>' },
    // Escape angle brackets around raw URLs.
    { find: /<https?:\/\/[^>]+>/g, replace: (match: string) => `\\<${match.slice(1, -1)}\\>` },
    // Escape <pk\> tag.
    { find: /<pk\\>/g, replace: '\\<pk\\>' },
    // Convert markdown image with MkDocs-style class and width attributes to a styled div.
    { find: /!\[(.*?)\]\((.*?)\)\{:class="([^"]+)" width="(\d+)"\}/g, replace: '<div className="$3" style={{ width: "$4px" }}>![$1]($2)</div>' },
    // Convert markdown image with complex inline styles attribute to a styled div with React style object.
    {
        find: /!\[(.*?)\]\(([^)]*?)\)\{.*?style="([^"]*)".*?\}/g,
        replace: (match: string, altText: string, urlPart: string, stylesStr: string): string => {
            const stylePairs = stylesStr
                .split(';')
                .map(s => s.trim())
                .filter(s => s.length > 0)
                .map(pair => {
                    const separatorIndex = pair.indexOf(':');
                    if (separatorIndex === -1) return null;
                    const key = pair.substring(0, separatorIndex).trim();
                    const value = pair.substring(separatorIndex + 1).trim();
                    if (!key || !value) return null; // Skip if key or value is empty after trim

                    const camelKey = key.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
                    // Quote value if it's not a plain number
                    const quotedValue = /^\d+(\.\d+)?$/.test(value) ? value : `'${value.replace(/'/g, "\\'")}'`;
                    return `${camelKey}: ${quotedValue}`;
                })
                .filter((pair): pair is string => pair !== null); // Type guard for filtering nulls

            if (stylePairs.length === 0) {
                 // Fallback to original markdown image if no valid styles found
                return `![${altText}](${urlPart})`;
            }

            const reactStyleObjectInner = stylePairs.join(', ');
            return `<div style={{ ${reactStyleObjectInner} }}>![${altText}](${urlPart})</div>`;
        }
    },
    // Remove leading slash from image paths starting with /images/.
    { find: /!\[(.*?)\]\(\/(images\/[^)]+)\)/g, replace: '![$1]($2)' },

    // Escape standalone { unless part of {{ or escaped \{
    { find: /(?<![{\\]){(?!{)/g, replace: '\\{' },
    // Escape standalone } unless part of }} or escaped \}
    { find: /(?<![}\\])}(?!})/g, replace: '\\}' },
];

interface DocsDirectoryConfig {
    source: string;
    output: string;
}

const docsDirectories: DocsDirectoryConfig[] = [
  { source: 'external-repos/netbox/docs', output: 'netbox' },
  { source: 'external-repos/console-docs/docs', output: 'console' },
];

// Helper to get leading indentation
const getIndent = (line: string): string => {
  const match = line.match(/^(\s*)/);
  return match ? match[1] : '';
};

// Find the URL rule specifically
const urlRule = transformRules.find(rule => rule.find.toString() === /<https?:\/\/[^>]+>/g.toString());
// Filter out the URL rule from the main list to avoid applying it twice
const otherRules = transformRules.filter(rule => rule !== urlRule);

interface MkDocsNavItem {
    [key: string]: string | MkDocsNavItem[] | undefined;
}

interface DocusaurusSidebarItem {
    type: 'category' | 'doc';
    label: string;
    id?: string; // Present for 'doc', absent for 'category'
    items?: DocusaurusSidebarItem[]; // Present for 'category', absent for 'doc'
    link?: { // Optional: For generated category index pages
        type: 'generated-index';
        title?: string;
    };
}

const mapNavToDocusaurus = (navItems: MkDocsNavItem[], basePathForId: string): DocusaurusSidebarItem[] => {
    return navItems.map((item) => {
        const key = Object.keys(item)[0];
        const value = item[key];

        if (typeof value === 'string') {
            // Remove .md extension
            let docPath = value.replace(/\.md$/, '');
            const pathParts = docPath.split('/');
            let filename = pathParts.pop() || ''; // Get the last part, the filename

            // Regex to match a number prefix like "1-", "01-", etc.
            const numericPrefixRegex = /^\d+-/;
            // Regex to match an alphanumeric prefix like "4a-", "1b-", etc.
            const alphanumericPrefixRegex = /^\d+[a-zA-Z]+-/;

            if (numericPrefixRegex.test(filename) && !alphanumericPrefixRegex.test(filename)) {
                // If it has a purely numeric prefix (e.g., "1-thing"), remove it
                filename = filename.replace(numericPrefixRegex, '');
            }

            // Reconstruct the docPath with the potentially modified filename
            docPath = pathParts.length > 0 ? `${pathParts.join('/')}/${filename}` : filename;

            return {
                type: 'doc',
                id: `${basePathForId}/${docPath}`,
                label: key,
            };
        }

        if (Array.isArray(value)) {
            return {
                type: 'category',
                label: key,
                items: mapNavToDocusaurus(value, basePathForId),
            };
        }

        console.warn('Skipping unexpected nav item format:', item);
        return null;
    }).filter(item => item !== null) as DocusaurusSidebarItem[];
};

const transformContent = async (content: string): Promise<string> => {
    const fencedCodeBlocks: string[] = [];
    const inlineCodeBlocks: string[] = [];
    let tempContent = content;

    // 0. Apply URL escaping rule FIRST to the entire content
    if (urlRule) {
        if (typeof urlRule.replace === 'string') {
            tempContent = tempContent.replace(urlRule.find, urlRule.replace);
        } else {
            tempContent = tempContent.replace(urlRule.find, urlRule.replace);
        }
    }

    // 1. Extract and replace fenced code blocks (from already URL-escaped content)
    // Regex captures the full match including delimiters and content
    tempContent = tempContent.replace(/^```([a-zA-Z0-9-+]*)?\n([\s\S]*?)\n```$/gm, (match) => {
        const placeholder = `__FENCED_CODE_BLOCK_${fencedCodeBlocks.length}__`;
        fencedCodeBlocks.push(match); // Store the full block
        return placeholder;
    });

    // 2. Extract and replace inline code blocks (from already URL-escaped content)
    // Regex captures the content including backticks
    tempContent = tempContent.replace(/`([^`\n]+?)`/g, (match) => {
        // Basic check to avoid matching within already replaced fenced block placeholders
        if (match.includes('__FENCED_CODE_BLOCK_')) return match;
        const placeholder = `__INLINE_CODE_BLOCK_${inlineCodeBlocks.length}__`;
        inlineCodeBlocks.push(match); // Store the inline code including backticks
        return placeholder;
    });

    // 3. Process content with placeholders (including admonition logic)
    const lines = tempContent.split('\n');
    const outputLines: string[] = [];
    const admonitionIndentStack: string[] = []; // Stack to store indent strings
    const admonitionStartRegex = /^(\s*)!!!\s+(\w+)(?:\s+["'](.*?)["'])?\s*$/;

    for (const line of lines) {
        let currentLine = line;
        const currentIndent = getIndent(currentLine);
        const currentIndentLength = currentIndent.length;

        // Admonition closing logic (adjusted for placeholders)
        while (admonitionIndentStack.length > 0) {
            const lastIndent = admonitionIndentStack[admonitionIndentStack.length - 1];
            const lastIndentLength = lastIndent.length;
            let shouldClose = false;
            if (currentIndentLength < lastIndentLength) {
                shouldClose = true;
            } else if (currentIndentLength === lastIndentLength &&
                       currentLine.trim() !== '' &&
                       !currentLine.includes('__FENCED_CODE_BLOCK_') && // Don't close for code blocks
                       !currentLine.includes('__INLINE_CODE_BLOCK_') && // Don't close for code blocks
                       !admonitionStartRegex.test(currentLine)) {
                shouldClose = true;
            }

            if (shouldClose) {
                admonitionIndentStack.pop();
                // Add closing ::: marker, attempting to place it before placeholders if necessary
                let insertIndex = outputLines.length;
                while (insertIndex > 0 &&
                       (outputLines[insertIndex - 1]?.includes('__FENCED_CODE_BLOCK_') ||
                        outputLines[insertIndex - 1]?.includes('__INLINE_CODE_BLOCK_'))) {
                    insertIndex--;
                }
                outputLines.splice(insertIndex, 0, `${lastIndent}:::`);
            } else {
                break; // Don't close, break the inner loop
            }
        }

        // Admonition starting logic (unchanged)
        const admonitionMatch = currentLine.match(admonitionStartRegex);
        if (admonitionMatch) {
            const [, indent, type, title] = admonitionMatch;
            admonitionIndentStack.push(indent);
            let newLine = `${indent}:::${type.toLowerCase()}`;
            if (title) {
                const cleanTitle = title.replace(/]/g, '\\]'); // Basic escape for title
                newLine += `[${cleanTitle}]`;
            }
            currentLine = newLine;
        }

        // Apply OTHER transformation rules to the line (placeholders won't match rule patterns)
        let processedLine = currentLine;
        otherRules.forEach(rule => { // Use the filtered list of rules
            if (typeof rule.replace === 'string') {
                processedLine = processedLine.replace(rule.find, rule.replace);
            } else {
                processedLine = processedLine.replace(rule.find, rule.replace);
            }
        });

        outputLines.push(processedLine);
    }

    // Close any remaining open admonitions at the end
    while (admonitionIndentStack.length > 0) {
        const closingIndent = admonitionIndentStack.pop();
        if (closingIndent !== undefined) {
             // Add closing ::: marker, attempting to place it before placeholders if necessary
            let insertIndex = outputLines.length;
            while (insertIndex > 0 &&
                   (outputLines[insertIndex - 1]?.includes('__FENCED_CODE_BLOCK_') ||
                    outputLines[insertIndex - 1]?.includes('__INLINE_CODE_BLOCK_'))) {
                insertIndex--;
            }
            outputLines.splice(insertIndex, 0, `${closingIndent}:::`);
        }
    }

    let transformedContentWithPlaceholders = outputLines.join('\n');

    // Hotfix to escape {} tags (applied before restoring code blocks)
    // Regex: (?<!\\){([^{}]+)}(?!}) - Explanation:
    // (?<!\\) - Negative lookbehind for a literal backslash (ensuring we don't escape already escaped braces like \{)
    // {       - Matches the literal opening curly brace
    // ([^{}]+) - Captures one or more characters that are NOT curly braces (this is group 1, $1)
    // }       - Matches the literal closing curly brace
    // (?!})   - Negative lookahead to ensure the closing brace is not followed by another (to avoid {{ a }} issues)
    // Replacement: \\{$1\\} - Escapes the captured group with literal backslashes
    transformedContentWithPlaceholders = transformedContentWithPlaceholders.replace(/(?<!\\\\){([^{}]+)}(?!})/g, '\\\\{$1\\\\}');

    // 4. Restore inline code blocks
    inlineCodeBlocks.forEach((block, index) => {
        const placeholder = `__INLINE_CODE_BLOCK_${index}__`;
        // Use split/join for global replacement
        transformedContentWithPlaceholders = transformedContentWithPlaceholders.split(placeholder).join(block);
    });

    // 5. Restore fenced code blocks
    fencedCodeBlocks.forEach((block, index) => {
        const placeholder = `__FENCED_CODE_BLOCK_${index}__`;
        transformedContentWithPlaceholders = transformedContentWithPlaceholders.split(placeholder).join(block);
    });

    return transformedContentWithPlaceholders;
};

const processFile = async (sourceFilePath: string, outputBaseDir: string, sourceBaseDir: string): Promise<void> => {
    // Determine the relative path from the source base directory
    const relativeFilePath = path.relative(sourceBaseDir, sourceFilePath);
    // Construct the full output path
    const outputFilePath = path.join(outputBaseDir, relativeFilePath);

    try {
        // Ensure the output directory exists
        await mkdir(path.dirname(outputFilePath), { recursive: true });

        // Check if the file is markdown
        const isMarkdown = /\.(md|mdx)$/i.test(sourceFilePath);

        if (isMarkdown) {
            const content = await readFile(sourceFilePath, 'utf-8');
            const transformedContent = await transformContent(content);

            await writeFile(outputFilePath, transformedContent);
        } else {
            // For non-markdown files, just copy them
            await copyFile(sourceFilePath, outputFilePath);
        }

    } catch (error) {
        console.error(`Error processing ${sourceFilePath} to ${outputFilePath}:`, error);
    }
};

const transformDocs = async (): Promise<void> => {
    console.log('\nStarting documentation transformation and copy...');
    for (const dirConfig of docsDirectories) {
        const { source, output } = dirConfig;
        const outputBaseDir = path.join('docs', output); // Define output path within project 'docs' folder

        try {
            const files = await new Promise<string[]>((resolve, reject) => {
                // Update glob pattern to find all files, not just markdown
                glob(`${source}/**/*`, { nodir: true }, (err, matches) => {
                    if (err) reject(err);
                    else resolve(matches);
                });
            });

            if (!files || files.length === 0) {
                console.warn(`No files found in ${source}`);
                continue; // Skip to the next directory config
            }
            console.log(`Found ${files.length} files in ${source}. Transforming and copying to ${outputBaseDir}...`);

            // Process each file found
            await Promise.all(files.map(file => processFile(file, outputBaseDir, source)));

            // After processing files, generate the sidebar
            console.log(`Generating sidebar for ${output}...`);
            const mkdocsConfigPath = path.join(source, '..', 'mkdocs.yml');
            console.log(`Using mkdocs.yml at ${mkdocsConfigPath}`);
            try {
                const mkdocsConfigContent = await readFile(mkdocsConfigPath, 'utf-8');
                const mkdocsConfig = yaml.load(mkdocsConfigContent, { schema: CUSTOM_YAML_SCHEMA }) as { nav?: MkDocsNavItem[] };

                if (mkdocsConfig?.nav) {

                    const docusaurusSidebarItems = mapNavToDocusaurus(mkdocsConfig.nav, output).filter(item => item.label !== 'Home' && item.id !== `${output}/index`);
                    docusaurusSidebarItems.unshift({ type: 'doc', id: `${output}/index`, label: 'Home' });
                    const sidebarJsonPath = path.join('sidebars', `${output}.json`); // Dynamic output path
                    await writeFile(sidebarJsonPath, JSON.stringify(docusaurusSidebarItems, null, 2));
                    console.log(`Successfully generated and wrote sidebar to ${sidebarJsonPath}`);
                } else {
                    console.warn(`'nav' section not found in ${mkdocsConfigPath}. Sidebar not generated.`);
                }
            } catch (error) {
                console.error(`Error processing mkdocs.yml for ${output}:`, error);
            }

        } catch (error) {
            console.error(`Error processing directory configuration ${JSON.stringify(dirConfig)}:`, error);
        }
    }
};

transformDocs()
    .then(() => console.log('\nDocumentation transformation and copy complete'))
    .catch(error => {
        console.error('\nAn error occurred during the process:', error);
    });