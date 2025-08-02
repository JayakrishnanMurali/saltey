"use client";

import { useEffect, useState } from "react";

export function useResponsive() {
	const [isMobile, setIsMobile] = useState(false);
	const [isTablet, setIsTablet] = useState(false);

	useEffect(() => {
		function handleResize() {
			const width = window.innerWidth;
			setIsMobile(width < 640);
			setIsTablet(width >= 640 && width < 1024);
		}

		handleResize();
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return { isMobile, isTablet };
}
