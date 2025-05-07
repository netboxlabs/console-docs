import { useHeaderContext } from "../../../components/global/header/Header";
import { motion, AnimatePresence } from "motion/react";
import React, { useState } from "react";

type HeaderNavLinkProps = {
	link: any;
	has_submenu?: boolean;
	index: number;
};

export default function HeaderNavLink({ link, has_submenu = false, index }: HeaderNavLinkProps) {
	const { title, url, target = "_self" } = link;
	const [isHovered, setIsHovered] = useState(false);
	const { theme, isSubmenuOpen, setIsSubmenuOpen, activeMenuItem, setActiveMenuItem } = useHeaderContext();

	const handleOpenSubmenu = () => {
		setIsHovered(true);
		setIsSubmenuOpen(has_submenu);
		setActiveMenuItem(index);
	};

	const handleMouseLeave = () => {
		setIsHovered(false);
	};

	const linkClasses = "text-13 text-white relative block !px-3.5 xl:!px-[0.9375rem] !py-2.5 !leading-none appearance-none border-none bg-transparent";
	const isSubmenuActive = isSubmenuOpen && activeMenuItem === index;

	return (
		<li>
			{has_submenu ? (
				<button type="button" className={linkClasses} onMouseEnter={handleOpenSubmenu} onMouseLeave={handleMouseLeave}>
					<span className={`relative z-10 transition-opacity duration-200 ${isHovered || isSubmenuActive ? "opacity-100" : "opacity-70"}`}>{title}</span>
					<HoverBackground isHovered={isHovered || isSubmenuActive} theme={theme} />
				</button>
			) : (
				<a href={url} target={target} className={linkClasses} onMouseEnter={handleOpenSubmenu} onMouseLeave={handleMouseLeave}>
					<span className={`relative z-10 transition-opacity duration-200 ${isHovered ? "opacity-100" : "opacity-70"}`}>{title}</span>
					<HoverBackground isHovered={isHovered} theme={theme} />
				</a>
			)}
		</li>
	);
}

type HoverBackgroundProps = {
	isHovered: boolean;
	theme: any;
};

function HoverBackground({ isHovered, theme = "black" }: HoverBackgroundProps) {
	return (
		<AnimatePresence>
			{isHovered && (
				<motion.div
					layoutId="headerNavHover"
					className={`absolute inset-x-[0.3125rem] inset-y-0 rounded-[0.1875rem] ${theme === "black" ? "bg-grey-12" : "bg-grey-3"}`}
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{
						opacity: { duration: 0.2 },
						visualDuration: 0.4,
						type: "spring",
						bounce: 0.1,
					}}
				/>
			)}
		</AnimatePresence>
	);
}
