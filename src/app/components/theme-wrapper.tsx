"use client";

import { ThemeProvider } from "next-themes";

export function ThemeWrapper({ children }) {
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
