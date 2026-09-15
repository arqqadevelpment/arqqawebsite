"use client";

import { usePathname } from "next/navigation";

/* Floating WhatsApp click-to-chat — persistent across every public page,
   like the old site's widget. wa.me rather than tel: so it opens the
   WhatsApp app directly instead of a dialer. */
const WHATSAPP_HREF = "https://wa.me/201110115557";

export function WhatsAppButton() {
  const pathname = usePathname();
  if (pathname === "/login" || pathname.startsWith("/dashboard")) return null;

  return (
    <a
      href={WHATSAPP_HREF}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      // Smaller + tucked further into the corner on mobile — full size (56px,
      // 20px inset) overlapped form submit buttons and article body text at
      // typical mobile scroll rest points; 44px/12px still clears the
      // iOS/Android 44px minimum tap target while leaving more of whatever
      // is underneath it reachable.
      className="fixed z-[60] flex items-center justify-center rounded-full left-3 bottom-3 w-11 h-11 sm:left-5 sm:bottom-5 sm:w-14 sm:h-14"
      style={{
        background: "#25D366",
        boxShadow: "0 6px 20px rgba(0,0,0,0.35)",
      }}
    >
      <svg className="w-6 h-6 sm:w-7 sm:h-7" viewBox="0 0 448 512" fill="#fff" aria-hidden="true">
        <path d="M380.9 97.1C339 55.1 283.2 32 224.1 32c-122.4 0-224 100.7-224 224.2 0 39.5 10.3 78.1 29.9 112L1 480l114.2-30c32.6 17.8 69.4 27.2 106.9 27.2h.1c122.4 0 224-100.7 224-224.2 0-59.9-24.1-116.2-66.3-155.9zM224.1 438.7h-.1c-33.2 0-65.8-8.9-94.1-25.8l-6.7-4-70.1 18.4 18.7-68.2-4.4-7c-18.6-29.6-28.4-63.8-28.4-99.1 0-102.6 83.6-186.1 186.4-186.1 49.8 0 96.6 19.4 131.7 54.7 35.1 35.3 56 82.1 55.9 131.9-.1 102.7-84.4 186.2-187.1 186.2zm107.5-140.6c-5.9-3-34.8-17.2-40.2-19.1-5.4-2-9.4-3-13.3 3-4 6-15.3 19.1-18.7 23.1-3.5 4-6.9 4.5-12.8 1.5-34.9-17.5-57.8-31.3-80.8-70.9-6.1-10.5 6.1-9.7 17.5-32.4 1.9-4 1-7.4-.4-10.5-1.5-3-13.3-32-18.2-43.9-4.9-11.7-9.9-10.1-13.6-10.3-3.5-.2-7.5-.2-11.5-.2-4 0-10.5 1.5-16.1 7.5-5.6 6-21.4 20.9-21.4 51s21.9 59.2 24.9 63.2c3 4 41.9 64.1 103.4 87.3 51.4 19.5 61.7 15.6 72.9 14.6 11.2-1 34.7-14.1 39.6-27.7 4.9-13.6 4.9-25.3 3.5-27.7-1.4-2.5-5.3-4-11.2-6.9z" />
      </svg>
    </a>
  );
}
