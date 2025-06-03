import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

const config: Config = {
	title: "NetBox Documentation",
	tagline: "Centralised Documentation for NetBox",
	favicon: "img/favicon.ico",
	url: "https://netboxlabs.com",
	baseUrl: process.env.VERCEL_ENV === "production" ? "/docs/" : "/",
	trailingSlash: true,
	staticDirectories: ['static', 'docs/console/images'],
	organizationName: "netbox",
	projectName: "netbox-docs",

	markdown: {
		mermaid: true,
	},

	plugins: [
		async function myPlugin(context, options) {
			return {
				name: "docusaurus-tailwindcss",
				configurePostCss(postcssOptions) {
					// Appends TailwindCSS and AutoPrefixer.
					postcssOptions.plugins.push(require("tailwindcss"));
					postcssOptions.plugins.push(require("autoprefixer"));
					return postcssOptions;
				},
			};
		},
		'docusaurus-plugin-sass',
	],
	themes: ['@docusaurus/theme-mermaid'],
	presets: [
		[
			"classic",
			{
				docs: {
					routeBasePath: process.env.VERCEL_ENV === "production" ? "/" : "/docs/",
					sidebarPath: "./sidebars.ts",
				},
				blog: false,
				theme: {
					customCss: require.resolve("./src/css/globals.scss"),
				},
			} satisfies Preset.Options,
		],
	],
	themeConfig: {
		// Configure table of contents to show h2, h3, and h4 headings
		tableOfContents: {
			minHeadingLevel: 2,
			maxHeadingLevel: 4,
		},
		image: "img/netbox-social-card.jpg",
		algolia: {
			appId: "XCF0TW7MCD",
			apiKey: "a2b488046dfbbbf27aa204269640af66",
			indexName: "netboxlabs",
			contextualSearch: true, // Optional: Recommended for versioned/translated sites
			// Optional: Specify domains where the navigation should occur through window.location instead on history.push. Useful when our Algolia config crawls multiple documentation sites and we want to navigate with window.location.href to them.
			// externalUrlRegex: 'external\\.com|domain\\.com',
			// Optional: Algolia search parameters
			// searchParameters: {},
			// Optional: path for search page that enabled by default (`false` to disable it)
			// searchPagePath: 'search',
			// insights: true, // Optional, automatically send insights if you have an Algolia account with this feature enabled
		},
		colorMode: {
      defaultMode: "dark",
      disableSwitch: true,
      respectPrefersColorScheme: false,
    },
		navbar: {
			title: "NetBox Documentation",
			logo: {
				alt: "NetBox Logo",
				src: "img/logo.svg",
				href: "/docs/netbox",
			},
			items: [
				{
					type: 'docSidebar',
					sidebarId: 'defaultSidebar',
					label: 'Docs Menu',
					position: 'left',
				},
				{
					href: "https://github.com/netbox-community/netbox/",
					label: "GitHub",
					position: "right",
				},
			],
		},
		footer: {
			style: "dark",
			links: [
				{
					title: "Community",
					items: [
						{
							label: "X",
							href: "https://x.com/NetBoxLabs",
						},
					],
				},
				{
					title: "More",
					items: [
						{
							label: "GitHub",
							href: "https://github.com/netboxlabs",
						},
					],
				},
			],
			copyright: `Copyright © ${new Date().getFullYear()} NetBox Labs.`,
		},
		prism: {
			theme: prismThemes.github,
			darkTheme: prismThemes.dracula,
		},
	} satisfies Preset.ThemeConfig,
};

export default config;
