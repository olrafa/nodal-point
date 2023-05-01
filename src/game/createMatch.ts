import { Match, Player, PlayerScore } from "../types";

import { MAX_ADVANTAGE, MIN_ADVANTAGE, SERVING_ADVANTAGE } from "./constants";

/**
 * Initialize the players and match attributes.
 * @param playerOne
 * @param playerTwo
 * @returns
 */
const createMatch = (playerOne: Player, playerTwo: Player): Match => {
  const player1 = initializePlayer(playerOne, playerTwo);
  const player2 = initializePlayer(playerTwo, playerOne);

  return {
    p1: player1,
    p2: player2,
    set: 0,
    ongoing: false,
    serving: player1,
    receiving: player2,
  };
};

/**
 * Get a player and add an empty score, also calculate what will be their
 * serving edge, depending on the opponent.
 * @param player
 * @param opponent
 * @returns
 */
const initializePlayer = (player: Player, opponent: Player): PlayerScore => ({
  ...player,
  sets: 0,
  games: 0,
  points: 0,
  servingEdge: createServingEdge(player, opponent),
  gamesS1: 0,
  gamesS2: 0,
  gamesS3: 0,
});

/**
 * Each point will be decided from a random number between 0 and 100.
 * Server will win if number is between 1 and this value.
 * This value is based in the ranking difference between the two players,
 * So server is always favored, but it will be more favored or less depending on this value.
 * @param player
 * @param opponent
 * @returns
 */
const createServingEdge = (player: Player, opponent: Player): number => {
  const difference = Math.floor((player.ranking - opponent.ranking) / 2);
  const servingEdge = SERVING_ADVANTAGE - difference;
  if (servingEdge > MAX_ADVANTAGE) {
    return MAX_ADVANTAGE;
  }
  if (servingEdge < MIN_ADVANTAGE) {
    return MIN_ADVANTAGE;
  }
  return servingEdge;
};

export default createMatch;
