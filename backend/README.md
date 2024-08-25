# documntr Backend

This is the backend for the documntr application, built with Flask.

## Prerequisites

- Python 3.9+
- pip

## Development Setup

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Create a virtual environment:
   ```
   python -m venv venv
   source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
   ```

3. Install dependencies:
   ```
   pip install -r requirements.txt
   ```

4. Create a `.env.dev` file in the backend directory with the following content:
   ```
   FLASK_APP=app.py
   FLASK_ENV=development
   SECRET_KEY=your_secret_key_here
   OPENAI_API_KEY=your_openai_api_key_here
   ```

5. Run the Flask application:
   ```
   flask run
   ```

6. The API will be available at `http://localhost:5000`.

## Running with Docker

The backend is typically run as part of the whole application using Docker Compose. See the root README for instructions.

## Debugging

### Using VS Code

1. Ensure you have the Python extension installed in VS Code.
2. Set breakpoints in your Python code.
3. In VS Code, go to the Debug view and select "Docker: Python - Flask" from the dropdown.
4. Start debugging.

## Running Tests

Run tests using pytest:

```
pytest
```
