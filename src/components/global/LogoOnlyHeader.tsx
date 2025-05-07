import Logo from "./Logo";
import React from "react";

function LogoOnlyHeader() {
	return (
		<header className="fixed inset-x-0 top-0 z-[101] flex h-[var(--header-height)] w-full text-white transition-shadow duration-300">
			<div className="container flex flex-1 items-center justify-start py-3 sm:py-4">
				<a href="/" aria-label="Back to Home" className="block w-28 transition-opacity duration-200 hover:opacity-70 sm:w-[8.125rem]">
					<Logo />
				</a>
			</div>
		</header>
	);
}

export default LogoOnlyHeader;
