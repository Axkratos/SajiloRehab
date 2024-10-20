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
- **OpenAI**: I have used openai using a package named G4F. So, no need for any external API Key.

## Folder Structure

/sajilorehab
 ├── /node # Node.js backend for authentication and feedback| 
 ├── /backend # Flask backend for rep counting and  exercise recommendation|
 ├── /frontend # React frontend|


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

```
Install dependencies:
```bash
npm install
```
Create a .env file in the node directory with the following values:
```bash
CORS_ORIGIN=*
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname
PORT=8000
JWT_SECRET=your_jwt_secret
JWT_REFRESH_SECRET=your_jwt_refresh_secret
JWT_EXPIRES_IN=30d
JWT_REFRESH_EXPIRES_IN=90d
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

```

Start the Node.js server:
```bash
npm run dev
```

The Node.js server will run at http://localhost:8000.

#### 2. Flask Backend (Rep Counting and Exercise Recommendation)
Navigate to the Flask backend directory:
```bash
cd backend
```
Install Python dependencies:
```bash
pip install -r requirements.txt
```
Start the Flask backend:

```bash
python app.py
```

The Flask backend will run at http://localhost:5000.

#### 3. React Frontend
Navigate to the React frontend directory:
```bash
cd frontend
```
Install frontend dependencies:
```bash
npm install
```

Create a .env file in the frontend directory:
```bash
VITE_API_NODE_BACKEND=http://localhost:8000
VITE_API_PYTHON_BACKEND=http://localhost:5000
VITE_GOOGLE_CLIENT_ID=your_google_client_id
```

Start the React development server:
```bash
npm run dev
```
The frontend will be accessible at http://localhost:5173

## Running the Project
1. Start the Node.js backend for authentication and feedback:
```bash

cd node
npm run dev
```
2. Start the Flask backend for exercise recommendation and rep counting:
```bash

cd backend
python app.py
```
3. Start the React frontend:
```bash
cd frontend
npm run dev
```

## System Architecture
React Frontend: Manages user authentication, exercise selection, and progress tracking.
Node.js Backend: Handles authentication and provides real-time feedback based on users body angles using GPT-3.5 Turbo.
Flask Backend: Provides personalized exercise recommendations and rep counting with OpenCV and MediaPipe.

## Environment Variables
### React Frontend (.env)

```bash

VITE_API_NODE_BACKEND: URL of the Node.js backend (e.g., http://localhost:8000)
VITE_API_PYTHON_BACKEND: URL of the Flask backend (e.g., http://localhost:5000)
VITE_GOOGLE_CLIENT_ID: Google OAuth client ID
```
### Node.js Backend (.env)
```bash
CORS_ORIGIN: Allowed CORS origin(s) (e.g., *)
MONGODB_URI: MongoDB connection string
PORT: Port for the Node.js server (default: 8000)
JWT_SECRET: JWT signing secret
JWT_REFRESH_SECRET: JWT refresh token secret
JWT_EXPIRES_IN: JWT token expiration (default: 30d)
JWT_REFRESH_EXPIRES_IN: Refresh token expiration (default: 90d)
GOOGLE_CLIENT_ID: Google OAuth client ID
GOOGLE_CLIENT_SECRET: Google OAuth client secret
```