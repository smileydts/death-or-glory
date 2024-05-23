from flask import Blueprint, current_app

hello = Blueprint('hello', __name__)

@hello.route('/api/hello')
def hello_world():
    current_app.logger.debug('This is a DEBUG message')
    return "Hello, World!"
