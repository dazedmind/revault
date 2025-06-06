"use client";

import { usePathname } from "next/navigation";
import { ThemeProvider } from "next-themes";

export function ThemeWrapper({ children }) {
  const pathname = usePathname();

  // List of paths that should always use dark mode
  const darkModePaths = ["/login", "/registration"];

  // Check if current path should be dark mode
  const isDarkModePage = darkModePaths.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`),
  );


  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={false}
    >
      {children}
    </ThemeProvider>
  );
}
