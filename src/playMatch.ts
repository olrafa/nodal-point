import { MIN_GAMES_FOR_SET } from "./game/constants";
import {
  clearEvent,
  clearTitle,
  logDeuce,
  logGameWon,
  logMatchFinished,
  logMatchInPlay,
  logMatchWon,
  logSetWon,
} from "./scoreboard/logs";
import scoreboard from "./scoreboard/scoreboard";
import {
  getGameWinner,
  getMatchWinner,
  getSetWinner,
  isGameOver,
  isMatchOver,
  isSetOver,
} from "./game/rules";
import { Match } from "./types";
import { updateService } from "./game/util";

const playMatch = (match: Match): void => {
  match.ongoing = true;
  clearTitle();
  logMatchInPlay();
  playSet(match);
};

const playSet = (match: Match): void => {
  match.set++;
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
  // Clear event line from logs.
  clearEvent();
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
  match.p1.points = 0;
  match.p2.points = 0;
  logGameWon(gameWinner);

  if (isSetOver(match.p1.games, match.p2.games)) {
    finishSet(match);
  } else {
    updateScore(match);
    setTimeout(() => playGame(match), 1500);
  }
};

const finishSet = (match: Match): void => {
  updateSetScores(match);
  const setWinner = getSetWinner(match.p1, match.p2);
  setWinner.sets++;
  match.p1.games = 0;
  match.p2.games = 0;
  logSetWon(setWinner);

  if (isMatchOver(match.p1.sets, match.p2.sets)) {
    finishMatch(match);
  } else {
    setTimeout(() => playSet(match), 1500);
  }
};

const finishMatch = (match: Match) => {
  match.ongoing = false;
  logMatchFinished();
  match.winner = getMatchWinner(match.p1, match.p2);
  match.winner && logMatchWon(match.winner);
  scoreboard(match);
};

const updateScore = (match: Match, isTieBreak = false) => {
  !isTieBreak && updateDeuce(match);
  scoreboard(match, isTieBreak);
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
    logDeuce();
  }
};

export default playMatch;
