import createMatch from "./game/createMatch";
import playMatch from "./game/playMatch";
import playTournament from "./game/playTournament";
import {
  initializeMatchEvent,
  initializeMatchScore,
  initializeMatchTitle,
  logMatchWon,
  logPlayers,
} from "./scoreboard/logs";
import { WTA_PLAYERS } from "./tests/playersData";
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

/* const startMatch = async () => {
  const players = await getUserInputs();

  const match = createMatch(players);

  initializeMatchTitle();
  initializeMatchScore();
  initializeMatchEvent();

  setTimeout(() => logPlayers(match), 1500);
  setTimeout(
    () => playMatch(match).then((winner) => logMatchWon(winner)),
    3000
  );
};

startMatch(); */
