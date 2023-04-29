import createMatch from "./game/createMatch";
import { logPlayers } from "./scoreboard/logs";
import playMatch from "./playMatch";
import { getRandomPlayers } from "./game/util";

const playRandomMatch = () => {
  const [firstPlayer, secondPlayer] = getRandomPlayers();

  const match = createMatch(firstPlayer, secondPlayer);

  setTimeout(() => {
    logPlayers(match);
    playMatch(match);
  }, 2000);
};

playRandomMatch();
