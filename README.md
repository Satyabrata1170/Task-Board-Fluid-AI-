### Task Board – Daily Productivity Tracker

A clean and visually polished full-stack Task Board application built using Flask (Python backend) and Vanilla JavaScript (frontend) with Tailwind CSS styling.
The app helps users manage daily tasks efficiently while encouraging consistency through a Daily Streak Tracker .

This project was developed as part of a time-boxed full-stack engineering assignment to demonstrate backend API design, frontend–backend integration, UI polish, and creative problem solving.


### Core Features
➕ Add new tasks
📃 View all tasks
✅ Mark tasks as completed
🗑 Delete tasks
📊 Live progress indicator (percentage + progress bar)

### Unique Feature

## Daily Streak Tracker
Builds a productivity streak when tasks are completed on different days
Encourages consistent daily task completion
Animated streak badge for better user engagement

## UI & UX
Clean, modern interface using Tailwind CSS
Smooth animations for task interaction
Empty-state guidance when no tasks exist
Responsive and visually cohesive design

### Tech Stack
## Frontend
HTML
CSS3
Vanilla JavaScript
Tailwind CSS (via CDN)

## Backend
Python
Flask
Flask-CORS
RESTful API architecture
In-memory data storage (runtime persistence only)

### Project Structure
ASSIGNMENT-FLUID AI/
│
├── app.py                  # Flask backend application
├── README.md               # Project documentation
├── .gitignore
├── .vscode/                # Editor configuration
│
├── templates/
│   └── index.html          # Frontend HTML (UI)
│
├── static/
│   ├── script.js           # Frontend JavaScript (API integration)
│   └── style.css           # Custom CSS styles
│
└── .venv/                  # Python virtual environment


### How to Run the Project Locally

1️⃣ Clone the Repository
git clone https://github.com/Satyabrata1170/Task-Board-Fluid-AI-.git
cd ASSIGNMENT-FLUID AI

2️⃣ Activate Virtual Environment
# Windows
.venv\Scripts\activate

# macOS / Linux
source .venv/bin/activate

3️⃣ Install Dependencies
pip install flask flask-cors

4️⃣ Run the Flask App
python app.py

5️⃣ Open in Browser
http://localhost:5000
