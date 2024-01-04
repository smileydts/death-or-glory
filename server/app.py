from flask import Flask
from flask_cors import CORS
from api.hello import hello

app = Flask(__name__)
CORS(app)

app.register_blueprint(hello)

if __name__ == "__main__":
    app.run(debug=True)  # Turn off debug mode in a production environment
