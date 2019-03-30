# we use a psuedo-random number generator
# to pull a random number and determine
# if a server has won a point or not
# theoretically, we could use a more advanced function
# that takes in a distribution and generates random numbers
# based on that
from random import random


#############################################################################################
# define what a big point is and
# have a separte function which can be called to get
# probability of a player winning a big point
def getBigPointProb(server):
    if server == p1:
        return p1_big_point
    elif server == p2:
        return p2_big_point
    else:
        print("Error")


#############################################################################################
def isBigPoint(server_points, returner_points, tiebreak):
    # server_next_point = server_points+1
    server_next_point = server_points
    # print(server_next_point)
    if tiebreak == False:
        if server_next_point >= 3 and (server_next_point - returner_points) >= 1:
            print("game point")
            return True
    else:
        if server_next_point >= 6 and abs(server_next_point - returner_points) >= 1:
            print("set point")
            return True


#############################################################################################
# takes a player's point string and returns tennis scoring convention
# originally, we tried to get clever with having the array extra = ['D', 'A']
# and the points%2 oscillating as index, but found that there were cases when a game went
# to multiple deuce - ads and the oscillation was returning incorrect results
# so we decided to set up if's to handle special cases when a game enters 4 points all
# in our write up, we detail how an objected oriented approach can clean up some of this logic
def getScore(pointsServer, pointsReturner, server_games, returner_games, completed_sets, tiebreaker):
    in_game = ['15', '30', '40']
    extra = ['D', 'A']

    display_server = '0'
    display_returner = '0'

    if tiebreaker == False:
        if pointsServer == 0:
            display_server = '0'
        elif pointsServer > 0 and pointsServer < 4:
            display_server = in_game[pointsServer - 1]
        elif pointsServer >= 4:
            # clean_pointsServer = pointsServer-4
            display_server = 'D'

        if pointsReturner == 0:
            display_returner = '0'
        elif pointsReturner > 0 and pointsReturner < 4:
            display_returner = in_game[pointsReturner - 1]
        elif pointsReturner >= 4:
            # clean_pointsReturner = pointsReturner-4
            display_returner = 'D'

        if (pointsServer >= 4 and pointsReturner < 4) or (pointsServer < 4 and pointsReturner >= 4):
            display_server = 'D'
            display_returner = 'D'

        if display_server == 'D' and display_server == 'D':
            if pointsServer > pointsReturner:
                display_server = 'A'
            elif pointsReturner > pointsServer:
                display_returner = 'A'

        if (display_server == 'A' and display_returner == 'A') or (display_server == '40' and display_returner == '40'):
            display_server = 'D'
            display_returner = 'D'
        if (display_server == 'A' and display_returner == '40'):
            display_server = 'A'
            display_returner = 'D'
        if (display_server == '40' and display_returner == 'A'):
            display_server = 'D'
            display_returner = 'A'
    else:
        display_server = str(pointsServer)
        display_returner = str(pointsReturner)

    if len(completed_sets) == 0:
        print(display_server + "-" + display_returner + "|" + "[" + str(server_games) + "-" + str(returner_games) + "]")
    else:
        completed = ""
        for sets in completed_sets:
            completed = completed + " " + str(sets[0]) + ":" + str(sets[1])
        print(display_server + "-" + display_returner + "|" + str(completed) + "[" + str(server_games) + ":" + str(
            returner_games) + "]")


