import { POINT_SYSTEM } from "./constants";
import { Match, Player, PlayerScore } from "./types";

export const printScoreBoard = (match: Match, isTieBreak = false) => {
  const scores = [
    createScoreLine(match.p1, isPlayerServing(match.p1, match), isTieBreak),
    createScoreLine(match.p2, isPlayerServing(match.p2, match), isTieBreak),
  ];

  const trimmedScore = scores.map((score) => {
    if (match.set === 1) {
      const { S1, S2, S3, ...info } = score;
      return info;
    }
    if (match.set === 2) {
      const { S2, S3, ...info } = score;
      return info;
    }
    if (match.set === 3) {
      const { S3, ...info } = score;
      return info;
    }
    if (!match.ongoing) {
      const { games, points, service, ...info } = score;
      if (!match.p1.gamesS3 && !match.p2.gamesS3) {
        const { S3, ...finalScore } = info;
        return finalScore;
      }
      return info;
    }
  });

  console.table(trimmedScore);
};

const isPlayerServing = (player: Player, match: Match) =>
  match.serving.lastName === player.lastName;

const createScoreLine = (
  player: PlayerScore,
  serving: boolean,
  isTieBreak: boolean
) => ({
  name: `${player.lastName} (${player.ranking})`,
  S1: player.gamesS1,
  S2: player.gamesS2,
  S3: player.gamesS3,
  games: player.games,
  points: isTieBreak ? player.points : POINT_SYSTEM[player.points],
  ...(serving && { service: "*" }),
});
