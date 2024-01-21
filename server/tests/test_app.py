import unittest
import json
import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from app import app

class FlaskTestCase(unittest.TestCase):

    def setUp(self):
        """Set up a test client for each test."""
        # Configuring Flask test client
        app.config['TESTING'] = True
        self.client = app.test_client()

    def test_first_four_players_join(self):
        """Test that the first four players receive a 200 response and an id."""
        for i in range(4):
            with self.subTest(i=i):
                response = self.client.post('/api/join', json={'name': f'Player{i}'})
                self.assertEqual(response.status_code, 200)
                data = json.loads(response.data)
                self.assertEqual(data['player_id'], i)

    # def test_fifth_player_rejected(self):
    #     """Test that the fifth player receives a 403 response."""
    #     # First, join 4 players
    #     for i in range(4):
    #         self.client.post('/api/join', json={'name': f'Player{i}'})
        
    #     # Attempt to join with a fifth player
    #     response = self.client.post('/api/join', json={'name': 'Player4'})
    #     self.assertEqual(response.status_code, 403)

if __name__ == '__main__':
    unittest.main()