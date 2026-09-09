import { SeoTabs } from "./SeoTabs";

export default function SeoLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <h1 style={{ fontSize: 20, marginBottom: 4 }}>SEO</h1>
      <p style={{ color: "#a3a3a3", fontSize: 13, marginBottom: 20 }}>
        Edit redirects, schema/social defaults, robots &amp; sitemap, and marketing tracking.
      </p>
      <SeoTabs />
      {children}
    </div>
  );
}
