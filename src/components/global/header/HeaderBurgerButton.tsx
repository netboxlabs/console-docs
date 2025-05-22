import React from "react";
import { motion } from "motion/react";
import { useNavbarMobileSidebar } from '@docusaurus/theme-common/internal'; // Use Docusaurus hook

export default function HeaderBurgerButton() {
	const docusaurusMobileSidebar = useNavbarMobileSidebar(); // Docusaurus hook for its mobile sidebar state

	const iconProps = {
		initial: { opacity: 0 },
		animate: { opacity: 1 },
		transition: { duration: 0.6 },
	};

	const handleClick = () => {
		console.log("Burger clicked. Toggling Docusaurus mobile sidebar. Was shown:", docusaurusMobileSidebar.shown);
		docusaurusMobileSidebar.toggle(); // Simply toggle the Docusaurus mobile sidebar
	};

	// Icon should be in "X" (close) state if Docusaurus nav is open
	const isNavOpen = docusaurusMobileSidebar.shown;

	return (
		<motion.button
			aria-label="Navigation Menu"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.4, delay: 0.2 }}
			className="flex group flex-col relative z-[9999] items-center justify-center w-8 h-8"
			onClick={handleClick}
		>
			<motion.span
				{...iconProps}
				className={`absolute block w-full h-0.5 bg-white transform transition-all duration-300 ${isNavOpen ? "rotate-[135deg]" : "-translate-y-2"}`}
			/>
			<motion.span
				{...iconProps}
				className={`absolute block w-full h-0.5 bg-white transform transition-all duration-300 ${isNavOpen ? "opacity-0" : "opacity-100"}`}
			/>
			<motion.span
				{...iconProps}
				className={`absolute block w-full h-0.5 bg-white transform transition-all duration-300 ${isNavOpen ? "-rotate-[135deg]" : "translate-y-2"}`}
			/>
		</motion.button>
	);
}
