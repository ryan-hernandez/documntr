# documntr Frontend

This is the frontend for the documntr application, built with React.

## Prerequisites

- Node.js 16+
- npm or yarn

## Development Setup

1. Navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env.dev` file in the frontend directory with the following content:
   ```
   REACT_APP_API_URL=http://localhost:5000
   ```

4. Start the development server:
   ```
   npm start
   ```

5. Open your browser and navigate to `http://localhost:3000`.

## Running with Docker

The frontend is typically run as part of the whole application using Docker Compose. See the root README for instructions.

## Debugging

### In the Browser

1. Open your browser's developer tools (usually F12 or right-click and select "Inspect").
2. Navigate to the Sources tab.
3. Find your source files under the webpack:// source.
4. Set breakpoints and debug as needed.

### Using VS Code

1. Ensure you have the Chrome Debugger extension installed in VS Code.
2. Set breakpoints in your JavaScript code.
3. In VS Code, go to the Debug view and select "Docker: Node.js" from the dropdown.
4. Start debugging.

## Available Scripts

- `npm start`: Runs the app in development mode.
- `npm test`: Launches the test runner.
- `npm run build`: Builds the app for production.
