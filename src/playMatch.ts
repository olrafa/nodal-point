import { MIN_GAMES_FOR_SET, POINT_SYSTEM } from "./constants";
import {
  getGameWinner,
  getMatchWinner,
  getSetWinner,
  isGameOver,
  isMatchOver,
  isSetOver,
} from "./rules";
import { Match } from "./types";
import { updateService } from "./util";

const playMatch = (match: Match): void => {
  match.ongoing = true;
  playSet(match);
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
  updateService(match);
  const isTieBreak =
    match.p1.games === MIN_GAMES_FOR_SET &&
    match.p2.games === MIN_GAMES_FOR_SET;
  playPoint(match, isTieBreak);
};

const playPoint = (match: Match, isTieBreak = false): void => {
  const { serving, receiving } = match;
  // in a tie break change service after the first point, then every two points.
  isTieBreak && (serving.points + receiving.points) % 2 && updateService(match);
  // select a number between 1 and 100.
  const randomNumber = Math.floor(Math.random() * 100) + 1;
  // If number is within range of server edge, she wins the point.
  randomNumber <= serving.servingEdge ? serving.points++ : receiving.points++;

  if (isGameOver(serving.points, receiving.points, isTieBreak)) {
    finishGame(match);
  } else {
    // keep playing points until game is finished.
    updateScore(match);
    setTimeout(() => playPoint(match), 1000);
  }
};

const finishGame = (match: Match): void => {
  const gameWinner = getGameWinner(match.p1, match.p2);
  gameWinner.games++;
  console.log(`Game for ${gameWinner.lastName}.\n`);

  if (isSetOver(match.p1.games, match.p2.games)) {
    finishSet(match);
  } else {
    updateScore(match);
    setTimeout(() => playGame(match), 1000);
  }
};

const finishSet = (match: Match): void => {
  const setWinner = getSetWinner(match.p1, match.p2);
  setWinner.sets++;
  console.log(`${setWinner.lastName} wins set.\n`);

  updateSetScores(match);

  if (isMatchOver(match.p1.sets, match.p2.sets)) {
    finishMatch(match);
  } else {
    setTimeout(() => playSet(match), 1000);
  }
};

const finishMatch = (match: Match) => {
  match.ongoing = false;
  match.winner = getMatchWinner(match.p1, match.p2);
  updateScore(match);
  console.log(`${match.winner?.firstName} ${match.winner?.lastName} wins!`);
};

const updateScore = (match: Match) => {
  const { p1, p2 } = match;
  updateDeuce(match);

  console.log(p1.lastName, p1.sets, p1.games, POINT_SYSTEM[p1.points]);
  console.log(p2.lastName, p2.sets, p2.games, POINT_SYSTEM[p2.points]);
  console.log("\n");
};

const updateSetScores = (match: Match) => {
  switch (match.set) {
    case 1:
      match.p1.gamesS1 = match.p1.games;
      match.p2.gamesS1 = match.p2.games;
    case 2:
      match.p1.gamesS2 = match.p1.games;
      match.p2.gamesS2 = match.p2.games;
    case 3:
      match.p1.gamesS3 = match.p1.games;
      match.p2.gamesS3 = match.p2.games;
  }
};

const updateDeuce = ({ p1, p2 }: Match) => {
  if (p1.points > 3 && p2.points > 3) {
    p1.points = 3;
    p2.points = 3;
    console.log("Deuce");
  }
};

export default playMatch;
