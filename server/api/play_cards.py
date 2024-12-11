from flask import Blueprint, request, jsonify, current_app
from utils import get_card_info, roll_2_dice

play_cards = Blueprint('play_cards', __name__)

@play_cards.route('/api/objective', methods=['POST'])
def objective():
    data = request.get_json()
    game_state = current_app.config.get('GAME_STATE')

    all_cards = [data['objective']] + data['modifiers']

    objective_card = get_card_info(data['objective'])
    modifier_cards = [get_card_info(m) for m in data['modifiers']]

    roll = roll_2_dice()
    modified_roll = roll + sum([m['die_mod'] for m in modifier_cards])
    success = modified_roll >= objective_card['min_roll']
    if success:
        game_state.update_score(data['player'], 'prestige', objective_card['prestige'])
    game_state.update_score(data['player'], 'sd', -1 * sum([c['cost'] for c in [objective_card] + modifier_cards]))
    game_state.move_cards_to_discard(data['player'], all_cards)
    game_state.next_players_turn()

    return jsonify(
        {
            "roll": roll,
            "modified_roll": modified_roll,
            "success": success
        }
    )

@play_cards.route('/api/cash_card', methods=['POST'])
def cash_card():
    data = request.get_json()
    game_state = current_app.config.get('GAME_STATE')

    full_card = get_card_info(data['card'])
    game_state.update_score(data['player'], 'sd', full_card['value'])
    game_state.move_cards_to_discard(data['player'], [data['card']])
    game_state.next_players_turn()
    game_state.last_play_text = f"{data['player']} cashed in {data['card']} for {full_card['value']} sex and drugs"

    return jsonify(game_state.to_dict(data['player'])), 200