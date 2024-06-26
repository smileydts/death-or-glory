from flask import Flask
from flask_cors import CORS
from api.hello import hello
from api.join import join
from api.game import game
from api.play_cards import play_cards

app = Flask(__name__)
CORS(app)

app.register_blueprint(hello)
app.register_blueprint(join)
app.register_blueprint(game)
app.register_blueprint(play_cards)

if __name__ == "__main__":
    app.config['DEBUG'] = True  # Turn off debug mode in a production environment

if app.debug:
    import logging
    app.logger.setLevel(logging.DEBUG)
