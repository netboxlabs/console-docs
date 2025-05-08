import useIsBelowBreakpoint from "../../../hooks/useIsBelowBreakpoint";
import highlightTextContent from "../../../utils/highlightTextContent";
import { ArrowRightIcon } from "../../global/SiteIcons";
import Logo from "../../global/Logo";
import HeaderSubmenu from "../../global/header/HeaderSubmenu";
import HeaderNavLink from "../../global/header/HeaderNavLink";
import HeaderButtons from "../../global/header/HeaderButtons";
import HeaderBurgerButton from "../../global/header/HeaderBurgerButton";
import MobileNav from "../../global/header/MobileNav";
import { AnimatePresence } from "motion/react";

import { useLocation } from '@docusaurus/router';

import clsx from "clsx";
import React, { createContext, useContext, useEffect, useState } from "react";

type HeaderProps = {
	options: any;
	theme?: any;
};

type HeaderContextType = {
	theme: any;
	isSubmenuOpen: boolean;
	setIsSubmenuOpen: (isSubmenuOpen: boolean) => void;
	activeMenuItem: number | null;
	setActiveMenuItem: (activeMenuItem: number | null) => void;
	handleCloseSubmenu: () => void;
	handleCloseMobileNav: () => void;
	showMobileNav: boolean;
	setShowMobileNav: (showMobileNav: boolean) => void;
};

const HeaderContext = createContext<HeaderContextType | null>(null);

export function useHeaderContext() {
	const context = useContext(HeaderContext);
	if (context === undefined) {
		throw new Error("useHeaderContext must be used within a Header");
	}
	return context;
}

export default function Header({ options: { header }, theme = "black" }: HeaderProps) {


	const { nav = { items: [] }, ctas, announcement_banner } = header;
	const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);
	const [activeMenuItem, setActiveMenuItem] = useState(null);
	const [showMobileNav, setShowMobileNav] = useState(false);
	const isBelowDesktop = useIsBelowBreakpoint(1024);

	const location = useLocation();

	const hasNavLinks = nav?.items?.length > 0 && nav?.items[0]?.link?.url?.length > 0;

	const handleCloseSubmenu = () => {
		setIsSubmenuOpen(false);
		setActiveMenuItem(null);
	};

	const handleCloseMobileNav = () => {
		setShowMobileNav(false);
	};

	return (
		<>
			{/* <AnnouncementBanner {...announcement_banner} location={location} /> */}

			<HeaderContext.Provider
				value={{
					theme,
					isSubmenuOpen,
					setIsSubmenuOpen,
					activeMenuItem,
					setActiveMenuItem,
					handleCloseSubmenu,
					handleCloseMobileNav,
					showMobileNav,
					setShowMobileNav,
				}}
			>
				<div
					className="sticky inset-x-0 top-0 z-[101] w-full font-openSauceTwo"
					onMouseLeave={handleCloseSubmenu}
				>
					<header
						className={clsx(
							"relative z-10 flex h-[var(--ifm-navbar-height)] w-full transition-shadow duration-300",
							theme === "black" ? "bg-grey-16 text-white" : "bg-grey-1 text-black"
						)}
					>
						<div className="container !max-w-[76rem] flex flex-1 items-center justify-between py-3 sm:py-4">
							<a
								href="/"
								aria-label="Back to Home"
								className="block h-5 transition-opacity duration-200 hover:opacity-70 sm:h-[1.3125rem]"
								onMouseEnter={() => setIsSubmenuOpen(false)}
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

					<AnimatePresence>
						{showMobileNav && (
							<MobileNav
								navItems={nav?.items}
								ctas={ctas}
								className="absolute inset-x-0 top-full h-[calc(100vh-var(--header-height))] w-full overflow-scroll lg:hidden"
								theme={theme}
							/>
						)}
					</AnimatePresence>
				</div>
			</HeaderContext.Provider>
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
