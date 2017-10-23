"""
WS HTTP Server
"""
import os
import json
from datetime import datetime
import requests
from pymongo import MongoClient, DESCENDING
from flask import Flask, render_template, request, redirect, \
        url_for, send_from_directory, make_response, jsonify
from flask_socketio import SocketIO
from flask_cors import CORS

DEBUG = True
m = MongoClient()
db = m.get_database('weatherdb')
measures = db.get_collection('measures')
app = Flask(__name__)
if DEBUG:
    CORS(app)
socketio = SocketIO(app)


@app.route('/measure/', methods=['POST'])
def post_measure():
    """
    Receive a measure and save it
    """
    data = json.loads(request.get_data().decode('utf-8'))
    data['date'] = datetime.now()
    object_id = measures.insert(data)
    data['_id'] = object_id
    print(data)
    return jsonify({'status': 200})

@app.route('/measures/', methods=['GET'])
def get_measures():
    """
    Get last measures
    """
    data = list(measures.find({}, {"_id": 0}).sort("date", DESCENDING).limit(4))[::-1]
    return jsonify(data)

@socketio.on('message')
def handle_message(message):
    print('received message: ' + message)

def main():
    socketio.run(
        app,
        host="0.0.0.0",
        port=int("7890"),
        debug=DEBUG
    )


if __name__ == '__main__':
    main()
