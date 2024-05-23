import os
import json
import random
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
        self.shuffle_deck()
        self.players = players
        self.discard_pile = []
        self.deal_cards()

    def load_cards(self):
        base_folder = os.path.join(os.path.dirname(__file__))
        cards_file_path = os.path.join(base_folder, 'api', 'data', 'cards.json')

        try:
            with open(cards_file_path, 'r') as cards_file:
                cards = json.load(cards_file)
        except FileNotFoundError:
            raise FileNotFoundError("The card file was not found.")
        except json.JSONDecodeError:
            raise json.JSONDecodeError("Error decoding the JSON file.")

        return cards
    
    def make_era_deck(self, cards, era):
        deck = []
        for card in cards:
            deck += [card["id"]] * card['count'][era]
        return deck

    def shuffle_deck(self):
        random.shuffle(self.deck)

    def deal_cards(self, num_cards=5):
        for player in self.players:
            for _ in range(num_cards):
                if self.deck:
                    player.cards.append(self.deck.pop(0))
                else:
                    break  # Exit if the deck runs out of cards

    def play_cards(self, player_id, card_index):
        player = next((p for p in self.players if p.id == player_id), None)
        if player and 0 <= card_index < len(player.cards):
            card = player.cards.pop(card_index)
            self.discard_pile.append(card)
            return card
        else:
            raise ValueError("Invalid card index or player not found")

    def draw_card(self, player_id):
        player = next((p for p in self.players if p.id == player_id), None)
        if self.deck:
            player.cards.append(self.deck.pop(0))