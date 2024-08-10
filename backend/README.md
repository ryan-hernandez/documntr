# documntr Backend

This is the backend for the documntr application, built with Flask.

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

## Project Structure

```
backend/
├── app.py
├── chatbot.py
├── requirements.txt
└── Dockerfile
```

## API Endpoints

- `POST /analyze`: Analyzes and documents Python code.

## Docker

To build and run the backend in a Docker container:

```
docker build -t backend .
docker run -p 5000:5000 backend
```

## Contributing

Please ensure that any code you contribute adheres to PEP 8 style guidelines and includes appropriate unit tests.