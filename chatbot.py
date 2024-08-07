"""
Module: chatbot_app.py
Description: A Flask application implementing a chatbot that suggests documentation based on code analysis.
Dependencies: Flask, OpenAI
"""
import os
import openai
from flask import Flask, request, render_template_string, jsonify
import time

app = Flask(__name__)

class DocChatbot:
    """
    Class to handle code analysis and documentation suggestion using OpenAI chat model.
    
    Methods:
        __init__: Initialize the chatbot with OpenAI API key.
        analyze_code: Analyze code and suggest documentation.
    """
    def __init__(self):
        """
        Initialize the DocChatbot instance with OpenAI API key.
        """
        # Set up OpenAI API
        self.api_key = os.getenv("OPENAI_API_KEY")
        if not self.api_key:
            raise ValueError("OPENAI_API_KEY environment variable is not set.")
        
        openai.api_key = self.api_key
        self.total_time = 0
        self.num_generations = 0
        self.total_tokens = 0

    def analyze_code(self, code):
        """
        Analyze the provided code and suggest documentation.

        Args:
            code (str): The code snippet to analyze.

        Returns:
            dict: A dictionary containing the analyzed code with suggested documentation and summary.
        """
        if not code:
            return {"error": "Please enter some code to analyze."}

        start_time = time.time()
        
        try:
            # Prepare the messages
            messages = [
                {"role": "system", "content": """You are a helpful assistant that analyzes code and suggests documentation based on the recommended best practices for the given language.
                                                Your response should include only the updated code, formatted with proper indentation for the specified language (if one can be ascertained).
                                                Do not alter the functionality or layout of the code in any way other than to insert code documentation.
                                                Under no circumstances are you to add comments inside functions or methods describing what the code does.
                                                Provide documentation above each function or method giving a summary as well as detailing any parameters and return values.
                                                Make sure each function in the class file contains documentation above it.
                                                Also provide class level documentation describing what the class does.
                                                Do not include any markdown coding like fenced code blocks.
                                                Do not include any flavor text saying that you've updated the code or anything like that, simply output code."""}
            ]
            
            # Add the current code analysis request
            messages.append({"role": "user", "content": f"Analyze the following code:\n\n{code}"})

            response = openai.ChatCompletion.create(
                model="gpt-4",
                messages=messages
            )
            suggestion = response.choices[0].message['content']
            
            end_time = time.time()
            generation_time = end_time - start_time
            self.total_time += generation_time
            self.num_generations += 1
            self.total_tokens += len(code.split())

            average_time = self.total_time / self.num_generations
            average_tokens = self.total_tokens / self.num_generations
            token_time_ratio = average_tokens / average_time

            return {
                "documented_code": suggestion,
                "summary": suggestion,
                "generation_time": generation_time,
                "average_time": average_time,
                "token_time_ratio": token_time_ratio
            }
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
                    font-family: 'Roboto', sans-serif;
                    font-size: 16px;
                    max-height: 400px; /* Adjust max height */
                    overflow-y: auto;  /* Enable vertical scrolling */
                    text-align: center; /* Center-align text in the error */
                }

                .loading {
                    display: none;
                    text-align: center;
                    margin-top: 40px;
                }
                
                .spinner {
                    border: 8px solid #f3f3f3; /* Light grey */
                    border-top: 8px solid #007bff; /* Blue */
                    border-radius: 50%;
                    width: 40px;
                    height: 40px;
                    animation: spin 1s linear infinite;
                    margin: 0 auto; /* Center the spinner horizontally */
                }
                
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
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

                /* Timer Styles */
                #timerContainer {
                    text-align: center;
                    margin-top: 20px;
                }
                #timer, #averageTime, #tokenTimeRatio {
                    font-family: 'Roboto', sans-serif;
                    font-size: 18px;
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
                <div class="spinner"></div>
            </div>
            <div id="error" class="error" style="display: none;">
                <!-- Summary will be injected here -->
            </div>
            <div id="timerContainer">
                <div id="timer">Current Time: 0s</div>
                <div id="averageTime">Average Time: 0s</div>
                <div id="tokenTimeRatio">Token/Time Ratio: 0</div>
            </div>
            <script>
                // Ensure CodeMirror initialization
                var editor;
                var summaryEditor;
                var startTime;
                var totalGenerationTime = 0;
                var numGenerations = 0;
                var totalTokens = 0;

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

                function updateTimer() {
                    if (startTime) {
                        var currentTime = (Date.now() - startTime) / 1000;
                        $('#timer').text('Current Time: ' + currentTime.toFixed(2) + 's');
                    }
                }

                function updateMetrics(data) {
                    totalGenerationTime += data.generation_time;
                    numGenerations++;
                    totalTokens += editor.getValue().split(' ').length;

                    var averageTime = totalGenerationTime / numGenerations;
                    var averageTokens = totalTokens / numGenerations;
                    var tokenTimeRatio = averageTokens / averageTime;

                    $('#averageTime').text('Average Time: ' + averageTime.toFixed(2) + 's');
                    $('#tokenTimeRatio').text('Token/Time Ratio: ' + tokenTimeRatio.toFixed(2));
                }

                function analyzeCode() {
                    $('.loading').show();
                    startTime = Date.now();
                    var timerInterval = setInterval(updateTimer, 100);

                    $.post('/', { code: editor.getValue() }, function(data) {
                        clearInterval(timerInterval);
                        $('.loading').hide();
                        $('#analyzeButton').hide(); // Hide analyze button
                        $('#newSessionButton').show(); // Show new session button

                        if (data.error) {
                            $('#error').html('<strong>Error:</strong><br>' + data.error).show();
                        } else {
                            const code = data.summary;
                            console.log(data.summary);
                            
                            summaryEditor.setValue(code);
                            updateMetrics(data);
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
