// A general average of points won by the server;
// Not very scientific, but based on some different places on the internet.
export const SERVING_ADVANTAGE = 65;

// But also we want to have a match to be played :P
export const MIN_ADVANTAGE = 55;
export const MAX_ADVANTAGE = 75;

// For simplicity, always best of 3 sets. No male Grand Slams here.
export const SETS_TO_WIN = 2;

// Rules for a game
export const MIN_POINTS_FOR_GAME = 4;
export const MIN_POINT_DIFFERENCE = 2;

// Rules for a set
export const MIN_GAMES_FOR_SET = 6;
export const GAMES_FOR_EACH_TO_GO_FOR_MAX = 5; // If both have 5 games, we go to 7.
export const MIN_GAME_DIFFERENCE = 2;
export const MAX_GAMES_FOR_SET = 7;

// Rules for a tie break
export const MIN_POINTS_FOR_TIE_BREAK = 7;

// Representation of points
export const POINT_SYSTEM = [0, 15, 30, 40, "A"];

// Scoreboard events
export const BREAK_POINT = "BREAK POINT";
export const SET_POINT = "SET POINT";
export const MATCH_POINT = "MATCH POINT";