#############################################################################################
# player serve simulation in a game
# after each game print out winner and
# call out if server was broken
def player_serve(server, returner, server_prob, returner_prob, gamesMatch, S, server_points_match,
                 returner_points_match, server_games, returner_games, server_pointsGame, returner_pointsGame,
                 completed_sets):
    if isBigPoint(server_pointsGame, returner_pointsGame, False):
        server_prob = getBigPointProb(server)
    if random() < server_prob:
        print(server + " ", end="")
        getScore(server_pointsGame, returner_pointsGame, server_games, returner_games, completed_sets, False)
        server_pointsGame += 1
        server_points_match += 1
    else:
        print(server + " ", end="")
        getScore(server_pointsGame, returner_pointsGame, server_games, returner_games, completed_sets, False)
        returner_pointsGame += 1
        returner_points_match += 1
    if max(server_pointsGame, returner_pointsGame) >= 4 and abs(server_pointsGame - returner_pointsGame) > 1:
        print("\t", server + ":", str(server_pointsGame) + ",", returner + ":", returner_pointsGame, end="")
        if server_pointsGame > returner_pointsGame:
            server_games += 1
            print()
        else:
            returner_games += 1
            print(" -- " + returner, "broke")
        gamesMatch += 1
        return server_games, returner_games, gamesMatch, S, server_points_match, returner_points_match, server_pointsGame, returner_pointsGame

    return server_games, returner_games, gamesMatch, S, server_points_match, returner_points_match, server_pointsGame, returner_pointsGame


#############################################################################################
# play a set
def simulateSet(a, b, gamesMatch, S, pointsMatch1, pointsMatch2, completed_sets):
    S += 1
    gamesSet1 = 0
    gamesSet2 = 0
    while (max(gamesSet1, gamesSet2) < 6 or abs(
            gamesSet1 - gamesSet2) < 2) and gamesSet1 + gamesSet2 < 12:  # Conditions to play another Game in this Set
        pointsGame1 = 0
        pointsGame2 = 0
        # player 1 serves
        while gamesMatch % 2 == 0:
            gamesSet1, gamesSet2, gamesMatch, S, pointsMatch1, pointsMatch2, pointsGame1, pointsGame2 = player_serve(p1,
                                                                                                                     p2,
                                                                                                                     a,
                                                                                                                     b,
                                                                                                                     gamesMatch,
                                                                                                                     S,
                                                                                                                     pointsMatch1,
                                                                                                                     pointsMatch2,
                                                                                                                     gamesSet1,
                                                                                                                     gamesSet2,
                                                                                                                     pointsGame1,
                                                                                                                     pointsGame2,
                                                                                                                     completed_sets)
        pointsGame1 = 0
        pointsGame2 = 0
        # player 2 serves, but we also incorporate in logic to end the set
        while gamesMatch % 2 == 1 and (
                max(gamesSet1, gamesSet2) < 6 or abs(gamesSet1 - gamesSet2) < 2) and gamesSet1 + gamesSet2 < 12:
            gamesSet2, gamesSet1, gamesMatch, S, pointsMatch2, pointsMatch1, pointsGame2, pointsGame1 = player_serve(p2,
                                                                                                                     p1,
                                                                                                                     b,
                                                                                                                     a,
                                                                                                                     gamesMatch,
                                                                                                                     S,
                                                                                                                     pointsMatch2,
                                                                                                                     pointsMatch1,
                                                                                                                     gamesSet2,
                                                                                                                     gamesSet1,
                                                                                                                     pointsGame2,
                                                                                                                     pointsGame1,
                                                                                                                     completed_sets)
    # at 6 games all we go to a tie breaker
    if gamesSet1 == 6 and gamesSet2 == 6:
        print("Set", S, "is 6-6 and going to a Tiebreaker.")

    return gamesSet1, gamesSet2, gamesMatch, S, pointsMatch1, pointsMatch2


#############################################################################################
# play a tiebreak
# this function could be written much cleaner as some logic is being repeated
# however, getting the logic down first then optimizing is usually the dev process we prefer

