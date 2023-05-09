import createMatch from "./game/createMatch";
import playMatch from "./game/playMatch";
import { getRandomPlayers } from "./game/util";
import { logMatchWon, logPlayers } from "./scoreboard/logs";
import getWtaRankings from "./scraper";

// Entry point of the app. Pick two random players, create a match and play.
const playRandomMatch = async () => {
  const currentPlayers = await getWtaRankings();
  const [firstPlayer, secondPlayer] = getRandomPlayers(currentPlayers);

  const match = createMatch(firstPlayer, secondPlayer);
  setTimeout(() => logPlayers(match), 1500);
  setTimeout(
    () => playMatch(match).then((winner) => logMatchWon(winner)),
    3000
  );
};

playRandomMatch();
