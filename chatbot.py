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
        analyze_code: Analyze code and suggest documentation based on the chatbot's conversation history.
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

    def analyze_code(self, code):
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
            messages.append({"role": "user", "content": f"""Analyze the following code and suggest appropriate documentation based on the recommended best practices for the given language.
                             Your response should include only the updated code, formatted with proper indentation for the specified language (if one can be ascertained).
                             Do not include any markdown coding like fenced code blocks.
                             Do not include any flavor text saying that you've updated the code or anything like that, simply output code.\n
                             Code:\n\n{code}"""})

            response = openai.ChatCompletion.create(
                model="gpt-4o-mini",
                messages=messages
            )
            suggestion = response.choices[0].message['content']
            
            # Save this conversation to history
            self.conversation_history.append({
                "user_message": f"""Analyze the following code and suggest appropriate documentation based on the recommended best practices for the given language.
                             Your response should include only the updated code, formatted with proper indentation for the specified language (if one can be ascertained).
                             Do not include any markdown coding like fenced code blocks.
                             Do not include any flavor text saying that you've updated the code or anything like that, simply output code.\n
                             Code:\n\n{code}""",
                "assistant_response": suggestion
            })
            self.save_conversation_history()
            
            return {"documented_code": suggestion, "summary": suggestion}
        except Exception as e:
            return {"error": f"An error occurred: {str(e)}"}

chatbot = DocChatbot()

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        code = request.form['code']
        result = chatbot.analyze_code(code)
        return jsonify(result)
    return render_template_string('''
        <!DOCTYPE html>
        <html>
        <head>
            <title>documntr</title>
            <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
            <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.5.1/styles/monokai.min.css">
            <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.5.1/highlight.min.js"></script>
            <!-- CodeMirror Styles -->
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.2/codemirror.min.css">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.2/theme/dracula.min.css">
            <script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.2/codemirror.min.js"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.2/mode/javascript/javascript.min.js"></script>
            <style>
                /* Font Import */
                @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');
                @import url('https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;700&display=swap');

                html, body {
                    height: 100%;
                    margin: 0;
                    padding: 0;
                    overflow: hidden;
                }
                
                body {
                    font-family: 'Roboto', sans-serif;
                    max-width: 100%;
                    margin: 0 auto;
                    padding: 20px;
                    background-color: #333;
                    color: #eee;
                }

                .CodeMirror {
                    height: 800px; /* Set a fixed height */
                    border: 1px solid #555;
                    border-radius: 5px;
                }

                #inputContainer,
                #resultContainer {
                    display: inline-block;
                    vertical-align: top;
                    width: 45%; /* Reduced width to add more space between containers */
                    margin: 0 2.5%; /* Even margins on both sides */
                    margin-top: 20px;
                }
                
                #resultContainer {
                    margin-right: 0; /* No right margin for the last container */
                }

                #result {
                    margin-top: 20px;
                    border: 1px solid #555;
                    padding: 10px;
                    background-color: #222;
                    color: #eee;
                    display: none;
                    max-height: 500px; /* Adjust max height */
                    overflow-y: auto;  /* Enable vertical scrolling */
                }

                /* Center-aligned error */
                .error {
                    background-color: #333;
                    padding: 15px;
                    border-radius: 5px;
                    margin-top: 20px;
                    box-shadow: 0 2px 5px rgba(0,0,0,0.2);
                    font-family: 'Roboto', sans-serif;
                    font-size: 16px;
                    max-height: 400px; /* Adjust max height */
                    overflow-y: auto;  /* Enable vertical scrolling */
                    text-align: center; /* Center-align text in the error */
                }

                .loading {
                    display: none;
                    text-align: center;
                    margin-top: 20px;
                }

                .loading img {
                    width: 50px;
                }

                #analyzeButton, #newSessionButton {
                    background-color: #007bff;
                    color: white;
                    border: none;
                    border-radius: 5px;
                    padding: 10px 20px;
                    font-size: 16px;
                    cursor: pointer;
                    transition: background-color 0.3s ease;
                    display: block;
                    margin: 20px auto;
                }

                #analyzeButton:hover, #newSessionButton:hover {
                    background-color: #0056b3;
                }

                #analyzeButton:focus, #newSessionButton:focus {
                    outline: none;
                    box-shadow: 0 0 0 2px rgba(38, 143, 255, 0.5);
                }

                #newSessionButton {
                    background-color: #28a745;
                }

                #newSessionButton:hover {
                    background-color: #218838;
                }

                h1 {
                    text-align: center;
                    font-family: 'Roboto', sans-serif;
                    font-size: 2em;
                    margin-top: 10px;
                    margin-bottom: 20px;
                }

                /* Custom scrollbars */
                ::-webkit-scrollbar {
                    width: 12px;
                }

                ::-webkit-scrollbar-thumb {
                    background: #555;
                    border-radius: 10px;
                }

                ::-webkit-scrollbar-thumb:hover {
                    background: #777;
                }

                ::-webkit-scrollbar-track {
                    background: #333;
                }
            </style>
        </head>
        <body>
            <h1>documntr</h1>
            <div id="inputContainer">
                <textarea id="code" placeholder="Enter your code here..." spellcheck="false"></textarea>
            </div>
            <div id="resultContainer">
                <textarea id="summaryCode" style="display: none;"></textarea>
            </div>
            <button id="analyzeButton">Analyze</button>
            <button id="newSessionButton">New Session</button>
            <div class="loading">
                <img src="https://i.gifer.com/ZZ5H.gif" alt="Loading...">
            </div>
            <div id="error" class="error" style="display: none;">
                <!-- Summary will be injected here -->
            </div>
            <script>
                // Ensure CodeMirror initialization
                var editor;
                var summaryEditor;

                function initializeEditor() {
                    editor = CodeMirror.fromTextArea(document.getElementById('code'), {
                        theme: 'dracula',
                        lineNumbers: true,
                        lineWrapping: false,
                        scrollbarStyle: "native"
                    });
                }

                function initializeSummaryEditor(code) {
                    summaryEditor = CodeMirror.fromTextArea(document.getElementById('summaryCode'), {
                        value: code,
                        theme: 'dracula',
                        lineNumbers: false,
                        lineWrapping: false,
                        readOnly: true,
                        scrollbarStyle: "native"
                    });
                }

                function analyzeCode() {
                    $('.loading').show();
                    $.post('/', { code: editor.getValue() }, function(data) {
                        $('.loading').hide();
                        $('#analyzeButton').hide(); // Hide analyze button
                        $('#newSessionButton').show(); // Show new session button

                        if (data.error) {
                            $('#error').html('<strong>Error:</strong><br>' + data.error).show();
                        } else {
                            const code = data.summary;
                            console.log(data.summary);
                            
                            summaryEditor.setValue(code);
                        }
                    });
                }

                function startNewSession() {
                    $('#newSessionButton').hide(); // Hide new session button
                    $('#error').hide(); // Hide error section
                    $('#analyzeButton').show(); // Show analyze button
                    editor.setValue(''); // Clear code editor
                    summaryEditor.setValue(''); // Clear generated code
                }

                $(document).ready(function() {
                    initializeEditor();
                    initializeSummaryEditor(null);
                    $('#newSessionButton').hide(); // Hide new session button
                    $('#analyzeButton').on('click', analyzeCode);
                    $('#newSessionButton').on('click', startNewSession);
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
