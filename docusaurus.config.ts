import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config = (async ()=>{
  // const getDocs = async () => {
  //   return ['index.md'];
  // }

  // const docs = await getDocs();

  const config: Config = {
    title: 'NetBox Documentation',
    tagline: 'Centralised Documentation for NetBox',
    favicon: 'img/favicon.ico',

    // Set the production url of your site here
    url: 'https://docs.netbox.dev',
    // Set the /<baseUrl>/ pathname under which your site is served
    // For GitHub pages deployment, it is often '/<projectName>/'
    baseUrl: '/',

    // GitHub pages deployment config.
    // If you aren't using GitHub pages, you don't need these.
    organizationName: 'netbox', // Usually your GitHub org/user name.
    projectName: 'netbox-docs', // Usually your repo name.

    plugins: [
      [
        '@docusaurus/plugin-content-docs',
        {
          id: "netbox-docs",
          path:"external-repos/netbox/docs",
          routeBasePath: "docs/netbox",
          sidebarPath: require.resolve('./sidebars.js'),
        }
      ],
      [
        '@docusaurus/plugin-content-docs',
        {
          id: "mkdocs",
          path:"external-repos/mkdocs/docs",
          routeBasePath: "docs/mkdocs",
          sidebarPath: require.resolve('./sidebars.js'),
        }
      ]
    ],

    presets: [
      [
        'classic',
        {
          docs: {
            sidebarPath: './sidebars.ts',
            // Each external repository will have its own edit URL
          },

          theme: {
            customCss: './src/css/custom.css',
          },
        } satisfies Preset.Options,
      ],
    ],

    themeConfig: {
      // Replace with your project's social card
      image: 'img/docusaurus-social-card.jpg',
      navbar: {
        title: 'NetBox Documentation',
        logo: {
          alt: 'NetBox Logo',
          src: 'img/logo.svg',
        },
        items: [
          {to: 'docs/netbox', label: 'NetBox', position: 'left'},
          {to: 'docs/mkdocs', label: 'MkDocs', position: 'left'},
          {
            href: 'https://github.com/netbox-community/netbox/',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Tutorial',
                to: '/docs/intro',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Stack Overflow',
                href: 'https://stackoverflow.com/questions/tagged/docusaurus',
              },
              {
                label: 'Discord',
                href: 'https://discordapp.com/invite/docusaurus',
              },
              {
                label: 'X',
                href: 'https://x.com/docusaurus',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Blog',
                to: '/blog',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/facebook/docusaurus',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} My Project, Inc. Built with Docusaurus.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    } satisfies Preset.ThemeConfig,
  };

  return config;


})();

export default config;
