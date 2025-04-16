const { readFile, writeFile } = require('fs/promises');
const glob = require('glob');

interface TransformRule {
    find: string | RegExp;
    replace: string | ((...args: string[]) => string);
}

const transformRules: TransformRule[] = [
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
    // Escape <pk\\> tag.
    { find: /<pk\\>/g, replace: '\\<pk\\>' },
    // Escape single quotes before opening curly braces for JSX.
    { find: /(?<!\\)'(?={)/g, replace: "'\\" },
    // Escape single quotes after closing curly braces for JSX.
    { find: /(?<=})'(?!\\)/g, replace: "\\'" },
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
    // Escape curly braces within double-slash comments.
    { find: /\/\/\{([^}]+)\}/g, replace: (match: string) => `//\\{${match.slice(3, -1)}\\}` },




    // { find: /(?<!\{)\{/g, replace: '\\{' },
    // { find: /\}(?!\})/g, replace: '\\}' },


    // // Convert MkDocs-style admonition closing to Docusaurus
    // { find: /!!!\s*\n/g, replace: ':::\n' },

    // // Handle mkdocs-material specific syntax
    // { find: /{: target=_blank }/g, replace: '' }, // Remove material-specific link attributes
    // { find: /\{: \..*?\}/g, replace: '' }, // Remove material-specific classes

    // // Convert MkDocs footnotes to Docusaurus format
    // { find: /\[\^(\d+)\]:/g, replace: '[^$1]:' },

    // // Handle mkdocs variables/macros
    // { find: /\{\{ *config\..*? *\}\}/g, replace: '' }, // Remove mkdocs config variables

    // // Convert MkDocs metadata format to Docusaurus frontmatter if at start of file
    // { find: /^---\ntitle: (.*?)\n(.*?)---/s, replace: '---\ntitle: $1\n$2---' },
];

const docsDirectories = [
  'external-repos/netbox/docs',
  'external-repos/console-docs/docs',
];

// Helper to get leading indentation
const getIndent = (line: string): string => {
  const match = line.match(/^(\s*)/);
  return match ? match[1] : '';
};

const transformContent = async (content: string): Promise<string> => {
    const lines = content.split('\n');
    const outputLines: string[] = [];
    const admonitionIndentStack: string[] = []; // Stack to store indent strings
    const admonitionStartRegex = /^(\s*)!!!\s+(\w+)(?:\s+["'](.*?)["'])?\s*$/;

    for (const line of lines) {
        let currentLine = line;
        const currentIndent = getIndent(currentLine);
        const currentIndentLength = currentIndent.length;

        // Close admonitions if indentation decreases or stays the same (and not starting new admonition)
        while (admonitionIndentStack.length > 0) {
            const lastIndent = admonitionIndentStack[admonitionIndentStack.length - 1];
            const lastIndentLength = lastIndent.length;

            // Check if the current line's indentation means we should close the block.
            // Close if: current indent is strictly less than the block's indent OR
            // current indent is the same as block's indent AND the line is not blank
            // AND the line is not starting a new admonition.
            let shouldClose = false;
            if (currentIndentLength < lastIndentLength) {
                shouldClose = true;
            } else if (currentIndentLength === lastIndentLength &&
                       currentLine.trim() !== '' &&
                       !admonitionStartRegex.test(currentLine)) {
                shouldClose = true;
            }

            if (shouldClose) {
                admonitionIndentStack.pop();
                outputLines.push(`${lastIndent}:::`);
            } else {
                // If not closing, break the inner loop
                break;
            }
        }

        // Check for and transform new admonition starts
        const admonitionMatch = currentLine.match(admonitionStartRegex);
        if (admonitionMatch) {
            const [, indent, type, title] = admonitionMatch;
            admonitionIndentStack.push(indent); // Push the indent level onto the stack
            let newLine = `${indent}:::${type.toLowerCase()}`;
            if (title) {
                const cleanTitle = title.replace(/]/g, '\\]'); // Basic escape
                newLine += `[${cleanTitle}]`;
            }
            currentLine = newLine; // Replace the line content
        }

        // Apply other simple transformations AFTER handling admonition start/end
        let processedLine = currentLine;
        transformRules.forEach(rule => {
            if (typeof rule.replace === 'string') {
                // Use global flag for string replacements if the pattern has 'g'
                processedLine = processedLine.replace(rule.find, rule.replace);
            } else {
                // Function replacements handle global matching internally if regex has 'g'
                processedLine = processedLine.replace(rule.find, rule.replace);
            }
        });

        outputLines.push(processedLine);
    }

    // Close any remaining open admonitions at the end of the file
    while (admonitionIndentStack.length > 0) {
        const closingIndent = admonitionIndentStack.pop();
        if (closingIndent !== undefined) {
            outputLines.push(`${closingIndent}:::`);
        }
    }

    return outputLines.join('\n');
};

const processFile = async (filePath: string): Promise<void> => {
    try {
        const content = await readFile(filePath, 'utf-8');
        const transformedContent = await transformContent(content);
        await writeFile(filePath, transformedContent);
    } catch (error) {
        console.error(`Error processing ${filePath}:`, error);
    }
};

const transformDocs = async (): Promise<void> => {
    for (const dir of docsDirectories) {
        try {
            const files = await new Promise<string[]>((resolve, reject) => {
                glob(`${dir}/**/*.{md,mdx}`, { nodir: true }, (err, matches) => {
                    if (err) reject(err);
                    else resolve(matches);
                });
            });

            if (!files || files.length === 0) {
                console.warn(`No files found in ${dir}`);
                continue;
            }
            console.log(`Found ${files.length} files in ${dir}`);
            await Promise.all(files.map(processFile));
        } catch (error) {
            console.error(`Error processing directory ${dir}:`, error);
        }
    }
};

transformDocs()
    .then(() => console.log('Documentation transformation complete'))
    .catch(console.error);