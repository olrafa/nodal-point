import { MAX_ADVANTAGE, MIN_ADVANTAGE, SERVING_ADVANTAGE } from "./constants";
import { Match, Player, PlayerScore } from "./types";

const createMatch = (playerOne: Player, playerTwo: Player): Match => ({
  p1: initializePlayer(playerOne, playerTwo),
  p2: initializePlayer(playerTwo, playerOne),
  set: 0,
  game: 0,
  ongoing: false,
});

const initializePlayer = (player: Player, opponent: Player): PlayerScore => ({
  ...player,
  sets: 0,
  games: 0,
  points: 0,
  servingEdge: createServingEdge(player, opponent),
});

// How much we will favor the serving player
const createServingEdge = (player: Player, opponent: Player): number => {
  const difference = player.ranking - opponent.ranking;
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
