from flask import Flask, request, jsonify
from treys import Card
from services.simulate import Hand, sim_stats, get_initial_guess
from flask_cors import CORS

app = Flask(__name__)
CORS(
    app,
    resources={r"/api/*": {"origins": "http://localhost:5173"}},
    supports_credentials=True,
)


@app.route("/api/simulate", methods=["POST"])
def api_simulate():
    if request.method != "POST":
        return jsonify({"message": "This is a POST endpoint"})

    try:
        data = request.json
        player_hand = Hand(
            cards=[
                Card.new(data["player_hand"][0]),
                Card.new(data["player_hand"][1]),
            ]
        )
        stage = int(data["stage"])
        board = [Card.new(card) for card in data["board"]] if data["board"] else []
        risk = float(data["risk_tolerance"])
        num_opponents = int(data["num_opponents"])

        mean, sd, breakeven, optimal_raise = sim_stats(
            player_hand=player_hand,
            num_opponents=num_opponents,
            stage=stage,
            board=board,
            risk=risk,
            trials=100,
            n=2500,
        )

        return jsonify(
            {
                "win_pct": mean,
                "sd": sd,
                "breakeven_pct": breakeven,
                "optimal_raise": optimal_raise,
            }
        )

    except Exception as e:
        return jsonify({"message": str(e)}), 400


if __name__ == "__main__":
    app.run(debug=False)
