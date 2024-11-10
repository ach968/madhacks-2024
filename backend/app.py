from flask import Flask, request, jsonify
from treys import Card
from services.simulate import Hand, simulate
from flask_cors import CORS

app = Flask(__name__)
CORS(
    app,
    resources={r"/api/*": {"origins": "http://localhost:5173"}},
    supports_credentials=True,
)


@app.route("/api/simulate", methods=["POST", "GET"])
def api_simulate():
    if request.method != "POST":
        return jsonify({"message": "This is a POST endpoint"})
    if request.method == "POST":
        try:
            data = request.json
            player_hand = Hand(
                cards=[
                    Card.new(data["player_hand"][0]),
                    Card.new(data["player_hand"][1]),
                ]
            )
            board = [Card.new(card) for card in data["board"]]
            num_opponents = data["num_opponents"]
            stage = data["stage"]
            risk_tolerance = data["risk_tolerance"]
            simulate_result = simulate(
                player_hand=player_hand,
                num_opponents=num_opponents,
                board=board,
                stage=stage,
                risk_tolerance=risk_tolerance,
            )
        except Exception as e:
            return jsonify({"error": str(e)})

    return jsonify(data)


if __name__ == "__main__":
    app.run(debug=True)
