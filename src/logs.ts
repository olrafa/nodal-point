import draftLog from "draftlog";
import { Player } from "./types";

draftLog(console);

export const matchTitle = console.draft("\nWelcome to the Tennis Simulator!");
export const matchScore = console.draft("\n\n\n\n");
export const matchEvent = console.draft("\nGame is about to start\n");

export const FILL_LOGS = " ".repeat(70);

export const clearScoreBoard = () => matchEvent(`\n${FILL_LOGS}\n`);

export const logGameWon = (winner: Player) =>
  matchEvent(`\nGame for ${winner.lastName}.\n`);

export const logSetWon = (winner: Player) =>
  matchEvent(`\n${winner.lastName} wins set.\n`);

export const logMatchWon = (winner: Player) =>
  matchEvent(`\n${winner?.firstName} ${winner?.lastName} wins!\n`);

export const logDeuce = () => matchEvent(`\nDEUCE\n`);
