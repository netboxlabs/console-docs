import { CaretDownIcon } from "../../../components/global/SiteIcons";
import ThreeColumnSubmenu from "../../../components/global/header/submenuLayouts/ThreeColumnSubmenu";
import { motion, AnimatePresence } from "motion/react";
import React, { useState } from "react";

type MobileSubmenuProps = {
	navItem: any;
	buttonClasses?: string;
};

export default function MobileSubmenu({ navItem, buttonClasses = "" }: MobileSubmenuProps) {
	const [isOpen, setIsOpen] = useState(false);

	const transition = { duration: 0.3, ease: [0.5, 0.16, 0.1, 1] };

	const contentInitial = {
		height: 0,
		opacity: 0,
	};

	const contentAnimate = {
		height: "auto",
		opacity: 1,
	};

	return (
		<div>
			<button type="button" aria-label="Toggle submenu" className={`flex items-center gap-x-3 text-left ${buttonClasses}`} onClick={() => setIsOpen(!isOpen)}>
				<div className="flex-1">{navItem?.link?.title}</div>
				<CaretDownIcon className={`w-4 text-grey-8 transition-transform duration-200 ${isOpen && "rotate-180"}`} />
			</button>

			<AnimatePresence>
				{isOpen && (
					<motion.div initial={contentInitial} animate={contentAnimate} exit={contentInitial} transition={transition}>
						<ThreeColumnSubmenu {...navItem?.submenu?.three_column_submenu} />
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}
