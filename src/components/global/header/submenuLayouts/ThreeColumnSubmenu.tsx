import useResourcePreviewData from "../../../../hooks/useResourcePreviewData";
import Link from "@docusaurus/Link";
import clsx from "clsx";
import React from "react";
import { ExternalArrowIcon } from "../../../../components/global/SiteIcons";

export type ThreeColumnSubmenuProps = {
	title?: string;
	title_link?: any;
	columns?: any[];
	theme?: string;
	handleCloseSubmenu?: () => void;
	handleCloseMobileNav?: () => void;
	left_column?: { submenu_modules?: any[] };
	middle_column?: { submenu_modules?: any[] };
	right_column?: { submenu_modules?: any[] };
};

export default function ThreeColumnSubmenu({ title, title_link, columns, theme = "black", handleCloseSubmenu = () => {}, handleCloseMobileNav = () => {}, left_column = {}, middle_column = {}, right_column = {} }: ThreeColumnSubmenuProps) {
	const hasSubmenuModules = (column: any) => column?.submenu_modules?.length > 0;

	const hasTitle = title || title_link?.title;
	const TitleLink = title_link?.url ? Link : "div";

	return (
		<div className="grid grid-cols-12 gap-x-responsive py-10 text-sm">
			{hasTitle && (
				<div className="col-span-3">
					<TitleLink
						href={title_link?.url}
						target={title_link?.target}
						className={clsx("mb-4 block text-lg font-medium", title_link?.url && "hover:opacity-70")}
						onClick={() => { handleCloseSubmenu(); handleCloseMobileNav(); }}
					>
						{title_link?.title || title}
					</TitleLink>
				</div>
			)}
			{columns?.map((column, index) => (
				<div key={`col-${index}`} className={clsx("col-span-3", !hasTitle && index === 0 && "col-start-1")}>
					<Column column={column} theme={theme} handleCloseSubmenu={handleCloseSubmenu} handleCloseMobileNav={handleCloseMobileNav} />
				</div>
			))}
		</div>
	);
}

function Column({ column, theme, handleCloseSubmenu, handleCloseMobileNav }) {
	return (
		<ul className="flex flex-col gap-y-1.5">
			{column?.heading && <li className="mb-1.5 text-[0.8125rem] font-medium leading-tight text-grey-8">{column.heading}</li>}
			{column?.items?.map((item, index) => (
				<Item key={`item-${index}`} item={item} theme={theme} handleCloseSubmenu={handleCloseSubmenu} handleCloseMobileNav={handleCloseMobileNav} />
			))}
		</ul>
	);
}

function Item({ item, theme, handleCloseSubmenu, handleCloseMobileNav }) {
	return (
		<li>
			<ItemLink item={item} theme={theme} handleCloseSubmenu={handleCloseSubmenu} handleCloseMobileNav={handleCloseMobileNav}>
				{item.icon?.url && <img src={item.icon.url} alt={item.icon.alt || ""} className="mr-2 h-4 w-4" />}
				{item.title}
			</ItemLink>
		</li>
	);
}

function ItemLink({ item, children, theme, handleCloseSubmenu, handleCloseMobileNav }) {
	const commonClasses = clsx("flex items-center rounded px-2 py-1.5 transition-colors duration-200", {
		"text-grey-8 hover:text-white": item.dimmed,
	});

	const themeClasses = theme === "black" ? "hover:bg-grey-13" : "hover:bg-grey-2";

	const onClickActions = () => {
		handleCloseSubmenu();
		handleCloseMobileNav();
	};

	return item.url ? (
		<Link href={item.url} target={item.target} className={`${commonClasses} ${themeClasses}`} onClick={onClickActions}>
			{children}
		</Link>
	) : (
		<div className={`${commonClasses} cursor-default`}>{children}</div>
	);
}

type ModuleRendererProps = {
	modules: any[];
	handleCloseAll: () => void;
};

function ModuleRenderer({ modules = [], handleCloseAll }: ModuleRendererProps) {
	if (!modules) return null;

	const ModuleComponents = {
		link_list: LinkListModule,
		featured_resource: FeaturedResourceModule,
		card_cta: CardCtaModule,
		tile_cta: TileCtaModule,
	};

	return (
		<div className="w-full space-y-8">
			{modules.map((submenuModule, index) => {
				const Component = ModuleComponents[submenuModule.acf_fc_layout];

				return Component ? <Component key={`module-${index}`} {...submenuModule} handleCloseAll={handleCloseAll} /> : null;
			})}
		</div>
	);
}

