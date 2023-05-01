import { MIN_GAMES_FOR_SET } from "./constants";
import {
  clearEvent,
  clearTitle,
  logDeuce,
  logGameWon,
  logMatchFinished,
  logMatchInPlay,
  logMatchWon,
  logSetWon,
} from "../scoreboard/logs";
import scoreboard from "../scoreboard/scoreboard";
import {
  getGameWinner,
  getIsTieBreak,
  getMatchWinner,
  getSetWinner,
  isGameOver,
  isMatchOver,
  isSetOver,
} from "./rules";
import { Match } from "../types";
import { updateService } from "./util";

/**
 * Set match to ongoing, show it in the logs, start the first set
 * @param match
 */
const playMatch = (match: Match): void => {
  match.ongoing = true;
  clearTitle();
  logMatchInPlay();
  playSet(match);
};

/**
 * Increase set number, start a new game.
 * @param match
 */
const playSet = (match: Match): void => {
  match.set++;
  playGame(match);
};

/**
 * Update who's serving and start the next game.
 * @param match
 */
const playGame = (match: Match) => {
  updateService(match);
  playPoint(match);
};

/**
 * Each point is decided from a random number between 0 and 100.
 * Server will win if number is between 1 and their "servingEdge",
 * or what is the chance of winning the point when they're serving.
 * @param match
 */
const playPoint = (match: Match): void => {
  // Clear event line from logs.
  clearEvent();
  const { serving, receiving } = match;
  // in a tie break change service after the first point, then every two points.
  const isTieBreak = getIsTieBreak(match.p1, match.p2);
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
    setTimeout(() => playPoint(match), 1500);
  }
};

/**
 * Increase the game count of the game winner, clear the points, see what's next
 * @param match
 */
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

/**
 * Increase the set count of the game winner, clear the games, see what's next
 * @param match
 */
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

/**
 * Set match as finished and log the winner and the final score.
 * @param match
 */
const finishMatch = (match: Match) => {
  match.ongoing = false;
  logMatchFinished();
  match.winner = getMatchWinner(match.p1, match.p2);
  match.winner && logMatchWon(match.winner);
  scoreboard(match);
};

/**
 * After every point, update the scoreboard.
 * Also log `deuce` if it's the case
 * @param match
 * @param isTieBreak
 */
const updateScore = (match: Match, isTieBreak = false) => {
  !isTieBreak && updateDeuce(match);
  scoreboard(match);
};

/**
 * After each set is finished, populate the games count for each player.
 * It will always be displayed in the scoreboard.
 * @param match
 */
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

/**
 * Every time players start going back and forth between
 * Deuce and Advantage, return the points to 3 (so log says 40),
 * and add the log for `deuce`.
 */
const updateDeuce = ({ p1, p2 }: Match) => {
  if (p1.points > 3 && p2.points > 3) {
    p1.points = 3;
    p2.points = 3;
    logDeuce();
  }
};

export default playMatch;
