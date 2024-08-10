# documntr Frontend

This is the frontend for the documntr application, built with React.

## Setup

1. Navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm start
   ```

4. Open your browser and navigate to `http://localhost:3000`.

## Project Structure

```
frontend/
├── public/
│   └── index.html
├── src/
│   ├── App.js
│   ├── App.module.css
│   ├── index.js
│   └── index.css
├── package.json
└── Dockerfile
```

## Available Scripts

- `npm start`: Runs the app in development mode.
- `npm test`: Launches the test runner.
- `npm run build`: Builds the app for production.

## Docker

To build and run the frontend in a Docker container:

```
docker build -t frontend .
docker run -p 3000:3000 frontend
```

## Contributing

Please ensure that any code you contribute adheres to the existing style and passes all tests.