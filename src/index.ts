import createMatch from "./createMatch";
import { matchTitle } from "./logs";
import playMatch from "./playMatch";
import { getRandomPlayers } from "./util";

const playRandomGame = () => {
  const [firstPlayer, secondPlayer] = getRandomPlayers();

  const match = createMatch(firstPlayer, secondPlayer);

  const { p1, p2 } = match;

  const [playerOne, playerTwo] = [p1, p2].map(
    ({ firstName, lastName, ranking }) =>
      `${firstName} ${lastName} (${ranking})`
  );

  setTimeout(() => {
    matchTitle(`\nMatch between ${playerOne} and ${playerTwo}.`);
    playMatch(match);
  }, 2000);
};

playRandomGame();
