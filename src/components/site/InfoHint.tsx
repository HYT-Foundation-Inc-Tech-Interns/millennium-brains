import type { ReactNode } from "react";
import { Info } from "lucide-react";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";

// Small tap-friendly info bubble (Popover opens on click/tap, so it works on
// mobile too — unlike a hover-only tooltip). Use for optional context, not
// essential instructions.
export function InfoHint({ children, label = "More information" }: { children: ReactNode; label?: string }) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          aria-label={label}
          className="inline-flex items-center justify-center align-middle text-muted-foreground transition-colors hover:text-foreground"
        >
          <Info className="w-3.5 h-3.5" />
        </button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-64 text-sm text-muted-foreground">
        {children}
      </PopoverContent>
    </Popover>
  );
}
