import { useHeaderContext } from "../../../components/global/header/Header";
import MobileSubmenu from "../../../components/global/header/MobileSubmenu";
import { motion } from "motion/react";
import { useLockBodyScroll } from "@uidotdev/usehooks";
import clsx from "clsx";
import React from "react";

type MobileNavProps = {
	navItems: any;
	ctas: any;
	className?: string;
	theme?: any;
};

export default function MobileNav({ navItems = [], ctas = {}, className = "", theme = "black" }: MobileNavProps) {
	const transitionSettings = {
		duration: 0.3,
		ease: "easeInOut",
	};

	const slide = {
		initial: {
			opacity: 0,
			transition: transitionSettings,
		},
		animate: {
			opacity: 1,
			transition: transitionSettings,
		},
		exit: {
			opacity: 0,
			transition: transitionSettings,
		},
	};

	useLockBodyScroll();

	return (
		<motion.div
			key="mobileNav"
			variants={slide}
			initial="initial"
			animate="animate"
			exit="exit"
			className={clsx(theme === "black" ? "bg-grey-16 text-white" : "bg-grey-1 text-grey-16", className)}
		>
			<div className="container">
				<nav>
					<ul>
						{navItems?.map((navItem, index) => (
							<motion.li
								key={`navLink-${index}`}
								initial={{ opacity: 0, x: 20 }}
								animate={{
									x: 0,
									opacity: 1,
								}}
								transition={{
									duration: 0.3,
									ease: "easeInOut",
									delay: index * 0.07,
								}}
								className={clsx("overflow-hidden border-b", theme === "black" ? "border-white/[0.08]" : "border-grey-2")}
							>
								<MobileNavLink navItem={navItem} />
							</motion.li>
						))}
					</ul>
				</nav>
			</div>

			<div className="container mt-24 border-t border-white/[0.08] pb-14 pt-6">
				<MobileButtons ctas={ctas} />
			</div>
		</motion.div>
	);
}

type MobileNavLinkProps = {
	navItem: any;
};

function MobileNavLink({ navItem }: MobileNavLinkProps) {
	const { has_submenu = false, link } = navItem;
	const { handleCloseMobileNav } = useHeaderContext();
	const classes = "w-full py-6 text-[1rem] leading-[1.5]";

	return has_submenu ? (
		<MobileSubmenu navItem={navItem} buttonClasses={classes} />
	) : (
		<a href={link?.url} target={link?.target} className={`block ${classes}`} onClick={handleCloseMobileNav}>
			{link?.title}
		</a>
	);
}

type MobileButtonsProps = {
	ctas: any;
};

function MobileButtons({ ctas = { secondary_cta: {}, primary_cta: {} } }: MobileButtonsProps) {
	const { secondary_cta, primary_cta } = ctas;

	return (
		<div className="grid grid-cols-2 gap-x-2.5">
			{secondary_cta?.url && <MobileButton link={secondary_cta} backgroundColor="grey-13" />}
			{primary_cta?.url && <MobileButton link={primary_cta} backgroundColor="white" />}
		</div>
	);
}

type MobileButtonProps = {
	link: any;
	backgroundColor: "grey-13" | "white";
};

function MobileButton({ link, backgroundColor = "grey-13" }: MobileButtonProps) {
	const { handleCloseMobileNav } = useHeaderContext();

	const colorMap = {
		"grey-13": "bg-grey-13 text-white",
		white: "bg-white text-grey-16",
	};

	return (
		<a href={link.url} className="block" onClick={handleCloseMobileNav}>
			<div
				className={`rounded px-3.5 py-[1.125rem] text-center text-[0.9375rem] font-medium leading-none transition-colors duration-200 ${colorMap[backgroundColor]}`}
			>
				{link.title}
			</div>
		</a>
	);
}
