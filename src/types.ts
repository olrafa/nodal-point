export type Player = {
  firstName: string;
  lastName: string;
  ranking: number;
};

export type PlayerScore = Player & {
  sets: number;
  games: number;
  gamesS1: number;
  gamesS2: number;
  gamesS3: number;
  points: number;
  servingEdge: number; // how much the algorithm will favor the player when she's serving, based on the rank of both player and opponent.
};

export type Match = {
  p1: PlayerScore;
  p2: PlayerScore;
  set: number;
  ongoing: boolean;
  serving: PlayerScore;
  receiving: PlayerScore;
  winner?: Player;
};