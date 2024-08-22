# documntr Backend

This is the backend for the documntr application, built with Flask.

## Tech Stack

- Flask 2.0.1
- Flask-CORS for handling Cross-Origin Resource Sharing (CORS)
- OpenAI API for AI-powered code documentation

## Setup

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Create and activate a virtual environment:
   ```
   python -m venv venv
   source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
   ```

3. Install dependencies:
   ```
   pip install -r requirements.txt
   ```

4. Set up environment variables:
   Create a `.env` file in the backend directory with the following content:
   ```
   FLASK_ENV=development
   SECRET_KEY=your_secret_key_here
   OPENAI_API_KEY=your_openai_api_key_here
   ```

5. Run the Flask application:
   ```
   python app.py
   ```

6. The API will be available at `http://localhost:5000`.

## API Endpoints

- `POST /analyze`: Analyzes and documents Python code.
  - Request body:
  ```
  { "code": "your_code_here" }
  ```
  - Response: `
  ```
  { "documented_code": "...", "generation_time": 0.5, "average_time": 0.6, "total_tokens": 100, "token_time_ratio": 200 }
  ```

## Testing

Run tests using pytest:

```
pytest
```

## Docker

To build and run the backend in a Docker container:

```
docker build -t backend .
docker run -p 5000:5000 backend
```
