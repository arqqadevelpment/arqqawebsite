import { notFound } from "next/navigation";
import { FORM_KEYS, FORM_LABELS } from "../form-labels";
import { FormSubTabs } from "./FormSubTabs";

export default async function FormKeyLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ formKey: string }>;
}) {
  const { formKey } = await params;
  if (!FORM_KEYS.includes(formKey)) notFound();

  return (
    <div>
      <h2 style={{ fontSize: 16, marginBottom: 14, color: "#d4d4d4" }}>{FORM_LABELS[formKey]}</h2>
      <FormSubTabs formKey={formKey} />
      {children}
    </div>
  );
}
