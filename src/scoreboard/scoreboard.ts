import { POINT_SYSTEM } from "../game/constants";
import { Match, ScoreLine } from "../types";
import { clearScoreboard, matchScore } from "./logs";
import { createScorelines, trimScores } from "./util";

/**
 * After every point is played, update the score shown in the logs.
 */
const scoreboard = (match: Match) => {
  clearScoreboard();
  const scores = createScorelines(match);
  const trimmedScores = trimScores(scores, match);
  const [p1Scoreboard, p2Scoreboard] = trimmedScores.map((score) =>
    getPlayerScoreboard(score)
  );

  matchScore(`\n${p1Scoreboard}\n${p2Scoreboard}`); // TODO: make it look better with chalk etc.
};



const twoDigitScores = POINT_SYSTEM.slice(1, 4);

/**
 * Create a string to be displayed on the logs for each player.
 */
const getPlayerScoreboard = (player: ScoreLine) => {
  const { name, event = "", ...scores } = player;
  const playerName = name + " ".repeat(20 - name.length);
  const gameInfo = Object.values(scores)
    .map((score) => `${twoDigitScores.includes(score) ? " " : "  "}${score}  `)
    .join("|");

  return playerName + gameInfo + event;
};

export default scoreboard;