# originally the player serving was being printed as well, but ultimately, it
# made the output results difficult to read so was commented out
def simulateTiebreaker(player1, player2, a, b, gamesMatch, pointsMatch1, pointsMatch2, completed_sets):
    pointsTie1, pointsTie2 = 0, 0
    while max(pointsTie1, pointsTie2) < 7 or abs(pointsTie1 - pointsTie2) < 2:
        # player 1 will server first
        if gamesMatch % 2 == 0:
            while (pointsTie1 + pointsTie2) % 4 == 0 or (pointsTie1 + pointsTie2) % 4 == 3:
                server_prob = a
                if isBigPoint(pointsTie1, pointsTie2, True):
                    server_prob = getBigPointProb(player1)
                if random() < server_prob:
                    # print(player1+" ", end = "")
                    getScore(pointsTie1, pointsTie2, 6, 6, completed_sets, True)
                    pointsTie1 += 1
                    pointsMatch1 += 1
                else:
                    getScore(pointsTie1, pointsTie2, 6, 6, completed_sets, True)
                    pointsTie2 += 1
                    pointsMatch2 += 1
                if max(pointsTie1, pointsTie2) >= 7 and abs(pointsTie1 - pointsTie2) > 1:
                    print("\t", p1 + ":", str(pointsTie1) + ",", p2 + ":", pointsTie2)
                    gamesMatch += 1
                    break
            while (max(pointsTie1, pointsTie2) < 7 or abs(pointsTie1 - pointsTie2) < 2) and (
                    (pointsTie1 + pointsTie2) % 4 == 1 or (
                    pointsTie1 + pointsTie2) % 4 == 2):  # Conditions to continue Tiebreaker (race to 7, win by 2) and Player 2 serves (points 4N+1 and 4N+2)
                server_prob = b
                if isBigPoint(pointsTie2, pointsTie1, True):
                    server_prob = getBigPointProb(player2)
                if random() < server_prob:
                    # print(player2+" ", end = "")
                    getScore(pointsTie1, pointsTie2, 6, 6, completed_sets, True)
                    pointsTie2 += 1
                    pointsMatch2 += 1
                else:
                    getScore(pointsTie1, pointsTie2, 6, 6, completed_sets, True)
                    pointsTie1 += 1
                    pointsMatch1 += 1
                if max(pointsTie1, pointsTie2) >= 7 and abs(pointsTie1 - pointsTie2) > 1:
                    print("\t", p1 + ":", str(pointsTie1) + ",", p2 + ":", pointsTie2)
                    break

        # player 2 will server first
        if gamesMatch % 2 == 1:
            while (pointsTie1 + pointsTie2) % 4 == 1 or (pointsTie1 + pointsTie2) % 4 == 2:
                server_prob = a
                if isBigPoint(pointsTie1, pointsTie2, True):
                    server_prob = getBigPointProb(player1)
                if random() < server_prob:
                    # print(player1+" ", end = "")
                    getScore(pointsTie1, pointsTie2, 6, 6, completed_sets, True)
                    pointsTie1 += 1
                    pointsMatch1 += 1
                else:
                    getScore(pointsTie1, pointsTie2, 6, 6, completed_sets, True)
                    pointsTie2 += 1
                    pointsMatch2 += 1
                if max(pointsTie1, pointsTie2) >= 7 and abs(pointsTie1 - pointsTie2) > 1:
                    print("\t", p1 + ":", str(pointsTie1) + ",", p2 + ":", pointsTie2)
                    break
            while (max(pointsTie2, pointsTie1) < 7 or abs(pointsTie1 - pointsTie2) < 2) and (
                    (pointsTie1 + pointsTie2) % 4 == 0 or (
                    pointsTie1 + pointsTie2) % 4 == 3):  # Conditions to continue Tiebreaker (race to 7, win by 2) and Player 2 serves (points 4N and 4N+3)
                server_prob = b
                if isBigPoint(pointsTie2, pointsTie1, True):
                    server_prob = getBigPointProb(player2)
                if random() < server_prob:
                    # print(player2+" ", end = "")
                    getScore(pointsTie1, pointsTie2, 6, 6, completed_sets, True)
                    pointsTie2 += 1
                    pointsMatch2 += 1
                else:
                    getScore(pointsTie1, pointsTie2, 6, 6, completed_sets, True)
                    pointsTie1 += 1
                    pointsMatch1 += 1
                if max(pointsTie1, pointsTie2) >= 7 and abs(pointsTie1 - pointsTie2) > 1:
                    print("\t", p1 + ":", str(pointsTie1) + ",", p2 + ":", pointsTie2)
                    break
    gamesMatch += 1
    return pointsTie1, pointsTie2, gamesMatch, pointsMatch1, pointsMatch2


