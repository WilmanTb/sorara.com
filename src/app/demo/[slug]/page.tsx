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
  if (!demoSlugs.includes(slug as DemoSlug)) return { title: "Demo not found" };
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
    title: `${name[slug as DemoSlug]} — Interactive Concept Demo`,
    description: `Explore the interactive ${name[slug as DemoSlug]} concept demo by SORARA. This is a local preview using sample data.`,
    robots: { index: false, follow: true },
  };
}

export default function DemoPage({ params }: DemoPageProps) {
  return (
    <Suspense fallback={<div className="demo-route-loading" role="status">Loading interactive demo...</div>}>
      <DemoContent params={params} />
    </Suspense>
  );
}

async function DemoContent({ params }: DemoPageProps) {
  const { slug } = await params;
  if (!demoSlugs.includes(slug as DemoSlug)) notFound();
  if ((operationsDemoSlugs as readonly string[]).includes(slug)) return <OperationsDemo slug={slug as OperationsDemoSlug} locale="en" />;
  if ((communityDemoSlugs as readonly string[]).includes(slug)) return <CommunityDemo slug={slug as CommunityDemoSlug} locale="en" />;
  return <ConceptDemo slug={slug as ProductDemoSlug} locale="en" />;
}
