import inquirer from "inquirer";

import getRankedPlayers from "../scraper";
import { MAX_PLAYERS, ORGS } from "../scraper/constants";
import { Player } from "../types";

const M = MAX_PLAYERS;

const getUserInputs = async (): Promise<Player[]> => {
  const organization = await getOrganization();
  const availablePlayers = await getRankedPlayers(organization);
  return await getPlayersChoice(availablePlayers);
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

const getPlayersChoice = async (players: Player[]): Promise<Player[]> =>
  await inquirer
    .prompt({
      type: "checkbox",
      name: "selectedPlayers",
      message: `These are the top ${M} ranked players. Select two of them for the match`,
      choices: players.map(({ fullName }) => fullName),
      validate(answer) {
        if (answer.length !== 2) {
          return "You must choose two players.";
        }
        return true;
      },
    })
    .then(({ selectedPlayers }) =>
      players.filter(({ fullName }) => selectedPlayers.includes(fullName))
    );

export default getUserInputs;
