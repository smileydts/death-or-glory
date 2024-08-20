from flask import Blueprint, request, jsonify, current_app, Response
from models import players, max_players, Player, GameState
from time import sleep
import json

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

@join.route('/stream')
def stream():
    # to test: paste http://localhost:5000/stream?player_id=0 into the browser (may have to use incognito?)
    player_id = request.args.get('player_id', type=int)

    def event_stream():
        old_player_count = len(players)
        while old_player_count < 4:
            current_player_count = len(players)
            #  uncomment out the line below if you want to see that it's doing something
            #  print(current_player_count)
            if old_player_count != current_player_count:

                player_view = []
                for p in range(max_players):
                    try:
                        player_view.append(players[(p + player_id) % max_players])
                    except IndexError:
                        player_view.append(Player(-1, 'null'))
                player_data = [player.to_dict() for player in player_view]

                yield f"data: {json.dumps(player_data)}\n\n"
                old_player_count = current_player_count
                
            sleep(1)

    response = Response(event_stream(), mimetype='text/event-stream')
    response.headers['Content-Security-Policy'] = "default-src 'self'; connect-src 'self' http://localhost:5000"
    return response
#    return Response(event_stream(), mimetype='text/event-stream')

@join.route('/api/reset_players', methods=['POST'])
def reset_players():
    global players
    players = []
    return "Players reset"
