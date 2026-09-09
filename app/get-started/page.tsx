import type { Metadata } from "next";
import { getPageSeo } from "@/lib/content/seo";
import { PageShell } from "@/components/layout/PageShell";
import { BriefFormContent } from "@/components/brief/BriefFormContent";

export async function generateMetadata(): Promise<Metadata> {
  return getPageSeo("/get-started", {
    title: "Start your brief | ARQQA",
    description: "Four short steps, about two minutes. Tell us who you are, what the business does, and what isn't working, and a person here comes back to you.",
  });
}

export default function GetStartedPage() {
  return (
    <PageShell>
      <BriefFormContent />
    </PageShell>
  );
}
