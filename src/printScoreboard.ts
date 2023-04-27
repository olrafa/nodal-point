import { POINT_SYSTEM } from "./constants";
import { Match, Player, PlayerScore } from "./types";

export const printScoreBoard = (match: Match, isTieBreak = false) => {
  const score = [
    createScoreLine(match.p1, isPlayerServing(match.p1, match), isTieBreak),
    createScoreLine(match.p2, isPlayerServing(match.p2, match), isTieBreak),
  ];
  console.table(score);
};

const isPlayerServing = (player: Player, match: Match) =>
  match.serving.lastName === player.lastName;

const createScoreLine = (
  player: PlayerScore,
  serving: boolean,
  isTieBreak: boolean
) => ({
  player: `${player.lastName} (${player.ranking})`,
  s1: player.gamesS1,
  s2: player.gamesS2,
  s3: player.gamesS3,
  games: player.games,
  points: isTieBreak ? player.points : POINT_SYSTEM[player.points],
  ...(serving && { service: "*" }),
});
