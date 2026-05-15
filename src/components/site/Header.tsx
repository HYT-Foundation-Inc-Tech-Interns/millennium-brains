import { Link } from "@tanstack/react-router";

const nav = [
  { label: "Solutions", href: "#solutions" },
  { label: "Products", href: "#products" },
  { label: "Showcase", href: "#showcase" },
  { label: "Installations", href: "#installations" },
  { label: "Events", href: "#events" },
];

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-background/70 border-b border-border">
      <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg bg-gradient-brand grid place-items-center text-primary-foreground font-bold shadow-glow">
            M
          </div>
          <span className="font-semibold text-lg tracking-tight">Millennium</span>
        </Link>
        <nav className="hidden md:flex items-center gap-8">
          {nav.map((n) => (
            <a
              key={n.label}
              href={n.href}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {n.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <a href="#contact" className="hidden sm:inline text-sm text-muted-foreground hover:text-foreground">
            Contact
          </a>
          <a href="#contact" className="btn-primary text-sm py-2 px-4">
            Book Demo
          </a>
        </div>
      </div>
    </header>
  );
}
