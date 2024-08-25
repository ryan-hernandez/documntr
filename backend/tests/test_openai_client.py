from unittest.mock import MagicMock, patch

import pytest

from documntr import OpenAIClient


@pytest.fixture
def mock_openai():
    with patch("documntr.openai_client.openai") as mock_openai:
        yield mock_openai


def test_create_chat_completion(mock_openai):
    mock_response = MagicMock()
    mock_response.choices[0].message = {"content": "Mocked response"}
    mock_openai.ChatCompletion.create.return_value = mock_response

    client = OpenAIClient()
    messages = [{"role": "user", "content": "Hello"}]
    response = client.create_chat_completion(messages)

    assert response.choices[0].message["content"] == "Mocked response"
    mock_openai.ChatCompletion.create.assert_called_once_with(
        model="gpt-4o-mini", messages=messages
    )


def test_create_chat_completion_with_custom_model(mock_openai):
    mock_response = MagicMock()
    mock_response.choices[0].message = {"content": "Mocked response"}
    mock_openai.ChatCompletion.create.return_value = mock_response

    client = OpenAIClient()
    messages = [{"role": "user", "content": "Hello"}]
    custom_model = "custom-model"
    response = client.create_chat_completion(messages, model=custom_model)

    assert response.choices[0].message["content"] == "Mocked response"
    mock_openai.ChatCompletion.create.assert_called_once_with(
        model=custom_model, messages=messages
    )


def test_create_chat_completion_error(mock_openai):
    mock_openai.ChatCompletion.create.side_effect = Exception("API Error")

    client = OpenAIClient()
    messages = [{"role": "user", "content": "Hello"}]

    with pytest.raises(Exception, match="API Error"):
        client.create_chat_completion(messages)
