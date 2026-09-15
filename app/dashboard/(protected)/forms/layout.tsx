import { FormsTabs } from "./FormsTabs";

export default function FormsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <h1 style={{ fontSize: 20, marginBottom: 4 }}>Forms</h1>
      <p style={{ color: "#a3a3a3", fontSize: 13, marginBottom: 20 }}>
        Every form on the site — its fields, where submissions go, and who gets notified.
      </p>
      <div style={{ marginBottom: 22 }}>
        <FormsTabs />
      </div>
      {children}
    </div>
  );
}
