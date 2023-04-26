import { Match, Player, PlayerScore } from "./types";
import { selectServer, switchServe } from "./util";

const playMatch = (match: Match): void => {
  match.set = 1;
  match.game = 1;
  match.ongoing = true;
  playGame(match);
};

const playGame = (match: Match) => {
  const isFirstGameInMatch = match.game === 1 && match.set === 1;
  match.serving = isFirstGameInMatch ? selectServer(match) : switchServe(match);
  match.receiving = match.serving === match.p1 ? match.p2 : match.p1;
  playPoint(match.serving, match.receiving);
  console.log(match);
};

const playPoint = (server: PlayerScore, receiver: PlayerScore): void => {
  // select a number between 1 and 100.
  const randomNumber = Math.floor(Math.random() * 100) + 1;
  randomNumber <= server.servingEdge ? server.points++ : receiver.points++;
};

export default playMatch;