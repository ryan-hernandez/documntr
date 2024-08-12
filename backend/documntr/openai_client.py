import openai

class OpenAIClient:
    """
    A client for interfacing with OpenAI's chat completion API.
    """

    @staticmethod
    def create_chat_completion(messages, model="gpt-4o-mini"):
        """
        Creates a chat completion using the provided messages and model.

        Parameters:
            messages (list): A list of message objects formatted for the API.
            model (str): The model to use for the chat completion (default is "gpt-4o-mini").

        Returns:
            openai.ChatCompletion: The chat completion response from the OpenAI API.
        """
        return openai.ChatCompletion.create(
            model=model,
            messages=messages
        )