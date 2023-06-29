import puppeteer from "puppeteer";

import { Player } from "../types";

import {
  ATP_LANDING_PAGE,
  MAX_PLAYERS,
  Org,
  WTA_LANDING_PAGE,
} from "./constants";

/**
 * Here we will retrieve the up-to-date rankings from WTA and ATP.
 */

const getRankedPlayers = async (org: Org) => {
  if (org === "WTA") {
    return await getWtaPlayers();
  }
  return await getAtpPlayers();
};

/**
 * Retrieve names and rankings from the WTA website.
 * @returns
 */
const getWtaPlayers = async () => {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  await page.goto(WTA_LANDING_PAGE);

  const getCellContent = async (cssClass: string) =>
    (await page.$$eval(cssClass, (rows) =>
      rows.map((row) => row.innerHTML)
    )) as string[];

  const firstNames = await getCellContent(".player-name__first-name");
  const lastNames = await getCellContent(".player-name__last-name");

  const playerNames: string[][] = firstNames.map((_, i) => [
    firstNames[i],
    lastNames[i],
  ]);

  await page.close();
  await browser.close();

  return playerNames
    .map(([firstName, lastName], i) => ({
      fullName: `${firstName} ${lastName}`,
      lastName,
      ranking: i + 1,
    }))
    .slice(0, MAX_PLAYERS);
};

/**
 * Retrieves names and ranking from the ATP website.
 * @returns
 */
const getAtpPlayers = async () => {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  await page.goto(ATP_LANDING_PAGE);

  const playerRows = await page.$$eval(
    "span.player-cell-wrapper > a",
    (rows, prop) => rows.map((row) => row.getAttribute(prop)),
    "ga-label"
  );

  await page.close();
  await browser.close();

  return createPlayersArray(playerRows);
};

// Still need a better way to construct ATP last names
const createPlayersArray = (names: string[]): Player[] =>
  names
    .map((name, i) => {
      const nameDecompose = name.split(" ");
      const [, lastName] = nameDecompose;
      return { fullName: name, lastName, ranking: i + 1 };
    })
    .slice(0, MAX_PLAYERS);

export default getRankedPlayers;
