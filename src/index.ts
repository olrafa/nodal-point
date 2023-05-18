import createMatch from "./game/createMatch";
import playMatch from "./game/playMatch";
import {
  initializeMatchEvent,
  initializeMatchScore,
  initializeMatchTitle,
  logMatchWon,
  logPlayers,
} from "./scoreboard/logs";
import getUserInputs from "./inputs";

// Entry point of the app. Pick two random players, create a match and play.
const startMatch = async () => {
  const [firstPlayer, secondPlayer] = await getUserInputs();

  const match = createMatch(firstPlayer, secondPlayer);

  initializeMatchTitle();
  initializeMatchScore();
  initializeMatchEvent();

  setTimeout(() => logPlayers(match), 1500);
  setTimeout(
    () => playMatch(match).then((winner) => logMatchWon(winner)),
    3000
  );
};

startMatch();
