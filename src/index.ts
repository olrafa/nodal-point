import createMatch from "./createMatch";
import { logPlayers } from "./logs";
import playMatch from "./playMatch";
import { getRandomPlayers } from "./util";

const playRandomGame = () => {
  const [firstPlayer, secondPlayer] = getRandomPlayers();

  const match = createMatch(firstPlayer, secondPlayer);

  setTimeout(() => {
    logPlayers(match);
    playMatch(match);
  }, 2000);
};

playRandomGame();
