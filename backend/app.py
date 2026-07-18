from flask import Flask, jsonify, request
from business import get_data
app = Flask(__name__)

@app.route('/') 
def home():
    return "Hello, World!"

@app.route('/api' , methods=['GET'])
def api():
    data = get_data()
    dic = {"data": data}
    return jsonify(dic)

if __name__ == '__main__':
    app.run(port=8000,host="0.0.0.0", debug=True)
