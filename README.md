# documntr

documntr is an AI-powered web application that automatically generates documentation for code. It utilizes a React frontend and a Flask backend to provide a seamless documentation experience.

<image src="example.gif"></image>

## Features

- Automatic code documentation generation using AI
- Real-time code input and documentation output
- Performance metrics display
- Session saving functionality

## Project Structure

```
documntr/
├── backend/
│   ├── documntr/
│   │   ├── __init__.py
│   │   ├── code_analyzer.py
│   │   ├── constants.py
│   │   ├── documntr.py
│   │   ├── metrics.py
│   │   └── openai_client.py
│   ├── app.py
│   ├── README.md
│   ├── requirements.txt
│   └── Dockerfile
├── frontend/
│   ├── public/
│   │   ├── favicon.ico
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── editor/
│   │   │   │   ├── config/
│   │   │   │   │    ├── themes/
│   │   │   │   │    │    └── customDractulaTheme.js
│   │   │   │   │    ├── codeMirrorConfig.js
│   │   │   │   ├── styles/
│   │   │   │   │    ├── CodeEditor.module.css
│   │   │   │   │    └── CopyButton.module.css
│   │   │   │   ├── utils/
│   │   │   │   │    └── languageOptions.js
│   │   │   │   ├── CodeEditor.js
│   │   │   │   ├── CodeMirrorWrapper.js
│   │   │   │   ├── CopyButton.js
│   │   │   │   ├── EditorHeader.js
│   │   │   │   └── LanguageSelector.js
│   │   │   ├── metrics/
│   │   │   │   ├── config/
│   │   │   │   │    └── metricsConfig.js
│   │   │   │   ├── styles/
│   │   │   │   │    ├── MetricsDisplay.module.css
│   │   │   │   │    └── SessionButton.module.css
│   │   │   │   ├── MetricItem.js
│   │   │   │   ├── MetricsDisplay.js
│   │   │   │   ├── SessionButton.js
│   │   │   │   └── utils.js
│   │   │   ├── AnalyzeButton.js
│   │   │   ├── ErrorBoundary.js
│   │   │   └── ErrorDisplay.js
│   │   ├── styles/
│   │   │   ├── AnalyzeButton.module.css
│   │   │   └── scrollbarStyles.js
│   │   ├── App.js
│   │   ├── App.module.css
│   │   ├── index.css
│   │   └── index.js
│   ├── .env
│   ├── package.json
│   ├── README.md
│   └── Dockerfile
├── docker-compose.yml
├── .dockerignore
├── .gitattributes
├── .gitignore
├── THIRD_PARTY_NOTICES.md
└── README.md
```

## Prerequisites

- Docker and Docker Compose
- Node.js 16+ (for local frontend development)
- Python 3.9+ (for local backend development)
- OpenAI API key

## Quick Start

1. Clone the repository:
   ```
   git clone https://github.com/ryan-hernandez/documntr.git
   cd documntr
   ```

2. Set up your OpenAI API key:
   - Create a `.env` file in the root directory and add:
     ```
     OPENAI_API_KEY=your_api_key_here
     ```
   - Or set it as an environment variable:
     ```
     export OPENAI_API_KEY=<your-key-here>
     ```

3. Build and run the Docker containers:
   ```
   docker-compose up --build
   ```

4. Open your browser and navigate to `http://localhost:3000` to use the application.

## Development

For detailed information on developing the frontend and backend, please refer to their respective README files:

- [Frontend README](./frontend/README.md)
- [Backend README](./backend/README.md)

## Testing

Run tests for both frontend and backend:

```
docker-compose run frontend npm test
docker-compose run backend pytest
```

## Troubleshooting

Common issues and their solutions:

1. **Docker containers fail to start**: Ensure Docker is running and you have the latest version of Docker and Docker Compose.
2. **API calls fail**: Check that your OpenAI API key is correctly set in the `.env` file or as an environment variable.

For code issues, please open an issue on GitHub.

## License

© Ryan Hernandez 2024. All rights reserved.

## Contact

For inquiries, please contact [Ryan](mailto:ryanmichaelhernandez@gmail.com?subject=[GitHub]%20documntr).
