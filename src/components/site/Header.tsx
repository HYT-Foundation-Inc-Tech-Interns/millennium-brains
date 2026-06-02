import { useState } from "react";
import { Link } from "@tanstack/react-router";
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

  const handleLeaseNowClick = (e: any) => {
    e?.preventDefault?.();
    const el = document.getElementById("leasing-inquiry-section");
    if (el) {
      // scroll with smooth behavior and let the page account for fixed header via CSS scroll-margin-top
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      try {
        history.replaceState(null, "", "#leasing-inquiry");
      } catch {}
      // dispatch an event after the scroll animation is expected to complete
      window.setTimeout(() => {
        window.dispatchEvent(new CustomEvent("openLeasingInquiry"));
      }, 500);
    } else {
      // fallback to contact anchor
      const contactEl = document.getElementById("contact");
      contactEl?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleBookDemoClick = (e: any) => {
    e?.preventDefault?.();
    const el = document.getElementById("leasing-inquiry-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      try {
        history.replaceState(null, "", "#book-demo");
      } catch {}
      window.setTimeout(() => {
        window.dispatchEvent(new CustomEvent("openBookDemo"));
      }, 400);
    } else {
      const contactEl = document.getElementById("contact");
      contactEl?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-background/70 border-b border-border">
      <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5">
          <img src={millenniumLogo} alt="Millennium" className="h-24 w-24" />
          {/* <span className="font-semibold text-lg tracking-tight">Millennium</span> */}
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {nav.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="#leasing-inquiry"
            onClick={handleLeaseNowClick}
            className="hidden sm:inline text-sm text-muted-foreground hover:text-foreground"
          >
            Lease Now
          </a>
          <a href="#book-demo" onClick={handleBookDemoClick} className="btn-primary text-sm py-2 px-4">
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
                onClick={() => setIsOpen(false)}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      ) : null}
    </header>
  );
}
