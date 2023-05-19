import { Player } from "../types";

import { WTA_PLAYERS } from "./playersData";

/**
 * Create a game between two random players;
 */
const getRandomPlayers = (currentPlayers?: Player[]) => {
  const players = currentPlayers || WTA_PLAYERS; // fallback to hardcoded WTA rankings.
  return players.sort(() => 0.5 - Math.random()).slice(0, 2);
};

export default getRandomPlayers;
