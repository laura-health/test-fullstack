from os import environ
from flask import Flask
from flask_socketio import SocketIO
from pymongo import MongoClient
from flask_cors import CORS, cross_origin

app = Flask(__name__)

MONGO_URI = environ.get('MONGO_URI')
CLIENT = MongoClient(MONGO_URI)
db = CLIENT.test

cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

app.config['SECRET_KEY'] = 'secret'
socketIo = SocketIO(app, cors_allowed_origins="*")