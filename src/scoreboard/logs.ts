/* eslint-disable no-console */
import chalk from "chalk";
import draftLog from "draftlog";

import { Match, Player } from "../types";

draftLog(console);

// We only initialize the logs once the match is about to start.
// Before that we only use the log from inquirer.
export let matchTitle: (arg: string) => void;
export const initializeMatchTitle = () => {
  matchTitle = console.draft(
    chalk.yellowBright("\nToday's game is about to start!")
  );
};

export let matchScore: (arg: string) => void;
export const initializeMatchScore = () => {
  matchScore = console.draft("\n\n\n");
};

export let matchEvent: (arg: string) => void;
export const initializeMatchEvent = () => {
  matchEvent = console.draft(chalk.greenBright("\n\n"));
};

const FILL_LOGS = " ".repeat(70);

// Workaround to clear the logs, otherwise the overwrites get weird.
export const clearEvent = () => matchEvent(`\n${FILL_LOGS}\n`);
export const clearTitle = () => matchTitle(`\n${FILL_LOGS}\n`);
export const clearScoreboard = () => matchScore(`\n${FILL_LOGS}\n${FILL_LOGS}`);

export const logGameWon = (winner: Player) =>
  matchEvent(chalk.yellowBright(`Game for ${winner.lastName}.\n`));

export const logSetWon = (winner: Player) =>
  matchEvent(chalk.bold.greenBright(`${winner.lastName} wins set.\n`));

export const logPlayers = ({ p1, p2 }: Match) => {
  const [playerOne, playerTwo] = [p1, p2].map(
    ({ fullName, ranking }) => `${fullName} (${ranking})`
  );
  matchTitle(
    chalk.bold.greenBright(`\nMatch between ${playerOne} and ${playerTwo}.`)
  );
};

export const logMatchInPlay = () =>
  matchTitle(chalk.yellowBright("\nMATCH IN PLAY"));
export const logMatchFinished = () =>
  matchTitle(chalk.greenBright("\nMATCH FINISHED"));

export const logMatchWon = (winner: Player) =>
  matchEvent(chalk.bold.greenBright(`🏆 ${winner?.fullName} wins!\n`));

export const logDeuce = () =>
  matchEvent(chalk.bold.black.bgYellowBright(` DEUCE \n`));

export const listPlayers = (players: Player[]) => {
  const playerList = players
    .map(({ fullName, ranking }) => `${fullName} (${ranking})`)
    .join("\n");
  console.log(chalk.cyanBright(playerList));
};
