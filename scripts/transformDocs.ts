const { readFile, writeFile, mkdir, copyFile } = require('fs/promises');
const { glob } = require('glob');
const { exec } = require('child_process');
const { promisify } = require('util');
const pathModule = require('path');
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
    // Convert :material-icon-name: and its optional attributes like { .lg .middle } to an empty string
    {
        find: /:material-([a-zA-Z0-9_-]+):(?:\{[^}]*\})?/g,
        replace: (match: string, iconName: string): string => {
         return ''; // Remove the icon and its attributes
        }
    },
    // New rule for [:octicons-...
    {
        find: /^\s*\[:(octicons-[a-zA-Z0-9_-]+):\s*(.*?)\]/gm, // Matches [:octicons-name: Label Text] with optional leading whitespace
        replace: (match: string, iconName: string, label: string): string => {
            return label; // Return only the label text for now
        }
    },
    // Transform mkdocstrings autodoc syntax "::: module.path" to better Docusaurus format
    {
        find: /^(\s*)::: (netbox\.[a-zA-Z0-9_.]+)(?:\n((?:(?:\1\s+.*|\s*)\n)*?))?(?=\n(?:\1\S|\s*\n|$))/gm,
        replace: (match: string, indent: string, modulePath: string, configLines?: string): string => {
            // Extract the class/function name from the module path
            const pathParts = modulePath.split('.');
            const className = pathParts[pathParts.length - 1];
            
            // Define specific descriptions for NetBox feature mixins
            const mixinDescriptions: { [key: string]: string } = {
                'BookmarksMixin': 'Enables support for user bookmarks. Users can bookmark instances of this model for quick access.',
                'ChangeLoggingMixin': 'Automatically records changes to model instances in the change log. All create, update, and delete operations are tracked.',
                'CloningMixin': 'Provides the `clone()` method to prepare a copy of an instance with a new primary key for duplication.',
                'ContactsMixin': 'Enables association of Contact objects with model instances. Introduced in NetBox v4.3.',
                'CustomLinksMixin': 'Allows the assignment of custom links that appear in the object\'s view. Links can be conditionally displayed based on object attributes.',
                'CustomFieldsMixin': 'Enables the addition of user-defined custom fields to the model. Custom fields are dynamically added to forms and API serializers.',
                'CustomValidationMixin': 'Supports the enforcement of custom validation rules beyond Django\'s built-in validation.',
                'EventRulesMixin': 'Enables event rules that can send webhooks or run custom scripts automatically in response to object changes.',
                'ExportTemplatesMixin': 'Allows users to create custom export templates for rendering object data in various formats.',
                'JobsMixin': 'Enables background jobs to be scheduled for model instances. Jobs are executed asynchronously by background workers.',
                'JournalingMixin': 'Supports persistent historical commentary through journal entries. Users can add notes and comments to object instances.',
                'TagsMixin': 'Enables tagging of model instances with user-defined tags for organization and filtering.',
                // View classes
                'BaseObjectView': 'Base class for single-object views. Provides common functionality for displaying individual model instances.',
                'ObjectView': 'Generic view for displaying a single object instance with full detail information.',
                'ObjectEditView': 'Generic view for creating and updating object instances through a web form interface.',
                'ObjectDeleteView': 'Generic view for confirming and processing object deletion.',
                'ObjectChildrenView': 'Generic view for displaying child objects related to a parent instance.',
                'BaseMultiObjectView': 'Base class for views that handle multiple objects simultaneously.',
                'ObjectListView': 'Generic view for displaying a paginated list of objects with filtering and search capabilities.',
                'BulkImportView': 'Generic view for bulk importing objects from CSV or other data sources.',
                'BulkEditView': 'Generic view for editing multiple objects simultaneously.',
                'BulkDeleteView': 'Generic view for deleting multiple objects in a single operation.',
                'ObjectChangeLogView': 'Generic view for displaying the change log history of an object.',
                'ObjectJournalView': 'Generic view for displaying and managing journal entries for an object.',
                // Search and API classes
                'SearchIndex': 'Base class for defining search indexes that enable global search functionality for plugin models.',
                'EventType': 'Base class for defining custom event types that can trigger webhooks and scripts.',
                'DataBackend': 'Base class for implementing data source backends that can synchronize external data.',
                'JobRunner': 'Base class for implementing background job executors with scheduling and error handling.',
                // GraphQL classes
                'BaseObjectType': 'Base GraphQL object type for exposing plugin models through the GraphQL API.',
                'NetBoxObjectType': 'NetBox-specific GraphQL object type that includes common NetBox model fields and relationships.',
                // Table column classes
                'BooleanColumn': 'Table column for displaying boolean values with checkmarks or icons.',
                'ChoiceFieldColumn': 'Table column for displaying choice field values with their human-readable labels.',
                'ColorColumn': 'Table column for displaying color values as colored indicators.',
                'ColoredLabelColumn': 'Table column for displaying values as colored labels or badges.',
                'ContentTypeColumn': 'Table column for displaying Django ContentType references.',
                'ContentTypesColumn': 'Table column for displaying multiple ContentType references.',
                'MarkdownColumn': 'Table column for rendering Markdown content as HTML.',
                'TagColumn': 'Table column for displaying model tags.',
                'TemplateColumn': 'Table column that renders content using a custom template.'
            };
            
            const description = mixinDescriptions[className] || 'This class provides specific functionality for NetBox plugin development. Refer to the NetBox source code for detailed implementation.';
            
            // Create a detailed documentation block
            let result = `${indent}#### ${className}\n\n`;
            result += `${indent}**Module:** \`${modulePath}\`\n\n`;
            result += `${indent}${description}\n\n`;
            
            // Add usage information for known mixins
            if (mixinDescriptions[className]) {
                result += `${indent}**Usage:**\n`;
                result += `${indent}\`\`\`python\n`;
                result += `${indent}from netbox.models.features import ${className}\n`;
                result += `${indent}from django.db import models\n\n`;
                result += `${indent}class MyModel(${className}, models.Model):\n`;
                result += `${indent}    # Your model fields here\n`;
                result += `${indent}    pass\n`;
                result += `${indent}\`\`\`\n\n`;
            }
            
            // Process configuration lines if present
            if (configLines && configLines.trim()) {
                const lines = configLines.split('\n').filter(line => line.trim());
                let inMembers = false;
                let members: string[] = [];
                
                for (const line of lines) {
                    const trimmedLine = line.trim();
                    if (trimmedLine.startsWith('options:') || trimmedLine.startsWith('members:')) {
                        inMembers = trimmedLine.startsWith('members:');
                        // Extract inline members if present (e.g., "members: false" or "members: get_object")
                        const inlineValue = trimmedLine.split(':')[1]?.trim();
                        if (inlineValue && inlineValue !== 'false' && !inlineValue.startsWith('[')) {
                            members.push(inlineValue);
                        }
                    } else if (inMembers && trimmedLine.startsWith('-')) {
                        // Extract list item (e.g., "- get_object")
                        const member = trimmedLine.substring(1).trim();
                        if (member) {
                            members.push(member);
                        }
                    }
                }
                
                // Add members information if found
                if (members.length > 0) {
                    result += `${indent}**Key Methods:**\n`;
                    for (const member of members) {
                        result += `${indent}- \`${member}()\`\n`;
                    }
                    result += `\n`;
                }
            }
            
            return result;
        }
    },
    // Remove orphaned mkdocstrings configuration blocks that appear after autodoc transformation
    {
        find: /^\s*options:\s*\n(?:\s*members?:\s*(?:false|true|\[.*?\]|.*?)\n?(?:\s*- .*\n)*)?/gm,
        replace: ''
    },
    // Remove standalone members configuration lines with list items
    {
        find: /^\s*members?:\s*(?:false|true|\[.*?\]|.*?)\n?(?:\s*- .*\n)*/gm,
        replace: ''
    },
    // Remove orphaned list items that start with dash (from member lists)
    {
        find: /^\s*- [a-zA-Z_][a-zA-Z0-9_]*\n/gm,
        replace: ''
    },
    // Remove options blocks with blank lines and indented list items
    {
        find: /^\s*options:\s*\n\s*\n(?:\s+- [a-zA-Z_][a-zA-Z0-9_]*\n)*/gm,
        replace: ''
    },
    // Remove members lines followed by list items
    {
        find: /^\s*members:\s*\n(?:\s+- [a-zA-Z_][a-zA-Z0-9_]*\n)*/gm,
        replace: ''
    },
    // Remove standalone options: lines
    {
        find: /^\s*options:\s*\n/gm,
        replace: ''
    },
    // Remove standalone members: lines (including false/true values)
    {
        find: /^\s*members:\s*(?:false|true)?\s*\n/gm,
        replace: ''
    },
    // Remove complete configuration block patterns with options and list items
    {
        find: /\n\s*options:\s*\n\s*\n(?:\s+- [a-zA-Z_][a-zA-Z0-9_]*\s*\n)*/gm,
        replace: '\n'
    },
    // Remove remaining orphaned configuration blocks
    {
        find: /\n\s*options:\s*\n(?:\s+- [a-zA-Z_][a-zA-Z0-9_]*\s*\n)*/gm,
        replace: '\n'
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
    // Escape placeholder patterns in angle brackets (e.g., <netbox-server>, <diode-server:port>)
    // Only escape patterns that contain hyphens or colons (typical of placeholders, not HTML tags)
    { find: /<([a-zA-Z0-9_-]*(?:-|:)[a-zA-Z0-9_:-]+)>/g, replace: (match: string, placeholder: string) => `\\<${placeholder}\\>` },
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
    // New rule for specific emoji-like icons (e.g., :bug:, :bulb:)
    {
        find: /:(bug|bulb|arrow_heading_up|jigsaw|rescue_worker_helmet|heart|information_source|thumbsup|thumbsdown):/g,
        replace: (match: string, iconName: string): string => {
            return iconName; // Remove colons, leave the name (hoping for unicode rendering or just text)
        }
    },
    // Rule for :warning:
    {
        find: /:warning:/g,
        replace: '⚠️' // Replace with unicode warning emoji
    },
    // Remove leading slash from image paths starting with /images/.
    { find: /!\[(.*?)\]\(\/(images\/[^)]+)\)/g, replace: '![$1]($2)' },

    // Escape standalone { unless part of {{ or escaped \{
    { find: /(?<![{\\]){(?!{)/g, replace: '\\{' },
    // Escape standalone } unless part of }} or escaped \}
    { find: /(?<![}\\])}(?!})/g, replace: '\\}' },
    // New rule for specific emoji-like icons (e.g., :bug:, :bulb:)
    {
        find: /:(bug|bulb|arrow_heading_up|jigsaw|rescue_worker_helmet|heart|information_source|thumbsup|thumbsdown):/g,
        replace: (match: string, iconName: string): string => {
            return iconName; // Remove colons, leave the name (hoping for unicode rendering or just text)
        }
    },
    // Rule for :warning:
    {
        find: /:warning:/g,
        replace: '⚠️' // Replace with unicode warning emoji
    },
    // Remove standalone mkdocstrings configuration blocks that weren't captured above
    {
        find: /```\n\n\n    options:\n(?:      .*\n)*/gm,
        replace: '```\n\n'
    }
];

