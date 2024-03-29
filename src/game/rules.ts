import { PlayerScore } from "../types";

import {
  MAX_GAMES_FOR_SET,
  MIN_GAME_DIFFERENCE,
  MIN_GAMES_FOR_SET,
  MIN_POINT_DIFFERENCE,
  MIN_POINTS_FOR_GAME,
  MIN_POINTS_FOR_TIE_BREAK,
  SETS_TO_WIN,
} from "./constants";

/**
 * Each point is decided from a random number between 0 and 100.
 * Server will win if number is between 1 and their "servingEdge",
 * or what is the chance of winning the point when they're serving.
 */
export const getPointWinner = (
  server: PlayerScore,
  receiver: PlayerScore
): PlayerScore => {
  // select a number between 1 and 100.
  const randomNumber = Math.floor(Math.random() * 100) + 1;
  // If number is within range of server edge, she wins the point.
  return randomNumber <= server.servingEdge ? server : receiver;
};

/**
 * Does any of the player have enough points to win the game?
 * On a tie break, the amount of points needed will be different.
 */
export const isGameOver = (
  pointsP1: number,
  pointsP2: number,
  isTieBreak = false
): boolean => {
  const minPoints = isTieBreak ? MIN_POINTS_FOR_TIE_BREAK : MIN_POINTS_FOR_GAME;
  return (
    Math.abs(pointsP1 - pointsP2) >= MIN_POINT_DIFFERENCE &&
    (pointsP1 >= minPoints || pointsP2 >= minPoints)
  );
};

/**
 * Who scored more points
 */
export const getGameWinner = (p1: PlayerScore, p2: PlayerScore) =>
  p1.points > p2.points ? p1 : p2;

/**
 * Does any of the player have enough points to win the set?
 */
export const isSetOver = (gamesP1: number, gamesP2: number): boolean =>
  (Math.abs(gamesP1 - gamesP2) >= MIN_GAME_DIFFERENCE &&
    (gamesP1 === MIN_GAMES_FOR_SET || gamesP2 === MIN_GAMES_FOR_SET)) ||
  gamesP1 === MAX_GAMES_FOR_SET ||
  gamesP2 === MAX_GAMES_FOR_SET;

/**
 * Who won more games
 */
export const getSetWinner = (p1: PlayerScore, p2: PlayerScore) =>
  p1.games > p2.games ? p1 : p2;

/**
 * Did anyone win two sets?
 */
export const isMatchOver = (setsP1: number, setsP2: number) =>
  setsP1 === SETS_TO_WIN || setsP2 === SETS_TO_WIN;

/**
 * Which player won two sets
 */
export const getMatchWinner = (p1: PlayerScore, p2: PlayerScore) =>
  [p1, p2].find(({ sets }) => sets === SETS_TO_WIN);

/**
 * Is the current game a tie break
 */
export const getIsTieBreak = (p1: PlayerScore, p2: PlayerScore): boolean =>
  p1.games === MIN_GAMES_FOR_SET && p2.games === MIN_GAMES_FOR_SET;
