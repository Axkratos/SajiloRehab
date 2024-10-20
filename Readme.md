# SajiloRehab

SajiloRehab is a physiotherapy platform that offers personalized exercise recommendations and real-time feedback. It leverages GPT-3.5 Turbo for tailored exercise plans, uses computer vision for rep counting, and integrates authentication via email or Google.

## Features

- **Personalized Exercise Recommendations**: Offers custom exercise plans based on the user's injury type, severity, and duration using GPT-3.5 Turbo (Flask backend).
- **Real-time Rep Counting**: Utilizes MediaPipe and OpenCV for exercise tracking and rep counting (Flask backend).
- **Tailored Feedback**: Provides real-time feedback on exercise form and performance using GPT-3.5 Turbo (Node.js backend).
- **User Authentication**: Supports user sign-up and log-in via email or Google OAuth (Node.js backend).
- **Dashboard**: Tracks user progress and stores past sessions for review.

## Technologies

- **Frontend**: React.js
- **Backend**:
  - **Node.js (Express)**: Manages user authentication, feedback generation, and user data storage (MongoDB).
  - **Flask**: Handles exercise recommendations and rep counting using GPT-3.5 Turbo, MediaPipe, and OpenCV.
- **Database**: MongoDB (Atlas or local)
- **Authentication**: Google OAuth and JWT-based authentication.

## Folder Structure

/physiotherapy-website ├── /node # Node.js backend for authentication and feedback ├── /backend # Flask backend for rep counting and exercise recommendation ├── /frontend # React frontend


## Installation

### Prerequisites

- Node.js (v18 or later)
- Python 3.11.4 or later (for Flask)
- MongoDB (Atlas or local)

### Step-by-Step Installation

#### 1. Node.js Backend (Authentication and Feedback)

Navigate to the Node.js backend directory:

```bash
cd node
Install dependencies:
npm install
Create a .env file in the node directory with the following values:

CORS_ORIGIN=*
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname
PORT=8000
JWT_SECRET=your_jwt_secret
JWT_REFRESH_SECRET=your_jwt_refresh_secret
JWT_EXPIRES_IN=30d
JWT_REFRESH_EXPIRES_IN=90d
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

Start the Node.js server:
npm run dev

The Node.js server will run at http://localhost:8000.

2. Flask Backend (Rep Counting and Exercise Recommendation)
Navigate to the Flask backend directory:

cd backend
Install Python dependencies:
pip install -r requirements.txt
Start the Flask backend:

```bash
python app.py

The Flask backend will run at http://localhost:5000.
