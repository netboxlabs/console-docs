import { useState } from "react";
import { useMotionValueEvent, useScroll } from "motion/react";

const useIsScrolled = (threshold = 250, buffer = 40) => {
	const [isScrolled, setIsScrolled] = useState(false);
	const { scrollY } = useScroll();

	useMotionValueEvent(scrollY, "change", (latest) => {
		if (latest > threshold && !isScrolled) {
			setIsScrolled(true);
		} else if (latest < threshold - buffer && isScrolled) {
			setIsScrolled(false);
		}
	});

	return isScrolled;
};

export default useIsScrolled;
