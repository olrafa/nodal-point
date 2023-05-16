import { WTA_PLAYERS } from "../tests/playersData";
import { Match, Player, PlayerScore } from "../types";

/**
 * Create a game between two random players;
 */
export const getRandomPlayers = (currentPlayers?: Player[]) => {
  const players = currentPlayers || WTA_PLAYERS; // fallback to hardcoded WTA rankings.
  return players.sort(() => 0.5 - Math.random()).slice(0, 2);
};
/**
 * Select a random player to start serving, then just flip the server.
 */
export const updateService = (match: Match): void => {
  const isFirstGameInMatch =
    !match.p1.games && !match.p2.games && match.set === 1;
  match.serving = isFirstGameInMatch ? selectServer(match) : switchServe(match);
  match.receiving = match.serving === match.p1 ? match.p2 : match.p1;
};

const selectServer = (match: Match): PlayerScore => {
  const players = [match.p1, match.p2];
  const server = players[Math.floor(Math.random() * 2)];
  return server === match.p1 ? match.p1 : match.p2;
};

const switchServe = (match: Match) =>
  match.serving === match.p1 ? match.p2 : match.p1;
