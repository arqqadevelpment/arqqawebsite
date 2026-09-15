"use client";

import { useEffect } from "react";

/**
 * Injects an arbitrary raw HTML snippet into <head> or <body> at runtime.
 * Used for the dashboard's "Custom code" fields (verification tags, chat
 * widgets, etc). <script> nodes parsed via innerHTML are inert by spec, so
 * they're recreated here to actually execute.
 */
export function InjectHTML({ html, target }: { html: string | null; target: "head" | "body" }) {
  useEffect(() => {
    if (!html) return;

    const container = document.createElement("div");
    container.innerHTML = html;
    const targetEl = target === "head" ? document.head : document.body;
    const inserted: Node[] = [];

    Array.from(container.childNodes).forEach((node) => {
      if (node.nodeName === "SCRIPT") {
        const old = node as HTMLScriptElement;
        const script = document.createElement("script");
        Array.from(old.attributes).forEach((attr) => script.setAttribute(attr.name, attr.value));
        script.text = old.text;
        targetEl.appendChild(script);
        inserted.push(script);
      } else {
        targetEl.appendChild(node);
        inserted.push(node);
      }
    });

    return () => {
      inserted.forEach((node) => {
        if (targetEl.contains(node)) targetEl.removeChild(node);
      });
    };
  }, [html, target]);

  return null;
}
