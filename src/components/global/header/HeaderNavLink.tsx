import React, { useState } from "react";
import HeaderSubmenu from "./HeaderSubmenu";
import { motion } from "motion/react";
import Link from "@docusaurus/Link";
import clsx from "clsx";

type HeaderNavLinkProps = {
	link: any;
	has_submenu: boolean;
	index: number;
	activeMenuItem?: number | null;
	setActiveMenuItem?: (index: number | null) => void;
	isSubmenuOpen?: boolean;
	setIsSubmenuOpen?: (isOpen: boolean) => void;
	theme?: string;
};

export default function HeaderNavLink({ link, has_submenu, index, activeMenuItem, setActiveMenuItem, isSubmenuOpen, setIsSubmenuOpen, theme = "black" }: HeaderNavLinkProps) {
	const handleSubmenuToggle = (itemIndex) => {
		if (setActiveMenuItem && setIsSubmenuOpen) {
			if (activeMenuItem === itemIndex && isSubmenuOpen) {
				setIsSubmenuOpen(false);
				setActiveMenuItem(null);
			} else {
				setIsSubmenuOpen(true);
				setActiveMenuItem(itemIndex);
			}
		}
	};

	const handleCloseSubmenu = () => {
		if (setIsSubmenuOpen && setActiveMenuItem) {
			setIsSubmenuOpen(false);
			setActiveMenuItem(null);
		}
	};

	const linkClasses = clsx(
		"nav-link relative block whitespace-nowrap px-2.5 py-3.5 text-13 font-medium transition-opacity duration-200 hover:opacity-70 lg:px-3 xl:px-4",
		{
			"opacity-70": activeMenuItem === index && isSubmenuOpen,
		}
	);

	const submenuToggleClasses = clsx(
		linkClasses,
		"flex cursor-pointer items-center gap-x-1.5",
		{
			"is-active": activeMenuItem === index && isSubmenuOpen,
		}
	);

	const Tag = has_submenu ? "button" : Link;

	const commonProps = {
		className: has_submenu ? submenuToggleClasses : linkClasses,
		...(has_submenu ? { onClick: () => handleSubmenuToggle(index) } : { href: link?.url, target: link?.target, onClick: handleCloseSubmenu }),
	};

	return (
		<motion.li initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: index * 0.05 }}>
			<Tag {...commonProps}>
				{link?.title}
				{has_submenu && (
					<svg className={`mt-px h-2 w-2 shrink-0 transition-transform duration-300 ${activeMenuItem === index && isSubmenuOpen ? "rotate-180" : ""}`} viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M4 5L1 2" stroke={theme === "black" ? "white" : "#141414"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
						<path d="M7 2L4 5" stroke={theme === "black" ? "white" : "#141414"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
					</svg>
				)}
			</Tag>
		</motion.li>
	);
}
