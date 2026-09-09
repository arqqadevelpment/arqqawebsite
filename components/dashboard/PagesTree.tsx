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

  const content = (
    <>
      <span
        className="flex items-center justify-center shrink-0 text-[10px] text-neutral-500 transition-transform"
        style={{
          width: 16,
          transform: hasChildren && open ? "rotate(90deg)" : "rotate(0deg)",
          visibility: hasChildren ? "visible" : "hidden",
        }}
      >
        ▸
      </span>

      <span
        className="shrink-0 rounded-full"
        style={{ width: 6, height: 6, background: meta.color }}
      />

      <span
        className={
          node.id
            ? "flex-1 truncate text-[13.5px] text-neutral-100"
            : "flex-1 truncate text-[13.5px] font-semibold text-neutral-300"
        }
      >
        {node.title}
      </span>

      {hasChildren && (
        <span className="shrink-0 text-[11px] text-neutral-600">{countPages(node)}</span>
      )}

      <span className="hidden shrink-0 font-mono text-[11px] text-neutral-600 sm:inline">
        {node.path}
      </span>

      <span
        className="shrink-0 rounded-full border px-2 py-[1px] text-[10.5px]"
        style={{ borderColor: "#262626", color: meta.color }}
      >
        {meta.label}
      </span>
    </>
  );

  const rowClass =
    "group flex w-full items-center gap-2.5 rounded-md px-2 py-[7px] text-left transition-colors hover:bg-white/[0.06]";

  return (
    <div className="relative">
      {depth > 0 && (
        <span
          aria-hidden
          className="absolute top-0 bottom-0 border-l border-neutral-800"
          style={{ left: indent - 12 }}
        />
      )}

      {hasChildren ? (
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className={rowClass}
          style={{ paddingLeft: 8 + indent }}
        >
          {content}
        </button>
      ) : node.id ? (
        <Link href={`/dashboard/pages/${node.id}`} className={rowClass} style={{ paddingLeft: 8 + indent }}>
          {content}
        </Link>
      ) : (
        <div className={rowClass} style={{ paddingLeft: 8 + indent }}>
          {content}
        </div>
      )}

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
