from unittest.mock import patch

from documntr.documntr import Documntr


def test_analyze_code():
    documntr = Documntr()
    code = """
def greet(name):
    return f"Hello, {name}!"
"""
    result = documntr.analyze_code(code)

    assert "documented_code" in result
    assert '"""' in result["documented_code"]  # Check for presence of a docstring
    assert "def greet(name):" in result["documented_code"]
    assert "Parameters:" in result["documented_code"]
    assert "name" in result["documented_code"]


def test_analyze_empty_code():
    documntr = Documntr()
    code = ""
    result = documntr.analyze_code(code)

    assert "error" in result
    assert result["error"] == "Please enter some code to analyze."


def test_analyze_invalid_code():
    documntr = Documntr()
    code = "This is not valid Python code"
    result = documntr.analyze_code(code)

    assert "documented_code" in result
    assert "def" in result["documented_code"]
    assert '"""' in result["documented_code"]  # Check for presence of a docstring


@patch("documntr.documntr.CodeAnalyzer.analyze")
def test_analyze_code_with_mocked_analyzer(mock_analyze):
    mock_analyze.return_value = {
        "documented_code": 'def test():\n    """This is a test function."""\n    pass'
    }

    documntr = Documntr()
    code = "def test():\n    pass"
    result = documntr.analyze_code(code)

    assert "documented_code" in result
    assert '"""This is a test function."""' in result["documented_code"]


@patch("documntr.documntr.CodeAnalyzer.analyze")
def test_analyze_code_error(mock_analyze):
    mock_analyze.return_value = {"error": "An error occurred"}

    documntr = Documntr()
    code = "def test():\n    pass"
    result = documntr.analyze_code(code)

    assert "error" in result
    assert result["error"] == "An error occurred"
