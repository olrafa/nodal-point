import { POINT_SYSTEM } from "./constants";
import { ScoreLine } from "./types";

export const trimScoreBoard = (
  score: ScoreLine,
  set: number,
  isMatchOngoing: boolean,
  isFirstGameOnSet: boolean,
  isFirstPointOnGame: boolean
): ScoreLine => {
   // As seen on TV, just show games and points once they begin.
   isFirstGameOnSet && delete score.games;
   isFirstPointOnGame && delete score.points;

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

export const getPlayerScoreBoard = (player: ScoreLine) => {
  const { name, event = "", ...scores } = player;
  const playerName = name + " ".repeat(25 - name.length);
  const gameInfo = Object.values(scores).map(
    (score) => `${twoDigitScores.includes(score) ? " " : "  "}${score}  `
  );

  return playerName + gameInfo + event;
};
