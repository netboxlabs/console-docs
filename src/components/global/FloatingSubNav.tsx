import useIsBelowBreakpoint from "../../hooks/useIsBelowBreakpoint";
import useIsScrolled from "../../hooks/useIsScrolled";
import { useLocation } from '@docusaurus/router';
import clsx from "clsx";
import React, { useState, useEffect } from "react";

export type FloatingSubNavProps = {
	nav_items?: {
		link: any;
	}[];
	theme?: any;
};

export default function FloatingSubNav({ nav_items = [], theme = "black" }: FloatingSubNavProps) {
	const isScrolled = useIsScrolled(50, 40);
	const isMobile = useIsBelowBreakpoint(1024);
	const location = useLocation();
	const [activeSection, setActiveSection] = useState<string | null>(null);

	// Define constants for better semantics
	const VIEWPORT_TRIGGER_THRESHOLD = 0.3; // The top 30% of the viewport

	// Function to check if an element is in viewport with better comments
	const isInViewport = (element: HTMLElement | null) => {
		if (!element) return false;

		const rect = element.getBoundingClientRect();
		const windowHeight = window.innerHeight || document.documentElement.clientHeight;

		return (
			rect.top <= windowHeight * VIEWPORT_TRIGGER_THRESHOLD && // Element is in the top portion of viewport
			rect.bottom >= 0 // Element hasn't scrolled past the top
		);
	};

	// useEffect with proper dependency management
	useEffect(() => {
		// Create the section lookup only once when nav_items changes
		const sections = nav_items
			.map((item) => {
				if (!item.link?.url) return null;
				const hash = item.link.url.split("#")[1];
				return hash ? { hash } : null;
			})
			.filter(Boolean) as { hash: string }[];

		// Function to update active section based on scroll position
		const updateActiveSection = () => {
			// Find the first section that is in viewport
			const visibleSection = sections.find(({ hash }) => isInViewport(document.getElementById(hash)));

			if (visibleSection) {
				setActiveSection(visibleSection.hash);
			} else {
				// Reset active section if no visible sections
				setActiveSection(null);
			}
		};

		// Initial check
		updateActiveSection();

		// Add scroll event listener
		window.addEventListener("scroll", updateActiveSection);

		// Clean up
		return () => {
			window.removeEventListener("scroll", updateActiveSection);
		};
	}, [nav_items, setActiveSection]); // Include all dependencies

	if (nav_items.length === 0 || isMobile) return null;

	const themeMap = {
		black: {
			backgroundColor: "bg-grey-14",
			textColor: "text-white",
			spacerColor: "bg-white/[0.06]",
			shadow: isScrolled && "shadow-[0px_4px_32px_0px_rgba(0,242,212,0.60)]",
		},
		white: {
			backgroundColor: "bg-grey-1 border border-grey-2",
			textColor: "text-grey-16",
			spacerColor: "bg-grey-2",
			shadow: isScrolled ? "shadow-[0px_4px_32px_0px_rgba(0,242,212,0.60)]" : "shadow-[0px_4px_25px_0px_rgba(0,0,0,0.05)]",
		},
	};
	return (
		<div className={clsx("fixed inset-x-0 top-[var(--header-height)] z-[99] flex justify-center pt-[1.125rem]", themeMap[theme].textColor)}>
			<div className="container">
				<div
					className={clsx(
						"flex items-center gap-x-[1.125rem] rounded-[0.1875rem] px-3.5 py-2.5 transition-shadow duration-200",
						themeMap[theme].shadow,
						themeMap[theme].backgroundColor
					)}
				>
					{nav_items.map(({ link }, index) => {
						// Extract the hash from the URL (e.g., #how-it-works)
						const hash = link?.url?.split("#")[1];
						const isActive = hash === activeSection;

						return (
							<React.Fragment key={`floatingSubNavLink-${index}`}>
								{router.asPath === link?.url ? (
									<div className="text-13 !leading-none opacity-100">{link?.title}</div>
								) : (
									<a
										href={link?.url}
										className={clsx("text-13 !leading-none transition-opacity duration-300 hover:opacity-100", isActive ? "opacity-100" : "opacity-40")}
									>
										{link?.title}
									</a>
								)}

								{index < nav_items.length - 1 && <div className={clsx("h-3.5 w-px", themeMap[theme].spacerColor)} />}
							</React.Fragment>
						);
					})}
				</div>
			</div>
		</div>
	);
}
