"use client";

import { useState } from "react";
import Link from "next/link";
import type { PageTreeNode } from "@/lib/content/pages-tree";

const TYPE_META: Record<string, { label: string; color: string }> = {
  static: { label: "Static", color: "#8b8b8b" },
  article: { label: "Article", color: "#60a5fa" },
  job: { label: "Job", color: "#f59e0b" },
  service: { label: "Service", color: "#34d399" },
  "service-approach": { label: "Approach", color: "#34d399" },
  "case-study": { label: "Case Study", color: "#a78bfa" },
  industry: { label: "Industry", color: "#f472b6" },
  branding: { label: "Branding", color: "#fb923c" },
  social: { label: "Social", color: "#22d3ee" },
  video: { label: "Video", color: "#e879f9" },
  folder: { label: "Folder", color: "#737373" },
};

function countPages(node: PageTreeNode): number {
  return (node.id ? 1 : 0) + node.children.reduce((sum, c) => sum + countPages(c), 0);
}

export function PagesTree({ nodes }: { nodes: PageTreeNode[] }) {
  return (
    <div className="flex flex-col">
      {nodes.map((node) => (
        <TreeNode key={node.path} node={node} depth={0} />
      ))}
    </div>
  );
}

function TreeNode({ node, depth }: { node: PageTreeNode; depth: number }) {
  const hasChildren = node.children.length > 0;
  const [open, setOpen] = useState(depth === 0);
  const meta = TYPE_META[node.page_type] ?? { label: node.page_type, color: "#737373" };

  const indent = depth * 20;

  const badges = (
    <>
      {hasChildren && (
        <span className="shrink-0 text-[11px] text-neutral-600">{countPages(node)}</span>
      )}
      <span className="hidden shrink-0 font-mono text-[11px] text-neutral-600 sm:inline">
        {node.customPath ? (
          <>
            <span style={{ textDecoration: "line-through", opacity: 0.5 }}>{node.path}</span>{" "}
            <span style={{ color: "#4ade80" }}>{node.customPath}</span>
          </>
        ) : (
          node.path
        )}
      </span>
      <span
        className="shrink-0 rounded-full border px-2 py-[1px] text-[10.5px]"
        style={{ borderColor: "#262626", color: meta.color }}
      >
        {meta.label}
      </span>
    </>
  );

  const dot = (
    <span className="shrink-0 rounded-full" style={{ width: 6, height: 6, background: meta.color }} />
  );

  return (
    <div className="relative">
      {depth > 0 && (
        <span
          aria-hidden
          className="absolute top-0 bottom-0 border-l border-neutral-800"
          style={{ left: indent - 12 }}
        />
      )}

      <div
        className="group flex w-full items-center gap-2.5 rounded-md py-[7px] pr-3 transition-colors hover:bg-white/[0.06]"
        style={{ paddingLeft: 8 + indent }}
      >
        {hasChildren ? (
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Collapse" : "Expand"}
            className="flex shrink-0 items-center justify-center text-[10px] text-neutral-500 transition-transform"
            style={{ width: 16, transform: open ? "rotate(90deg)" : "rotate(0deg)" }}
          >
            ▸
          </button>
        ) : (
          <span style={{ width: 16 }} className="shrink-0" />
        )}

        {node.id ? (
          <Link href={`/dashboard/pages/${node.id}`} className="flex flex-1 items-center gap-2.5 min-w-0">
            {dot}
            <span className="flex-1 truncate text-[13.5px] text-neutral-100">{node.title}</span>
            {badges}
          </Link>
        ) : (
          <button
            type="button"
            onClick={() => hasChildren && setOpen((v) => !v)}
            className="flex flex-1 items-center gap-2.5 min-w-0 text-left"
          >
            {dot}
            <span className="flex-1 truncate text-[13.5px] font-semibold text-neutral-300">{node.title}</span>
            {badges}
          </button>
        )}
      </div>

      {hasChildren && open && (
        <div>
          {node.children.map((child) => (
            <TreeNode key={child.path} node={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
}
