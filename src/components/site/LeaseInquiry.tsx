import { useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Clock,
  Building2,
  Monitor,
  CheckCircle2,
  User,
  Mail,
  Phone,
} from "lucide-react";
import { SectionHeading } from "@/components/site/SectionHeading";
import { StarfieldSection } from "@/components/site/StarfieldSection";
import { InfoHint } from "@/components/site/InfoHint";
import { Progress } from "@/components/ui/progress";
import { submitInquiry } from "@/lib/submit-inquiry";
import { Turnstile, TURNSTILE_ENABLED } from "@/components/site/Turnstile";

export function LeaseInquiry() {
  const leaseFormRef = useRef<HTMLDivElement | null>(null);
  // Leasing form state
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [ingress, setIngress] = useState("");
  const [egress, setEgress] = useState("");
  const [address, setAddress] = useState("");
  const [leaseType, setLeaseType] = useState<"short" | "monthly" | "">("");
  const [boardSize, setBoardSize] = useState<"65" | "86" | "">("");
  const [packageOption, setPackageOption] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [leaseSubmitting, setLeaseSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [leaseToken, setLeaseToken] = useState<string | null>(null);
  const [leaseStep, setLeaseStep] = useState<1 | 2 | 3>(1);
  // The wizard form stays hidden until the user picks a plan from the pricing
  // table above. Selecting a plan reveals the form and scrolls to it.
  const [planSelected, setPlanSelected] = useState(false);
  const [leaseTermsChecked, setLeaseTermsChecked] = useState(false);
  const leaseStepLabels = ["Your details", "Package & Schedule", "Terms & Conditions"];
  // Ingress/egress (same-day setup & teardown times) only apply to the daily
  // 5-hour rate. Longer packages (3/7 days, monthly, 6/12 months) just need a
  // start date and get an auto-computed end date.
  const isDailyRate = packageOption === "Daily Rate (5 Hours)";
  // Lease length in days per package — counted as 1 month = 30 days, 1 year = 365 days.
  const packageDurationDays: Record<string, number> = {
    "3 Days": 3,
    "7 Days": 7,
    "Monthly Rate": 30,
    "6 Months Contract": 180,
    "12 Months Contract": 365,
  };

  function getEstimatedPrice() {
    if (!leaseType || !boardSize || !packageOption) return "—";
    if (leaseType === "short") {
      const size = shortTermSizes.find((s) => s.id === boardSize);
      if (!size) return "—";
      if (packageOption.includes("Daily")) return size.details.daily;
      if (packageOption.includes("3 Days")) return size.details.threeDay;
      if (packageOption.includes("7 Days")) return size.details.sevenDay;
    }
    if (leaseType === "monthly") {
      const size = monthlySizes.find((s) => s.id === boardSize);
      if (!size) return "—";
      if (packageOption.includes("6 Months")) return size.details.sixMonth;
      if (packageOption.includes("12 Months")) return size.details.twelveMonth;
      return size.details.monthly;
    }
    return "—";
  }

  // End date = start date + the package's duration in days (e.g. 1 year = 365).
  // Returns an ISO yyyy-mm-dd string, or "" if there's nothing to compute yet.
  function getEndDate() {
    const days = packageDurationDays[packageOption];
    if (!date || !days) return "";
    const d = new Date(`${date}T00:00:00`);
    d.setDate(d.getDate() + days);
    return d.toISOString().slice(0, 10);
  }

  function formatTime12(t: string) {
    if (!t) return "—";
    const parts = t.split(":");
    if (parts.length === 0) return t;
    const hh = parseInt(parts[0], 10) || 0;
    const mm = parts[1] || "00";
    const suffix = hh >= 12 ? "PM" : "AM";
    const hour12 = ((hh + 11) % 12) + 1;
    return `${hour12}:${mm} ${suffix}`;
  }

  function isFormValid() {
    if (!fullName.trim() || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email) || !phone.trim() || !date.trim() || !address.trim() || !leaseType || !boardSize || !packageOption) return false;
    if (isDailyRate && (!ingress.trim() || !egress.trim())) return false;
    if (!leaseTermsChecked) return false;
    return true;
  }

  // Per-step validation for the lease wizard. Same rules as the submit handler,
  // just partitioned by step. Returns the errors for that step only.
  function getLeaseStepErrors(s: 1 | 2 | 3): Record<string, string> {
    const e: Record<string, string> = {};
    if (s === 1) {
      if (!fullName.trim()) e.fullName = "Full name is required.";
      if (!email.trim() || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) e.email = "Valid email is required.";
      if (!phone.trim()) e.phone = "Phone number is required.";
      if (!address.trim()) e.address = "Full address is required.";
    }
    if (s === 2) {
      // Plan (type + size) comes from the pricing table / change-plan dropdown.
      if (!leaseType) e.leaseType = "Lease type is required.";
      if (!boardSize) e.boardSize = "Smart board size is required.";
      if (!packageOption) e.packageOption = "Please select a package.";
      if (!date.trim()) e.date = "Date is required.";
      if (isDailyRate && !ingress.trim()) e.ingress = "Ingress time is required.";
      if (isDailyRate && !egress.trim()) e.egress = "Egress time is required.";
    }
    if (s === 3) {
      if (!leaseTermsChecked) e.terms = "Please accept the terms and conditions.";
    }
    return e;
  }

  // "Next" validates only the current step and blocks advancing if invalid.
  function goLeaseNext() {
    const e = getLeaseStepErrors(leaseStep);
    setErrors(e);
    if (Object.keys(e).length === 0 && leaseStep < 3) {
      setLeaseStep((leaseStep + 1) as 1 | 2 | 3);
    }
  }

  // "Select this plan" from a pricing table → prefill type + size, reveal the
  // inquiry form, then scroll the user to it.
  function selectPlan(type: "short" | "monthly", size: "65" | "86") {
    setLeaseType(type);
    setBoardSize(size);
    setPackageOption("");
    setErrors({});
    setLeaseStep(1);
    setPlanSelected(true);
    requestAnimationFrame(() => {
      leaseFormRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  const shortTermSizes = [
    {
      id: "65" as const,
      label: "65 Inches",
      details: {
        daily: "Php 6,500",
        threeDay: "Php 17,500",
        sevenDay: "Php 35,000",
      },
    },
    {
      id: "86" as const,
      label: "86 Inches",
      details: {
        daily: "Php 8,500",
        threeDay: "Php 23,000",
        sevenDay: "Php 48,000",
      },
    },
  ];

  const monthlySizes = [
    {
      id: "65" as const,
      label: "65 Inches",
      details: {
        monthly: "Php 25,000",
        sixMonth: "Php 23,000/mo",
        twelveMonth: "Php 21,000/mo",
      },
    },
    {
      id: "86" as const,
      label: "86 Inches",
      details: {
        monthly: "Php 35,000",
        sixMonth: "Php 32,000/mo",
        twelveMonth: "Php 29,000/mo",
      },
    },
  ];

  return (
    <StarfieldSection id="contact" className="py-24 border-t border-border">
      <div id="leasing-inquiry-section" style={{ scrollMarginTop: "96px" }} />
      <div className="absolute inset-0 bg-grid opacity-40" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-6">
        <SectionHeading
          chip={
            <>
              <Calendar className="w-3.5 h-3.5 text-primary" /> Get Started Today
            </>
          }
          title="Experience"
          highlight="Innovation"
          subtitle="Discuss flexible leasing options for your organization — pick a plan below and request a quotation"
        />
        <div className="mt-8">
          <div className="space-y-5">
            {[
              {
                icon: Calendar,
                title: "Flexible Scheduling",
                desc: "Choose a time that works best for your team. Virtual or in-person demonstrations available.",
              },
              {
                icon: Building2,
                title: "Enterprise Solutions",
                desc: "Tailored packages for educational institutions, corporations, and government agencies.",
              },
              {
                icon: CheckCircle2,
                title: "Expert Consultation",
                desc: "Get personalized recommendations from our technology specialists.",
              },
            ].map((b) => (
              <div key={b.title} className="card-surface p-5 flex gap-4">
                <div className="w-11 h-11 rounded-lg bg-primary/10 grid place-items-center shrink-0">
                  <b.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="font-semibold">{b.title}</div>
                  <div className="text-sm text-muted-foreground mt-1">{b.desc}</div>
                </div>
              </div>
            ))}

            <div className="card-surface p-6">
              <div className="text-sm text-muted-foreground mb-4">Lease Pricing</div>

              <div className="space-y-8">
                <section>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-primary">Short-Term</span>
                    <h4 className="font-semibold">Events / Conferences</h4>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">Ideal for hotels and event organizers</p>

                  <div className="overflow-x-auto rounded-xl border border-border">
                    <table className="w-full min-w-[680px] text-sm">
                      <thead>
                        <tr className="bg-secondary/40 text-[11px] uppercase tracking-wide text-muted-foreground">
                          <th className="px-4 py-3 text-left font-semibold">Unit Size</th>
                          <th className="px-4 py-3 text-right font-semibold">Daily (5 Hrs)</th>
                          <th className="px-4 py-3 text-right font-semibold">3 Days</th>
                          <th className="px-4 py-3 text-right font-semibold">7 Days</th>
                          <th className="px-4 py-3 text-right font-semibold sr-only">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {shortTermSizes.map((size) => (
                          <tr key={size.id} className="border-t border-border transition-colors hover:bg-secondary/20">
                            <td className="px-4 py-4">
                              <div className="flex items-center gap-2 font-semibold text-foreground">
                                <Monitor className="w-4 h-4 text-primary shrink-0" /> {size.label}
                              </div>
                            </td>
                            <td className="px-4 py-4 text-right font-medium tabular-nums">{size.details.daily}</td>
                            <td className="px-4 py-4 text-right font-medium tabular-nums">{size.details.threeDay}</td>
                            <td className="px-4 py-4 text-right font-medium tabular-nums">{size.details.sevenDay}</td>
                            <td className="px-4 py-4 text-right">
                              <button
                                type="button"
                                onClick={() => selectPlan("short", size.id)}
                                className="whitespace-nowrap rounded-full border border-primary/60 bg-primary/10 px-4 py-2 text-xs font-semibold text-primary transition hover:bg-primary/20"
                              >
                                Select Plan
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>

                <section>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-primary">Monthly</span>
                    <h4 className="font-semibold">Organizations / Offices</h4>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">Enterprise-grade leasing for sustained deployments</p>

                  <div className="overflow-x-auto rounded-xl border border-border">
                    <table className="w-full min-w-[680px] text-sm">
                      <thead>
                        <tr className="bg-secondary/40 text-[11px] uppercase tracking-wide text-muted-foreground">
                          <th className="px-4 py-3 text-left font-semibold">Unit Size</th>
                          <th className="px-4 py-3 text-right font-semibold">Monthly Rate</th>
                          <th className="px-4 py-3 text-right font-semibold">6-Month</th>
                          <th className="px-4 py-3 text-right font-semibold">12-Month</th>
                          <th className="px-4 py-3 text-right font-semibold sr-only">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {monthlySizes.map((size) => (
                          <tr key={size.id} className="border-t border-border transition-colors hover:bg-secondary/20">
                            <td className="px-4 py-4">
                              <div className="flex items-center gap-2 font-semibold text-foreground">
                                <Monitor className="w-4 h-4 text-primary shrink-0" /> {size.label}
                              </div>
                            </td>
                            <td className="px-4 py-4 text-right font-medium tabular-nums">{size.details.monthly}</td>
                            <td className="px-4 py-4 text-right font-medium tabular-nums">{size.details.sixMonth}</td>
                            <td className="px-4 py-4 text-right font-medium tabular-nums">{size.details.twelveMonth}</td>
                            <td className="px-4 py-4 text-right">
                              <button
                                type="button"
                                onClick={() => selectPlan("monthly", size.id)}
                                className="whitespace-nowrap rounded-full border border-primary/60 bg-primary/10 px-4 py-2 text-xs font-semibold text-primary transition hover:bg-primary/20"
                              >
                                Select Plan
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>
              </div>
            </div>

            {/* Leasing Inquiry Form — revealed only after a plan is picked above */}
            {planSelected ? (
            <div ref={leaseFormRef} className="card-surface p-6 mt-6 scroll-mt-24">
              <div className="text-sm text-muted-foreground mb-4">Leasing Inquiry Form</div>

              {!submitted && leaseType && boardSize ? (
                <div className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-primary/40 bg-primary/5 px-4 py-3 text-sm">
                  <span>
                    Selected plan:{" "}
                    <span className="font-semibold text-foreground">
                      {leaseType === "short" ? "Short-Term Lease" : "Monthly Lease"} · {boardSize} Inches
                    </span>
                  </span>
                  <label className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span className="whitespace-nowrap">Change plan</span>
                    <select
                      value={`${leaseType}-${boardSize}`}
                      onChange={(e) => {
                        const [t, s] = e.target.value.split("-") as ["short" | "monthly", "65" | "86"];
                        setLeaseType(t);
                        setBoardSize(s);
                        setPackageOption("");
                      }}
                      className="bg-input border border-border rounded-lg px-3 py-2 text-sm text-foreground focus:bg-black focus:outline-none"
                    >
                      <option value="short-65">Short-Term · 65 Inches</option>
                      <option value="short-86">Short-Term · 86 Inches</option>
                      <option value="monthly-65">Monthly · 65 Inches</option>
                      <option value="monthly-86">Monthly · 86 Inches</option>
                    </select>
                  </label>
                </div>
              ) : null}

              {!submitted ? (
                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    // Final submit re-validates every step (same rules as before).
                    const nextErrors = {
                      ...getLeaseStepErrors(1),
                      ...getLeaseStepErrors(2),
                      ...getLeaseStepErrors(3),
                    };
                    setErrors(nextErrors);
                    if (Object.keys(nextErrors).length > 0) return;

                    setSubmitError(null);
                    setLeaseSubmitting(true);
                    try {
                      await submitInquiry({
                        type: "lease",
                        name: fullName,
                        email,
                        phone,
                        turnstileToken: leaseToken ?? undefined,
                        details: {
                          address,
                          date,
                          endDate: isDailyRate ? "" : getEndDate(),
                          ingress: isDailyRate ? ingress : "",
                          egress: isDailyRate ? egress : "",
                          leaseType,
                          boardSize,
                          package: packageOption,
                          estimatedPrice: getEstimatedPrice(),
                        },
                      });
                      setSubmitted(true);
                    } catch (err) {
                      setSubmitError(
                        err instanceof Error ? err.message : "Something went wrong. Please try again.",
                      );
                    } finally {
                      setLeaseSubmitting(false);
                    }
                  }}
                  className="space-y-4"
                >
                  {/* Step progress */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-sm font-medium">
                        Step {leaseStep} of 3 · <span className="text-muted-foreground">{leaseStepLabels[leaseStep - 1]}</span>
                      </div>
                      <div className="text-xs text-muted-foreground">{Math.round((leaseStep / 3) * 100)}%</div>
                    </div>
                    <Progress value={(leaseStep / 3) * 100} />
                  </div>

                  {/* Step 1 — Your details */}
                  {leaseStep === 1 ? (
                    <div className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium flex items-center gap-2">
                            <User className="w-4 h-4 text-primary" /> Full Name
                          </label>
                          <input value={fullName} onChange={(e) => setFullName(e.target.value)} className="mt-2 w-full bg-input border border-border rounded-lg px-4 py-3 text-sm" />
                          {errors.fullName ? <div className="text-xs text-red-400 mt-1">{errors.fullName}</div> : null}
                        </div>

                        <div>
                          <label className="text-sm font-medium flex items-center gap-2">
                            <Mail className="w-4 h-4 text-primary" /> Email Address
                          </label>
                          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-2 w-full bg-input border border-border rounded-lg px-4 py-3 text-sm" />
                          {errors.email ? <div className="text-xs text-red-400 mt-1">{errors.email}</div> : null}
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium flex items-center gap-2">
                            <Phone className="w-4 h-4 text-primary" /> Phone Number
                          </label>
                          <input value={phone} onChange={(e) => setPhone(e.target.value)} className="mt-2 w-full bg-input border border-border rounded-lg px-4 py-3 text-sm" />
                          {errors.phone ? <div className="text-xs text-red-400 mt-1">{errors.phone}</div> : null}
                        </div>

                        <div>
                          <label className="text-sm font-medium">Full Address</label>
                          <input value={address} onChange={(e) => setAddress(e.target.value)} className="mt-2 w-full bg-input border border-border rounded-lg px-4 py-3 text-sm" />
                          {errors.address ? <div className="text-xs text-red-400 mt-1">{errors.address}</div> : null}
                        </div>
                      </div>
                    </div>
                  ) : null}

                  {/* Step 2 — Package & Schedule */}
                  {leaseStep === 2 ? (
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium">{leaseType === "monthly" ? "Contract Duration" : "Package"}</label>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {leaseType === "monthly" ? (
                            [
                              { id: "monthly_rate", label: "Monthly Rate" },
                              { id: "6_months", label: "6 Months Contract" },
                              { id: "12_months", label: "12 Months Contract" },
                            ].map((p) => (
                              <button key={p.id} type="button" onClick={() => setPackageOption(p.label)} className={`rounded-full border px-3 py-2 text-sm font-semibold transition ${packageOption === p.label ? "border-primary text-foreground bg-primary/5" : "border-border text-muted-foreground bg-background"}`}>
                                {p.label}
                              </button>
                            ))
                          ) : (
                            [
                              { id: "daily", label: "Daily Rate (5 Hours)" },
                              { id: "3_days", label: "3 Days" },
                              { id: "7_days", label: "7 Days" },
                            ].map((p) => (
                              <button key={p.id} type="button" onClick={() => setPackageOption(p.label)} className={`rounded-full border px-3 py-2 text-sm font-semibold transition ${packageOption === p.label ? "border-primary text-foreground bg-primary/5" : "border-border text-muted-foreground bg-background"}`}>
                                {p.label}
                              </button>
                            ))
                          )}
                        </div>
                        {errors.packageOption ? <div className="text-xs text-red-400 mt-1">{errors.packageOption}</div> : null}
                      </div>

                      {packageOption ? (
                        <>
                          <div className={isDailyRate ? "" : "grid md:grid-cols-2 gap-4"}>
                            <div>
                              <label className="text-sm font-medium flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-primary" /> {isDailyRate ? "Date" : "Start Date"} <span className="text-xs text-muted-foreground ml-2">(DD/MM/YYYY)</span>
                              </label>
                              <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="mt-2 w-full bg-input border border-border rounded-lg px-4 py-3 text-sm" />
                              {errors.date ? <div className="text-xs text-red-400 mt-1">{errors.date}</div> : null}
                            </div>

                            {!isDailyRate ? (
                              <div>
                                <label className="text-sm font-medium flex items-center gap-2">
                                  <Calendar className="w-4 h-4 text-primary" /> End Date <span className="text-xs text-muted-foreground ml-2">(auto)</span>
                                </label>
                                <input type="date" value={getEndDate()} readOnly disabled className="mt-2 w-full bg-input border border-border rounded-lg px-4 py-3 text-sm opacity-70 cursor-not-allowed" />
                                <div className="text-xs text-muted-foreground mt-1">{packageOption} · {packageDurationDays[packageOption]} days from start date</div>
                              </div>
                            ) : null}
                          </div>

                          {isDailyRate ? (
                            <div className="grid md:grid-cols-2 gap-4">
                              <div>
                                <label className="text-sm font-medium flex items-center gap-2 flex-wrap">
                                  <span className="flex items-center gap-2"><Clock className="w-4 h-4 text-primary" /> Ingress</span>
                                  <span className="text-xs font-normal text-muted-foreground">setup / arrival · e.g. 1:00 PM</span>
                                </label>
                                <input type="time" value={ingress} onChange={(e) => setIngress(e.target.value)} className="mt-2 w-full bg-input border border-border rounded-lg px-4 py-3 text-sm" />
                                {errors.ingress ? <div className="text-xs text-red-400 mt-1">{errors.ingress}</div> : null}
                              </div>

                              <div>
                                <label className="text-sm font-medium flex items-center gap-2 flex-wrap">
                                  <span className="flex items-center gap-2"><Clock className="w-4 h-4 text-primary" /> Egress</span>
                                  <span className="text-xs font-normal text-muted-foreground">teardown / departure · e.g. 6:00 PM</span>
                                </label>
                                <input type="time" value={egress} onChange={(e) => setEgress(e.target.value)} className="mt-2 w-full bg-input border border-border rounded-lg px-4 py-3 text-sm" />
                                {errors.egress ? <div className="text-xs text-red-400 mt-1">{errors.egress}</div> : null}
                              </div>
                            </div>
                          ) : null}
                        </>
                      ) : null}

                      <div className="card-surface p-4 rounded-lg border border-border">
                        <div className="font-semibold text-sm mb-2">LEASE SUMMARY</div>
                        <div className="text-sm text-muted-foreground">
                          <div>Lease Type: <span className="text-foreground font-medium">{leaseType === "short" ? "Short-Term Lease" : leaseType === "monthly" ? "Monthly Lease" : "—"}</span></div>
                          <div>Display Size: <span className="text-foreground font-medium">{boardSize ? `${boardSize} Inches` : "—"}</span></div>
                          <div>Selected Package: <span className="text-foreground font-medium">{packageOption || "—"}</span></div>
                          <div className="flex items-center gap-1.5">
                            <span>Estimated Price:</span>
                            <span className="text-foreground font-medium">{getEstimatedPrice()}</span>
                            <InfoHint label="About this estimate">
                              This is an estimate based on your selected size and package. Your final quotation is confirmed by our team and may vary with delivery, setup, or add-ons.
                            </InfoHint>
                          </div>
                          <div>{isDailyRate ? "Date" : "Start Date"}: <span className="text-foreground font-medium">{date || "—"}</span></div>
                          {isDailyRate ? (
                            <>
                              <div>Ingress: <span className="text-foreground font-medium">{ingress ? formatTime12(ingress) : "—"}</span></div>
                              <div>Egress: <span className="text-foreground font-medium">{egress ? formatTime12(egress) : "—"}</span></div>
                            </>
                          ) : (
                            <div>End Date: <span className="text-foreground font-medium">{getEndDate() || "—"}</span></div>
                          )}
                        </div>
                      </div>
                    </div>
                  ) : null}

                  {/* Step 3 — Terms & Conditions */}
                  {leaseStep === 3 ? (
                    <div className="space-y-4">
                      <div className="card-surface p-4 rounded-lg border border-border">
                        <div className="text-sm font-semibold text-foreground text-center">TERMS AND CONDITIONS</div>
                        <div className="text-sm text-muted-foreground text-center mt-1">Review the leasing and payment policies before requesting your quotation.</div>
                        <div className="mt-4 text-sm text-muted-foreground max-h-[36vh] overflow-y-auto pr-2">
                          <div className="mt-2">
                            <p className="font-semibold text-foreground mb-2">I. INCLUSIONS</p>
                            <ul className="list-disc list-inside space-y-2 ml-2">
                              <li>Delivery, setup, and basic orientation of the unit</li>
                              <li>Technical support for the duration of the lease</li>
                              <li>Standard stand/mount and required accessories</li>
                            </ul>
                          </div>
                          <div className="mt-4">
                            <p className="font-semibold text-foreground mb-2">II. RESERVATION POLICIES</p>
                            <ul className="list-disc list-inside space-y-2 ml-2">
                              <li>First-come, first-served basis.</li>
                              <li>Reservations must be confirmed with a 50% downpayment.</li>
                              <li>Bookings are accepted only during office hours, Monday to Saturday, 9:00am to 6:00pm. We are closed during holidays.</li>
                              <li>Ocular inspections may be done only during office hours with prior notice and a scheduled appointment.</li>
                              <li>A lessee should be of legal age, 18 years old and above. A lessee below 18 years old must be accompanied by an adult. For a corporation, only the authorized person/s should enter into a lease agreement.</li>
                              <li>The lessee is responsible for the safekeeping of the unit throughout the lease period; any loss or damage beyond normal wear and tear will be charged accordingly.</li>
                              <li>Ingress (setup / arrival) and egress (teardown / departure) schedules must be agreed upon in advance.</li>
                            </ul>
                          </div>
                          <div className="mt-4">
                            <p className="font-semibold text-foreground mb-2">III. PAYMENT</p>
                            <ul className="list-disc list-inside space-y-2 ml-2">
                              <li>For holiday deployments, a thirty percent (30%) surcharge shall be applied.</li>
                              <li>A 50% down payment (DP) is required for any reservation worth P5,000.00 and above, payable upon booking confirmation. Based on our first-to-pay, first-to-be-served policy, a DP confirms your booking. Full payment is required prior to deployment.</li>
                              <li>Bank transfer / online payment / direct payment accepted.</li>
                              <li>Down payments can be done through:
                                <div className="ml-4 mt-1 text-sm space-y-1">
                                  <p>Account name: Globaltronics, Inc.</p>
                                  <p>Metrobank Account#: 361-402-1897</p>
                                  <p>BDO Account#: 261-0008-941</p>
                                  <p>GCash: <span className="text-blue-400">0917 5262762</span> Macy Guido</p>
                                  <p>Please send a copy of the deposit slip/money transfer to <a href="mailto:mroxas@globaltronics.net" className="text-blue-400 hover:underline">mroxas@globaltronics.net</a>.</p>
                                </div>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      {/* Agreement — required before requesting a quotation */}
                      <div>
                        <label className="flex items-start gap-3 text-sm">
                          <input
                            type="checkbox"
                            checked={leaseTermsChecked}
                            onChange={(e) => setLeaseTermsChecked(e.target.checked)}
                            className="mt-0.5 h-4 w-4 shrink-0 accent-primary"
                          />
                          <span className="text-muted-foreground">
                            I have read and agree to the{" "}
                            <span className="font-medium text-foreground">Terms &amp; Conditions</span> and acknowledge that the estimated price is not a final quotation.
                          </span>
                        </label>
                        {errors.terms ? <div className="text-xs text-red-400 mt-1">{errors.terms}</div> : null}
                      </div>
                    </div>
                  ) : null}

                  {/* Wizard navigation */}
                  <div className="flex gap-3 pt-2">
                    {leaseStep > 1 ? (
                      <button type="button" onClick={() => setLeaseStep((leaseStep - 1) as 1 | 2 | 3)} className="btn-ghost flex-1">
                        <ArrowLeft className="w-4 h-4" /> Back
                      </button>
                    ) : null}

                    {leaseStep < 3 ? (
                      <button type="button" onClick={goLeaseNext} className="btn-primary flex-1">
                        Next <ArrowRight className="w-4 h-4" />
                      </button>
                    ) : (
                      <button type="submit" disabled={!isFormValid() || leaseSubmitting || (TURNSTILE_ENABLED && !leaseToken)} className={`btn-primary flex-1 ${!isFormValid() || leaseSubmitting || (TURNSTILE_ENABLED && !leaseToken) ? "opacity-60 cursor-not-allowed" : ""}`}>
                        {leaseSubmitting ? "Submitting..." : "REQUEST LEASE QUOTATION"}
                      </button>
                    )}
                  </div>

                  {leaseStep === 3 ? (
                    <Turnstile onVerify={setLeaseToken} onExpire={() => setLeaseToken(null)} />
                  ) : null}

                  {submitError ? (
                    <div className="text-sm text-red-400 text-center">{submitError}</div>
                  ) : null}
                </form>
              ) : (
                <div className="p-6 text-center">
                  <div className="text-2xl font-bold mb-3">Thank you!</div>
                  <div className="text-sm text-muted-foreground">Your lease quotation request has been submitted successfully.
                    <div className="mt-3">Our team will contact you shortly regarding your leasing requirements.</div>
                  </div>
                </div>
              )}
            </div>
            ) : null}
          </div>
        </div>
      </div>
    </StarfieldSection>
  );
}
