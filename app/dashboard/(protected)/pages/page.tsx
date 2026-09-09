import { getPagesTree } from "@/lib/content/pages-tree";
import { PagesTree } from "@/components/dashboard/PagesTree";

export default async function PagesTreePage() {
  const tree = await getPagesTree();

  return (
    <div>
      <h1 style={{ fontSize: 20, marginBottom: 4 }}>Pages</h1>
      <p style={{ color: "#a3a3a3", fontSize: 13, marginBottom: 20 }}>
        Every page on the site, grouped by section. Click a page to open its SEO settings.
      </p>
      <div
        style={{
          border: "1px solid #262626",
          borderRadius: 10,
          padding: 8,
          background: "#111111",
        }}
      >
        <PagesTree nodes={tree} />
      </div>
    </div>
  );
}
