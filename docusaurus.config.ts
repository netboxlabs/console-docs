import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

const config: Config = {
	title: "NetBox Documentation",
	tagline: "Centralised Documentation for NetBox",
	favicon: "img/favicon.ico",
	url: "https://netboxlabs.com",
	baseUrl: "/docs/",
	trailingSlash: true,
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
					routeBasePath: "/",
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
		image: "img/netbox-social-card.jpg",
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
				// { to: "docs/netbox", label: "NetBox", position: "left" },
				// { to: "docs/console", label: "Console", position: "left" },
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
