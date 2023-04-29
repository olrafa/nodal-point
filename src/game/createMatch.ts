import { MAX_ADVANTAGE, MIN_ADVANTAGE, SERVING_ADVANTAGE } from "./constants";
import { Match, Player, PlayerScore } from "../types";

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

// How much we will favor the serving player
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
