import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/app/components/theme-provider";
import { ThemeWrapper } from "./components/theme-wrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "ReVault",
  description: "A version-controlled document repository",
};

export default function RootLayout({ children }) {
  const getChildTheme = () => {
    // This is a simplified approach - in real implementation you might
    // need to use React context or other solutions to pass theme information
    // For demonstration, we'll assume the login page is at /login route

    if (typeof window !== "undefined") {
      if (window.location.pathname.includes("/login")) {
        return "dark";
      }
    }
    return null;
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeWrapper>{children}</ThemeWrapper>
      </body>
    </html>
  );
}
