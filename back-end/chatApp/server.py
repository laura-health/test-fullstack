from flask import Flask
from flask_socketio import SocketIO, send, emit
from flask_login import current_user
from bson.json_util import dumps
from bson.objectid import ObjectId
from flask import jsonify, request
from werkzeug import generate_password_hash, check_password_hash
from wtforms.validators import ValidationError

from config import app, socketIo, db


@app.route('/api/v1/register', methods=['POST'])
def add_user():
    _json = request.json
    _name = _json['name']
    _email = _json['email']
    _password = _json['password']
    users = db.users
    user = users.find_one({'email': _email})
    if user:
        raise ValidationError('Email alredy registered.')
    
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


if __name__ == '__main__':
    socketIo.run(app, debug=True, host="localhost")
