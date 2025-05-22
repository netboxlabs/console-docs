import React from "react";
import { AnimatePresence, motion } from "motion/react";
import ThreeColumnSubmenu from "./submenuLayouts/ThreeColumnSubmenu";
import clsx from "clsx";

type HeaderSubmenuProps = {
	navItems: any;
	className?: string;
	isSubmenuOpen?: boolean;
	activeMenuItem?: number | null;
	theme?: string;
};

export default function HeaderSubmenu({ navItems, className, isSubmenuOpen, activeMenuItem, theme = "black" }: HeaderSubmenuProps) {
	const activeItemData = activeMenuItem !== null && navItems?.[activeMenuItem]?.has_submenu ? navItems[activeMenuItem] : null;
	const SubmenuComponent = SUBMENU_COMPONENTS[activeItemData?.submenu_layout] || null;

	return (
		<AnimatePresence>
			{isSubmenuOpen && activeItemData && SubmenuComponent && (
				<motion.div
					key={`submenu-${activeMenuItem}`}
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.3, ease: "easeInOut" }}
					className={clsx(
						"absolute inset-x-0 top-full",
						theme === "black" ? "bg-grey-16 text-white" : "bg-grey-1 text-grey-16",
						className
					)}
				>
					<SubmenuComponent {...activeItemData} theme={theme} />
				</motion.div>
			)}
		</AnimatePresence>
	);
}

const SUBMENU_COMPONENTS = {
	"3col": ThreeColumnSubmenu,
};
