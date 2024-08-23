import os

from flask import Flask, jsonify, request
from flask_cors import CORS

from documntr import Documntr  # Updated import statement

app = Flask(__name__)
app.config["SECRET_KEY"] = os.environ.get("SECRET_KEY", "your-secret-key")
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

# Use FLASK_DEBUG environment variable instead of FLASK_ENV
if os.environ.get("FLASK_DEBUG") == "1":
    try:
        from flask_debugtoolbar import DebugToolbarExtension

        toolbar = DebugToolbarExtension(app)
    except ImportError:
        print("DebugToolbarExtension not available. Skipping.")

documntr_instance = Documntr()  # Changed variable name to avoid conflict


@app.route("/analyze", methods=["POST"])
def analyze_code():
    """Analyzes the provided code through the Documntr.

    Receives a JSON payload with the code to be analyzed. If the code
    is empty or invalid, an error response is returned.

    Returns:
        JSON: A response containing the analysis results or an error message.
    """
    data = request.json
    code = data.get("code", "")

    if not code.strip():
        return jsonify({"error": "Please enter some code to analyze."}), 400

    result = documntr_instance.analyze_code(code)

    if "error" in result:
        return jsonify({"error": result["error"]}), 500

    return jsonify(
        {
            "documented_code": result["documented_code"],
        }
    )


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=os.environ.get("FLASK_DEBUG") == "1")
