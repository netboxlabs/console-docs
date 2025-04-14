const { readFile, writeFile } = require('fs/promises');
const glob = require('glob');

interface TransformRule {
    find: string | RegExp;
    replace: string;
}

const transformRules: TransformRule[] = [

    // Convert MkDocs admonitions to Docusaurus-style
    { find: /!!! note\s*["']?(.*?)["']?\n/g, replace: ':::note $1\n' },
    { find: /!!! warning\s*["']?(.*?)["']?\n/g, replace: ':::warning $1\n' },
    { find: /!!! danger\s*["']?(.*?)["']?\n/g, replace: ':::danger $1\n' },
    { find: /!!! tip\s*["']?(.*?)["']?\n/g, replace: ':::tip $1\n' },
    { find: /!!! info\s*["']?(.*?)["']?\n/g, replace: ':::info $1\n' },

    // Convert MkDocs-style admonition closing to Docusaurus
    { find: /!!!\s*\n/g, replace: ':::\n' },

    // Handle mkdocs-material specific syntax
    { find: /{: target=_blank }/g, replace: '' }, // Remove material-specific link attributes
    { find: /\{: \..*?\}/g, replace: '' }, // Remove material-specific classes

    // Convert MkDocs footnotes to Docusaurus format
    { find: /\[\^(\d+)\]:/g, replace: '[^$1]:' },

    // Handle mkdocs variables/macros
    { find: /\{\{ *config\..*? *\}\}/g, replace: '' }, // Remove mkdocs config variables

    // Convert MkDocs metadata format to Docusaurus frontmatter if at start of file
    { find: /^---\ntitle: (.*?)\n(.*?)---/s, replace: '---\ntitle: $1\n$2---' },
];

const docsDirectories = [
  'external-repos/netbox/docs',
  'external-repos/console-docs/docs',
];

const transformContent = async (content: string): Promise<string> => {
    return transformRules.reduce((acc, rule) => {
        return acc.replace(rule.find, rule.replace);
    }, content);
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