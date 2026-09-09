export async function submitForm(formKey: string, fields: Record<string, unknown>) {
  const res = await fetch(`/api/forms/${formKey}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(fields),
  });
  if (!res.ok) throw new Error("Failed to submit form");
  return res.json();
}
