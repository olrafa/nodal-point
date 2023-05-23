import {
  clearEvent,
  clearScoreboard,
  clearTitle,
  logDeuce,
  logGameWon,
  logMatchFinished,
  logMatchInPlay,
  logMatchWon,
  logPlayers,
  logSetWon,
} from "../scoreboard/logs";
import scoreboard from "../scoreboard/scoreboard";
import { Match, Player } from "../types";

import {
  getGameWinner,
  getIsTieBreak,
  getMatchWinner,
  getPointWinner,
  getSetWinner,
  isGameOver,
  isMatchOver,
  isSetOver,
} from "./rules";
import { updateService } from "./util";

/**
 * The game logic is here, from start to finish of a match
 * @param match a new match with zeroed score
 * @returns a Promise that will resolve to a winning player
 */
const playMatch = (match: Match): Promise<Player> =>
  new Promise((resolve) => {
    logPlayers(match);
    clearScoreboard();
    clearEvent();
    const { p1, p2 } = match;
    match.ongoing = true;

    // Increase set number, start a new game.
    const playSet = () => {
      match.set++;
      playGame();
    };

    // Update who's serving and start the next game.
    const playGame = () => {
      updateService(match);
      playPoint();
    };

    const playPoint = () => {
      // Clear event line from logs.
      clearEvent();
      const { serving, receiving } = match;
      // in a tie break change service after the first point, then every two points.
      const isTieBreak = getIsTieBreak(p1, p2);
      isTieBreak &&
        (serving.points + receiving.points) % 2 &&
        updateService(match);

      const pointWinner = getPointWinner(serving, receiving);
      pointWinner.points++;

      if (isGameOver(serving.points, receiving.points, isTieBreak)) {
        finishGame();
      } else {
        // keep playing points until game is finished.
        updateScore(match, isTieBreak);
        setTimeout(() => playPoint(), 1500);
      }
    };

    // Increase the game count of the game winner, clear the points, see what's next
    const finishGame = () => {
      const gameWinner = getGameWinner(p1, p2);
      gameWinner.games++;
      p1.points = 0;
      p2.points = 0;
      logGameWon(gameWinner);

      if (isSetOver(p1.games, p2.games)) {
        finishSet();
      } else {
        updateScore(match);
        setTimeout(() => playGame(), 1500);
      }
    };

    // Increase the set count of the game winner, clear the games, see what's next
    const finishSet = () => {
      updateSetScores(match);
      const setWinner = getSetWinner(p1, p2);
      setWinner.sets++;
      p1.games = 0;
      p2.games = 0;
      logSetWon(setWinner);

      if (isMatchOver(p1.sets, p2.sets)) {
        finishMatch();
      } else {
        updateScore(match);
        setTimeout(() => playSet(), 1500);
      }
    };

    // Set match as finished and log the winner and the final score.
    const finishMatch = () => {
      match.ongoing = false;
      logMatchFinished();
      scoreboard(match);
      match.winner = getMatchWinner(p1, p2);
      match.winner && logMatchWon(match.winner);
      setTimeout(() => match.winner && resolve(match.winner), 3000);
    };

    setTimeout(() => {
      clearTitle();
      logMatchInPlay();
      playSet();
    }, 3000);
  });

/**
 * After every point, update the scoreboard.
 * Also log `deuce` if it's the case
 */
const updateScore = (match: Match, isTieBreak = false) => {
  !isTieBreak && updateDeuce(match);
  scoreboard(match);
};

/**
 * After each set is finished, populate the games count for each player.
 * It will always be displayed in the scoreboard.
 */
const updateSetScores = ({ set, p1, p2 }: Match) => {
  if (set === 1) {
    p1.gamesS1 = p1.games;
    p2.gamesS1 = p2.games;
  }
  if (set === 2) {
    p1.gamesS2 = p1.games;
    p2.gamesS2 = p2.games;
  }
  if (set === 3) {
    p1.gamesS3 = p1.games;
    p2.gamesS3 = p2.games;
  }
};

/**
 * Every time players start going back and forth between
 * Deuce and Advantage, return the points to 3 (so log says 40),
 * and add the log for `deuce`.
 */
const updateDeuce = ({ p1, p2 }: Match) => {
  if (p1.points === 3 && p2.points === 3) {
    logDeuce();
  }
  if (p1.points > 3 && p2.points > 3) {
    p1.points = 3;
    p2.points = 3;
    logDeuce();
  }
};

export default playMatch;
