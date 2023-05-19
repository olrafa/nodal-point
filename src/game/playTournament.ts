import { Match, Player, TournamentPlayers } from "../types";

import createMatch from "./createMatch";
import playMatch from "./playMatch";
import { generatePlayerPairs } from "./util";

const playTournament = async (players: TournamentPlayers): Promise<Player> => {
  const firstGroups = generatePlayerPairs(players);
  const winners = await playRound(firstGroups);
  return winners.length === 1
    ? winners[0]
    : playTournament(winners as [Player, Player]);
};

const playRound = async (groups: [Player, Player][]): Promise<Player[]> => {
  const matches = groups.map((group) => createMatch(group));
  return await playMatches(matches);
};

const playMatches = async (matches: Match[]): Promise<Player[]> =>
  await matches.reduce(async (playedMatches: Promise<Player[]>, nextMatch) => {
    const results = await playedMatches;
    const result = await playMatch(nextMatch);
    results.push(result);
    return results;
  }, Promise.resolve([]));

export default playTournament;
