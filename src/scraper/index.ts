import puppeteer from "puppeteer";

import { Player } from "../types";

import { WTA_PAGE, WTA_PAGE_TARGET_CLASS } from "./constants";

/**
 * Here we will retrieve the up-to-date rankings from WTA and ATP.
 */

const getWtaRankings = async () => {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  await page.goto(WTA_PAGE);

  const playerRows = await page.$$eval(WTA_PAGE_TARGET_CLASS, (rows) =>
    rows.map((row) => row.getAttribute("title"))
  );

  await page.close();
  await browser.close();

  // Currently the page will return duplicate values,
  // still in search of a better class.
  const deduplicate = [...new Set(playerRows)];
  return createPlayersArray(deduplicate);
};

export default getWtaRankings;

const createPlayersArray = (names: string[]): Player[] =>
  names.map((name, i) => {
    const nameDecompose = name.split(" ");
    const [firstName, lastName] = nameDecompose;
    return { firstName, lastName, ranking: i + 1 };
  });
