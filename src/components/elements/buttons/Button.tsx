import clsx from "clsx";
import { motion, AnimatePresence } from "motion/react";
import React, { useState, useMemo } from "react";

type ButtonProps = {
	link?: {
		title: string;
		url?: string;
	};
	button?: {
		background_color?: "black" | "white" | "grey-13" | "grey-11" | "white/5" | "grey-1" | "grey-2";
		type?: "solid" | "outline";
		size?: "small" | "medium";
	};
	className?: string;
	children?: React.ReactNode;
};

const VARIANT_TYPES = ["linkTextVariants", "linkTextDuplicateVariants"];

export function Button({ link, button, className = "", children, ...other }: ButtonProps) {
	const [isHovered, setIsHovered] = useState(false);

	const buttonClasses = useMemo(() => {
		const backgroundColor = button?.background_color || "black";
		const buttonType = button?.type || "solid";
		const buttonSize = button?.size || "medium";

		return clsx(
			"relative overflow-hidden inline-block select-none appearance-none rounded text-center font-medium !leading-none transition-colors duration-200",
			className,
			backgroundColor === "black" && "bg-black text-white",
			backgroundColor === "white" && "bg-white text-black",
			backgroundColor === "grey-13" && "bg-grey-13 text-white",
			backgroundColor === "grey-11" && "bg-grey-11 text-white",
			backgroundColor === "white/5" && "bg-white/5 text-white hover:bg-white/10",
			backgroundColor === "grey-1" && "bg-grey-1 text-grey-16",
			backgroundColor === "grey-2" && "bg-grey-2 text-grey-16",
			buttonSize === "small" && "text-13 px-3 py-2 sm:py-[0.5625rem]",
			buttonSize === "medium" && "text-15 px-3.5 sm:px-[1.125rem] py-2.5 sm:py-3"
		);
	}, [button?.background_color, button?.type, button?.size, className]);

	const { linkTextVariants, linkTextDuplicateVariants } = useMemo(() => {
		const transition = {
			duration: 0.3,
			ease: [0.33, 1, 0.68, 1],
		};

		return {
			linkTextVariants: {
				initial: {
					y: 0,
					opacity: 1,
					transition,
				},
				hover: {
					y: "calc(-100% - 6px)",
					opacity: 0,
					transition,
				},
			},
			linkTextDuplicateVariants: {
				initial: {
					y: "calc(100% + 6px)",
					opacity: 0,
					transition,
				},
				hover: {
					y: 0,
					opacity: 1,
					transition,
				},
			},
		};
	}, []);

	if (!link?.title) return null;

	const buttonSize = button?.size || "medium";

	return (
		<motion.div
			initial="initial"
			animate={isHovered ? "hover" : "initial"}
			className={buttonClasses}
			{...other}
			onHoverStart={() => setIsHovered(true)}
			onHoverEnd={() => setIsHovered(false)}
		>
			<div className="relative grid">
				{VARIANT_TYPES.map((variantType, i) => {
					const ariaHidden = i === 1 ? "true" : "false";
					const role = i === 1 ? "presentation" : "none";

					return (
						<div key={i} className="col-start-1 row-start-1 flex items-center justify-center" aria-hidden={ariaHidden} role={role}>
							<motion.span variants={variantType === "linkTextVariants" ? linkTextVariants : linkTextDuplicateVariants}>{link?.title}</motion.span>
						</div>
					);
				})}

				<AnimatePresence>
					{isHovered && buttonSize !== "small" && (
						<motion.div
							className="absolute inset-x-0 top-full h-full w-full rounded-[100%] bg-teal blur-xl"
							initial={{ opacity: 0, scale: 0.2 }}
							animate={{ opacity: 1, scale: 1 }}
							exit={{ opacity: 0, scale: 0.2, transition: { duration: 0.2 } }}
							transition={{ ease: [0.33, 1, 0.68, 1], duration: 0.5 }}
						/>
					)}
				</AnimatePresence>
			</div>
		</motion.div>
	);
}

type TextLinkProps = {
	link?: {
		title: string;
		url: string;
	};
	className?: string;
	children?: React.ReactNode;
	underlineColour?: "black" | "white";
};

export function TextLink({ className = "", link, children, underlineColour = "black" }: TextLinkProps) {
	return (
		<div className={`text-16px group inline-flex cursor-pointer select-none items-center leading-tight ${className}`}>
			{(link?.title || children) && (
				<div className="group-hover:text-orange inline-block font-bold text-inherit">
					{link?.title && <span dangerouslySetInnerHTML={{ __html: link?.title }} />}
					{!link?.title && children && children}
					<div className={`group-hover:bg-orange mt-1 h-[2px] w-full rounded bg-black bg-${underlineColour} transition-colors duration-300 ease-in-out`} />
				</div>
			)}
		</div>
	);
}
