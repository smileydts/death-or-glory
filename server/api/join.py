from flask import Blueprint, request
from models import players, max_players, Player

join = Blueprint('join', __name__)

@join.route('/api/join', methods=['POST'])
def join_game():
    data = request.get_json()

    if len(players) == max_players:
        return "Game is full", 403
    
    id = len(players)
    new_player = Player(id, data['name'])
    players.append(new_player)
    return {"player_id": id}
