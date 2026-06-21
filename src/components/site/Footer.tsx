import { useState, type FormEvent } from "react";
import { Shield, Award, Mail, Phone, MapPin, Share2, AtSign, Hash, Play } from "lucide-react";
import footerLogo from "@/assets/Logo Millennium Paltinum PNG.png";
import { submitInquiry } from "@/lib/submit-inquiry";
import { Turnstile, TURNSTILE_ENABLED } from "@/components/site/Turnstile";

const certifications = [
  { icon: Shield, label: "ISO 9001:2015" },
  { icon: Award, label: "Enterprise Grade" },
  { icon: Shield, label: "SOC 2 Compliant" },
  { icon: Award, label: "Energy Star Certified" },
];

export function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterState, setNewsletterState] = useState<"idle" | "submitting" | "done" | "error">(
    "idle",
  );
  const [newsletterError, setNewsletterError] = useState<string | null>(null);
  const [newsletterToken, setNewsletterToken] = useState<string | null>(null);

  const handleNewsletterSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const email = newsletterEmail.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setNewsletterState("error");
      setNewsletterError("Please enter a valid email address.");
      return;
    }
    if (TURNSTILE_ENABLED && !newsletterToken) {
      setNewsletterState("error");
      setNewsletterError("Please complete the verification.");
      return;
    }
    setNewsletterError(null);
    setNewsletterState("submitting");
    try {
      await submitInquiry({
        type: "newsletter",
        email,
        turnstileToken: newsletterToken ?? undefined,
      });
      setNewsletterState("done");
      setNewsletterEmail("");
    } catch (err) {
      setNewsletterState("error");
      setNewsletterError(
        err instanceof Error ? err.message : "Something went wrong. Please try again.",
      );
    }
  };

  return (
    <footer className="border-t border-border bg-background relative">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid md:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-gradient-brand grid place-items-center text-primary-foreground font-bold shadow-glow">
                M
              </div>
              <span className="font-semibold text-lg">Millennium</span>
            </div>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              Transforming collaboration through enterprise-grade smart technology solutions for
              education, corporate, and institutional excellence.
            </p>
            <div className="mt-5 flex gap-3">
              {[Share2, AtSign, Hash, Play].map((I, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-lg bg-secondary grid place-items-center text-muted-foreground hover:text-foreground transition-colors"
                >
                  <I className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <FooterCol
            title="Solutions"
            links={[
              "Smart Classrooms",
              "Enterprise Collaboration",
              "Digital Signage",
              "Smart Office Systems",
              "Automation Technologies",
              "Custom Solutions",
            ]}
          />
          <FooterCol
            title="Company"
            links={["About Us", "Case Studies", "Events", "Careers", "Partners", "Contact"]}
          />

          <div id="footer-contact">
            <div className="font-semibold mb-5">Contact</div>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-primary" /> hello@brainstech.ph
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-primary" /> (+63) 916 339 6258
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-primary mt-0.5" /> Suite 1004 Atlanta Center,
                Annapolis St., San Juan City, Metro Manila, Philippines
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-border grid md:grid-cols-2 gap-6 items-center">
          <div>
            <div className="font-semibold">Stay Updated</div>
            <p className="text-sm text-muted-foreground mt-1">
              Subscribe to our newsletter for the latest product updates and industry insights
            </p>
          </div>
          <div>
            {newsletterState === "done" ? (
              <div className="text-sm text-foreground">
                Thanks for subscribing — we'll keep you posted.
              </div>
            ) : (
              <form className="flex flex-col gap-3" onSubmit={handleNewsletterSubmit}>
                <div className="flex gap-3">
                  <input
                    type="email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="flex-1 bg-input border border-border rounded-lg px-4 py-3 text-sm"
                  />
                  <button
                    type="submit"
                    disabled={newsletterState === "submitting"}
                    className={`btn-primary ${newsletterState === "submitting" ? "opacity-60 cursor-not-allowed" : ""}`}
                  >
                    {newsletterState === "submitting" ? "..." : "Subscribe"}
                  </button>
                </div>
                {TURNSTILE_ENABLED ? (
                  <Turnstile
                    appearance="interaction-only"
                    onVerify={setNewsletterToken}
                    onExpire={() => setNewsletterToken(null)}
                  />
                ) : null}
              </form>
            )}
            {newsletterError ? (
              <div className="text-xs text-red-400 mt-2">{newsletterError}</div>
            ) : null}
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <div className="text-center text-sm text-muted-foreground mb-5">
            Certified &amp; Trusted
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {certifications.map((c) => (
              <span key={c.label} className="chip">
                <c.icon className="w-3.5 h-3.5 text-primary" /> {c.label}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-border flex flex-col md:flex-row md:items-center justify-between gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-3">
            <div className="h-7 w-36 overflow-hidden">
              <img
                src={footerLogo}
                alt="Millennium logo"
                className="h-full w-full object-cover object-center"
              />
            </div>
            <span>© 2026 Millennium Dynamic Touch Panel. All rights reserved.</span>
          </div>
          <div className="flex gap-6">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: string[] }) {
  return (
    <div>
      <div className="font-semibold mb-5">{title}</div>
      <ul className="space-y-3 text-sm text-muted-foreground">
        {links.map((l) => (
          <li key={l}>
            <a href="#" className="hover:text-foreground transition-colors">
              {l}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
