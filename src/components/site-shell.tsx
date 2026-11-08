"use client";

import { usePathname } from "next/navigation";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";

export default function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isConceptDemo = pathname.startsWith("/demo/") || pathname.startsWith("/id/demo/");

  if (isConceptDemo) return <>{children}</>;

  return (
    <>
      <SiteHeader />
      <main>{children}</main>
      <SiteFooter />
    </>
  );
}
