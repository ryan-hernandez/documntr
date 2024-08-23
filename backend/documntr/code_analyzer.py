from .constants import SYSTEM_CONTENT
from .openai_client import OpenAIClient


class CodeAnalyzer:
    @staticmethod
    def analyze(code):
        """Analyzes the provided code and returns suggestions for improvement.

        Parameters:
        code (str): The code to be analyzed.

        Returns:
        dict: A dictionary containing the analyzed suggestions, generation time, and token count,
              or an error message if the code is empty or an exception occurs.
        """
        if not code:
            return {"error": "Please enter some code to analyze."}

        try:
            messages = [
                {"role": "system", "content": SYSTEM_CONTENT},
                {"role": "user", "content": f"Analyze the following code:\n\n{code}"},
            ]

            response = OpenAIClient.create_chat_completion(messages)
            suggestion = response.choices[0].message["content"]

            return {
                "documented_code": suggestion,
            }
        except Exception as e:
            return {"error": f"An error occurred: {str(e)}"}
