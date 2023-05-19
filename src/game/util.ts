import { Match, Player, PlayerScore, TournamentPlayers } from "../types";

/**
 * Select a random player to start serving, then just flip the server.
 */
export const updateService = (match: Match): void => {
  const isFirstGameInMatch =
    !match.p1.games && !match.p2.games && match.set === 1;
  match.serving = isFirstGameInMatch ? selectServer(match) : switchServe(match);
  match.receiving = match.serving === match.p1 ? match.p2 : match.p1;
};

const selectServer = (match: Match): PlayerScore => {
  const players = [match.p1, match.p2];
  const server = players[Math.floor(Math.random() * 2)];
  return server === match.p1 ? match.p1 : match.p2;
};

const switchServe = (match: Match) =>
  match.serving === match.p1 ? match.p2 : match.p1;

/**
 * When creating the first round of a tournament,
 * put first in ranking against last, second against second last and so on.
 * Made with help from ChatGPT.
 * @param players
 */
export const generatePlayerPairs = (
  players: TournamentPlayers
): [Player, Player][] =>
  players.reduce(
    (pairs: [Player, Player][], currentItem: Player, currentIndex: number) => {
      // Calculate the index of the last item of the current pair
      const lastIndexOfPair = players.length - 1 - currentIndex;
      // Check if the current pair is complete
      const isPairComplete = lastIndexOfPair > currentIndex;
      // If the current pair is complete, add it to the pairs array
      if (isPairComplete) {
        // Get the first item of the current pair and convert it to a string
        const firstItemOfPair = currentItem;
        // Get the last item of the current pair and convert it to a string
        const lastItemOfPair = players[lastIndexOfPair];
        // Add the pair to the pairs array
        pairs.push([firstItemOfPair, lastItemOfPair]);
      }
      // Return the pairs array for the next iteration of reduce()
      return pairs;
    },
    []
  );
