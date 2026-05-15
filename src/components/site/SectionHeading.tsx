import type { ReactNode } from "react";

interface Props {
  chip: ReactNode;
  title: ReactNode;
  highlight: string;
  subtitle: string;
}

export function SectionHeading({ chip, title, highlight, subtitle }: Props) {
  return (
    <div className="text-center max-w-3xl mx-auto mb-14">
      <div className="inline-flex">
        <span className="chip">{chip}</span>
      </div>
      <h2 className="mt-5 text-4xl md:text-5xl font-bold tracking-tight">
        {title} <span className="text-gradient-brand">{highlight}</span>
      </h2>
      <p className="mt-4 text-muted-foreground text-lg leading-relaxed">{subtitle}</p>
    </div>
  );
}
