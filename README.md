# documntr

documntr is a web application that automatically generates documentation for code using AI. It consists of a React frontend and a Flask backend.

## Project Structure

```
documntr/
├── frontend/
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── Dockerfile
├── backend/
│   ├── app.py
│   ├── chatbot.py
│   ├── requirements.txt
│   └── Dockerfile
├── docker-compose.yml
└── README.md
```

## Prerequisites

- Docker and Docker Compose
- Node.js (for local frontend development)
- Python 3.9+ (for local backend development)

## Quick Start

1. Clone the repository:
   ```
   git clone https://github.com/ryan-hernandez/documntr.git
   cd documntr
   ```

2. Create a `.env` file in the root directory and add your OpenAI API key:
   ```
   OPENAI_API_KEY=your_api_key_here
   ```
   Alternatively, you can register your key in a local environment variable:
   ```
   export OPEN_API_KEY=<your-key-here>
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

## Copyright

© Ryan Hernandez 2024. All rights reserved.

This project and its contents are protected under copyright law. Unauthorized copying, modification, distribution, or use of this project, in whole or in part, is strictly prohibited without the express written permission of the copyright holder.

For inquiries about usage, modification, or distribution of this project, please contact [Ryan](mailto:ryanmichaelhernandez@gmail.com?subject=[GitHub]%20documntr)
