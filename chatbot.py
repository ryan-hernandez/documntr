"""
Module: chatbot_app.py
Description: A Flask application implementing a chatbot that suggests documentation based on code analysis.
Dependencies: Flask, OpenAI, 'data/conversation_history.json' file
"""
import os
import json
import openai
from flask import Flask, request, render_template_string, jsonify

app = Flask(__name__)

class DocChatbot:
    """
    Class to handle code analysis and documentation suggestion using OpenAI chat model.
    
    Methods:
        __init__: Initialize the chatbot with OpenAI API key and conversation history.
        load_conversation_history: Load past conversation history from a JSON file.
        save_conversation_history: Save the conversation history to a JSON file.
        analyzecode: Analyze code and suggest documentation based on the chatbot's conversation history.
    """
    def __init__(self):
        """
        Initialize the DocChatbot instance with OpenAI API key and conversation history.
        """
        # Set up OpenAI API
        self.api_key = os.getenv("OPENAI_API_KEY")
        if not self.api_key:
            raise ValueError("OPENAI_API_KEY environment variable is not set.")
        
        openai.api_key = self.api_key
        
        # Initialize conversation history
        self.conversation_history = self.load_conversation_history()

    def load_conversation_history(self):
        """
        Load conversation history from a JSON file.
        """
        try:
            with open('data/conversation_history.json', 'r') as f:
                return json.load(f)
        except FileNotFoundError:
            return []

    def save_conversation_history(self):
        """
        Save the conversation history to a JSON file.
        """
        os.makedirs('data', exist_ok=True)
        with open('data/conversation_history.json', 'w') as f:
            json.dump(self.conversation_history, f)

    def analyzecode(self, code):
        """
        Analyze the provided code and suggest documentation based on conversation history.

        Args:
            code (str): The code snippet to analyze.

        Returns:
            dict: A dictionary containing the analyzed code with suggested documentation and summary.
        """
        if not code:
            return {"error": "Please enter some code to analyze."}

        try:
            # Prepare the messages, including conversation history
            messages = [
                {"role": "system", "content": "You are a helpful assistant that analyzes code and suggests documentation based on the recommended best practices for the given language."}
            ]
            
            # Add relevant conversation history
            for entry in self.conversation_history[-5:]:  # Use last 5 conversations
                messages.append({"role": "user", "content": entry["user_message"]})
                messages.append({"role": "assistant", "content": entry["assistant_response"]})
            
            # Add the current code analysis request
            messages.append({"role": "user", "content": f"Analyze this code and suggest appropriate documentation based on the recommended best practices for the given language:\n\n{code}"})

            response = openai.ChatCompletion.create(
                model="gpt-4o-mini",
                messages=messages
            )
            suggestion = response.choices[0].message['content']
            
            # Highlight the documentation
            documented_code = code + "\n\n/* Documentation Suggested by AI: */\n" + "\n".join(
                [f"<span class='highlight'>{line}</span>" if line.strip().startswith("#") else line for line in suggestion.split("\n")]
            )
            
            # Save this conversation to history
            self.conversation_history.append({
                "user_message": f"Analyze this code and suggest appropriate documentation based on the recommended best practices for the given language:\n\n{code}",
                "assistant_response": suggestion
            })
            self.save_conversation_history()
            
            return {"documented_code": documented_code, "summary": suggestion}
        except Exception as e:
            return {"error": f"An error occurred: {str(e)}"}

