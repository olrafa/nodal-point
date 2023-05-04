import { isGameOver, isSetOver } from "./rules";

describe("Test counts to finish match", () => {
  test.each([
    [0, 0, false, false],
    [3, 0, false, false],
    [5, 3, false, true],
    [4, 4, false, false],
    [3, 3, false, false],
    [5, 0, true, false],
    [6, 5, true, false],
    [7, 5, true, true],
    [7, 6, true, false],
    [10, 9, true, false],
    [10, 12, true, true],
  ])(
    "P1 has %p, P2 has %p, tie break is %p, is game over? p%.",
    (p1, p2, tieBreak, isOver) =>
      expect(isGameOver(p1, p2, tieBreak)).toEqual(isOver)
  );

  test.each([
    [6, 5, false],
    [0, 0, false],
    [4, 4, false],
    [3, 6, true],
    [6, 6, false],
    [7, 5, true],
    [7, 6, true],
  ])("P1 has %p games, P2 has %p games, is set over? p%", (p1, p2, isOver) =>
    expect(isSetOver(p1, p2)).toEqual(isOver)
  );
});
