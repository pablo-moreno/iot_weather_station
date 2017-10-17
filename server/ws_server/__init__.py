"""
WS HTTP Server
"""
import os
import json
from datetime import datetime
import requests
from pymongo import MongoClient
from flask import Flask, render_template, request, redirect, \
        url_for, send_from_directory, make_response, jsonify

m = MongoClient()
db = m.get_database('weatherdb')
measures = db.get_collection('measures')

app = Flask(__name__)

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

def main():
    app.run(
        host="0.0.0.0",
        port=int("7890"),
        debug=True
    )

if __name__ == '__main__':
    main()
