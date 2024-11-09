from typing import List
from treys import Deck, Evaluator, Card
import matplotlib.pyplot as plt
from multiprocessing import Pool, cpu_count
import numpy as np

class Hand:
    def __init__(self, cards):
        self.cards = cards

def deal_opponents(n: int, deck: Deck) -> List[Hand]:
    return [Hand(deck.draw(2)) for _ in range(n)]

def fill_board(deck: Deck, board: List[int]) -> List[int]:
    current_board = board.copy()
    while len(current_board) < 5:
        drawn_card = deck.draw(1)[0]
        current_board.append(drawn_card)
    return current_board

def simulate(
    player_hand: Hand,
    num_opponents: int,
    board: List[int],
    trials=10000,
):
    wins = 0

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
    n = 10000

    wins = simulate(player_hand, num_opponents, stage, board, trials, n)

    plt.hist(wins, bins=np.arange(min(wins), max(wins) + 2) - 0.5, edgecolor='black')
    plt.xlabel('# of wins')
    plt.ylabel('Frequency')
    plt.title('Expected number of wins per 100 hands')
    plt.show()

if __name__ == "__main__":
    main()

# from typing import List
# from treys import Deck, Evaluator, Card
# import matplotlib.pyplot as plt
# from multiprocessing import Pool, cpu_count


# class Hand:
#     def __init__(self, cards):
#         self.cards = cards


# def deal_opponents(n: int, deck: Deck) -> List[Hand]:
#     opponents = []
#     for i in range(n):
#         opponents.append(Hand(deck.draw(2)))
#     return opponents


# def fill_board(deck: Deck, board: List[int], stage: int):
#     for i in range(stage - len(board)):
#         board.append(deck.draw(1))
#     return board

# def single_trial(player_hand: Hand, num_opponents: int, stage: int, board: List[int], trials: int):
#     """Run a single set of trials and return the number of wins."""
#     evaluator = Evaluator()
#     wins = 0
#     for _ in range(trials):
#         deck = Deck()
#         deck.cards = [
#             card for card in deck.cards if card not in player_hand.cards + board
#         ]

#         # Fill board and deal in opponents
#         current_board = fill_board(deck=deck, board=board.copy(), stage=stage)
#         opponents = deal_opponents(n=num_opponents, deck=deck)

#         player_score = evaluator.evaluate(player_hand.cards, current_board)

#         win = True
#         for opponent in opponents:
#             opponent_score = evaluator.evaluate(opponent.cards, current_board)
#             if opponent_score <= player_score:
#                 win = False
#                 break
#         if win:
#             wins += 1  # Win Condition
#     return wins


# def simulate(
#     player_hand: Hand,
#     num_opponents: int,
#     stage: int,
#     board: List[int],
#     trials=10,
#     n=1000
# ):

#     num_processes = min(cpu_count(), n)
#     total_rounds = n // num_processes

#     results = []

#     for _ in range(total_rounds):
        
#         args = [(player_hand, num_opponents, stage, board, trials) for _ in range(num_processes)]

#         with Pool(processes=num_processes) as pool:
#             results = pool.starmap(single_trial, args)
#             print(results)

#     winsList = [result for pool in results for result in pool]

#     return winsList


# def main():
#     player_hand = Hand([Card.new("As"), Card.new("Ks")])
#     board = [Card.new("2h"), Card.new("7d"), Card.new("9c")]

#     num_opponents = 3

#     stage = 3
#     trials = 20
#     n = 1000

#     wins = simulate(player_hand, num_opponents, stage, board, trials, n)

#     plt.hist(wins, bins=range(min(wins), max(wins) + 2), edgecolor='black', align='left')

#     plt.xlabel('# of wins')
#     plt.ylabel('Frequency')
#     plt.title('Expected number of wins per 100 hands')

#     plt.show()

#     # print(f"Win probability: {win_probability * 100:.2f}%")


# if __name__ == "__main__":
#     main()
