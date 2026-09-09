import { createClient } from "@/lib/supabase/server";

export type FieldConfig = { required: boolean };
export type FormFieldMap = Record<string, FieldConfig>;

/**
 * Server-side fetch of a form's field config (dashboard Forms > [form] >
 * Fields tab), keyed by field_key. Live form components use this to decide
 * whether to render a given field at all, and whether it's required — the
 * field's own JSX/styling is untouched either way.
 */
export async function getFormFields(formKey: string): Promise<FormFieldMap> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("form_fields")
    .select("field_key, required")
    .eq("form_key", formKey);

  const map: FormFieldMap = {};
  for (const row of data ?? []) {
    map[row.field_key] = { required: row.required };
  }
  return map;
}
