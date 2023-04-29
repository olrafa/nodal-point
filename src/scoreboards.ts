import { POINT_SYSTEM } from "./constants";
import { Match, Player, PlayerScore, ScoreLine } from "./types";
import { clearScoreBoard, matchScore } from "./logs";
import getMatchEvents from "./getMatchEvents";

export const scoreBoards = (match: Match, isTieBreak = false) => {
  clearScoreBoard();
  const scores = createScoreLines(match, isTieBreak);
  const { p1, p2, set, ongoing } = match;

  const trimmedScore = scores.map((score) => {
    // As seen on TV, just show games and points once they begin.
    !p1.games && !p2.games && delete score.games;
    !p1.points && !p2.points && delete score.points;
    // Also just show events )Break Point, Set Point etc) when they are there.
    !score.event && delete score.event;

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
    if (!ongoing) {
      const { games, points, ...info } = score;
      if (!p1.gamesS3 && !p2.gamesS3) {
        const { S3, ...finalScore } = info;
        return finalScore;
      }
      return info;
    }
  });

  matchScore("\n", trimmedScore); // TODO: make it look better with chalk etc.
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
