import { table } from "console";
import { POINT_SYSTEM } from "./constants";
import { Match, Player, PlayerScore, ScoreLine } from "./types";
import { FILL_LOGS, matchScore } from "./logs";

export const printScoreBoard = (match: Match, isTieBreak = false) => {
  // Workaround to clear the score, otherwise the overwrite gets weird.
  matchScore(`\n\n${FILL_LOGS}\n${FILL_LOGS}\n`);
  const scores = [
    createScoreLine(match.p1, isPlayerServing(match.p1, match), isTieBreak),
    createScoreLine(match.p2, isPlayerServing(match.p2, match), isTieBreak),
  ];

  const trimmedScore = scores.map((score) => {
    // As seen on TV, just show games and points once they begin.
    if (!match.p1.games && !match.p2.games) {
      delete score.games;
    }
    if (!match.p1.points && !match.p2.points) {
      delete score.points;
    }

    // Also just show scores for completed sets after set is completed (duh)
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
      const { games, points, ...info } = score;
      if (!match.p1.gamesS3 && !match.p2.gamesS3) {
        const { S3, ...finalScore } = info;
        return finalScore;
      }
      return info;
    }
  });

  matchScore("\n", trimmedScore); // TODO: make it look better with chalk etc.
};

const isPlayerServing = (player: Player, match: Match) =>
  match.ongoing && match.serving.lastName === player.lastName;

const createScoreLine = (
  player: PlayerScore,
  serving: boolean,
  isTieBreak: boolean
): ScoreLine => ({
  name: `${player.lastName} (${player.ranking})${serving ? "*" : ""}`,
  S1: player.gamesS1,
  S2: player.gamesS2,
  S3: player.gamesS3,
  games: player.games,
  points: isTieBreak ? player.points : POINT_SYSTEM[player.points],
});
