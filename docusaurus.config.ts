import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

const config: Config = {
	title: "NetBox Documentation",
	tagline: "Centralised Documentation for NetBox",
	favicon: "img/favicon.ico",
	url: "https://netboxlabs.com",
	baseUrl: "/docs",
	organizationName: "netbox",
	projectName: "netbox-docs",
	plugins: [
		[
			"@docusaurus/plugin-content-docs",
			{
				id: "netbox-docs",
				path: "external-repos/netbox/docs",
				routeBasePath: "netbox",
				sidebarPath: require.resolve("./sidebars.js"),
			},
		],
		[
			"@docusaurus/plugin-content-docs",
			{
				id: "docusaurus",
				path: "external-repos/github-pages-docusaurus/docs",
				routeBasePath: "docusaurus",
				sidebarPath: require.resolve("./sidebars.js"),
			},
		],
	],

	presets: [
		[
			"classic",
			{
				docs: {
					sidebarPath: "./sidebars.ts",
				},

				theme: {
					customCss: "./src/css/custom.css",
				},
			} satisfies Preset.Options,
		],
	],

	themeConfig: {
		image: "img/docusaurus-social-card.jpg",
		navbar: {
			title: "NetBox Documentation",
			logo: {
				alt: "NetBox Logo",
				src: "img/logo.svg",
			},
			items: [
				{ to: "netbox", label: "NetBox", position: "left" },
				{ to: "docusaurus/intro", label: "Docusaurus", position: "left" },
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
