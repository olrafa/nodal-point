import {
  BREAK_POINT,
  GAMES_FOR_EACH_TO_GO_FOR_MAX,
  MATCH_POINT,
  MAX_GAMES_FOR_SET,
  MIN_GAMES_FOR_SET,
  MIN_POINTS_FOR_GAME,
  MIN_POINTS_FOR_TIE_BREAK,
  MIN_POINT_DIFFERENCE,
  POINTS_FOR_WINNING_ON_ADVANTAGE,
  SET_POINT,
} from "./constants";
import { PlayerScore } from "../types";

const getMatchEvents = (
  player: PlayerScore,
  opponent: PlayerScore,
  isServing: boolean
): string | undefined => {
  const gamesNeeded =
    player.games >= GAMES_FOR_EACH_TO_GO_FOR_MAX &&
    opponent.games >= GAMES_FOR_EACH_TO_GO_FOR_MAX
      ? MAX_GAMES_FOR_SET
      : MIN_GAMES_FOR_SET;

  const isTieBreak =
    player.games === MIN_GAMES_FOR_SET && opponent.games === MIN_GAMES_FOR_SET;
  const isAdvantage = player.points === 4 && opponent.points === 3;

  const pointsNeeded = getPointsNeeded(
    isTieBreak,
    opponent.points,
    isAdvantage
  );

  if (getHasMatchPoint(player, opponent, gamesNeeded, pointsNeeded)) {
    return MATCH_POINT;
  }
  if (getHasSetPoint(player, opponent, gamesNeeded, pointsNeeded)) {
    return SET_POINT;
  }
  if (getHasGamePoint(player, opponent, pointsNeeded) && !isServing) {
    return BREAK_POINT;
  }
  return undefined;
};

const getPointsNeeded = (
  isTieBreak: boolean,
  opponentPoints: number,
  isAdvantage: boolean
) => {
  if (isTieBreak) {
    if (opponentPoints >= MIN_POINTS_FOR_TIE_BREAK - 1) {
      return opponentPoints + 2;
    }
    return MIN_POINTS_FOR_TIE_BREAK;
  }
  if (isAdvantage) {
    return POINTS_FOR_WINNING_ON_ADVANTAGE;
  }
  return MIN_POINTS_FOR_GAME;
};

const getHasMatchPoint = (
  player: PlayerScore,
  opponent: PlayerScore,
  games: number,
  points: number
): boolean =>
  player.sets === 1 && getHasSetPoint(player, opponent, games, points);

const getHasSetPoint = (
  player: PlayerScore,
  opponent: PlayerScore,
  games: number,
  points: number
): boolean =>
  player.games + 1 === games && getHasGamePoint(player, opponent, points);

const getHasGamePoint = (
  player: PlayerScore,
  opponent: PlayerScore,
  points: number
) =>
  player.points + 1 === points &&
  player.points + 1 - opponent.points >= MIN_POINT_DIFFERENCE;

export default getMatchEvents;
