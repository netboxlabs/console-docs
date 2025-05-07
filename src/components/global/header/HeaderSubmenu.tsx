import { useHeaderContext } from "../../../components/global/header/Header";
import ThreeColumnSubmenu, { ThreeColumnSubmenuProps } from "../../../components/global/header/submenuLayouts/ThreeColumnSubmenu";
import { AnimatePresence, motion } from "motion/react";
import clsx from "clsx";
import React from "react";

type HeaderSubmenuProps = {
	navItems: any;
	className?: string;
};

export default function HeaderSubmenu({ navItems = [], className = "" }: HeaderSubmenuProps) {
	const { theme, isSubmenuOpen, setIsSubmenuOpen, activeMenuItem } = useHeaderContext();

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: isSubmenuOpen ? 1 : 0 }}
			transition={{ duration: 0.3 }}
			className={clsx(
				"flex flex-col",
				theme === "black" ? "bg-grey-16 text-white" : "bg-grey-1 text-black",
				isSubmenuOpen ? "pointer-events-auto" : "pointer-events-none",
				className
			)}
		>
			<div className="absolute inset-0" onMouseEnter={() => setIsSubmenuOpen(false)} />

			<div className="container-force-width container relative z-10">
				<AnimatePresence mode="popLayout">
					{navItems?.map(
						({ has_submenu = false, submenu = { three_column_submenu: {} as ThreeColumnSubmenuProps } }, index: number) =>
							has_submenu &&
							activeMenuItem === index && (
								<motion.div
									key={`tagline-${index}`}
									initial={{ opacity: 0, x: 40 }}
									animate={{ opacity: 1, x: 0 }}
									exit={{ opacity: 0, x: -40 }}
									transition={{ duration: 0.5, ease: [0.5, 0.16, 0.1, 1] }}
									className="will-change-transform"
								>
									<ThreeColumnSubmenu {...submenu?.three_column_submenu} />
								</motion.div>
							)
					)}
				</AnimatePresence>
			</div>
		</motion.div>
	);
}