// Add a final cleanup transformation rule at the end
const finalCleanupRules: TransformRule[] = [
    // Final cleanup: remove any remaining configuration blocks
    {
        find: /(?:^|\n)\s*options:\s*\n(?:\s*\n)?\s*(?:- [a-zA-Z_][a-zA-Z0-9_]*\s*\n)*/gm,
        replace: '\n'
    },
    // Final cleanup: remove any remaining member configuration lines  
    {
        find: /(?:^|\n)\s*members:\s*(?:false|true|\[.*?\]|[a-zA-Z_][a-zA-Z0-9_]*)?(?:\s*\n(?:\s*- [a-zA-Z_][a-zA-Z0-9_]*\s*\n)*)?/gm,
        replace: '\n'
    }
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

const transformContent = async (content: string, sourceFilePath: string, outputBaseDir: string): Promise<string> => {
    const fencedCodeBlocks: string[] = [];
    const inlineCodeBlocks: string[] = [];
    let tempContent = content;

    // Transformation for console docs image paths
    if (outputBaseDir === 'console') {
        // Calculate depth from docs/console/sub/path/file.md to docs/console/images/
        // Example: docs/console/netbox-integrations/servicenow/index.md
        // Relative path to docs/console/ is ../../ (2 levels up)
        // So, image path should be ../../images/integrations/service-now/actual-image.png
        const relativePathPrefix = sourceFilePath
            .replace(/^external-repos\/console-docs\/docs\//, '') // Remove base path
            .split('/')
            .slice(0, -1) // Remove filename
            .map(() => '..')
            .join('/');

        // Regex to find <img src="/images/...">
        const imgTagRegex = /<img\s+([^>]*?)src="\/images\/([^"]+)"([^>]*?)>/g;
        tempContent = tempContent.replace(imgTagRegex, (match, beforeSrc, imgPath, afterSrc) => {
            // imgPath will be like "integrations/service-now/service-now-object-map.png"
            // Prepend a slash to make it root-relative, served by staticDirectories config.
            const newSrc = `/${imgPath}`;
            return `<img ${beforeSrc}src="${newSrc}"${afterSrc}>`;
        });
    }

    // 0. Apply URL escaping rule FIRST to the entire content
    if (urlRule) {
        if (typeof urlRule.replace === 'string') {
            tempContent = tempContent.replace(urlRule.find, urlRule.replace);
        } else {
            tempContent = tempContent.replace(urlRule.find, urlRule.replace);
        }
    }

    // Targeted fix for SAML placeholders to prevent MDX parsing errors
    tempContent = tempContent.replace(/\{NetBox Enterprise URL\}/g, '`{NetBox Enterprise URL}`');

    // 1. Extract and replace fenced code blocks (from already URL-escaped content)
    // Regex captures the full match including delimiters and content
    tempContent = tempContent.replace(/^```\s*([a-zA-Z0-9-+]*)?\s*\n([\s\S]*?)\n```$/gm, (match, lang, blockContent) => {
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
            
            // Always close if current line has less indentation
            if (currentIndentLength < lastIndentLength) {
                shouldClose = true;
            } 
            // For same indentation level, close if:
            // 1. Line is not empty AND
            // 2. It's not a code block placeholder AND  
            // 3. Either it's not an admonition start OR it IS an admonition start (new admonition at same level should close previous)
            else if (currentIndentLength === lastIndentLength &&
                       currentLine.trim() !== '' &&
                     !currentLine.includes('__FENCED_CODE_BLOCK_') && 
                     !currentLine.includes('__INLINE_CODE_BLOCK_')) {
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

    // Transform the "Eager to Get Started" block into a Docusaurus note
    const eagerBlockRegex = /<div class="grid cards" markdown>\s*-\s+__([^_]+)__\s*---\s*([\s\S]*?)\s*(.+?)\((https?:\/\/[^)]+)\)\s*<\/div>/gm;
    transformedContentWithPlaceholders = transformedContentWithPlaceholders.replace(eagerBlockRegex, (match, title, body, linkText, linkUrl) => {
        const cleanedTitle = title.trim();
        const cleanedBody = body.trim();
        const cleanedLinkText = linkText.trim();
        const cleanedLinkUrl = linkUrl.trim();
        // Use Docusaurus button classes for the link
        return `:::note[${cleanedTitle}]\n\n${cleanedBody}\n\n<a href="${cleanedLinkUrl}" className="button button--primary">${cleanedLinkText}</a>\n:::`;
    });

    // Hotfix to escape {} tags (applied before restoring code blocks)
    // Regex: (?<!\){([^{}]+)}(?!}) - Explanation:
    // (?<!\) - Negative lookbehind for a literal backslash (ensuring we don't escape already escaped braces like \{)
    // {       - Matches the literal opening curly brace
    // ([^{}]+) - Captures one or more characters that are NOT curly braces (this is group 1, $1)
    // }       - Matches the literal closing curly brace
    // (?!})   - Negative lookahead to ensure the closing brace is not followed by another (to avoid {{ a }} issues)
    // Replacement: \\{$1\\} - Escapes the captured group with literal backslashes
    transformedContentWithPlaceholders = transformedContentWithPlaceholders.replace(/(?<!\\){([^{}]+)}(?!})/g, '\\\\{$1\\\\}');

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

    // 6. Apply final cleanup rules to remove any remaining configuration blocks
    finalCleanupRules.forEach(rule => {
        if (typeof rule.replace === 'string') {
            transformedContentWithPlaceholders = transformedContentWithPlaceholders.replace(rule.find, rule.replace);
        } else {
            transformedContentWithPlaceholders = transformedContentWithPlaceholders.replace(rule.find, rule.replace);
        }
    });

    return transformedContentWithPlaceholders;
};

const processFile = async (sourceFilePath: string, outputBaseDir: string, sourceBaseDir: string): Promise<void> => {
    const relativePath = pathModule.relative(sourceBaseDir, sourceFilePath);
    const outputFilePath = pathModule.join('docs', outputBaseDir, relativePath);

    try {
        await mkdir(pathModule.dirname(outputFilePath), { recursive: true });

        if (sourceFilePath.endsWith('.md')) {
            const content = await readFile(sourceFilePath, 'utf-8');
            const transformedContent = await transformContent(content, sourceFilePath, outputBaseDir);
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
        const outputBaseDir = pathModule.join('docs', output); // Define output path within project 'docs' folder

        try {
            // Use the modern glob API which returns a Promise
            const files = await glob(`${source}/**/*`, { nodir: true });

            if (!files || files.length === 0) {
                console.warn(`No files found in ${source}`);
                continue; // Skip to the next directory config
            }
            console.log(`Found ${files.length} files in ${source}. Transforming and copying to ${outputBaseDir}...`);

            // Process each file found
            await Promise.all(files.map(file => processFile(file, output, source)));

            // After processing files, generate the sidebar
            console.log(`Generating sidebar for ${output}...`);
            const mkdocsConfigPath = pathModule.join(source, '..', 'mkdocs.yml');
            console.log(`Using mkdocs.yml at ${mkdocsConfigPath}`);
            try {
                const mkdocsConfigContent = await readFile(mkdocsConfigPath, 'utf-8');
                const mkdocsConfig = yaml.load(mkdocsConfigContent, { schema: CUSTOM_YAML_SCHEMA }) as { nav?: MkDocsNavItem[] };

                if (mkdocsConfig?.nav) {

                    const docusaurusSidebarItems = mapNavToDocusaurus(mkdocsConfig.nav, output).filter(item => item.label !== 'Home' && item.id !== `${output}/index`);
                    docusaurusSidebarItems.unshift({ type: 'doc', id: `${output}/index`, label: 'Home' });
                    const sidebarJsonPath = pathModule.join('sidebars', `${output}.json`); // Dynamic output path
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