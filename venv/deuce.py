import random
import collections
other = {'A':'B', 'B':'A'}

def serve(prob, player):
    if random.random() < prob:
        return player
    else:
        return other[player]


def simOneSet(probA, probB):
    prob = {'A':probA, 'B':probB}
    score = collections.Counter()

    serving = "A"
    while not setOver(score['A'], score['B']):
        for i in range(2):
            winner = serve(prob[serving], serving)
            score[winner] += 1
        if score['A'] == 10 and score['B'] == 10:
            winner = serve(prob[serving], serving)
            score[winner] += 1
            serving = winner

    return score['A'], score['B']

def setOver(scoreA, scoreB):
    return max(scoreA, scoreB) >= 21

print(simOneSet(0.5,0.5))