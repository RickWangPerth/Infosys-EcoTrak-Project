from flask import Flask, request,jsonify, json
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.route('/elecdata', methods=['POST'])
def add_elecdata():
    data = request.get_json()
    
    return jsonify(data)

@app.route('/data')
def send_data():
    data = {
        "key1": 2,
    }
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)