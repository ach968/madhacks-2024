from typing import List
from treys import Deck, Evaluator, Card


class Hand:
    def __init__(self, cards):
        self.cards = cards


def deal_opponents(n: int, deck: Deck) -> List[Hand]:
    opponents = []
    for i in range(n):
        opponents.append(Hand(deck.draw(2)))
    return opponents


def fill_board(deck: Deck, board: List[int], stage: int):
    for i in range(stage - len(board)):
        board.append(deck.draw(1))
    return board


def simulate(
    player_hand: Hand,
    num_opponents: int,
    stage: int,
    board: List[int],
    trials=10000,
):
    wins = 0

    evaluator = Evaluator()

    for _ in range(trials):
        deck = Deck()
        deck.cards = [
            card for card in deck.cards if card not in player_hand.cards + board
        ]

        # Fill board and deal in opponents
        current_board = fill_board(deck=deck, board=board.copy(), stage=stage)
        opponents = deal_opponents(n=num_opponents, deck=deck)

        player_score = evaluator.evaluate(current_board, player_hand.cards)

        for opponent in opponents:
            opponent_score = evaluator.evaluate(current_board, opponent.cards)

            win = True
            if opponent_score < player_score:
                win = False
                break
        if win:
            wins += 1  # Win Condition

    return wins / trials


def main():
    player_hand = Hand([Card.new("As"), Card.new("Ks")])
    board = [Card.new("2h"), Card.new("7d"), Card.new("9c")]

    num_opponents = 3

    stage = 3
    trials = 10000

    win_probability = simulate(player_hand, num_opponents, stage, board, trials)

    print(f"Win probability: {win_probability * 100:.2f}%")


if __name__ == "__main__":
    main()
