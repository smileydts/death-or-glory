from flask import Flask
from flask_cors import CORS
from api.hello import hello
from api.join import join

app = Flask(__name__)
CORS(app)

app.register_blueprint(hello)
app.register_blueprint(join)

if __name__ == "__main__":
    app.run(debug=True)  # Turn off debug mode in a production environment
