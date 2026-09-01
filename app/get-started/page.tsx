import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { BriefFormContent } from "@/components/brief/BriefFormContent";

export const metadata: Metadata = {
  title: "Start your brief — ARQQA",
  description:
    "Four short steps, about two minutes. Tell us who you are, what the business does, and what isn't working — a person here comes back to you.",
};

export default function GetStartedPage() {
  return (
    <PageShell>
      <BriefFormContent />
    </PageShell>
  );
}
