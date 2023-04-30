import {
  BREAK_POINT,
  GAMES_TO_GO_FOR_SEVEN,
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

/**
 * After each point, check if there is something extra to log on the player's scoreboard
 * In this case, Break Point, Set Point and Match Point.
 * @param player
 * @param opponent
 * @param isServing
 * @returns
 */
const getMatchEvents = (
  player: PlayerScore,
  opponent: PlayerScore,
  isServing: boolean
): string | undefined => {
  // It will be a set point or match point, depending on how many games are needed in that set.
  // If each player won five games, we go for 7, otherwise 6.
  const gamesNeeded =
    player.games >= GAMES_TO_GO_FOR_SEVEN &&
    opponent.games >= GAMES_TO_GO_FOR_SEVEN
      ? MAX_GAMES_FOR_SET
      : MIN_GAMES_FOR_SET;

  // Get the points that are needed to win that game.
  const pointsNeeded = getPointsNeeded(player, opponent);

  // Match point will always take precedence over set point and break point.
  if (getHasMatchPoint(player, opponent, gamesNeeded, pointsNeeded)) {
    return MATCH_POINT;
  }
  if (getHasSetPoint(player, opponent, gamesNeeded, pointsNeeded)) {
    return SET_POINT;
  }
  // There is no log for "Game point", unless player is not serving - then it's a "Break point"
  if (getHasGamePoint(player, opponent, pointsNeeded) && !isServing) {
    return BREAK_POINT;
  }
  return undefined;
};

/**
 * The amount of points needed to win a game varies according to
 * if it's a tie break, advantage etc.
 * @param player
 * @param opponent
 * @returns
 */
const getPointsNeeded = (player: PlayerScore, opponent: PlayerScore) => {
  const { points: playerPoints, games: playerGames } = player;
  const { points: oppPoints, games: oppGames } = opponent;
  const isTieBreak =
    playerGames === MIN_GAMES_FOR_SET && oppGames === MIN_GAMES_FOR_SET;

  if (isTieBreak) {
    if (oppPoints >= MIN_POINTS_FOR_TIE_BREAK - 1) {
      return oppPoints + 2;
    }
    return MIN_POINTS_FOR_TIE_BREAK;
  }
  const isAdvantage = playerPoints === 4 && oppPoints === 3;
  if (isAdvantage) {
    return POINTS_FOR_WINNING_ON_ADVANTAGE;
  }
  return MIN_POINTS_FOR_GAME;
};

/**
 * Check if all of the conditions are true, if yes then winning the next point will mean win the match.
 * @param player
 * @param opponent
 * @param games
 * @param points
 * @returns
 */
const getHasMatchPoint = (
  player: PlayerScore,
  opponent: PlayerScore,
  games: number,
  points: number
): boolean =>
  player.sets === 1 && getHasSetPoint(player, opponent, games, points);

/**
 * * Check if all of the conditions are true, if yes then winning the next point will mean win the set.
 * @param player
 * @param opponent
 * @param games
 * @param points
 * @returns
 */
const getHasSetPoint = (
  player: PlayerScore,
  opponent: PlayerScore,
  games: number,
  points: number
): boolean =>
  player.games + 1 === games && getHasGamePoint(player, opponent, points);

/**
 * Check if winning the next point will mean winning the game.
 * @param player
 * @param opponent
 * @param points
 * @returns
 */
const getHasGamePoint = (
  player: PlayerScore,
  opponent: PlayerScore,
  points: number
) =>
  player.points + 1 === points &&
  player.points + 1 - opponent.points >= MIN_POINT_DIFFERENCE;

export default getMatchEvents;
