from os import environ
from flask import Flask
from flask_socketio import SocketIO, send, emit
from flask_login import current_user
from flask_pymongo import PyMongo
from bson.json_util import dumps
from bson.objectid import ObjectId
from pymongo import MongoClient
from flask import jsonify, request
from werkzeug import generate_password_hash, check_password_hash

app = Flask(__name__)

MONGO_URI = environ.get('MONGO_URI')
CLIENT = MongoClient(MONGO_URI)
db = CLIENT.test
socketIo = SocketIO(app, cors_allowed_origins="*")


@app.route('/api/v1/register', methods=['POST'])
def add_user():
    _json = request.json
    _name = _json['name']
    _email = _json['email']
    _password = _json['password']
    if _name and _email and _password and request.method == 'POST':
        _id = db.users.insert(
            {'name': _name, 'email': _email, 'pwd': _password})

        resp = jsonify('User added successfully!')
        resp.status_code = 200
        return resp
    else:
        return not_found()


@app.route('/api/v1/users', methods=['GET'])
def users():
    users = db.users.find()
    resp = dumps(users)
    return resp


@app.route('/api/v1/user/<id>')
def user(id):
    user = db.users.find_one({'_id': ObjectId(id)})
    resp = dumps(user)
    return resp


@app.errorhandler(404)
def not_found(error=None):
    message = {
        'status': 404,
        'message': 'Not Found: ' + request.url,
    }
    resp = jsonify(message)
    print(resp)
    resp.status_code = 404

    return resp


@socketIo.on("message")
def handleMessage(msg):
    print(msg)
    send(msg, broadcast=True)
    return None


@socketIo.on("connect")
def connect_handler():
    if current_user.is_authenticated:
        emit('my response',
             {'message': '{0} has joined'.format(current_user.name)},
             broadcast=True)
    else:
        return False


if __name__ == '__main__':
    app.run()
    # socketIo.run(app)
