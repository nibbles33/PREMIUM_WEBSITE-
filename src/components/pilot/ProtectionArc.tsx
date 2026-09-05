"use client";

type ProtectionArcProps = {
  active: boolean;
  className?: string;
  breathe?: boolean;
};

export default function ProtectionArc({
  active,
  className = "",
  breathe = true,
}: ProtectionArcProps) {
  return (
    <div
      className={`pilot-protection-arc ${active ? "is-active" : ""} ${breathe && active ? "pilot-protection-breathe" : ""} ${className}`}
      aria-hidden
    >
      <svg
        width="180"
        height="100"
        viewBox="0 0 180 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="pilotArcGold" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#b8940f" stopOpacity="0.15" />
            <stop offset="50%" stopColor="#d0ad26" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#e4c558" stopOpacity="0.2" />
          </linearGradient>
        </defs>
        <path
          d="M 12 88 Q 90 8 168 88"
          stroke="url(#pilotArcGold)"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M 24 86 Q 90 22 156 86"
          stroke="#d0ad26"
          strokeWidth="1"
          fill="none"
          strokeLinecap="round"
          opacity="0.35"
        />
      </svg>
    </div>
  );
}