type ModuleProps = any & { handleCloseAll: () => void };

function LinkListModule({ link_list = {}, handleCloseAll }: ModuleProps) {
	const { subheading = "", links = [] } = link_list;

	return (
		<div className="space-y-6">
			{subheading && <div className="text-13-mobHeading">{subheading}</div>}

			{links.length > 0 && (
				<ul className="space-y-6">
					{links.map(
						({ link, icon, description = "" }) =>
							link?.url && (
								<li key={link?.title}>
									<a href={link?.url} target={link?.target} className="group flex items-start gap-x-3" onClick={handleCloseAll}>
										{icon?.url && <img src={icon?.url} alt={icon?.alt} className="w-6" />}

										<div className="block space-y-1 leading-none">
											<div className="inline-flex gap-x-2 transition-colors duration-200 group-hover:text-teal">
												<span className="text-13-mobHeading !leading-none" dangerouslySetInnerHTML={{ __html: link?.title }} />
												{link?.target === "_blank" && <ExternalArrowIcon className="w-3" />}
											</div>

											{description && (
												<div className="text-13-mobSubText">{description}</div>
											)}
										</div>
									</a>
								</li>
							)
					)}
				</ul>
			)}
		</div>
	);
}

function FeaturedResourceModule({ featured_resource, handleCloseAll }: ModuleProps) {
	const { subheading = "", resource } = featured_resource;
	const { resourceType } = useResourcePreviewData(resource);

	return (
		<div className="space-y-5">
			{subheading && <div className="text-13-mobHeading">{subheading}</div>}

			{resource?.permalink ? (
				<a href={resource?.permalink} target={resource?.permalink_target} className="group block space-y-8" onClick={handleCloseAll}>
					<div className="w-full">
						<div className="text-13-subText transition-colors duration-200 group-hover:text-teal">
							{resource?.post_title}
						</div>

						<div className="mt-4 inline-flex gap-x-2">
							<div className="rounded bg-grey-12 px-2 py-1 text-[0.6875rem] text-white">{resourceType}</div>

							{resource?.categories?.length > 0 && (
								<div className="rounded bg-grey-12 px-2 py-1 text-[0.6875rem] text-white">{resource?.categories[0]?.name}</div>
							)}
						</div>
					</div>

					<div className="relative aspect-[300/170] overflow-hidden rounded transition-opacity duration-200 group-hover:opacity-80">
						<img src={resource?.featured_image?.src} alt={resource?.featured_image?.alt || resource?.post_title} className="w-full object-cover" />
					</div>
				</a>) : null}
		</div>
	);
}

function CardCtaModule({ card_cta, handleCloseAll }: ModuleProps) {
	const { link, asset } = card_cta;

	return link?.url ? (
		<a
			href={link?.url}
			target={link?.target}
			className="group relative block aspect-[300/220] w-full overflow-hidden rounded"
			onClick={handleCloseAll}
		>
			<img src={asset?.url} alt={asset?.alt} className="w-full object-cover transition-opacity duration-200 group-hover:opacity-80" />

			<div className="absolute left-3 top-3 rounded bg-grey-12 px-2 py-1 text-[0.8125rem] leading-[1.5] tracking-[0.26px] text-white">{link?.title}</div>
		</a>
	) : null;
}

function TileCtaModule({ tile_cta, handleCloseAll }: ModuleProps) {
	const { link, asset, description = "" } = tile_cta;

	return link?.url ? (
		<a href={link?.url} target={link?.target} className="group flex flex-col-reverse gap-y-6">
			<div className="relative block aspect-[348/220] w-full overflow-hidden rounded">
				<img src={asset?.url} alt={asset?.alt} className="w-full object-cover" />
			</div>

			<div className="space-y-1 leading-none">
				<div className="text-13-mobHeading">{link?.title}</div>

				{description && <div className="text-13-mobSubText">{description}</div>}
			</div>
		</a>
	) : null;
}
