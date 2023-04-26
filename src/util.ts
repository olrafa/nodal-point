import PLAYERS from "./players";
import { Match, Player, PlayerScore } from "./types";

// create a game between two random players;
// https://stackoverflow.com/questions/19269545/how-to-get-a-number-of-random-elements-from-an-array
export const getRandomPlayers = () =>
  [...PLAYERS].sort(() => 0.5 - Math.random()).slice(0, 2);

// select a random server to start the game;
export const selectServer = (match: Match): PlayerScore => {
  const players = [match.p1, match.p2];
  const server = players[Math.floor(Math.random() * 2)];
  return server === match.p1 ? match.p1 : match.p2;
};

export const switchServe = (match: Match) =>
  match.serving === match.p1 ? match.p2 : match.p1;
