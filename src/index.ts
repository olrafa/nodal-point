import createMatch from "./createMatch";
import playMatch from "./playMatch";
import { getRandomPlayers } from "./util";

const playRandomGame = () => {
  const [firstPlayer, secondPlayer] = getRandomPlayers();

  const match = createMatch(firstPlayer, secondPlayer);
  console.log(match);

  playMatch(match);

};

playRandomGame();
