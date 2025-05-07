import { useHeaderContext } from "../../../components/global/header/Header";
import React from "react";
import { motion } from "motion/react";

export default function HeaderBurgerButton() {
	const { showMobileNav, setShowMobileNav } = useHeaderContext();

	const iconProps = {
		initial: { opacity: 0 },
		animate: { opacity: 1 },
		transition: { duration: 0.6 },
	};

	return (
		<button type="button" aria-label="Toggle Mobile Navigation" className="w-7" onClick={() => setShowMobileNav(!showMobileNav)}>
			{showMobileNav ? (
				<motion.svg key="cross-icon" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 28 28" fill="none" {...iconProps}>
					<g clipPath="url(#clip0_1265_20648)">
						<path d="M21.875 6.125L6.125 21.875" stroke="currentColor" strokeWidth="1.4" strokeLinecap="square" strokeLinejoin="round" />
						<path d="M21.875 21.875L6.125 6.125" stroke="currentColor" strokeWidth="1.4" strokeLinecap="square" strokeLinejoin="round" />
					</g>
					<defs>
						<clipPath id="clip0_1265_20648">
							<rect width="28" height="28" fill="currentColor" />
						</clipPath>
					</defs>
				</motion.svg>
			) : (
				<motion.svg key="burger-icon" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 28 28" fill="none" {...iconProps}>
					<g clipPath="url(#clip0_1201_26894)">
						<path d="M4.375 14H23.625" stroke="currentColor" strokeWidth="1.4" strokeLinecap="square" strokeLinejoin="round" />
						<path d="M4.375 7H23.625" stroke="currentColor" strokeWidth="1.4" strokeLinecap="square" strokeLinejoin="round" />
						<path d="M4.375 21H23.625" stroke="currentColor" strokeWidth="1.4" strokeLinecap="square" strokeLinejoin="round" />
					</g>
					<defs>
						<clipPath id="clip0_1201_26894">
							<rect width="28" height="28" fill="currentColor" />
						</clipPath>
					</defs>
				</motion.svg>
			)}
		</button>
	);
}
