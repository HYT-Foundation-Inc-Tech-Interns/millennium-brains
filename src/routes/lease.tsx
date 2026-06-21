import { createFileRoute } from "@tanstack/react-router";
import { LeaseInquiry } from "@/components/site/LeaseInquiry";

export const Route = createFileRoute("/lease")({
  head: () => ({
    meta: [
      { title: "Lease — Millennium" },
      {
        name: "description",
        content:
          "Flexible short-term and monthly leasing options for the Millennium smart interactive board. Pick a plan and request a quotation.",
      },
      { property: "og:title", content: "Lease the Millennium Smart Board" },
      { property: "og:description", content: "Short-term and monthly leasing for events, offices, and organizations." },
    ],
  }),
  component: LeaseInquiry,
});
