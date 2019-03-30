from random import random


def main():
    def getInputs():
        p1, a = input("Input name of Player 1, probability (0, 1) that Player 1 wins a serve: ").split(",")
        p2, b = input("Input name of Player 2, probability (0, 1) that Player 2 wins a serve: ").split(",")
        p1, p2 = p1.strip(), p2.strip()  # Remove any surrounding spaces
        a, b = float(a), float(b)  # Str --> Float
        print()
        return p1, p2, a, b

    def simulateSet(a, b, gamesMatch, S, pointsMatch1, pointsMatch2):
        S += 1  # Set number S
        gamesSet1, gamesSet2 = 0, 0  # At start of new Set, reset Games Won in this Set by Player1, Player2 to 0, 0
        while (max(gamesSet1, gamesSet2) < 6 or abs(
                gamesSet1 - gamesSet2) < 2) and gamesSet1 + gamesSet2 < 12:  # Conditions to play another Game in this Set
            pointsGame1, pointsGame2 = 0, 0  # At start of new Game, reset Points Won in this Game by Player1, Player2 to 0, 0
            while gamesMatch % 2 == 0:  # Player1 serves if Games played in Match is Even
                if random() < a:  # Player1 wins point according to user-entered probability a, where 0 < a < 1
                    print(p1[0], end="")  # Document that Player1 won point
                    pointsGame1 += 1  # Increment points that Player1 has won this Game
                    pointsMatch1 += 1  # Increment points that Player1 has won for the Match
                else:  # Player2 wins point according to complement probability 1-a
                    print(p2[0], end="")  # Document that Player 2 won point
                    pointsGame2 += 1  # Increment points that Player2 has won this Game
                    pointsMatch2 += 1  # Increment points that Player2 has won for the Match
                if max(pointsGame1, pointsGame2) >= 4 and abs(
                        pointsGame1 - pointsGame2) > 1:  # Conditions to stop Game (race to 4, win by 2)
                    print("\t", p1 + ":", str(pointsGame1) + ",", p2 + ":", pointsGame2,
                          end="")  # Print score of Game to screen (recap of documented letters at L)
                    if pointsGame1 > pointsGame2:  # Condition that Player1 won this completed Game
                        gamesSet1 += 1  # Increment Games won in this Set by Player1
                        print()  # Player serving held serve/No break of serve to highlight, Next line
                    else:  # Condition that Player2 won this completed Game
                        gamesSet2 += 1  # Increment Games won in this Set by Player2
                        print(" -- " + p2, "broke")  # Highlight that Player2 broke (won a non-service Game), Next line
                    gamesMatch += 1  # Increment Games completed in the Match
                    break
            pointsGame1, pointsGame2 = 0, 0  # At start of new Game, reset Points Won in this Game by Player1, Player2 to 0, 0
            while gamesMatch % 2 == 1 and (max(gamesSet1, gamesSet2) < 6 or abs(
                    gamesSet1 - gamesSet2) < 2) and gamesSet1 + gamesSet2 < 12:  # Conditions to play another Game in this Set and Player2 serves if Games played in Match is Odd
                if random() < b:  # Player2 wins point according to user-entered probability b, where 0 < b < 1
                    print(p2[0], end="")  # Document that Player2 won point
                    pointsGame2 += 1  # Increment points that Player2 has won this Game
                    pointsMatch2 += 1  # Increment points that Player2 has won for the Match
                else:  # Player1 wins point according to complement probability 1-b
                    print(p1[0], end="")  # Document that Player1 won point
                    pointsGame1 += 1  # Increment points that Player1 has won this Game
                    pointsMatch1 += 1  # Increment points that Player1 has won for the Match
                if max(pointsGame1, pointsGame2) >= 4 and abs(
                        pointsGame1 - pointsGame2) > 1:  # Conditions to stop Game (race to 4, win by 2)
                    print("\t", p1 + ":", str(pointsGame1) + ",", p2 + ":", pointsGame2,
                          end="")  # Print score of Game to screen (recap of documented letters at L)
                    if pointsGame1 > pointsGame2:  # Condition that Player1 won this completed Game
                        gamesSet1 += 1  # Increment Games won in this Set by Player1
                        print(" -- " + p1, "broke")  # Highlight that Player1 broke (won a non-service Game), Next line
                    else:  # Condition that Player2 won this completed game
                        gamesSet2 += 1  # Increment Games won in this Set by Player2
                        print()  # Player serving held serve/No break of serve to highlight, Next line
                    gamesMatch += 1  # Increment Games completed in the Match
                    break

        if gamesSet1 == 6 and gamesSet2 == 6:  # Conditions to start Tiebreaker
            print("Set", S, "is 6-6 and going to a Tiebreaker.")
        return gamesSet1, gamesSet2, gamesMatch, S, pointsMatch1, pointsMatch2

    def simulateTiebreaker(a, b, gamesMatch, pointsMatch1, pointsMatch2):
        pointsTie1, pointsTie2 = 0, 0  # At start of Tiebreaker, reset points Won by Player1, Player2 to 0, 0
        while max(pointsTie1, pointsTie2) < 7 or abs(
                pointsTie1 - pointsTie2) < 2:  # Conditions to continue Tiebreaker (race to 7, win by 2)
            if gamesMatch % 2 == 0:  # Condition for Player1 to serve first in Tiebreaker
                while (pointsTie1 + pointsTie2) % 4 == 0 or (
                        pointsTie1 + pointsTie2) % 4 == 3:  # Conditions for Player 1 to serve (points 4N and 4N+3)
                    if random() < a:  # Player1 wins point according to user-entered probability a, where 0 < a < 1
                        print(p1[0], end="")  # Document that Player1 won point
                        pointsTie1 += 1  # Increment points that Player1 has won in this Tiebreaker
                        pointsMatch1 += 1  # Increment points that Player1 has won for the Match
                    else:  # Player2 wins point according to complement probability 1-a
                        print(p2[0], end="")  # Document that Player 2 won point
                        pointsTie2 += 1  # Increment points that Player2 has won in this Tiebreaker
                        pointsMatch2 += 1  # Increment points that Player2 has won for the Match
                    if max(pointsTie1, pointsTie2) >= 7 and abs(
                            pointsTie1 - pointsTie2) > 1:  # Conditions to stop Tiebreaker (race to 7, win by 2)
                        print("\t", p1 + ":", str(pointsTie1) + ",", p2 + ":",
                              pointsTie2)  # Print score of Tiebreaker to screen (recap of documented letters at L)
                        gamesMatch += 1
                        break
                while (max(pointsTie1, pointsTie2) < 7 or abs(pointsTie1 - pointsTie2) < 2) and (
                        (pointsTie1 + pointsTie2) % 4 == 1 or (
                        pointsTie1 + pointsTie2) % 4 == 2):  # Conditions to continue Tiebreaker (race to 7, win by 2) and Player 2 serves (points 4N+1 and 4N+2)
                    if random() < b:  # Player2 wins point according to user-entered probability b, where 0 < b < 1
                        print(p2[0], end="")  # Document that Player2 won point
                        pointsTie2 += 1  # Increment points that Player2 has won in this Tiebreaker
                        pointsMatch2 += 1  # Increment points that Player2 has won for the Match
                    else:  # Player1 wins point according to complement probability 1-b
                        print(p1[0], end="")  # Document that Player1 won point
                        pointsTie1 += 1  # Increment points that Player1 has won in this Tiebreaker
                        pointsMatch1 += 1  # Increment points that Player1 has won for the Match
                    if max(pointsTie1, pointsTie2) >= 7 and abs(
                            pointsTie1 - pointsTie2) > 1:  # Conditions to stop Tiebreaker (race to 7, win by 2)
                        print("\t", p1 + ":", str(pointsTie1) + ",", p2 + ":",
                              pointsTie2)  # Print score of Tiebreaker to screen (recap of documented letters at L)
                        break
            if gamesMatch % 2 == 1:  # Condition for Player2 to serve first in Tiebreaker
                while (pointsTie1 + pointsTie2) % 4 == 1 or (
                        pointsTie1 + pointsTie2) % 4 == 2:  # Conditions for Player 1 to serve (points 4N+1 and 4N+2)
                    if random() < a:  # Player1 wins point according to user-entered probability a, where 0 < a < 1
                        print(p1[0], end="")  # Document that Player1 won point
                        pointsTie1 += 1  # Increment points that Player1 has won in this Tiebreaker
                        pointsMatch1 += 1  # Increment points that Player1 has won for the Match
                    else:  # Player2 wins point according to complement probability 1-a
                        print(p2[0], end="")  # Document that Player 2 won point
                        pointsTie2 += 1  # Increment points that Player2 has won in this Tiebreaker
                        pointsMatch2 += 1  # Increment points that Player2 has won for the Match
                    if max(pointsTie1, pointsTie2) >= 7 and abs(
                            pointsTie1 - pointsTie2) > 1:  # Conditions to stop Tiebreaker (race to 7, win by 2)
                        print("\t", p1 + ":", str(pointsTie1) + ",", p2 + ":",
                              pointsTie2)  # Print score of Tiebreaker to screen (recap of documented letters at L)
                        gamesMatch += 1
                        break
                while (max(pointsTie1, pointsTie2) < 7 or abs(pointsTie1 - pointsTie2) < 2) and (
                        (pointsTie1 + pointsTie2) % 4 == 0 or (
                        pointsTie1 + pointsTie2) % 4 == 3):  # Conditions to continue Tiebreaker (race to 7, win by 2) and Player 2 serves (points 4N and 4N+3)
                    if random() < b:  # Player2 wins point according to user-entered probability b, where 0 < b < 1
                        print(p2[0], end="")  # Document that Player2 won point
                        pointsTie2 += 1  # Increment points that Player2 has won in this Tiebreaker
                        pointsMatch2 += 1  # Increment points that Player2 has won for the Match
                    else:  # Player1 wins point according to complement probability 1-b
                        print(p1[0], end="")  # Document that Player1 won point
                        pointsTie1 += 1  # Increment points that Player1 has won in this Tiebreaker
                        pointsMatch1 += 1  # Increment points that Player1 has won for the Match
                    if max(pointsTie1, pointsTie2) >= 7 and abs(
                            pointsTie1 - pointsTie2) > 1:  # Conditions to stop Tiebreaker (race to 7, win by 2)
                        print("\t", p1 + ":", str(pointsTie1) + ",", p2 + ":",
                              pointsTie2)  # Print score of Tiebreaker to screen (recap of documented letters at L)
                        break
        gamesMatch += 1
        return pointsTie1, pointsTie2, gamesMatch, pointsMatch1, pointsMatch2

    def printSetMatchSummary(p1, p2, gamesSet1, gamesSet2, S, pointsTie1, pointsTie2, setsMatch1, setsMatch2):
        if gamesSet1 > gamesSet2:
            setsMatch1 += 1
            print(p1.upper(), "wins Set", str(S) + ":", gamesSet1, "games to", str(gamesSet2) + ".")
        elif gamesSet2 > gamesSet1:
            setsMatch2 += 1
            print(p2.upper(), "wins Set", str(S) + ":", gamesSet2, "games to", str(gamesSet1) + ".")
        elif gamesSet1 == gamesSet2:
            if pointsTie1 > pointsTie2:
                setsMatch1 += 1
                print(p1.upper(), "wins Set",
                      str(S) + ": 7 games to 6 (" + str(pointsTie1) + "-" + str(pointsTie2) + ").")
            else:
                setsMatch2 += 1
                print(p2.upper(), "wins Set",
                      str(S) + ": 7 games to 6 (" + str(pointsTie2) + "-" + str(pointsTie1) + ").")
        print("After", S, "Sets:", p1, str(setsMatch1) + ",", p2, str(setsMatch2) + ".\n")
        return setsMatch1, setsMatch2

    def pointsMatchSummary(p1, p2, setsMatch1, setsMatch2, pointsMatch1, pointsMatch2):
        if setsMatch1 == 3:
            print(p1.upper(), "(" + str(a) + ")", "beat", p2, "(" + str(b) + ") by", setsMatch1, "Sets to",
                  str(setsMatch2) + ".")
        else:
            print(p2.upper(), "(" + str(b) + ")", "beat", p1, "(" + str(a) + ") by", setsMatch2, "Sets to",
                  str(setsMatch1) + ".")
        print("Of", pointsMatch1 + pointsMatch2, "points played,", p1, "won", pointsMatch1,
              "(" + str(round(pointsMatch1 / (pointsMatch1 + pointsMatch2), 3)) + ") and", p2, "won", pointsMatch2,
              "(" + str(round(pointsMatch2 / (pointsMatch1 + pointsMatch2), 3)) + ").")

    S = 0
    gamesMatch = 0
    pointsMatch1, pointsMatch2 = 0, 0
    setsMatch1, setsMatch2 = 0, 0
    pointsTie1, pointsTie2 = 0, 0
    p1, p2, a, b = getInputs()
    while S < 5 and max(setsMatch1, setsMatch2) < 3:
        gamesSet1, gamesSet2, gamesMatch, S, pointsMatch1, pointsMatch2 = simulateSet(a, b, gamesMatch, S, pointsMatch1,
                                                                                      pointsMatch2)
        print()
        if gamesSet1 == 6 and gamesSet2 == 6:
            pointsTie1, pointsTie2, gamesMatch, pointsMatch1, pointsMatch2 = simulateTiebreaker(a, b, gamesMatch,
                                                                                                pointsMatch1,
                                                                                                pointsMatch2)
        setsMatch1, setsMatch2 = printSetMatchSummary(p1, p2, gamesSet1, gamesSet2, S, pointsTie1, pointsTie2,
                                                      setsMatch1, setsMatch2)
    pointsMatchSummary(p1, p2, setsMatch1, setsMatch2, pointsMatch1, pointsMatch2)


main()