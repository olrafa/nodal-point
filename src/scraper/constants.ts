export const ORGS = ["WTA", "ATP"] as const;

// So we never run the risk of mis-spelling WTA or ATP;
export type Org = (typeof ORGS)[number];

type PageItem = {
  landingPage: string;
  targetClass: string;
  attribute: string;
};

export const ORG_PATHS: { [key in Org]: PageItem } = {
  WTA: {
    landingPage: "https://www.wtatennis.com/rankings/singles",
    targetClass: "a.rankings__player-link",
    attribute: "title",
  },
  ATP: {
    landingPage: "https://www.atptour.com/en/rankings/singles",
    targetClass: "span.player-cell-wrapper > a",
    attribute: "ga-label",
  },
};
