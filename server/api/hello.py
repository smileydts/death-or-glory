from flask import Blueprint

hello = Blueprint('hello', __name__)

@hello.route('/api/hello')
def hello_world():
    return "Hello, World!"