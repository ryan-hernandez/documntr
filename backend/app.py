from flask import Flask, request, jsonify
from flask_cors import CORS
from chatbot import DocChatbot

app = Flask(__name__)
CORS(app)  # This allows your React frontend to make requests to this API

chatbot = DocChatbot()

@app.route('/analyze', methods=['POST'])
def analyze_code():
    data = request.json
    code = data.get('code', '')
    
    if not code.strip():
        return jsonify({"error": "Please enter some code to analyze."}), 400
    
    result = chatbot.analyze_code(code)
    
    if "error" in result:
        return jsonify({"error": result["error"]}), 500
    
    return jsonify({
        "documented_code": result["documented_code"],
        "generation_time": result["generation_time"],
        "average_time": result["average_time"],
        "token_time_ratio": result["token_time_ratio"]
    })

if __name__ == '__main__':
    app.run(debug=True)