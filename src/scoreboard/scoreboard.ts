import { POINT_SYSTEM } from "../game/constants";
import { Match, Player, PlayerScore, ScoreLine } from "../types";
import { clearScoreboard, matchScore } from "./logs";
import getMatchEvents from "../game/getMatchEvents";
import { getIsTieBreak } from "../game/rules";

/**
 * After every point is played, update the score shown in the logs.
 */
const scoreboard = (match: Match) => {
  clearScoreboard();
  const scores = createScoreLines(match);
  const { p1, p2, set, ongoing } = match;
  const isFirstPointOnGame = !p1.points && !p2.points;
  const isFirstGameOnSet = !p1.games && !p2.games;

  const trimmedScore = scores.map((score) =>
    trimScoreboard(score, set, ongoing, isFirstGameOnSet, isFirstPointOnGame)
  );
  const [p1Scoreboard, p2Scoreboard] = trimmedScore.map((score) =>
    getPlayerScoreboard(score)
  );

  matchScore(`\n${p1Scoreboard}\n${p2Scoreboard}`); // TODO: make it look better with chalk etc.
};

const createScoreLines = (
  { p1, p2, ongoing, serving }: Match,
) => {
  const isTieBreak = getIsTieBreak(p1, p2);
  return [p1, p2].map((player) =>
    createScoreLine(
      player,
      getOpponent(player, p1, p2),
      isPlayerServing(player, ongoing, serving),
      isTieBreak
    )
  );
};

const isPlayerServing = (player: Player, ongoing: boolean, serving: Player) =>
  ongoing &&
  serving.firstName === player.firstName &&
  serving.lastName === player.lastName;

const createScoreLine = (
  player: PlayerScore,
  opponent: PlayerScore,
  serving: boolean,
  isTieBreak: boolean
): ScoreLine => ({
  name: `${player.lastName} (${player.ranking})${serving ? "*" : ""}`,
  S1: player.gamesS1,
  S2: player.gamesS2,
  S3: player.gamesS3,
  games: player.games,
  points: isTieBreak ? player.points : POINT_SYSTEM[player.points],
  event: getMatchEvents(player, opponent, serving),
});

const getOpponent = (player: PlayerScore, p1: PlayerScore, p2: PlayerScore) =>
  player === p1 ? p2 : p1;

/**
 * When showing the scores on the logs, just show relevant information.
 * For example, don't show 2nd set is 0-0 during the first set,
 * don't show points when a game ends etc.
 */
const trimScoreboard = (
  score: ScoreLine,
  set: number,
  isMatchOngoing: boolean,
  isFirstGameOnSet: boolean,
  isFirstPointOnGame: boolean
): ScoreLine => {
  // As seen on TV, just show games and points once they begin.
  isFirstGameOnSet && delete score.games;
  isFirstPointOnGame && delete score.points;

  console.log("set", set);

  // Also just show scores for completed sets after set is completed (duh)
  if (set === 1) {
    const { S1, S2, S3, ...info } = score;
    return info;
  }
  if (set === 2) {
    const { S2, S3, ...info } = score;
    return info;
  }
  if (set === 3) {
    const { S3, ...info } = score;
    return info;
  }
  if (!isMatchOngoing) {
    const { games, points, ...info } = score;
    if (set !== 3) {
      const { S3, ...finalScore } = info;
      return finalScore;
    }
    return info;
  }
  return score;
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
