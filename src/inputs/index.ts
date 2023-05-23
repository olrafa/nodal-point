import inquirer from "inquirer";

import { listPlayers } from "../scoreboard/logs";
import getRankedPlayers from "../scraper";
import { MAX_PLAYERS, ORGS } from "../scraper/constants";
import {
  Player,
  PlayerCount,
  PlayerSelection,
  TournamentPlayers,
} from "../types";

const M = MAX_PLAYERS;

const getUserInputs = async (): Promise<TournamentPlayers> => {
  const organization = await getOrganization();
  const numPlayers = await getNumberOfPlayers();
  const availablePlayers = await getRankedPlayers(organization);
  listPlayers(availablePlayers);
  const preferences = await getPlayerPreferences();
  return (await getPlayers(
    availablePlayers,
    preferences,
    numPlayers
  )) as TournamentPlayers;
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

const tournamentString = (players: number) =>
  `Tournament with ${players} players`;

const tournamentAnswers = [
  { value: 2, name: "Single match" },
  { value: 4, name: tournamentString(4) },
  { value: 8, name: tournamentString(8) },
  { value: 16, name: tournamentString(16) },
];

const getNumberOfPlayers = async (): Promise<PlayerCount> =>
  await inquirer
    .prompt({
      type: "list",
      name: "playerCount",
      message: "Would you like to play a single match or a tournament?",
      choices: tournamentAnswers,
      default: tournamentAnswers[0],
    })
    .then(({ playerCount }) => playerCount);

const preferencesAnswers = [
  { value: "top", name: "The top ranked players" },
  { value: "random", name: "Select randomly" },
  { value: "manual", name: "Select manually" },
];

const getPlayerPreferences = async (): Promise<PlayerSelection> =>
  await inquirer
    .prompt({
      type: "list",
      name: "preferences",
      message:
        "Above are the 16 top-ranked players here. How would you like to select them",
      choices: preferencesAnswers,
    })
    .then(({ preferences }) => preferences);

const getPlayers = async (
  players: Player[],
  method: PlayerSelection,
  count: PlayerCount
) => {
  switch (method) {
    case "top":
      return count === 16 ? players : players.slice(0, count);
    case "random":
      return players
        .sort(() => 0.5 - Math.random())
        .slice(0, count)
        .sort((a, b) => (a.ranking > b.ranking ? 1 : -1));
    default:
      return await getPlayersChoice(players, count);
  }
};

const getPlayersChoice = async (
  players: Player[],
  numPlayers: number
): Promise<Player[]> =>
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
    .then(({ selectedPlayers }) =>
      players.filter(({ fullName }) => selectedPlayers.includes(fullName))
    );

export default getUserInputs;
