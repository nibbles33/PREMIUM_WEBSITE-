// PLACEHOLDER DATA — replace with verified figures before production launch. Do not fabricate values.

export type TrustStat = {
  label: string;
  value: string | null;
  verified: boolean;
};

export const trustStats: TrustStat[] = [
  { label: "Google rating", value: null, verified: false },
  { label: "Client reviews", value: null, verified: false },
  { label: "Years combined experience", value: null, verified: false },
  { label: "Clients insured", value: null, verified: false },
  { label: "Industry awards", value: null, verified: false },
];
