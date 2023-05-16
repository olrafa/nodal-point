import createMatch from "./game/createMatch";
import playMatch from "./game/playMatch";
import { getRandomPlayers } from "./game/util";
import { logMatchWon, logPlayers } from "./scoreboard/logs";
import { ORGS } from "./scraper/constants";
import getUserInputs from "./inputs";
import getRankedPlayers from "./scraper";

const findPlayers = async () => {
  const org = ORGS[Math.floor(Math.random() * 2)];
  return await getRankedPlayers(org);
};

// Entry point of the app. Pick two random players, create a match and play.
const playRandomMatch = async () => {
  const players = await findPlayers();
  const [firstPlayer, secondPlayer] = getRandomPlayers(players);

  const match = createMatch(firstPlayer, secondPlayer);
  setTimeout(() => logPlayers(match), 1500);
  setTimeout(
    () => playMatch(match).then((winner) => logMatchWon(winner)),
    3000
  );
};

getUserInputs();

// playRandomMatch();
