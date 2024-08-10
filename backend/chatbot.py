# app/chatbot.py

import openai
import time

class DocChatbot:
    def __init__(self):
        self.total_time = 0
        self.num_generations = 0
        self.total_tokens = 0
        self.current_generation_time = 0

    def analyze_code(self, code):
        if not code:
            return {"error": "Please enter some code to analyze."}
        
        start_time = time.time()

        try:
            messages = [
                {"role": "system", "content": """You are an assistant that analyzes code and suggests documentation based on the recommended best practices for the given language.
                                                Your response should include only the updated code, formatted with proper indentation for the specified language (if one can be ascertained).
                                                Under no circumstances are you to alter the functionality or layout of the code in any way other than to insert code documentation.
                                                Under no circumstances are you to add comments inside functions or methods describing what the code does.
                                                Provide documentation above each function or method giving a summary as well as detailing any parameters and return values.
                                                Make sure each function in the class file contains documentation above it.
                                                Aim for clarity, completeness, and consistency. Try to be as succinct as possible.
                                                DO NOT ADD ANY MARKDOWN CODE TO YOUR RESPONSE. DO NOT INCLUDE ANY CODE BLOCKS OR BACK TICKS WHATSOEVER.
                                                Under no circumstances are you to include any flavor text saying that you've updated the code or anything like that, simply output code.
                                                Take your initial response and ask yourself how you would improve upon that documentation and then respond with the improved documentation after your own reflection."""}
            ]
            
            messages.append({"role": "user", "content": f"Analyze the following code:\n\n{code}"})

            response = openai.ChatCompletion.create(
                model="gpt-4",
                messages=messages
            )
            suggestion = response.choices[0].message['content']
            
            generation_time = time.time() - start_time
            self._update_metrics(generation_time, len(code.split()))

            return {
                "documented_code": suggestion,
                "generation_time": self.current_generation_time,
                "average_time": self.total_time / self.num_generations,
                "token_time_ratio": self.total_tokens / self.total_time
            }
        except Exception as e:
            return {"error": f"An error occurred: {str(e)}"}

    def _update_metrics(self, generation_time, tokens):
        self.current_generation_time = generation_time
        self.total_time += self.current_generation_time
        self.num_generations += 1
        self.total_tokens += tokens