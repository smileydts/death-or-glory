from flask import Blueprint, request, jsonify, current_app
from models import players, max_players, Player, GameState

join = Blueprint('join', __name__)

@join.route('/api/join', methods=['POST'])
def join_game():
    data = request.get_json()

    if len(players) == max_players:
        return "Game is full", 403
    
    id = len(players)
    new_player = Player(id, data['name'])
    players.append(new_player)

    if len(players) == max_players:
        current_app.config['GAME_STATE'] = GameState(players)
    return {"player_id": id}

@join.route('/api/get_players', methods=['POST'])
def get_players():
    data = request.get_json()

    player_view = []
    for p in range(max_players):
        try:
            player_view.append(players[(p + data['player_id']) % max_players])
        except IndexError:
            player_view.append(Player(-1, 'null'))
    return jsonify([player.to_dict() for player in player_view])

@join.route('/api/reset_players', methods=['POST'])
def reset_players():
    global players
    players = []
    return "Players reset"
