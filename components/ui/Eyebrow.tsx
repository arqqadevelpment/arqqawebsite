/**
 * Section tag — the small label that sits above a section headline.
 *
 * Styled as a compact pill: white text on the site's dark field, wrapped in a
 * gradient stroke. The stroke is a 1px gradient-filled outer layer with an
 * opaque inner layer on top, the same technique the primary CTAs use — CSS
 * border-image can't follow a border-radius, so a real gradient outline has
 * to be built this way.
 */
export function Eyebrow({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex ${className}`}
      style={{
        padding: "1px",
        borderRadius: "0.8rem",
        background:
          "linear-gradient(120deg, #ff7a3d 0%, #b6541f 22%, rgba(255,255,255,0.18) 50%, #2f6bff 82%, #5aa2ff 100%)",
        boxShadow:
          "0 -6px 20px -8px rgba(255,122,61,0.3), 0 6px 20px -8px rgba(47,107,255,0.28)",
      }}
    >
      <span
        className="inline-flex items-center font-semibold"
        style={{
          padding: "0.42rem 0.95rem",
          borderRadius: "0.75rem",
          background: "linear-gradient(180deg, #0b0c12 0%, #05060a 100%)",
          color: "#ffffff",
          fontSize: "0.6875rem",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          whiteSpace: "nowrap",
        }}
      >
        {children}
      </span>
    </span>
  );
}
