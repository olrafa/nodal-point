import PLAYERS from "./players";
import { Match, PlayerScore } from "../types";

// create a game between two random players;
export const getRandomPlayers = () =>
  [...PLAYERS].sort(() => 0.5 - Math.random()).slice(0, 2);

export const updateService = (match: Match): void => {
  const isFirstGameInMatch =
    !match.p1.games && !match.p2.games && match.set === 1;
  match.serving = isFirstGameInMatch ? selectServer(match) : switchServe(match);
  match.receiving = match.serving === match.p1 ? match.p2 : match.p1;
};

// select a random server to start the game;
export const selectServer = (match: Match): PlayerScore => {
  const players = [match.p1, match.p2];
  const server = players[Math.floor(Math.random() * 2)];
  return server === match.p1 ? match.p1 : match.p2;
};

export const switchServe = (match: Match) =>
  match.serving === match.p1 ? match.p2 : match.p1;
