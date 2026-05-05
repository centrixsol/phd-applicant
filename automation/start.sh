#!/bin/bash
# Setup and start the PhD Apply Automation Service

echo "Setting up PhD Apply Automation Service..."

# Create virtual environment if it doesn't exist
if [ ! -d "venv" ]; then
    python3 -m venv venv
    echo "Created virtual environment"
fi

source venv/bin/activate

# Install dependencies
pip install -r requirements.txt --quiet

# Install Playwright browsers
playwright install chromium

echo "Starting automation service on port 8000..."
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
