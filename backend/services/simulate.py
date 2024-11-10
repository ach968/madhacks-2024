from typing import List
from treys import Deck, Evaluator, Card
import matplotlib.pyplot as plt
from multiprocessing import Pool, cpu_count
import numpy as np
from scipy.stats import skewnorm, binom

class Hand:
    def __init__(self, cards):
        self.cards = cards

def deal_opponents(n: int, deck: Deck) -> List[Hand]:
    return [Hand(deck.draw(2)) for _ in range(n)]

def fill_board(deck: Deck, board: List[int], stage: int):
    return board + deck.draw(stage - len(board))

def single_trial(player_hand: Hand, num_opponents: int, stage: int, board: List[int], trials: int):
    evaluator = Evaluator()
    wins = 0
    for _ in range(trials):
        deck = Deck()
        deck.cards = [card for card in deck.cards if card not in player_hand.cards + board]
        
        current_board = fill_board(deck, board.copy(), stage)
        opponents = deal_opponents(num_opponents, deck)
        
        player_score = evaluator.evaluate(player_hand.cards, current_board)
        win = True
        for opponent in opponents:
            opponent_score = evaluator.evaluate(opponent.cards, current_board)
            if opponent_score < player_score:
                win = False
                break
        if win:
            wins += 1  # Win Condition
            print(wins)
    return wins

def simulate(player_hand: Hand, num_opponents: int, stage: int, board: List[int], trials=10, n=1000):
    num_processes = min(cpu_count(), n)
    chunk_size = n // num_processes
    
    args = [(player_hand, num_opponents, stage, board, trials) for _ in range(n)]
    
    with Pool(processes=num_processes) as pool:
        results = pool.starmap(single_trial, args, chunksize=chunk_size)
    
    return results

def main():
    player_hand = Hand([Card.new("As"), Card.new("2s")])
    board = [Card.new("Ac"), Card.new("Ad"), Card.new("8d")]
    num_opponents = 3
    stage = 3
    trials = 100
    n = 5000

    wins = simulate(player_hand, num_opponents, stage, board, trials, n)
    data = np.array(wins)
    mean = np.mean(data)
    sd = np.std(data)

    print(mean, sd)

    plt.hist(wins, bins=np.arange(min(wins), max(wins) + 2) - 0.5, edgecolor='black')
    plt.xlabel('# of wins')
    plt.ylabel('Frequency')
    plt.title('Expected number of wins per 100 hands')
    plt.show()

if __name__ == "__main__":
    main()