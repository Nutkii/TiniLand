import type { Metadata } from "next";
import { Fredoka, Quicksand } from "next/font/google";
import "./globals.css";
import { SiteProvider } from "@/components/providers/SiteProvider";
import { MagicCursor } from "@/components/effects/MagicCursor";
import { DiscoOverlay } from "@/components/effects/DiscoOverlay";

const fredoka = Fredoka({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
});

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "TiniLand — Happy Birthday",
  description: "A magical kingdom built for Tini's birthday.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var s=localStorage.getItem("tiniland-dark");var d=s!==null?s==="1":window.matchMedia("(prefers-color-scheme: dark)").matches;if(d)document.documentElement.classList.add("dark");}catch(e){}})();`,
          }}
        />
      </head>
      <body
        className={`${fredoka.variable} ${quicksand.variable} font-body cursor-none-desktop antialiased overflow-x-hidden`}
      >
        <SiteProvider>
          <MagicCursor />
          <DiscoOverlay />
          {children}
        </SiteProvider>
      </body>
    </html>
  );
}
