import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";

export const metadata: Metadata = {
  title: "Autonomous — ARQQA",
};

/* Placeholder — design pending. Kept as a bare PageShell so the nav link
   resolves to a real (if empty) page rather than a 404 while the content
   for this section is decided. */
export default function AutonomousPage() {
  return (
    <PageShell>
      <section
        className="relative w-full flex items-center justify-center"
        style={{ padding: "11rem 1.5rem 8rem", minHeight: "40vh" }}
      >
        <p
          className="font-light text-center"
          style={{ fontSize: "0.9375rem", color: "rgba(255,255,255,0.4)" }}
        >
          Coming soon.
        </p>
      </section>
    </PageShell>
  );
}
