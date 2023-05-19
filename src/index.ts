import playTournament from "./game/playTournament";
import {
  initializeMatchEvent,
  initializeMatchScore,
  initializeMatchTitle,
  logMatchWon,
} from "./scoreboard/logs";
import getUserInputs from "./inputs";

// Entry point of the app. Let users select players, then play tournament.
const startApp = async () => {
  const players = await getUserInputs();
  initializeMatchTitle();
  initializeMatchScore();
  initializeMatchEvent();

  playTournament(players).then((winner) => logMatchWon(winner));
};

startApp();
