import draftLog from "draftlog";
import { Player } from "../types";
import { Match } from "../types";

draftLog(console);

// These are the three items on the log.
// Every new log will be an update on these.
export const matchTitle = console.draft("\nWelcome to the Tennis Simulator!");
export const matchScore = console.draft("\n\n\n");
export const matchEvent = console.draft("Game is about to start\n");

export const FILL_LOGS = " ".repeat(100);

// Workaround to clear the logs, otherwise the overwrites get weird.
export const clearEvent = () => matchEvent(`\n${FILL_LOGS}\n`);
export const clearTitle = () => matchTitle(`\n${FILL_LOGS}\n`);
export const clearScoreboard = () =>
  matchScore(`\n${FILL_LOGS}\n${FILL_LOGS}`);

export const logGameWon = (winner: Player) =>
  matchEvent(`Game for ${winner.lastName}.\n`);

export const logSetWon = (winner: Player) =>
  matchEvent(`${winner.lastName} wins set.\n`);

export const logPlayers = ({ p1, p2 }: Match) => {
  const [playerOne, playerTwo] = [p1, p2].map(
    ({ firstName, lastName, ranking }) =>
      `${firstName} ${lastName} (${ranking})`
  );
  matchTitle(`\nMatch between ${playerOne} and ${playerTwo}.`);
};

export const logMatchInPlay = () => matchTitle("\nMATCH IN PLAY");
export const logMatchFinished = () => matchTitle("\nMATCH FINISHED");

export const logMatchWon = (winner: Player) =>
  matchEvent(`\n${winner?.firstName} ${winner?.lastName} wins!\n`);

export const logDeuce = () => matchEvent(`DEUCE\n`);


