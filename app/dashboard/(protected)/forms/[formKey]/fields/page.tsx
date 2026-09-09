import { createClient } from "@/lib/supabase/server";
import { FieldRow } from "./FieldRow";
import { AddFieldForm } from "./AddFieldForm";

export default async function FieldsPage({
  params,
}: {
  params: Promise<{ formKey: string }>;
}) {
  const { formKey } = await params;
  const supabase = await createClient();
  const { data: fields } = await supabase
    .from("form_fields")
    .select("id, field_key, label, field_type, required")
    .eq("form_key", formKey)
    .order("sort_order");

  return (
    <div>
      <p style={{ color: "#a3a3a3", fontSize: 13, marginBottom: 16 }}>
        The fields this form collects. Edit a label or type, mark a field required or optional, or remove it.
      </p>

      <div style={{ border: "1px solid #262626", borderRadius: 10, overflow: "hidden", marginBottom: 20 }}>
        {(fields ?? []).map((f) => (
          <FieldRow
            key={f.id}
            id={f.id}
            formKey={formKey}
            fieldKey={f.field_key}
            label={f.label}
            fieldType={f.field_type}
            required={f.required}
          />
        ))}
        {(fields ?? []).length === 0 && (
          <div style={{ padding: 20, textAlign: "center", color: "#737373", fontSize: 13 }}>No fields yet.</div>
        )}
      </div>

      <div style={{ border: "1px solid #262626", borderRadius: 10, background: "#111111" }}>
        <AddFieldForm formKey={formKey} />
      </div>
    </div>
  );
}
