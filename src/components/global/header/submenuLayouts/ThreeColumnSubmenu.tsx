import useResourcePreviewData from "../../../../hooks/useResourcePreviewData";
import { useHeaderContext } from "../../../../components/global/header/Header";
import { ExternalArrowIcon } from "../../../../components/global/SiteIcons";

import clsx from "clsx";
import React from "react";

export type ThreeColumnSubmenuProps = {
	left_column?: { submenu_modules?: any[] };
	middle_column?: { submenu_modules?: any[] };
	right_column?: { submenu_modules?: any[] };
};

export default function ThreeColumnSubmenu({ left_column = {}, middle_column = {}, right_column = {} }: ThreeColumnSubmenuProps) {
	const hasSubmenuModules = (column: any) => column?.submenu_modules?.length > 0;

	const { handleCloseSubmenu, handleCloseMobileNav } = useHeaderContext();

	const handleCloseAll = () => {
		handleCloseSubmenu();
		handleCloseMobileNav();
	};

	const commonProps = {
		handleCloseAll,
	};

	return (
		<div className="flex flex-col gap-9 pb-9 pt-2 lg:flex-row lg:justify-between lg:gap-12 lg:pb-20 lg:pt-[3.25rem]">
			<div className="grid flex-1 gap-9 lg:max-w-[42.5rem] lg:grid-cols-2 lg:gap-20">
				{hasSubmenuModules(left_column) && <ModuleRenderer modules={left_column?.submenu_modules} {...commonProps} />}

				{hasSubmenuModules(middle_column) && <ModuleRenderer modules={middle_column?.submenu_modules} {...commonProps} />}
			</div>

			<div className="w-full shrink-0 lg:w-1/4 lg:max-w-[18.75rem]">
				{hasSubmenuModules(right_column) && <ModuleRenderer modules={right_column?.submenu_modules} {...commonProps} />}
			</div>
		</div>
	);
}

type ModuleRendererProps = {
	modules: WpHeaderNavSubmenuModule[];
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
	const { theme } = useHeaderContext();

	return (
		<div className="space-y-6 lg:space-y-5">
			{subheading && <div className={clsx("text-13-mobHeading", theme === "black" ? "text-grey-8" : "text-black/50")}>{subheading}</div>}

			{links.length > 0 && (
				<ul className="space-y-6 lg:space-y-[1.875rem]">
					{links.map(
						({ link, icon, description = "" }) =>
							link?.url && (
								<li key={link?.title}>
									<a href={link?.url} target={link?.target} className="group flex items-start gap-x-3" onClick={handleCloseAll}>
										{icon?.url && <img src={icon?.url} alt={icon?.alt} className="w-6" />}

										<div className={clsx("block space-y-1 leading-none", theme === "black" ? "text-white" : "text-black")}>
											<div className="inline-flex gap-x-2 transition-colors duration-200 group-hover:text-teal">
												<span className="text-13-mobHeading !leading-none" dangerouslySetInnerHTML={{ __html: link?.title }} />
												{link?.target === "_blank" && <ExternalArrowIcon className="w-3" />}
											</div>

											{description && (
												<div className={clsx("text-13-mobSubText lg:!leading-none", theme === "black" ? "text-grey-7" : "text-grey-9")}>{description}</div>
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
	const { theme } = useHeaderContext();

	return (
		<div className="space-y-5">
			{subheading && <div className={clsx("text-13-mobHeading", theme === "black" ? "text-grey-8" : "text-black/50")}>{subheading}</div>}

			{resource?.permalink ? (
				<a href={resource?.permalink} target={resource?.permalink_target} className="group block space-y-8" onClick={handleCloseAll}>
					<div className="w-full lg:max-w-[16.25rem]">
						<div className={clsx("text-13-subText transition-colors duration-200 group-hover:text-teal", theme === "black" ? "text-white" : "text-black")}>
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
			className="group relative block aspect-[300/220] w-full overflow-hidden rounded lg:max-w-[18.75rem]"
			onClick={handleCloseAll}
		>
			<img src={asset?.url} alt={asset?.alt} className="w-full object-cover transition-opacity duration-200 group-hover:opacity-80" />

			<div className="absolute left-3 top-3 rounded bg-grey-12 px-2 py-1 text-[0.8125rem] leading-[1.5] tracking-[0.26px] text-white">{link?.title}</div>
		</a>
	) : null;
}

function TileCtaModule({ tile_cta, handleCloseAll }: ModuleProps) {
	const { link, asset, description = "" } = tile_cta;
	const { theme } = useHeaderContext();

	return link?.url ? (
		<a href={link?.url} target={link?.target} className="group flex flex-col-reverse gap-y-6 lg:max-w-[21.75rem] lg:flex-col" onClick={handleCloseAll}>
			<div className="relative block aspect-[348/220] w-full overflow-hidden rounded transition-opacity duration-200 group-hover:opacity-80">
				<img src={asset?.url} alt={asset?.alt} className="w-full object-cover" />
			</div>

			<div className={clsx("space-y-1 leading-none max-lg:pt-2 lg:space-y-2", theme === "black" ? "text-white" : "text-black")}>
				<div className="text-13-mobHeading !leading-none transition-colors duration-200 group-hover:text-teal">{link?.title}</div>

				{description && <div className={clsx("text-13-mobSubText lg:!leading-none", theme === "black" ? "text-grey-7" : "text-grey-9")}>{description}</div>}
			</div>
		</a>
	) : null;
}
