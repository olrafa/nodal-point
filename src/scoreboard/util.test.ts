import { BREAK_POINT } from "../game/constants";
import createMatch from "../game/createMatch";
import { getRandomPlayers } from "../game/util";
import { Match } from "../types";

import { createScorelines, trimScores } from "./util";

describe("Test the scoreboards", () => {
  const [player1, player2] = getRandomPlayers();
  const match = createMatch(player1, player2);

  const p1Scoreline = {
    name: `${player1.lastName} (${player1.ranking})`,
    serving: false,
  };
  const p2ScoreLine = {
    name: `${player2.lastName} (${player2.ranking})`,
    serving: false,
  };

  test("Match before any point is played", () => {
    const scorelines = createScorelines(match);
    const trimmedScore = trimScores(scorelines, match);
    const expectedScore = [p1Scoreline, p2ScoreLine];
    expect(trimmedScore).toStrictEqual(expectedScore);
  });

  // Match started, we increment this on every test.
  const ongoingMatch: Match = {
    ...match,
    ongoing: true,
    set: 1,
    serving: match.p1,
    receiving: match.p2,
    p1: { ...match.p1, points: 2 },
    p2: { ...match.p2, points: 1 },
  };

  test("Scoreboard after the first couple of points", () => {
    const p1Score = { ...p1Scoreline, points: 30, serving: true };
    const p2Score = { ...p2ScoreLine, points: 15 };
    const scorelines = createScorelines(ongoingMatch);
    const trimmedScore = trimScores(scorelines, ongoingMatch);
    const expectedScore = [p1Score, p2Score];
    expect(trimmedScore).toStrictEqual(expectedScore);
  });

  // Player two will have a break point at first set.
  const matchAtBreakPoint: Match = {
    ...ongoingMatch,
    p1: { ...ongoingMatch.p1, points: 3 },
    p2: { ...ongoingMatch.p2, points: 4 },
  };
  test("Scoreboard for advantage and break point", () => {
    const p1Score = { ...p1Scoreline, points: 40, serving: true };
    const p2Score = { ...p2ScoreLine, points: "A", event: BREAK_POINT };
    const scorelines = createScorelines(matchAtBreakPoint);
    const trimmedScore = trimScores(scorelines, matchAtBreakPoint);
    const expectedScore = [p1Score, p2Score];
    expect(trimmedScore).toStrictEqual(expectedScore);
  });

  // Tie break on set2 after P2 won first set.
  const matchAtTSecondSet: Match = {
    ...matchAtBreakPoint,
    set: 2,
    p1: { ...matchAtBreakPoint.p1, games: 6, points: 7, gamesS1: 3 },
    p2: { ...matchAtBreakPoint.p2, games: 6, points: 7, gamesS1: 6 },
  };
  test("Tie break at second set", () => {
    const p1Score = {
      ...p1Scoreline,
      points: 7,
      games: 6,
      S1: 3,
      serving: true,
    };
    const p2Score = { ...p2ScoreLine, points: 7, games: 6, S1: 6 };
    const scorelines = createScorelines(matchAtTSecondSet);
    const trimmedScore = trimScores(scorelines, matchAtTSecondSet);
    const expectedScore = [p1Score, p2Score];
    expect(trimmedScore).toStrictEqual(expectedScore);
  });

  const matchEndWith2Sets: Match = {
    ...matchAtBreakPoint,
    set: 2,
    ongoing: false,
    winner: match.p2,
    p1: {
      ...matchAtBreakPoint.p1,
      games: 0,
      points: 0,
      gamesS1: 3,
      gamesS2: 6,
    },
    p2: {
      ...matchAtBreakPoint.p2,
      games: 0,
      points: 0,
      gamesS1: 6,
      gamesS2: 7,
    },
  };
  test("Player wins with only two sets", () => {
    const p1Score = { ...p1Scoreline, S1: 3, S2: 6, serving: false };
    const p2Score = { ...p2ScoreLine, S1: 6, S2: 7 };
    const scorelines = createScorelines(matchEndWith2Sets);
    const trimmedScore = trimScores(scorelines, matchEndWith2Sets);
    const expectedScore = [p1Score, p2Score];
    expect(trimmedScore).toStrictEqual(expectedScore);
  });

  const matchByEndOfSecondSet: Match = {
    ...matchAtTSecondSet,
    set: 3,
    p1: { ...matchAtTSecondSet.p1, points: 0, games: 0, gamesS2: 7 },
    p2: { ...matchAtTSecondSet.p2, points: 0, games: 0, gamesS2: 6 },
  };

  test("End of second set", () => {
    const p1Score = { ...p1Scoreline, S1: 3, S2: 7, serving: true };
    const p2Score = { ...p2ScoreLine, S1: 6, S2: 6 };
    const scorelines = createScorelines(matchByEndOfSecondSet);
    const trimmedScore = trimScores(scorelines, matchByEndOfSecondSet);
    const expectedScore = [p1Score, p2Score];
    expect(trimmedScore).toStrictEqual(expectedScore);
  });

  const endOfMatch: Match = {
    ...matchByEndOfSecondSet,
    ongoing: false,
    winner: match.p1,
    p1: { ...matchByEndOfSecondSet.p1, gamesS3: 6 },
    p2: { ...matchByEndOfSecondSet.p2, gamesS3: 4 },
  };
  test("End of a match", () => {
    const p1Score = { ...p1Scoreline, S1: 3, S2: 7, S3: 6, serving: false };
    const p2Score = { ...p2ScoreLine, S1: 6, S2: 6, S3: 4 };
    const scorelines = createScorelines(endOfMatch);
    const trimmedScore = trimScores(scorelines, endOfMatch);
    const expectedScore = [p1Score, p2Score];
    expect(trimmedScore).toStrictEqual(expectedScore);
  });
});
