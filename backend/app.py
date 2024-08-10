from flask import Flask, request, jsonify
from flask_cors import CORS
from chatbot import DocChatbot
import os

from flask import Flask, request, jsonify
from flask_cors import CORS
from chatbot import DocChatbot
import os

app = Flask(__name__)
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'your-secret-key')
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

# Use FLASK_DEBUG environment variable instead of FLASK_ENV
if os.environ.get('FLASK_DEBUG') == '1':
    try:
        from flask_debugtoolbar import DebugToolbarExtension
        toolbar = DebugToolbarExtension(app)
    except ImportError:
        print("DebugToolbarExtension not available. Skipping.")

chatbot = DocChatbot()

@app.route('/analyze', methods=['POST'])
def analyze_code():
    """Analyzes the provided code through the chatbot.

    Receives a JSON payload with the code to be analyzed. If the code 
    is empty or invalid, an error response is returned. 

    Returns:
        JSON: A response containing the analysis results or an error message.
    """
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
    """Starts the Flask application.

    Runs the server on the specified host and port, enabling debug mode.

    Returns:
        None
    """
    app.run(host='0.0.0.0', port=5000, debug=os.environ.get('FLASK_DEBUG') == '1')