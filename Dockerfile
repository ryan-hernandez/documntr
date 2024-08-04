FROM python:3.9-slim

WORKDIR /app

# Install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the application code
COPY . .

# Set environment variable for OpenAI API key
ENV OPENAI_API_KEY=${OPENAI_API_KEY}

# Create a volume for persistent storage
VOLUME /app/data

EXPOSE 5000

CMD ["python", "chatbot.py"]