from flask import Flask

app = Flask(__name__)

@app.route('/members')
def hello_world():
    return {"members": ["A", "B", "C"]}

if __name__ == '__main__':
    app.run(debug=True)