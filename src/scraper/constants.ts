import { Org } from "../types";

export const WTA_PAGE = "https://www.wtatennis.com/rankings/singles";
export const WTA_PAGE_TARGET_CLASS = "a.rankings__player-link";

export const ATP_PAGE = "https://www.atptour.com/en/rankings/singles";
export const ATP_PAGE_TARGET_CLASS = "span.player-cell-wrapper > a";

export const ORGS = ["WTA", "ATP"] as const;

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
