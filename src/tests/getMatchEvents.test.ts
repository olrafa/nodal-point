import {
  BREAK_POINT,
  MATCH_POINT,
  SERVING_ADVANTAGE,
  SET_POINT,
} from "../game/constants";
import getMatchEvents from "../game/getMatchEvents";
import { PlayerScore } from "../types";

import getRandomPlayers from "./getRandomPlayers";

const players = getRandomPlayers();

// Initialize players for tests.
const [firstPlayer, secondPlayer]: PlayerScore[] = players.map((player) => ({
  ...player,
  sets: 0,
  games: 0,
  gamesS1: 0,
  gamesS2: 0,
  gamesS3: 0,
  points: 0,
  servingEdge: SERVING_ADVANTAGE,
}));

// Test events of Break Point, Set Point, Match Point.
describe("getMatchEvents", () => {
  test("No events to log", () =>
    expect(getMatchEvents(firstPlayer, secondPlayer, true)).toEqual(undefined));

  test("Break points without advantage or tie break", () => {
    const player = { ...firstPlayer, points: 3 };
    const opponent = { ...secondPlayer, points: 2 };
    expect(getMatchEvents(player, opponent, false)).toEqual(BREAK_POINT);
    expect(getMatchEvents(player, opponent, true)).toEqual(undefined);
  });

  test("Break points on advantage", () => {
    const player = { ...firstPlayer, points: 4 };
    const opponent = { ...secondPlayer, points: 3 };
    expect(getMatchEvents(player, opponent, false)).toEqual(BREAK_POINT);
    expect(getMatchEvents(player, opponent, true)).toEqual(undefined);
  });

  test("No break point on tie break", () => {
    const player = { ...firstPlayer, games: 6, points: 3 };
    const opponent = { ...secondPlayer, games: 6, points: 2 };
    expect(getMatchEvents(player, opponent, false)).toEqual(undefined);
    expect(getMatchEvents(player, opponent, true)).toEqual(undefined);
  });

  test("Set point", () => {
    const player = { ...firstPlayer, games: 5, points: 3 };
    const opponent = { ...secondPlayer, games: 4, points: 2 };
    expect(getMatchEvents(player, opponent, false)).toEqual(SET_POINT);
    expect(getMatchEvents(player, opponent, true)).toEqual(SET_POINT);
  });

  test("Set point on tie break", () => {
    const player = { ...firstPlayer, games: 6, points: 6 };
    const opponent = { ...secondPlayer, games: 6, points: 5 };
    expect(getMatchEvents(player, opponent, false)).toEqual(SET_POINT);
    expect(getMatchEvents(player, opponent, true)).toEqual(SET_POINT);
  });

  test("Set point on tie break with many points", () => {
    const player = { ...firstPlayer, games: 6, points: 11 };
    const opponent = { ...secondPlayer, games: 6, points: 10 };
    expect(getMatchEvents(player, opponent, false)).toEqual(SET_POINT);
    expect(getMatchEvents(player, opponent, true)).toEqual(SET_POINT);
  });

  test("Match point", () => {
    const player = { ...firstPlayer, sets: 1, games: 5, points: 3 };
    const opponent = { ...secondPlayer, sets: 0, games: 0, points: 0 };
    expect(getMatchEvents(player, opponent, false)).toEqual(MATCH_POINT);
    expect(getMatchEvents(player, opponent, true)).toEqual(MATCH_POINT);
  });
});
