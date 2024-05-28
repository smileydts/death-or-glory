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
    
    def add_prestige(self, amount: int):
        self.prestige += amount
    
class GameState:
    def __init__(self, players):
        self.base_folder = os.path.join(os.path.dirname(__file__))
        self.cards_file_path = os.path.join(self.base_folder, 'api', 'data', 'cards.json')
        cards = self.load_cards()
        self.deck = self.make_era_deck(cards, 0)
        self.shuffle_deck()
        self.players = players
        self.turn = random.randint(0, 3)
        self.discard_pile = []
        self.deal_cards()

    def load_cards(self):

        try:
            with open(self.cards_file_path, 'r') as cards_file:
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

    def play_cards(self, player_id, card_ids):
        player = next((p for p in self.players if p.id == player_id), None)
        for card_id in card_ids:
            try:
                card_index = player.cards.index(card_id)
                player.cards.pop(card_index)
                self.discard_pile.append(card_id)
            except ValueError:
                print("Card not found")
        # if player and 0 <= card_index < len(player.cards):
        #     card = player.cards.pop(card_index)
        #     self.discard_pile.append(card)
        #     return card
        # else:
        #     raise ValueError("Invalid card index or player not found")

    def draw_card(self, player_id):
        player = next((p for p in self.players if p.id == player_id), None)
        if self.deck:
            player.cards.append(self.deck.pop(0))

    def update_prestige(self, player_id, prestige_points):
        if 0 <= player_id < len(self.players):
            self.players[player_id].add_prestige(prestige_points)
        else:
            raise ValueError("Invalid player ID")
        
    def next_players_turn(self):
        self.turn = (self.turn + 1) % max_players