export const ORGS = ["WTA", "ATP"] as const;

// So we never run the risk of mis-spelling WTA or ATP;
export type Org = (typeof ORGS)[number];

export const WTA_LANDING_PAGE = "https://www.wtatennis.com/rankings/singles";
export const ATP_LANDING_PAGE = "https://www.atptour.com/en/rankings/singles";

export const MAX_PLAYERS = 16; // Otherwise ATP will return 100 players.
