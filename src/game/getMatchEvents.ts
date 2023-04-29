import {
  BREAK_POINT,
  MATCH_POINT,
  MAX_GAMES_FOR_SET,
  MIN_GAMES_FOR_SET,
  MIN_POINTS_FOR_GAME,
  MIN_POINTS_FOR_TIE_BREAK,
  MIN_POINT_DIFFERENCE,
  SET_POINT,
} from "./constants";
import { PlayerScore } from "../types";

const getMatchEvents = (
  player: PlayerScore,
  opponent: PlayerScore,
  isServing: boolean
): string | undefined => {
  const isTieBreak =
    player.games === MIN_GAMES_FOR_SET && opponent.games === MIN_GAMES_FOR_SET;
  const gamesNeeded = isTieBreak ? MAX_GAMES_FOR_SET : MIN_GAMES_FOR_SET;
  const pointsNeeded = isTieBreak
    ? MIN_POINTS_FOR_TIE_BREAK
    : MIN_POINTS_FOR_GAME;

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
