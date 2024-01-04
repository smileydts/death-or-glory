from flask import Blueprint

hello = Blueprint('hello', __name__)

@app.route('/api/hello')
def hello():
    return "Hello, World!"