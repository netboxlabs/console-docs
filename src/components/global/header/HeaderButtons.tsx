import React from 'react';
import { Button } from "../../elements/buttons/Button";

// Explicitly import the type for the button prop if available, or define locally
// Assuming ButtonProps is not exported from Button.tsx, let's define a local version:
type ButtonComponentButtonProp = {
	background_color?: "black" | "white" | "grey-13" | "grey-11" | "white/5" | "grey-1" | "grey-2";
	type?: "solid" | "outline";
	size?: "small" | "medium";
};

type HeaderButtonsProps = {
	ctas: any;
	theme?: string;
	handleCloseSubmenu?: () => void;
};

export default function HeaderButtons({ ctas, theme = "black", handleCloseSubmenu = () => {} }: HeaderButtonsProps) {
	const { primary_cta, secondary_cta } = ctas || {};

	if (!primary_cta?.url && !secondary_cta?.url) return null;

	const primaryButtonProps: ButtonComponentButtonProp = {
		size: "small",
		background_color: theme === "black" ? "white" : "black",
	};

	const secondaryButtonProps: ButtonComponentButtonProp = {
		size: "small",
		background_color: theme === "black" ? "grey-13" : "grey-2",
	};

	return (
		<div className="flex items-center gap-x-2.5 lg:gap-x-3 xl:gap-x-4" onMouseEnter={handleCloseSubmenu}>
			{secondary_cta?.url && (
				<Button
					link={secondary_cta}
					button={secondaryButtonProps}
					className="hidden sm:block"
				/>
			)}
			{primary_cta?.url && (
				<Button 
					link={primary_cta} 
					button={primaryButtonProps} 
				/>
			)}
		</div>
	);
}
