/**
 * A player outside of a match
 */
export type Player = {
  fullName: string;
  lastName: string;
  ranking: number;
};

/**
 * A player in a match
 */
export type PlayerScore = Player & {
  sets: number;
  games: number;
  gamesS1: number;
  gamesS2: number;
  gamesS3: number;
  points: number;
  servingEdge: number; // how much the algorithm will favor the player when she's serving, based on the rank of both player and opponent.
};

/**
 * All relevant match information
 */
export type Match = {
  p1: PlayerScore;
  p2: PlayerScore;
  set: number;
  ongoing: boolean;
  serving: PlayerScore;
  receiving: PlayerScore;
  winner?: Player;
};

export type SetScores = {
  S1?: number;
  S2?: number;
  S3?: number;
};

/**
 * A summary of the info that will go in the scoreboard
 */
export type ScoreLine = SetScores & {
  serving?: boolean;
  name: string;
  games?: number;
  points?: number | string;
  event?: string;
};
