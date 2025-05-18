"use client";

import { ThemeProvider } from "@/app/components/theme-provider";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const isExcluded =
    pathname === "/" || // login
    pathname.startsWith("/login") ||
    pathname.startsWith("/registration");

  useEffect(() => {
    const body = document.body;

    if (isExcluded) {
      body.classList.add("light");
    }
    
  }, [pathname, isExcluded]);

  if (isExcluded) {
    return <>{children}</>;
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      {children}
    </ThemeProvider>
  );
}
