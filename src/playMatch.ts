import { MIN_GAMES_FOR_SET } from "./constants";
import { FILL_LOGS, matchEvent, matchScore } from "./logs";
import { printScoreBoard } from "./printScoreboard";
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
  matchScore("");
  playSet(match);
};

const playSet = (match: Match): void => {
  match.set++;
  match.p1.games = 0;
  match.p2.games = 0;
  playGame(match);
};

const playGame = (match: Match) => {
  updateService(match);
  const isTieBreak =
    match.p1.games === MIN_GAMES_FOR_SET &&
    match.p2.games === MIN_GAMES_FOR_SET;
  playPoint(match, isTieBreak);
};

const playPoint = (match: Match, isTieBreak = false): void => {
  matchEvent(`\n${FILL_LOGS}\n`);
  // TODO: add comments for break point, set point, match point, tie break.
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
    updateScore(match, isTieBreak);
    setTimeout(() => playPoint(match, isTieBreak), 1500);
  }
};

const finishGame = (match: Match): void => {
  const gameWinner = getGameWinner(match.p1, match.p2);
  gameWinner.games++;
  matchEvent(`\nGame for ${gameWinner.lastName}.\n`);

  if (isSetOver(match.p1.games, match.p2.games)) {
    finishSet(match);
  } else {
    match.p1.points = 0;
    match.p2.points = 0;
    updateScore(match);
    setTimeout(() => playGame(match), 1500);
  }
};

const finishSet = (match: Match): void => {
  const setWinner = getSetWinner(match.p1, match.p2);
  setWinner.sets++;
  matchEvent(`\n${setWinner.lastName} wins set.\n`);

  updateSetScores(match);

  if (isMatchOver(match.p1.sets, match.p2.sets)) {
    finishMatch(match);
  } else {
    setTimeout(() => playSet(match), 1500);
  }
};

const finishMatch = (match: Match) => {
  match.set = 0;
  match.ongoing = false;
  match.winner = getMatchWinner(match.p1, match.p2);
  matchEvent(`\n${match.winner?.firstName} ${match.winner?.lastName} wins!\n`);
  printScoreBoard(match);
};

const updateScore = (match: Match, isTieBreak = false) => {
  !isTieBreak && updateDeuce(match);
  printScoreBoard(match, isTieBreak);
};

const updateSetScores = (match: Match) => {
  if (match.set === 1) {
    match.p1.gamesS1 = match.p1.games;
    match.p2.gamesS1 = match.p2.games;
  }
  if (match.set === 2) {
    match.p1.gamesS2 = match.p1.games;
    match.p2.gamesS2 = match.p2.games;
  }
  if (match.set === 3) {
    match.p1.gamesS3 = match.p1.games;
    match.p2.gamesS3 = match.p2.games;
  }
};

const updateDeuce = ({ p1, p2 }: Match) => {
  if (p1.points > 3 && p2.points > 3) {
    p1.points = 3;
    p2.points = 3;
  }
};

export default playMatch;
