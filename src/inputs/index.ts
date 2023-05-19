import inquirer from "inquirer";

import getRankedPlayers from "../scraper";
import { MAX_PLAYERS, ORGS } from "../scraper/constants";
import { Player, TournamentPlayers } from "../types";

const M = MAX_PLAYERS;

const getUserInputs = async (): Promise<TournamentPlayers> => {
  const organization = await getOrganization();
  const numPlayers = await getNumberOfPlayers();
  const availablePlayers = await getRankedPlayers(organization);
  const selectedPlayers = await getPlayersChoice(availablePlayers, numPlayers);
  return availablePlayers.filter(({ fullName }) =>
    selectedPlayers.includes(fullName)
  ) as TournamentPlayers;
};

const getOrganization = async (): Promise<"WTA" | "ATP"> =>
  await inquirer
    .prompt({
      type: "list",
      name: "organization",
      message:
        "Welcome to Nodal Point. Would you like to use players from WTA (Women) or ATP (Men)?",
      choices: ORGS,
      default: ORGS[0],
    })
    .then(
      ({ organization }) => ORGS.find((org) => org === organization) || ORGS[0]
    );

const tournamentAnswers = [
  { value: 2, name: "Single match" },
  { value: 4, name: "Tournament with 4 players" },
];

const getNumberOfPlayers = async (): Promise<number> =>
  await inquirer
    .prompt({
      type: "list",
      name: "playerCount",
      message:
        "Would you like to play a single match or a four-player tournament?",
      choices: tournamentAnswers,
      default: tournamentAnswers[0],
    })
    .then(({ playerCount }) => playerCount);

const getPlayersChoice = async (
  players: Player[],
  numPlayers: number
): Promise<string[]> =>
  await inquirer
    .prompt({
      type: "checkbox",
      name: "selectedPlayers",
      message: `These are the top ${M} ranked players. Select ${numPlayers} of them.`,
      choices: players.map(({ fullName }) => ({
        name: fullName,
        value: fullName,
      })),
      validate(answer) {
        if (answer.length !== numPlayers) {
          return `You must choose ${numPlayers} players.`;
        }
        return true;
      },
    })
    .then(({ selectedPlayers }) => selectedPlayers);

export default getUserInputs;
