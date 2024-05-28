from flask import Blueprint, request, jsonify, current_app
from utils import get_card_info, roll_2_dice

play_cards = Blueprint('play_cards', __name__)

@play_cards.route('/api/objective', methods=['POST'])
def objective():
    data = request.get_json()
    all_cards = [data['objective']] + data['modifiers']
    game_state = current_app.config.get('GAME_STATE')
    objective_card = get_card_info(data['objective'])
    modifier_cards = [get_card_info(m) for m in data['modifiers']]

    roll = roll_2_dice()
    modified_roll = roll + sum([m['die_mod'] for m in modifier_cards])
    success = modified_roll >= objective_card['min_roll']
    if success:
        game_state.update_prestige(data['player'], objective_card['prestige'])
    game_state.play_cards(data['player'], all_cards)
    game_state.next_players_turn()

    return jsonify(
        {
            "roll": roll,
            "modified_roll": modified_roll,
            "success": success
        }
    )