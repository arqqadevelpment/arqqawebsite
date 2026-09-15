import { redirect } from "next/navigation";
import { FORM_KEYS } from "./form-labels";

export default function FormsIndexPage() {
  redirect(`/dashboard/forms/${FORM_KEYS[0]}/submissions`);
}
