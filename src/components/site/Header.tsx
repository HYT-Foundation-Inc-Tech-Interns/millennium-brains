import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import millenniumLogo from "@/assets/Logo Millennium Paltinum PNG.png";

const nav = [
  { label: "Solutions", href: "#solutions" },
  { label: "Product", href: "#product" },
  { label: "Use Cases", href: "#use-cases" },
  { label: "Events", href: "#events" },
  { label: "Contact Us", href: "#footer-contact" },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  // Retry scrolling until the target section has mounted (it may not exist yet
  // right after navigating back to the homepage).
  const scrollToTarget = (id: string, attempt = 0) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    } else if (attempt < 10) {
      requestAnimationFrame(() => scrollToTarget(id, attempt + 1));
    }
  };

  // Nav links point to sections (#solutions, etc.) that only exist on the
  // homepage. When the user is on another route (e.g. /lease) we navigate home
  // first, then scroll to the target once it has rendered.
  const handleNavClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    const id = href.replace("#", "");
    if (typeof window !== "undefined" && window.location.pathname !== "/") {
      navigate({ to: "/" }).then(() => {
        requestAnimationFrame(() => scrollToTarget(id));
      });
    } else {
      requestAnimationFrame(() => scrollToTarget(id));
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-background/70 border-b border-border">
      <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="h-9 w-44 overflow-hidden">
            <img
              src={millenniumLogo}
              alt="Millennium"
              className="h-full w-full object-cover object-center"
            />
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {nav.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            to="/lease"
            className="hidden sm:inline text-sm text-muted-foreground hover:text-foreground"
          >
            Lease Now
          </Link>
          <a
            href="https://connectme-e783f.web.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-sm py-2 px-4"
          >
            Book Demo
          </a>
          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            className="inline-flex items-center justify-center rounded-full border border-border bg-white/5 p-2 text-muted-foreground transition-colors hover:bg-white/10 md:hidden"
            aria-expanded={isOpen}
            aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {isOpen ? (
        <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-xl">
          <div className="mx-auto max-w-7xl px-6 py-4 flex flex-col gap-3">
            {nav.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {item.label}
              </a>
            ))}
            <Link
              to="/lease"
              onClick={() => setIsOpen(false)}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Lease Now
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}
