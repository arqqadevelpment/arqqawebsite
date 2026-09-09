"use client";

import { useState, useTransition } from "react";
import { saveSeoMeta } from "./actions";

type SeoMetaRow = {
  seo_title: string | null;
  meta_description: string | null;
  canonical_url: string | null;
  og_title: string | null;
  og_description: string | null;
  og_image: string | null;
  twitter_card: string;
  robots_directive: string;
  article_author: string | null;
  article_published_at: string | null;
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "8px 10px",
  borderRadius: 7,
  border: "1px solid #262626",
  background: "#0a0a0a",
  color: "#fff",
  fontSize: 13,
  outline: "none",
};

const labelStyle: React.CSSProperties = {
  color: "#a3a3a3",
  fontSize: 12,
  marginBottom: 5,
  display: "block",
};

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label style={{ display: "block" }}>
      <span style={labelStyle}>{label}</span>
      {children}
    </label>
  );
}

export function SeoForm({
  pagePath,
  isArticle,
  initial,
}: {
  pagePath: string;
  isArticle: boolean;
  initial: SeoMetaRow | null;
}) {
  const [isPending, startTransition] = useTransition();
  const [status, setStatus] = useState<"idle" | "saved" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(formData: FormData) {
    setStatus("idle");
    const result = await saveSeoMeta(pagePath, formData);
    if (result.ok) {
      setStatus("saved");
    } else {
      setStatus("error");
      setErrorMsg(result.error);
    }
  }

  return (
    <form
      action={(fd) => startTransition(() => handleSubmit(fd))}
      style={{ display: "flex", flexDirection: "column", gap: 14 }}
    >
      <Field label="SEO Title">
        <input name="seo_title" defaultValue={initial?.seo_title ?? ""} style={inputStyle} placeholder="Falls back to the site default" />
      </Field>

      <Field label="Meta Description">
        <textarea
          name="meta_description"
          defaultValue={initial?.meta_description ?? ""}
          rows={3}
          style={{ ...inputStyle, resize: "vertical", fontFamily: "inherit" }}
          placeholder="Falls back to the site default"
        />
      </Field>

      <Field label="Canonical URL override">
        <input
          name="canonical_url"
          defaultValue={initial?.canonical_url ?? ""}
          style={inputStyle}
          placeholder={`Defaults to the self-referencing canonical for ${pagePath}`}
        />
      </Field>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        <Field label="Robots">
          <select
            name="robots_directive"
            defaultValue={initial?.robots_directive ?? "index,follow"}
            style={inputStyle}
          >
            <option value="index,follow">Index, Follow (default)</option>
            <option value="noindex,nofollow">Noindex, Nofollow</option>
          </select>
        </Field>

        <Field label="Twitter Card">
          <select
            name="twitter_card"
            defaultValue={initial?.twitter_card ?? "summary_large_image"}
            style={inputStyle}
          >
            <option value="summary_large_image">Summary Large Image</option>
            <option value="summary">Summary</option>
          </select>
        </Field>
      </div>

      <hr style={{ border: "none", borderTop: "1px solid #262626", margin: "4px 0" }} />

      <Field label="OG Title">
        <input name="og_title" defaultValue={initial?.og_title ?? ""} style={inputStyle} placeholder="Falls back to SEO Title" />
      </Field>

      <Field label="OG Description">
        <textarea
          name="og_description"
          defaultValue={initial?.og_description ?? ""}
          rows={2}
          style={{ ...inputStyle, resize: "vertical", fontFamily: "inherit" }}
          placeholder="Falls back to Meta Description"
        />
      </Field>

      <Field label="OG Image URL">
        <input name="og_image" defaultValue={initial?.og_image ?? ""} style={inputStyle} placeholder="/insights/some-image.webp" />
      </Field>

      {isArticle && (
        <>
          <hr style={{ border: "none", borderTop: "1px solid #262626", margin: "4px 0" }} />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            <Field label="Article Author">
              <input name="article_author" defaultValue={initial?.article_author ?? ""} style={inputStyle} />
            </Field>
            <Field label="Article Published Date">
              <input
                type="date"
                name="article_published_at"
                defaultValue={initial?.article_published_at?.slice(0, 10) ?? ""}
                style={inputStyle}
              />
            </Field>
          </div>
        </>
      )}

      <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 6 }}>
        <button
          type="submit"
          disabled={isPending}
          style={{
            padding: "9px 18px",
            borderRadius: 7,
            border: "none",
            background: isPending ? "#404040" : "#fff",
            color: isPending ? "#a3a3a3" : "#0a0a0a",
            fontWeight: 600,
            fontSize: 13,
            cursor: isPending ? "default" : "pointer",
          }}
        >
          {isPending ? "Saving…" : "Save"}
        </button>
        {status === "saved" && <span style={{ color: "#4ade80", fontSize: 13 }}>Saved</span>}
        {status === "error" && <span style={{ color: "#f87171", fontSize: 13 }}>{errorMsg}</span>}
      </div>
    </form>
  );
}
