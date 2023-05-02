import chalk from "chalk";

import { POINT_SYSTEM } from "../game/constants";
import { Match, ScoreLine, SetScores } from "../types";

import { clearScoreboard, matchScore } from "./logs";
import { createScorelines, trimScores } from "./util";

/**
 * After every point is played, update the score shown in the logs.
 */
const scoreboard = (match: Match) => {
  clearScoreboard();
  const scores = createScorelines(match);
  const trimmedScores = trimScores(scores, match);

  const [p1Score, p2Score] = trimmedScores;
  const getOpponentsSets = (score: ScoreLine) =>
    score === p1Score ? p2Score : p1Score;

  const [p1Scoreboard, p2Scoreboard] = trimmedScores.map((score) =>
    getPlayerScoreboard(score, getSetScores(getOpponentsSets(score)))
  );

  matchScore(`\n${p1Scoreboard}\n${p2Scoreboard}`);
};

const getSetScores = ({ S1, S2, S3 }: ScoreLine) => ({ S1, S2, S3 });

/**
 * Create a string to be displayed on the logs for each player.
 */
const getPlayerScoreboard = (player: ScoreLine, opponentSets: SetScores) => {
  const { serving, name, event = "", games, S1, S2, S3, points } = player;
  return (
    getServiceDisplay(serving) +
    getNameDisplay(name) +
    getSetDisplay(S1, opponentSets.S1) +
    getSetDisplay(S2, opponentSets.S2) +
    getSetDisplay(S3, opponentSets.S3) +
    getGamesDisplay(games) +
    getPointsDisplay(points) +
    getEventDisplay(event)
  );
};

const getServiceDisplay = (serving?: boolean) =>
  serving ? chalk.greenBright("• ") : "  ";

const getNameDisplay = (name: string) => name + " ".repeat(20 - name.length);

const getSetDisplay = (setScore?: number, oppSetScore?: number) => {
  if (setScore === undefined || oppSetScore === undefined) {
    return "";
  }
  return setScore > oppSetScore
    ? chalk.greenBright(` ${setScore} `)
    : chalk.white(` ${setScore} `);
};

const getGamesDisplay = (games?: number) =>
  games === undefined ? "" : chalk.black.bgGreenBright(` ${games} `);

const twoDigitScores = POINT_SYSTEM.slice(1, 4);
const getPointsDisplay = (points?: number | string) =>
  points === undefined
    ? ""
    : chalk.black.bgWhite(
        `${twoDigitScores.includes(points) ? " " : "  "}${points} `
      );

const getEventDisplay = (event?: string) =>
  event ? chalk.bold.black.bgYellowBright(` ${event} `) : "";

export default scoreboard;
