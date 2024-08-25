import os

from config import config
from flask import Flask, jsonify, request
from flask_cors import CORS

from documntr import Documntr


def create_app(config_name):
    app = Flask(__name__)
    app.config.from_object(config[config_name])

    # Configure CORS
    CORS(
        app,
        resources={
            r"/*": {
                "origins": "http://localhost:3000",
                "methods": ["GET", "POST", "OPTIONS"],
                "allow_headers": ["Content-Type", "Authorization"],
            }
        },
    )

    documntr_instance = Documntr()

    @app.route("/analyze", methods=["POST"])
    def analyze_code():
        try:
            data = request.json
            code = data.get("code", "")

            if not code.strip():
                return jsonify({"error": "Please enter some code to analyze."}), 400

            result = documntr_instance.analyze_code(code)

            if "error" in result:
                return jsonify({"error": result["error"]}), 500

            return jsonify({"documented_code": result["documented_code"]})
        except Exception as e:
            app.logger.error(f"An error occurred: {str(e)}")
            return jsonify({"error": "An internal server error occurred."}), 500

    return app


app = create_app(os.getenv("FLASK_ENV") or "default")

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