chatbot = DocChatbot()

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        code = request.form['code']
        result = chatbot.analyzecode(code)
        return jsonify(result)
    return render_template_string('''
        <!DOCTYPE html>
        <html>
        <head>
            <title>Documentation Suggestion Chatbot</title>
            <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
            <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.5.1/styles/default.min.css">
            <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.5.1/highlight.min.js"></script>
            <style>
                /* Font Import */
                @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');
                @import url('https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;700&display=swap');

                body {
                    font-family: 'Roboto', sans-serif;
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 20px;
                }
                textarea {
                    width: 100%;
                    font-family: 'Fira Code', monospace; /* Matching code style font */
                    font-size: 16px;
                    line-height: 1.5;
                    padding: 10px;
                    border: 1px solid #ddd;
                    border-radius: 5px;
                    background-color: #f9f9f9;
                    resize: none;
                    outline: none;
                    box-shadow: inset 0 1px 3px rgba(0,0,0,0.12);
                    overflow-x: auto; /* Horizontal scrollbar for text overflow */
                    max-height: 1000px; /* Maximum height */
                    white-space: nowrap; /* Prevent text from wrapping */
                }
                textarea:focus {
                    border-color: #999;
                }
                textarea::-webkit-input-placeholder {
                    color: #999;
                }
                textarea::-moz-placeholder {
                    color: #999;
                }
                textarea:-ms-input-placeholder {
                    color: #999;
                }
                textarea:-moz-placeholder {
                    color: #999;
                }
                #result {
                    margin-top: 20px;
                    border: 1px solid #ddd;
                    padding: 10px;
                    background-color: #f9f9f9;
                    display: none; /* Hide result box by default */
                }
                .summary {
                    background-color: #fff;
                    padding: 15px;
                    border-radius: 5px;
                    margin-top: 20px;
                    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
                    font-family: 'Roboto', sans-serif;
                    font-size: 16px;
                }
                .summary code {
                    display: block;
                    font-family: 'Fira Code', monospace;
                    background-color: #f5f5f5;
                    border: 1px solid #ddd;
                    border-radius: 3px;
                    padding: 10px;
                    overflow-x: auto;
                    max-width: 100%;
                }
                .loading {
                    display: none;
                    text-align: center;
                    margin-top: 20px;
                }
                .loading img {
                    width: 50px;
                }
                pre {
                    max-width: 100%;
                    overflow-x: auto;
                    background: #f5f5f5;
                    border: 1px solid #ddd;
                    border-radius: 3px;
                    padding: 10px;
                    font-family: 'Fira Code', monospace;
                }
                pre code {
                    display: block;
                    font-size: 16px;
                    line-height: 1.4;
                    word-break: break-all;
                    white-space: pre;
                }
                #analyzeButton {
                    background-color: #007bff; /* Bootstrap primary color */
                    color: white;
                    border: none;
                    border-radius: 5px;
                    padding: 10px 20px;
                    font-size: 16px;
                    cursor: pointer;
                    transition: background-color 0.3s ease;
                }
                #analyzeButton:hover {
                    background-color: #0056b3; /* Darker blue for hover */
                }
                #analyzeButton:focus {
                    outline: none;
                    box-shadow: 0 0 0 2px rgba(38, 143, 255, 0.5); /* Blue shadow for focus */
                }
                h1 {
                    text-align: center; /* Center align the header */
                    font-family: 'Roboto', sans-serif;
                    font-size: 2em;
                    margin-bottom: 20px;
                }
            </style>
        </head>
        <body>
            <title>documntr</title>
            <h1>documntr</h1>
            <textarea id="code" placeholder="Enter your code here..." spellcheck="false"></textarea><br>
            <button id="analyzeButton">Analyze</button>
            <div class="loading">
                <img src="https://i.gifer.com/ZZ5H.gif" alt="Loading...">
            </div>
            <div id="result"></div>
            <script>
                function autoResizeTextarea() {
                    var textarea = document.getElementById('code');
                    textarea.style.height = 'auto'; // Reset height
                    textarea.style.height = Math.min(textarea.scrollHeight, 1000) + 'px'; // Set height based on content but max 1000px
                }

                function analyzeCode() {
                    $('.loading').show();
                    $('#result').hide();
                    $.post('/', {code: $('#code').val()}, function(data) {
                        $('.loading').hide();
                        $('#result').show();
                        if (data.error) {
                            $('#result').html('<div class="summary"><strong>Error:</strong><br>' + data.error + '</div>');
                        } else {
                            const summary = data.summary;
                            $('#result').html('<div class="summary"><strong>Summary of Documentation:</strong><br>' + marked.parse(summary) + '</div>');
                        }
                    });
                }

                $(document).ready(function() {
                    $('#analyzeButton').on('click', analyzeCode);
                    $('#code').on('input', autoResizeTextarea);
                });

                marked.setOptions({
                    highlight: function(code, lang) {
                        return hljs.highlightAuto(code, [lang]).value;
                    }
                });
            </script>
        </body>
        </html>
    ''')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
