import {
  MAX_GAMES_FOR_SET,
  MIN_GAMES_FOR_SET,
  MIN_GAME_DIFFERENCE,
  MIN_POINTS_FOR_GAME,
  MIN_POINTS_FOR_TIE_BREAK,
  MIN_POINT_DIFFERENCE,
  SETS_TO_WIN,
} from "./constants";
import { PlayerScore } from "./types";

export const isGameOver = (
  pointsP1: number,
  pointsP2: number,
  isTieBreak = false
): boolean => {
  const minPoints = isTieBreak ? MIN_POINTS_FOR_TIE_BREAK : MIN_POINTS_FOR_GAME;
  return (
    (pointsP1 >= minPoints && pointsP1 - pointsP2 >= MIN_POINT_DIFFERENCE) ||
    (pointsP2 >= minPoints && pointsP2 - pointsP1 >= MIN_POINT_DIFFERENCE)
  );
};

export const getGameWinner = (p1: PlayerScore, p2: PlayerScore) =>
  p1.points > p2.points ? p1 : p2;

export const isSetOver = (gamesP1: number, gamesP2: number): boolean =>
  (gamesP1 === MIN_GAMES_FOR_SET && gamesP1 - gamesP2 >= MIN_GAME_DIFFERENCE) ||
  (gamesP2 === MIN_GAMES_FOR_SET && gamesP2 - gamesP1 >= MIN_GAME_DIFFERENCE) ||
  gamesP1 === MAX_GAMES_FOR_SET ||
  gamesP2 === MAX_GAMES_FOR_SET;

export const getSetWinner = (p1: PlayerScore, p2: PlayerScore) =>
  p1.games > p2.games ? p1 : p2;

export const isMatchOver = (setsP1: number, setsP2: number) =>
  setsP1 === SETS_TO_WIN || setsP2 === SETS_TO_WIN;

export const getMatchWinner = (p1: PlayerScore, p2: PlayerScore) =>
  [p1, p2].find(({ sets }) => sets === SETS_TO_WIN);
