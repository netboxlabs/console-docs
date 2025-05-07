import { useWindowSize } from "@uidotdev/usehooks";

const useIsBelowBreakpoint = (breakpoint: number) => {
	const size = useWindowSize();
	return size.width ? size.width < breakpoint : false;
};

export default useIsBelowBreakpoint;
