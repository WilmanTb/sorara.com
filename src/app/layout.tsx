import type { Metadata } from "next";
import { IBM_Plex_Mono, Inter, Space_Grotesk, Geist } from "next/font/google";
import SiteShell from "@/components/site-shell";
import "./globals.css";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/site-config";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL(`${siteConfig.url.replace(/\/$/, "")}/`),
  title: {
    default: "SORARA — Make your next idea real",
    template: "%s — SORARA",
  },
  description:
    "SORARA is an independent digital solutions studio turning ideas into thoughtful websites, applications, and business systems.",
  openGraph: {
    title: "SORARA — Make your next idea real",
    description: "We turn ideas into digital experiences.",
    siteName: "SORARA",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={cn(spaceGrotesk.variable, inter.variable, ibmPlexMono.variable, "font-sans", geist.variable)}>
      <body>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
