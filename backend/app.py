from flask import Flask, request, jsonify
from flask_cors import CORS
from chatbot import DocChatbot
import os

app = Flask(__name__)
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'your-secret-key')  # Use environment variable
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

# Only use DebugToolbarExtension in debug mode
if app.debug:
    from flask_debugtoolbar import DebugToolbarExtension
    toolbar = DebugToolbarExtension(app)

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
        "total_tokens": result["total_tokens"],
        "token_time_ratio": result["token_time_ratio"]
    })

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)