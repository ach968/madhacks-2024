from flask import Flask, request, jsonify
from treys import Card
from services.simulate import Hand, simulate

app = Flask(__name__)


@app.route("/api/simulate", methods=["POST", "GET"])
def api_simulate():
    if request.method != "POST":
        return jsonify({"message": "This is a POST endpoint"})
    if request.method == "POST":
        data = request.json
        player_hand = Hand(
            cards=[Card.new(data["player_hand"][0]), Card.new(data["player_hand"][1])]
        )
        board = [Card.new(card) for card in data["board"]]
        num_opponents = data["num_opponents"]
        simulate_result = simulate(
            player_hand=player_hand, num_opponents=num_opponents, board=board
        )

    return jsonify(data)


if __name__ == "__main__":
    app.run(debug=True)
