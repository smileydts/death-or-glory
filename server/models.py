import os
import json
from dataclasses import dataclass, field
from typing import List, Dict

players = []
max_players = 4
game_state = None

@dataclass
class Player:
    id: int
    name: str
    sd: int = field(default=10)  # sex and drugs
    prestige: int = field(default=0)
    cards: List[Dict] = field(default_factory=list)  # list is by default empty
    # add artist trait

    def to_dict(self) -> dict:
        return {
            "id": self.id,
            "name": self.name,
            "sd": self.sd,
            "prestige": self.prestige,
            "cards": self.cards
        }
    
    
class GameState:
    def __init__(self, players):
        cards = self.load_cards()
        self.deck = self.make_era_deck(cards, 0)
        self.players = players
        self.discard_pile = []

    def load_cards():
        data_folder = os.path.join(os.path.dirname(__file__), 'data')
        cards_file_path = os.path.join(data_folder, 'cards.json')

        with open(cards_file_path, 'r') as cards_file:
            cards = json.load(cards_file)

        return cards
    
    def make_era_deck(cards, era):
        deck = []
        for card in cards:
            deck += [card] * card['count'][era]
        return deck

    def shuffle_deck(self):
        import random
        random.shuffle(self.deck)

    def deal_cards(self, num_cards=5):
        for player_id in self.players.keys():
            for _ in range(num_cards):
                if self.deck:
                    self.players[player_id].append(self.deck.pop(0))
                else:
                    break  # Exit if the deck runs out of cards

    def play_cards(self, player_id, card_index):
        # Player plays a card from their hand to the discard pile
        if 0 <= card_index < len(self.players[player_id]):
            card = self.players[player_id].pop(card_index)
            self.discard_pile.append(card)
            return card
        else:
            raise ValueError("Invalid card index")

    def draw_card(self, player_id):
        if self.deck:
            self.players[player_id].append(self.deck.pop(0))