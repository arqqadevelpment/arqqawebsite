import { createClient } from "@/lib/supabase/server";

export type PageRow = {
  id: string;
  path: string;
  parent_path: string | null;
  title: string;
  page_type: string;
  custom_path?: string | null;
};

export type PageTreeNode = {
  path: string;
  customPath: string | null;
  title: string;
  page_type: string;
  /** Real page rows have an id; synthetic grouping folders (e.g. "/case-studies",
   *  which has children but no page.tsx of its own) don't. */
  id: string | null;
  children: PageTreeNode[];
};

/** "/case-studies" -> "Case Studies" */
function prettifySegment(path: string): string {
  const last = path.split("/").filter(Boolean).pop() ?? path;
  return last
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function buildPagesTree(rows: PageRow[]): PageTreeNode[] {
  const nodes = new Map<string, PageTreeNode>();

  for (const row of rows) {
    nodes.set(row.path, {
      path: row.path,
      customPath: row.custom_path ?? null,
      title: row.title,
      page_type: row.page_type,
      id: row.id,
      children: [],
    });
  }

  // A row can reference a parent_path that has no page of its own
  // (e.g. every /case-studies/[slug] row points at "/case-studies", which
  // isn't a real route). Synthesize a folder node for grouping.
  for (const row of rows) {
    if (row.parent_path && !nodes.has(row.parent_path)) {
      nodes.set(row.parent_path, {
        path: row.parent_path,
        customPath: null,
        title: prettifySegment(row.parent_path),
        page_type: "folder",
        id: null,
        children: [],
      });
    }
  }

  const roots: PageTreeNode[] = [];

  for (const node of nodes.values()) {
    const parentPath = rows.find((r) => r.path === node.path)?.parent_path ?? null;
    if (parentPath && nodes.has(parentPath)) {
      nodes.get(parentPath)!.children.push(node);
    } else if (!parentPath) {
      roots.push(node);
    }
  }

  const sortTree = (list: PageTreeNode[]) => {
    list.sort((a, b) => a.title.localeCompare(b.title));
    list.forEach((n) => sortTree(n.children));
  };
  sortTree(roots);

  return roots;
}

export async function getPagesTree(): Promise<PageTreeNode[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("pages")
    .select("id, path, custom_path, parent_path, title, page_type")
    .order("path");

  if (error) throw new Error(`Failed to load pages: ${error.message}`);

  return buildPagesTree(data ?? []);
}
