import puppeteer from "puppeteer";

import { Player } from "../types";

import { MAX_PLAYERS, Org, ORG_PATHS } from "./constants";

/**
 * Here we will retrieve the up-to-date rankings from WTA and ATP.
 */

const getRankedPlayers = async (org: Org) => {
  const info = ORG_PATHS[org];
  const { landingPage, targetClass, attribute } = info;
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  await page.goto(landingPage);

  const playerRows = await page.$$eval(
    targetClass,
    (rows, prop) => rows.map((row) => row.getAttribute(prop)),
    attribute
  );

  // Currently the WTA page will return duplicate values,
  // still in search of a better class.
  const playerNames = org === "WTA" ? [...new Set(playerRows)] : playerRows;

  await page.close();
  await browser.close();

  return createPlayersArray(playerNames);
};

// Not perfect since this will not take into account names like
// Beatriz Haddad Maia or Juan Martín del Potro.
const createPlayersArray = (names: string[]): Player[] =>
  names
    .map((name, i) => {
      const nameDecompose = name.split(" ");
      const [, lastName] = nameDecompose;
      return { fullName: name, lastName, ranking: i + 1 };
    })
    .slice(0, MAX_PLAYERS);

export default getRankedPlayers;
