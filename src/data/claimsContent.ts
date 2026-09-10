export type ClaimScenarioId =
  | "auto-accident"
  | "property-damage"
  | "water-damage"
  | "theft"
  | "liability"
  | "other";

export type ClaimScenario = {
  id: ClaimScenarioId;
  title: string;
  summary: string;
  steps: string[];
};

export const claimScenarios: ClaimScenario[] = [
  {
    id: "auto-accident",
    title: "Auto accident",
    summary: "Collision, hit-and-run, or vehicle damage on the road.",
    steps: [
      "Make sure everyone is safe. Call 911 if anyone is injured or the scene is unsafe.",
      "Exchange information with other drivers and note licence plates, witnesses, and location.",
      "Take photos of damage and the scene if it is safe to do so.",
      "Contact your insurer's claims line as soon as practical — many carriers have 24/7 reporting.",
      "Do not admit fault at the scene. Follow your insurer's instructions for repairs and rental vehicles.",
    ],
  },
  {
    id: "property-damage",
    title: "Property damage",
    summary: "Damage to your home, building, or business property.",
    steps: [
      "Ensure the property is safe to enter. Shut off utilities if there is active risk.",
      "Document damage with photos and video before cleanup where safe.",
      "Take reasonable steps to prevent further damage (tarps, boarding, etc.) if advised.",
      "Report the claim to your insurer and keep receipts for emergency mitigation.",
      "Wait for adjuster guidance before starting major repairs unless your policy or insurer directs otherwise.",
    ],
  },
  {
    id: "water-damage",
    title: "Water damage",
    summary: "Burst pipes, appliance leaks, sewer backup, or flooding.",
    steps: [
      "Stop the water source if you can do so safely.",
      "Avoid electrical hazards in wet areas.",
      "Document damage and moisture levels with photos.",
      "Contact your insurer promptly — water claims often have reporting timelines.",
      "Keep damaged items unless your adjuster instructs you to dispose of them.",
    ],
  },
  {
    id: "theft",
    title: "Theft or break-in",
    summary: "Stolen property, vandalism, or forced entry.",
    steps: [
      "Contact police and obtain a report or incident number if applicable.",
      "Secure the property to prevent further loss.",
      "List missing or damaged items with approximate values and purchase dates if known.",
      "Notify your insurer and provide the police report when available.",
      "Do not discard damaged locks or entry points until your adjuster has reviewed.",
    ],
  },
  {
    id: "liability",
    title: "Liability incident",
    summary: "Someone was injured or their property was damaged and you may be responsible.",
    steps: [
      "Ensure anyone injured receives appropriate medical attention.",
      "Do not admit liability or offer payment without insurer approval.",
      "Collect names, contact information, and a brief description of what occurred.",
      "Report the incident to your insurer immediately — liability claims are time-sensitive.",
      "Forward any legal documents or demand letters to your insurer and broker without delay.",
    ],
  },
  {
    id: "other",
    title: "Other claim",
    summary: "Any other loss or circumstance not listed above.",
    steps: [
      "Prioritize safety and follow any emergency service instructions.",
      "Document what happened, when, and where.",
      "Preserve evidence and take photos if safe.",
      "Contact Premium or your insurer's claims department to report the loss.",
      "Your broker can help clarify coverage and next steps for unusual situations.",
    ],
  },
];

export const claimsFaqs = [
  {
    question: "Should I call my broker or my insurance company first?",
    answer:
      "For urgent situations, call your insurer's claims line if you have it — many carriers offer 24/7 reporting. Premium can also help you identify the right contact, especially if you're unsure which company holds your policy or you need guidance before reporting.",
  },
  {
    question: "Will filing a claim affect my premium?",
    answer:
      "It may. Insurers consider claims history when renewing or rating a policy. That doesn't mean you shouldn't report a legitimate loss — failing to report promptly can create coverage problems. A broker can help you understand options before and after a claim.",
  },
  {
    question: "What if I don't know which company insures me?",
    answer:
      "Contact Premium at 226-782-6000. We can look up your policy and connect you with the correct carrier claims contact.",
  },
  {
    question: "Can Premium adjust my claim?",
    answer:
      "No. Adjusters work for the insurance company that issued your policy. Premium's role is to help you report the loss, understand your coverage, and advocate for you through the process — but we do not settle claims on the insurer's behalf.",
  },
  {
    question: "How long do I have to report a claim?",
    answer:
      "Report as soon as reasonably possible. Policies and provincial requirements vary, and delays can complicate coverage. When in doubt, report now and let the insurer confirm next steps.",
  },
];

export const claimsPreparednessItems = [
  "Policy number (or insured name and address)",
  "Date, time, and location of the loss",
  "Photos or video of damage, where safe to capture",
  "Police report number, if applicable",
  "Third-party names, contact details, and insurance information",
  "Receipts, estimates, or invoices related to the loss or emergency repairs",
];
