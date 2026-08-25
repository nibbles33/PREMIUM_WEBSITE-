import { Award, Clock3, Star, Users, MessageSquareQuote } from "lucide-react";
import { trustStats, type TrustStat } from "@/data/trust-stats";

const icons = [Star, MessageSquareQuote, Clock3, Users, Award] as const;

function PlaceholderStat({ label }: { label: string }) {
  return (
    <div
      className="flex min-h-[72px] w-full flex-col items-center justify-center gap-1 rounded-sm border border-dashed border-border bg-white/60 px-3 py-3 text-center"
      title="Placeholder — replace with a verified figure before launch"
    >
      <span className="font-mono text-lg font-medium leading-none text-secondary/50">
        —
      </span>
      <span className="text-[10px] font-medium uppercase tracking-wide text-secondary/70">
        Add verified stat
      </span>
      <span className="sr-only">Placeholder for {label}</span>
    </div>
  );
}

function StatItem({
  stat,
  Icon,
}: {
  stat: TrustStat;
  Icon: (typeof icons)[number];
}) {
  return (
    <li className="flex min-w-0 flex-1 flex-col items-center gap-2 px-3 py-4 text-center sm:px-4">
      <Icon
        className="h-4 w-4 text-gold-dark"
        strokeWidth={1.5}
        aria-hidden
      />
      {stat.verified && stat.value ? (
        <>
          <p className="text-lg font-medium tracking-tight text-charcoal">
            {stat.value}
          </p>
          <p className="text-xs text-secondary">{stat.label}</p>
        </>
      ) : (
        <>
          <PlaceholderStat label={stat.label} />
          <p className="text-xs text-secondary">{stat.label}</p>
        </>
      )}
    </li>
  );
}

export default function TrustBar() {
  return (
    <section
      className="border-y border-border bg-[color-mix(in_srgb,var(--brand-gold)_6%,var(--brand-offwhite))]"
      aria-label="Trust indicators"
    >
      <ul className="mx-auto flex max-w-6xl flex-col divide-y divide-border sm:flex-row sm:flex-wrap sm:divide-x sm:divide-y-0 lg:flex-nowrap">
        {trustStats.map((stat, index) => {
          const Icon = icons[index % icons.length];
          return <StatItem key={stat.label} stat={stat} Icon={Icon} />;
        })}
      </ul>
    </section>
  );
}
