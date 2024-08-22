# documntr Frontend

This is the frontend for the documntr application, built with React.

## Tech Stack

- React 17.0.2
- CodeMirror for code editing
- Axios for API requests
- React Custom Scrollbars for custom scrolling

## Project Structure

```
frontend/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── AnalyzeButton.js
│   │   ├── CodeEditor.js
│   │   ├── ErrorBoundary.js
│   │   ├── ErrorDisplay.js
│   │   ├── MetricsDisplay.js
│   │   └── SessionButton.js
│   ├── config/
│   │   └── codeMirrorConfig.js
│   ├── styles/
│   │   ├── CodeEditor.module.css
│   │   ├── MetricsDisplay.module.css
│   │   ├── scrollbarStyles.js
│   │   └── SessionButton.module.css
│   ├── App.js
│   ├── App.module.css
│   ├── index.css
│   └── index.js
├── package.json
├── README.md
└── Dockerfile
```

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

## Available Scripts

- `npm start`: Runs the app in development mode.
- `npm test`: Launches the test runner.
- `npm run build`: Builds the app for production.

## Linting and Formatting

We use ESLint for linting and Prettier for code formatting. Run linting with:

```
npm run lint
```

And format your code with:

```
npm run format
```

## Docker

To build and run the frontend in a Docker container:

```
docker build -t frontend .
docker run -p 3000:3000 frontend
```
