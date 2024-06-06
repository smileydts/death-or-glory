from flask import Blueprint, jsonify, current_app
from models import players, max_players, GameState

game = Blueprint('game', __name__)

@game.route('/api/game_state', methods=['GET'])
def get_game_state():
    game_state = current_app.config.get('GAME_STATE')
    if game_state is None:
        return jsonify({"error": "Game not initialized"}), 404

    # Serialize the game state to JSON
    state = {
        "deck": game_state.deck,
        "discard_pile": game_state.discard_pile,
        "players": [player.to_dict() for player in game_state.players],
        "turn": game_state.turn
    }
    return jsonify(state)

@game.route('/api/reset_game', methods=['GET'])
def reset_game():
    global game_state
    if len(players) == max_players:
        game_state = GameState(players)
    else:
        game_state = None
        raise ValueError("Not enough players to start game")

@game.route('/api/whose_turn', methods=['GET'])
def player_turn():
    game_state = current_app.config.get('GAME_STATE')
    if game_state is None:
        return jsonify({"error": "Game not initialized"}), 404
    else:
        return jsonify({"id": game_state.turn})