import json
from random import randint

from flask import current_app

def load_cards(game_state):
    with open(game_state.cards_file_path, 'r') as file:
        return json.load(file)

def get_card_info(id):
    game_state = current_app.config.get('GAME_STATE')
    cards = load_cards(game_state)
    return next((c for c in cards if c['id'] == id), None)

def roll_2_dice():
    return randint(1, 6) + randint(1, 6)