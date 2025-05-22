import useIsBelowBreakpoint from "../../../hooks/useIsBelowBreakpoint";
import highlightTextContent from "../../../utils/highlightTextContent";
import { ArrowRightIcon } from "../../global/SiteIcons";
import Logo from "../../global/Logo";
import HeaderSubmenu from "../../global/header/HeaderSubmenu";
import HeaderNavLink from "../../global/header/HeaderNavLink";
import HeaderButtons from "../../global/header/HeaderButtons";
import HeaderBurgerButton from "../../global/header/HeaderBurgerButton";

import { useLocation } from '@docusaurus/router';

import clsx from "clsx";
import React, { useEffect, useState } from "react";

type HeaderProps = {
	options: any;
};

export default function Header({ options: { header } }: HeaderProps) {
	const { nav = { items: [] }, ctas, announcement_banner } = header;
	const contextTheme = "black"; // Defaulting theme, adjust as needed
	const handleCloseSubmenu = () => { /* Dummy function or manage locally if needed for HeaderSubmenu */ };

	const isBelowDesktop = useIsBelowBreakpoint(1024);
	const location = useLocation();
	const hasNavLinks = nav?.items?.length > 0 && nav?.items[0]?.link?.url?.length > 0;

	return (
		<>
			{/* <AnnouncementBanner {...announcement_banner} location={location} /> */}

			<div
				className="sticky inset-x-0 top-0 z-[101] w-full font-openSauceTwo"
				onMouseLeave={handleCloseSubmenu}
			>
				<header
					className={clsx(
						"relative z-10 flex h-[var(--ifm-navbar-height)] w-full transition-shadow duration-300",
						contextTheme === "black" ? "bg-grey-16 text-white" : "bg-grey-1 text-black"
					)}
				>
					<div className="container !max-w-[76rem] flex flex-1 items-center justify-between py-3 sm:py-4">
						<a
							href="/"
							aria-label="Back to Home"
							className="block h-5 transition-opacity duration-200 hover:opacity-70 sm:h-[1.3125rem]"
							onMouseEnter={handleCloseSubmenu}
						>
							<Logo className="w-auto will-change-transform text-white" />
						</a>

						{hasNavLinks && !isBelowDesktop && (
							<nav>
								<ul className="hidden items-center lg:flex">
									{nav?.items?.map(({ link, has_submenu }, index) => <HeaderNavLink key={link?.title} link={link} has_submenu={has_submenu} index={index} />)}
								</ul>
							</nav>
						)}

						{!isBelowDesktop && <HeaderButtons ctas={ctas} />}

						{isBelowDesktop && <HeaderBurgerButton />}
					</div>
				</header>

				<HeaderSubmenu navItems={nav?.items} className="absolute inset-x-0 top-full h-[calc(100vh-var(--header-height))] w-full overflow-scroll" />
			</div>
		</>
	);
}

type AnnouncementBannerProps = any & { router: any };

function AnnouncementBanner({ icon, link, homepage_only = false, location }: AnnouncementBannerProps) {
	const isMobile = useIsBelowBreakpoint(640);
	const isHomePage = location.pathname === "/";

	const highlightedText = isMobile && link?.title?.length > 32 ? `${link?.title.slice(0, 32)}...` : highlightTextContent(link?.title, "text-white");

	if (homepage_only && !isHomePage) return null;

	return (
		<a
			href={link?.url}
			target={link?.target}
			className="group sticky top-0 w-full z-[101] block border-b border-grey-13 bg-grey-16 py-2.5 text-white transition-colors duration-200 hover:bg-grey-13"
		>
			<div className="container">
				<div className="flex items-center justify-center gap-x-2.5">
					{icon?.url && <img src={icon.url || icon.src} className="shrink-0" />}
					<p className="text-13 text-grey-6" dangerouslySetInnerHTML={{ __html: highlightedText }} />
					{!isMobile && <div className="h-3.5 w-px shrink-0 bg-grey-13" />}
					<ArrowRightIcon className="w-3 shrink-0 text-grey-6 transition-transform duration-200 group-hover:translate-x-0.5" />
				</div>
			</div>
		</a>
	);
}
