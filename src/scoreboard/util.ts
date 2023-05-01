import { POINT_SYSTEM } from "../game/constants";
import getMatchEvents from "../game/getMatchEvents";
import { getIsTieBreak } from "../game/rules";
import { Match, Player, PlayerScore, ScoreLine } from "../types";

export const createScorelines = ({ p1, p2, ongoing, serving }: Match) => {
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
): ScoreLine => {
  const event = getMatchEvents(player, opponent, serving);
  return {
    name: `${player.lastName} (${player.ranking})${serving ? "*" : ""}`,
    S1: player.gamesS1,
    S2: player.gamesS2,
    S3: player.gamesS3,
    games: player.games,
    points: isTieBreak ? player.points : POINT_SYSTEM[player.points],
    ...(event && { event }),
  };
};

const getOpponent = (
  player: PlayerScore,
  p1: PlayerScore,
  p2: PlayerScore
) => (player === p1 ? p2 : p1);

/**
 * When showing the scores on the logs, just show relevant information.
 * For example, don't show 2nd set is 0-0 during the first set,
 * don't show points when a game ends etc.
 */
export const trimScores = (scores: ScoreLine[], match: Match): ScoreLine[] => {
  const { p1, p2, set, ongoing } = match;
  const isFirstPointOnGame = !p1.points && !p2.points;
  const isFirstGameOnSet = !p1.games && !p2.games;

  return scores.map((score) => {
    // As seen on TV, just show games and points once they begin.
    isFirstGameOnSet && delete score.games;
    isFirstPointOnGame && delete score.points;

    // Also just show scores for completed sets after set is completed (duh)
    if (set === 0 || set === 1) {
      const { S1, S2, S3, ...info } = score;
      return info;
    }
    if (set === 2) {
      const { S2, S3, ...info } = score;
      return info;
    }
    if (set === 3 && ongoing) {
      const { S3, ...info } = score;
      return info;
    }
    if (!ongoing) {
      const { games, points, ...info } = score;
      if (set !== 3) {
        const { S3, ...finalScore } = info;
        return finalScore;
      }
      return info;
    }
    return score;
  });
};
