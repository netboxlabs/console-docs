import { useHeaderContext } from "../../../components/global/header/Header";
import { Button } from "../../../components/elements/buttons/Button";
import React from "react";

type HeaderButtonsProps = {
	ctas: any;
};

export default function HeaderButtons({ ctas = { secondary_cta: {}, primary_cta: {} } }: HeaderButtonsProps) {
	const { secondary_cta, primary_cta } = ctas;
	const { theme, handleCloseSubmenu } = useHeaderContext();

	return (
		<div className="flex items-center gap-x-2.5">
			{secondary_cta?.url && (
				<a href={secondary_cta.url} className="flex items-center leading-none" onMouseEnter={handleCloseSubmenu}>
					<Button
						link={{
							title: secondary_cta.title,
							url: secondary_cta.url,
						}}
						button={{
							size: "small",
							background_color: theme === "black" ? "black" : "grey-1",
						}}
					/>
				</a>
			)}

			{primary_cta?.url && (
				<a href={primary_cta.url} className="flex items-center leading-none" onMouseEnter={handleCloseSubmenu}>
					<Button
						link={{
							title: primary_cta.title,
							url: primary_cta.url,
						}}
						button={{
							size: "small",
							background_color: theme === "black" ? "white" : "black",
						}}
					/>
				</a>
			)}
		</div>
	);
}
