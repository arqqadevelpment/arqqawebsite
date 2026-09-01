import { Preloader } from "@/components/preloader/Preloader";

/**
 * Wraps every route so the preloader is present site-wide.
 *
 * A template rather than the root layout on purpose: Next.js remounts a
 * template on each navigation, which is exactly the lifecycle a per-navigation
 * preloader wants — a fresh cycle starting at 0% every time the route changes,
 * without the component having to diff pathnames to notice.
 *
 * It renders `children` underneath, so the incoming page is mounting and
 * loading behind the overlay rather than after it.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Preloader />
      {children}
    </>
  );
}
