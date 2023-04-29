import { POINT_SYSTEM } from "./constants";
import { Match, Player, PlayerScore, ScoreLine } from "./types";
import { clearScoreBoard, matchScore } from "./logs";
import getMatchEvents from "./getMatchEvents";
import { getPlayerScoreBoard, trimScoreBoard } from "./getPlayerScoreBoard";

export const scoreBoards = (match: Match, isTieBreak = false) => {
  clearScoreBoard();
  const scores = createScoreLines(match, isTieBreak);
  const { p1, p2, set, ongoing } = match;
  const isFirstPointOnGame = !p1.points && !p2.points;
  const isFirstGameOnSet = !p1.games && !p2.games;

  const trimmedScore = scores.map((score) =>
    trimScoreBoard(score, set, ongoing, isFirstGameOnSet, isFirstPointOnGame)
  );
  const [p1ScoreBoard, p2Scoreboard] = trimmedScore.map((score) =>
    getPlayerScoreBoard(score)
  );

  matchScore("\n", p1ScoreBoard, "\n", p2Scoreboard); // TODO: make it look better with chalk etc.
};

const createScoreLines = (
  { p1, p2, ongoing, serving }: Match,
  isTieBreak: boolean
) =>
  [p1, p2].map((player) =>
    createScoreLine(
      player,
      getOpponent(player, p1, p2),
      isPlayerServing(player, ongoing, serving),
      isTieBreak
    )
  );

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
