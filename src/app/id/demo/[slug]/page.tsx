import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import ConceptDemo from "@/components/demos/concept-demo";
import CommunityDemo, { type CommunityDemoSlug } from "@/components/demos/community-demos";
import OperationsDemo, { type OperationsDemoSlug } from "@/components/demos/operations-demos";

const productDemoSlugs = ["manageflow", "shopora", "dinenow"] as const;
const communityDemoSlugs = ["gather-church", "brightpath-school", "harborlight-hotel"] as const;
const operationsDemoSlugs = ["admin-dashboard", "cashier-app"] as const;
const demoSlugs = [...productDemoSlugs, ...communityDemoSlugs, ...operationsDemoSlugs];
type ProductDemoSlug = (typeof productDemoSlugs)[number];
type DemoSlug = (typeof demoSlugs)[number];
type DemoPageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return demoSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: DemoPageProps): Promise<Metadata> {
  const { slug } = await params;
  if (!demoSlugs.includes(slug as DemoSlug)) return { title: "Demo tidak ditemukan" };
  const name: Record<DemoSlug, string> = {
    manageflow: "ManageFlow",
    shopora: "Shopora",
    dinenow: "DineNow",
    "gather-church": "Gather Church",
    "brightpath-school": "Brightpath School",
    "harborlight-hotel": "Harborlight Hotel",
    "admin-dashboard": "Admin Dashboard",
    "cashier-app": "Cashier App",
  };
  return {
    title: `${name[slug as DemoSlug]} — Demo Konsep Interaktif`,
    description: `Jelajahi demo konsep interaktif ${name[slug as DemoSlug]} dari SORARA dengan data contoh.`,
    alternates: { canonical: `/id/demo/${slug}` },
    robots: { index: false, follow: true },
  };
}

export default function IndonesianDemoPage({ params }: DemoPageProps) {
  return (
    <Suspense fallback={<div className="demo-route-loading" role="status">Memuat demo interaktif...</div>}>
      <DemoContent params={params} />
    </Suspense>
  );
}

async function DemoContent({ params }: DemoPageProps) {
  const { slug } = await params;
  if (!demoSlugs.includes(slug as DemoSlug)) notFound();
  if ((operationsDemoSlugs as readonly string[]).includes(slug)) return <OperationsDemo slug={slug as OperationsDemoSlug} locale="id" />;
  if ((communityDemoSlugs as readonly string[]).includes(slug)) return <CommunityDemo slug={slug as CommunityDemoSlug} locale="id" />;
  return <ConceptDemo slug={slug as ProductDemoSlug} locale="id" />;
}
