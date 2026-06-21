import type { ReactNode } from "react";

// Section wrapper with a subtle starfield/gradient backdrop. Shared by the
// homepage sections and the lease page.
export function StarfieldSection({
  children,
  className = "",
  ...props
}: {
  children: ReactNode;
  className?: string;
  [key: string]: unknown;
}) {
  const stars = Array.from({ length: 24 }, (_, i) => ({
    top: `${(i * 7 + 5) % 90}%`,
    left: `${(i * 13 + 7) % 100}%`,
    opacity: [0.35, 0.55, 0.75, 0.25][i % 4],
    size: [2, 3, 1.5, 2.5][i % 4],
  }));

  return (
    <section className={`relative overflow-hidden ${className}`} {...props}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(148,163,184,0.08),transparent_25%),radial-gradient(circle_at_bottom,rgba(56,189,248,0.05),transparent_35%)]" />
        <div className="absolute inset-0 bg-black" />
        {stars.map((star, index) => (
          <span
            key={index}
            className="absolute rounded-full bg-white/80 shadow-[0_0_12px_rgba(148,163,184,0.35)]"
            style={{
              top: star.top,
              left: star.left,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: star.opacity,
            }}
          />
        ))}
      </div>
      {children}
    </section>
  );
}
