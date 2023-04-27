import { match } from "assert";
import {
  getGameWinner,
  getSetWinner,
  isGameOver,
  isMatchOver,
  isSetOver,
} from "./rules";
import { Match } from "./types";
import { selectServer, switchServe } from "./util";

const playMatch = (match: Match): void => {
  match.game = 1;
  match.ongoing = true;
  playGame(match);
};

const playSet = (match: Match): void => {
  match.set++;
  match.p1.games = 0;
  match.p2.games = 0;
  playGame(match);
};

const playGame = (match: Match) => {
  match.game++;
  match.p1.points = 0;
  match.p2.points = 0;
  const isFirstGameInMatch = match.game === 1 && match.set === 1;
  match.serving = isFirstGameInMatch ? selectServer(match) : switchServe(match);
  match.receiving = match.serving === match.p1 ? match.p2 : match.p1;
  playPoints(match);
};

const playPoints = (match: Match): void => {
  const { serving, receiving } = match;
  // select a number between 1 and 100.
  const randomNumber = Math.floor(Math.random() * 100) + 1;
  // If number is within range of server edge, she wins the point.
  randomNumber <= serving.servingEdge ? serving.points++ : receiving.points++;
  // keep playing points until game is finished.
  setTimeout(
    () =>
      isGameOver(serving.points, receiving.points)
        ? finishGame(match)
        : playPoints(match),
    500
  );
};

const finishGame = (match: Match): void => {
  const gameWinner = getGameWinner(match.p1, match.p2);
  gameWinner.games++;
  setTimeout(() =>
    isSetOver(match.p1.games, match.p2.games)
      ? finishSet(match)
      : playGame(match)
  );
};

const finishSet = (match: Match): void => {
  const setWinner = getSetWinner(match.p1, match.p2);
  setWinner.sets++;
  setTimeout(() =>
    isMatchOver(match.p1.sets, match.p2.sets)
      ? finishMatch(match)
      : playSet(match)
  );
};

const finishMatch = (match: Match) => {
  match.ongoing = false;
  console.log(match);
}

export default playMatch;
