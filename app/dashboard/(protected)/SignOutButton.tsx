"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export function SignOutButton() {
  const router = useRouter();

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  return (
    <button
      onClick={handleSignOut}
      style={{
        padding: "6px 12px",
        borderRadius: 6,
        border: "1px solid #262626",
        background: "transparent",
        color: "#fff",
        fontSize: 13,
        cursor: "pointer",
      }}
    >
      Sign out
    </button>
  );
}
