import random

class Player:
    def __init__(self, name, rank):
        self.name = name
        self.rank = rank
        self.sets = 0
        self.games = 0
        self.points = 0
        self.rank_edge = 0
        self.service = False
        self.initials = name[0:3].upper()

    def win_point(self):
        self.points += 1
        print(self.name, 'gets point')

    def win_game(self):
        self.games += 1
        print(self.name, 'wins game')
        next_game()

    def upd_service(self):
        self.initials = self.name[0:3].upper()+'*' if self.service == True \
            else self.name[0:3].upper()

    def win_set(self):
        self.sets += 1
        print(self.name, 'wins', set_order[set_number], 'set')

    def set_handicap(self):
        if self.rank_edge < -9:
            self.rank_edge = -9
        elif self.rank_edge > 20:
            self.rank_edge = 20

def play_point():
    play = random.randrange(1, 100)
    if player1.service == True:
        if play <= (60 + player1.rank_edge):
            player1.win_point()
        else:
            player2.win_point()
    elif player2.service == True:
        if play <= (60 + player2.rank_edge):
            player2.win_point()
        else:
            player1.win_point()

def next_game():
    player1.points = 0
    player2.points = 0
    print('(' + str(player1.games) + '-' + str(player2.games) + ')')

def tiebrak_scoreboard():
        print(player1.sets, "|", player1.games, "|", player1.points, "|", player1.name)
        print(player2.sets, "|", player2.games, "|", player2.points, "|", player2.name)

def scoreboard():
    if match == False:
        if set_number == 3:
            print(p1s1, "|", p1s2, "|", p1s3, "|", player1.name)
            print(p2s1, "|", p2s2, "|", p2s3, "|", player2.name)
        else:
            print(p1s1, "|", p1s2, "|", player1.name)
            print(p2s1, "|", p2s2, "|", player2.name)
    elif service_change == 0:
        print(pointsystem[player1.points], "|", player1.initials)
        print(pointsystem[player2.points], "|", player2.initials)
    elif set_number == 0:
        print(player1.games, "|", pointsystem[player1.points], "|", player1.initials)
        print(player2.games, "|", pointsystem[player2.points], "|", player2.initials)
    elif set_number == 1:
        print(p1s1, "|", player1.games, "|", pointsystem[player1.points], "|", player1.initials)
        print(p2s1, "|", player2.games, "|", pointsystem[player2.points], "|", player2.initials)
    elif set_number == 2:
        print(p1s1, "|", p1s2, "|", player1.games, "|", pointsystem[player1.points], "|", player1.initials)
        print(p2s1, "|", p2s2, "|", player2.games, "|", pointsystem[player2.points], "|", player2.initials)

pointsystem = [0, 15, 30, 40, "A"]
set_order = ["first", "second", "third"]
set_number = 0
game_number = 1
service_change = 0

print("Welcome to Rafael's tennis")

tennis1 = Player('Osaka', 1)
tennis2 = Player('Svitolina', 5)
tennis3 = Player('Bertens', 8)
tennis4 = Player('Williams', 10)

participants = [tennis1, tennis2, tennis3, tennis4]

match = True

player1 = tennis1
player2 = tennis2

player1.rank_edge = - (player1.rank - player2.rank) / 4
player2.rank_edge = - (player2.rank - player1.rank) / 4

player1.set_handicap()
player2.set_handicap()

player1.upd_service()
player2.upd_service()

print("Next game is", player1.name, "(" + str(player1.rank) + ") vs.", player2.name, "(" + str(player2.rank) + ")")
input("Press Enter to start match")
print("Game 1 of first set starting")
print(player1.name, "is serving")
input(">> next")

while match:

    if service_change % 2 == 0:
        player1.service = True
        player2.service = False
    else:
        player1.service = False
        player2.service = True

    player1.upd_service()
    player2.upd_service()

    play_point()

    if (player1.points > 3 and (player1.points - player2.points) >= 2):
        player1.win_game()
        game_number += 1
        service_change += 1
    elif player2.points > 3 and (player2.points - player1.points) >= 2:
        player2.win_game()
        game_number += 1
        service_change += 1
    elif player1.points > 3 and (player1.points - player2.points) == 1:
        print("Advantage", player1.name)
    elif player2.points > 3 and (player2.points - player1.points) == 1:
        print("Advantage", player2.name)
    elif player1.points > 3 and player2.points == player1.points:
        player1.points = 3
        player2.points = 3
        print("Deuce")

    scoreboard()

    if player1.points > 2 and player1.points > player2.points \
            and player1.games > 4 and player1.games > player2.games \
            and player1.sets == 1:
        print(player1.name, "has a match point")
    elif player2.points > 2 and player1.points < player2.points \
            and player2.games > 4 and player1.games < player2.games \
            and player2.sets == 1:
        print(player2.name, "has a match point")
    elif player1.points > 2 and player1.points > player2.points \
            and player1.games > 4 and player1.games > player2.games:
        print(player1.name, "has a set point")
    elif player2.points > 2 and player1.points < player2.points \
            and player2.games > 4 and player1.games < player2.games:
        print(player2.name, "has a set point")
    elif player1.points > 2 and player1.points > player2.points \
            and player1.service == False:
        print(player1.name, "has a break point")
    elif player2.points > 2 and player2.points > player1.points \
            and player2.service == False:
        print(player2.name, "has a break point")

    if player1.games == 6 and player2.games == 6:
        input("We will have a tie break! Press Enter to start.")
        tiebreak = True

        while tiebreak == True:
            if (service_change // 2) % 2 == 0:
                player1.service = True
                player2.service = False
                print(player1.name, "is serving")
            else:
                player1.service = False
                player2.service = True
                print(player2.name, "is serving")

            play_point()
            tiebrak_scoreboard()
            service_change += 1

            if player1.points > 6 and player1.points - player2.points > 1:
                player1.win_game()
                print(player1.name, "wins tie break")
                tiebreak = False
                player1.points = 0
                player2.points = 0
            elif player2.points > 6 and player2.points - player1.points > 1:
                player2.win_game()
                print(player2.name, "wins tie break")
                tiebreak = False
                player1.points = 0
                player2.points = 0
            else:
                input(">> next")

    if (player1.games == 6 and player2.games < 5) \
            or (player2.games == 6 and player1.games < 5) \
            or player1.games == 7 \
            or player2.games == 7:
        if player1.games > player2.games:
            player1.win_set()
        else:
            player2.win_set()

        if set_number == 0:
            p1s1 = player1.games
            p2s1 = player2.games
        elif set_number == 1:
            p1s2 = player1.games
            p2s2 = player2.games
        elif set_number == 2:
            p1s3 = player1.games
            p2s3 = player2.games

        set_number += 1
        game_number = 1
        print("Score is now", player1.sets, "-", player2.sets, "in sets")

        player1.games = 0
        player2.games = 0

    if player1.sets == 2 or player2.sets == 2:
        match = False
        print("Game over")
        if player1.sets > player2.sets:
            print(player1.name, "wins", player1.sets, "-", player2.sets)
        else:
            print(player2.name, "wins", player2.sets, "-", player1.sets)
        scoreboard()

    if player1.points == 0 and player2.points == 0 and match == True:
        print("Game", game_number, "of", set_order[set_number], "set starting")
        if match == True and service_change % 2 == 0:
            print(player1.name, "is now serving")
        elif match == True and service_change % 2 == 1:
            print(player2.name, "is now serving")

    if match == True:
        input(">> next")