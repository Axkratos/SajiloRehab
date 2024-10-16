import numpy as np
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Curl counter variables
counter = 0 
stage = "up"  # Initialize stage to 'up' to start the counting correctly

# Function to calculate the angle between three points
def calculate_angle(a, b, c):
    a = np.array(a)  # First joint (e.g., shoulder)
    b = np.array(b)  # Middle joint (e.g., elbow)
    c = np.array(c)  # Last joint (e.g., wrist)
    
    radians = np.arctan2(c[1] - b[1], c[0] - b[0]) - np.arctan2(a[1] - b[1], a[0] - b[0])
    angle = np.abs(radians * 180.0 / np.pi)
    
    if angle > 180.0:
        angle = 360 - angle
        
    return angle

@app.route('/api/count_reps', methods=['POST'])
def count_reps():
    global counter, stage
    data = request.get_json()

    # Validate incoming data
    if 'angle' not in data:
        return jsonify({"error": "Angle parameter is required."}), 400

    angle = data['angle']

    # Curl counter logic
    if angle > 160 and stage != "down":  # Moving to the down stage
        stage = "down"
    elif angle < 30 and stage == "down":  # Moving to the up stage
        stage = "up"
        counter += 1  # Increment counter only when transitioning from down to up

    return jsonify({"reps": counter})

if __name__ == '__main__':
    app.run(debug=True)