#############################################################################################
# displays the running score in the way an umpire would announce the score at
# the end of a set
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
            print(p1.upper(), "wins Set", str(S) + ": 7 games to 6 (" + str(pointsTie1) + "-" + str(pointsTie2) + ").")
        else:
            setsMatch2 += 1
            print(p2.upper(), "wins Set", str(S) + ": 7 games to 6 (" + str(pointsTie2) + "-" + str(pointsTie1) + ").")
    print("After", S, "Sets:", p1, str(setsMatch1) + ",", p2, str(setsMatch2) + ".\n")
    return setsMatch1, setsMatch2


#############################################################################################
# prints out final winner and number of sets won
def pointsMatchSummary(p1, p2, setsMatch1, setsMatch2, pointsMatch1, pointsMatch2):
    if setsMatch1 == 3:
        print(p1.upper(), "(" + str(a) + ")", "beat", p2, "(" + str(b) + ") by", setsMatch1, "Sets to",
              str(setsMatch2) + ".")
        winner.append(p1)
    else:
        print(p2.upper(), "(" + str(b) + ")", "beat", p1, "(" + str(a) + ") by", setsMatch2, "Sets to",
              str(setsMatch1) + ".")
        winner.append(p2)


#############################################################################################
# this control flow a single simulation
winner = []
completed_sets = []
S = 0
gamesMatch = 0

# in all subscripted variables
# the subscript refers to the player
# for example, setsMatch1 is sets won by player1 and
# setsMatch2 is sets won by player2
pointsMatch1, pointsMatch2 = 0, 0
setsMatch1, setsMatch2 = 0, 0
pointsTie1, pointsTie2 = 0, 0
pointsGame1, pointsGame2 = 0, 0

# initialize player one and two
# a is ps1 and b is ps2
# p1_big_point and p2_big_point are the probability
# of p1 and p2 winning on a big point, respectively
p1 = "Nadal"
p2 = "Federer"
a = 0.64
b = 0.62
p1_big_point = 0.70
p2_big_point = 0.68

while S < 5 and max(setsMatch1, setsMatch2) < 3:
    gamesSet1, gamesSet2, gamesMatch, S, pointsMatch1, pointsMatch2 = simulateSet(a, b, gamesMatch, S,
                                                                                  pointsMatch1, pointsMatch2,
                                                                                  completed_sets)
    print()
    if gamesSet1 == 6 and gamesSet2 == 6:
        pointsTie1, pointsTie2, gamesMatch, pointsMatch1, pointsMatch2 = simulateTiebreaker(p1, p2, a, b,
                                                                                            gamesMatch, pointsMatch1,
                                                                                            pointsMatch2,
                                                                                            completed_sets)

    setsMatch1, setsMatch2 = printSetMatchSummary(p1, p2, gamesSet1, gamesSet2,
                                                  S, pointsTie1, pointsTie2,
                                                  setsMatch1, setsMatch2)

    if gamesSet1 == 6 and gamesSet2 == 6:
        if pointsTie1 > pointsTie2:
            completed_sets.append([gamesSet1 + 1, gamesSet2])
        else:
            completed_sets.append([gamesSet1, gamesSet2 + 1])
    else:
        completed_sets.append([gamesSet1, gamesSet2])

pointsMatchSummary(p1, p2, setsMatch1, setsMatch2, pointsMatch1, pointsMatch2)





