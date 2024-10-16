from flask import Flask, request, jsonify,Response
from flask_cors import CORS
from g4f.client import Client  # Importing g4f client package
import os
import numpy as np
import sys
import asyncio

# This is needed for Windows compatibility with aiodns
if sys.platform == 'win32':
    asyncio.set_event_loop_policy(asyncio.WindowsSelectorEventLoopPolicy())
app = Flask(__name__)
# Enable CORS for all routes and all domains
CORS(app, resources={r"/*": {"origins": "*"}})

client = Client()

# List of full-body physiotherapy exercises and their descriptions
exercise_details = {
    'Push-ups': 'An exercise to strengthen the upper body, particularly the chest and triceps.',
    'Squats': 'A lower body exercise that targets the thighs, hips, and buttocks.',
    'Lunges': 'An exercise focusing on the legs, enhancing strength and balance.',
    'Plank': 'A core-strengthening exercise that also works the shoulders and back.',
    'Bridges': 'Targets the glutes and lower back while improving core stability.',
    'Clamshells': 'Strengthens the hip muscles and improves hip stability.',
    'Bird Dogs': 'Enhances balance and coordination while working on core stability.',
    'Dead Bugs': 'Strengthens the core while focusing on coordination between limbs.',
    'Shoulder Press': 'An exercise to build shoulder and upper arm strength.',
    'Bicep Curls': 'Strengthens the biceps and improves arm aesthetics.',
    'Tricep Dips': 'Targets the triceps, helping to tone and strengthen the arms.',
    'Calf Raises': 'Focuses on strengthening the calf muscles.',
    'Seated Row': 'Targets the back muscles, improving posture and strength.',
    'Wall Angels': 'Improves shoulder mobility and posture.',
    'Chest Stretch': 'A flexibility exercise for the chest and shoulders.',
    'Hamstring Stretch': 'Stretches the hamstring muscles to enhance flexibility.',
    'Quadriceps Stretch': 'Stretches the quadriceps for improved flexibility.',
    'Hip Flexor Stretch': 'Stretches the hip flexors to improve range of motion.',
    'Spinal Twist': 'Enhances spinal mobility and flexibility.',
    'Side Lunges': 'Strengthens the inner thighs and improves balance.',
    'Glute Bridges': 'Focuses on the glutes and lower back for better stability.',
    'Mountain Climbers': 'A full-body exercise that increases heart rate and builds endurance.',
    'Leg Raises': 'Strengthens the lower abdominal muscles.',
    'Standing Balance': 'Improves balance and stability through weight shifting.',
    'Side Plank': 'Strengthens the oblique muscles and stabilizes the core.',
    'Torso Rotation': 'Enhances core flexibility and stability.',
    'Wrist Flexor Stretch': 'Stretches the wrist and forearm muscles.',
    'Ankle Circles': 'Improves ankle mobility and flexibility.',
    'T-Pose Exercise': 'Strengthens the upper back and shoulders.',
    'Knee to Chest Stretch': 'Stretches the lower back and glutes.',
    'Pigeon Pose': 'A yoga pose that stretches the hips and glutes.'
}

@app.route('/')
def home():
    return "This is the API for Sajilorehab"

@app.route('/api/suggest-exercises', methods=['POST'])
def suggest_exercises():
    try:
        data = request.json
        if not data or 'message' not in data or 'user_id' not in data:
            return jsonify({"error": "Invalid input"}), 400

        user_message = data['message']

        # Prepare the prompt to recommend exactly 4 exercises with descriptions
        prompt = (
            "You are a physiotherapy assistant. The user has reported the following injury: "
            f"'{user_message}'. Based on this injury, recommend exactly one to four suitable available physiotherapy exercises from the following list: "
            f"{', '.join(exercise_details.keys())}. Please list the exercises along with their descriptions in the format: "
            "'exercise name': 'description'. Please ensure that the exercise names are presented without numbering and dont write any other things like I recommend as it goes against my backend model."
        )

        # Call the GPT-3.5 model using the g4f client
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "user", "content": prompt}]
        )

        # Extract the assistant's reply
        assistant_message = response.choices[0].message.content.strip().splitlines()

        recommended_exercises = []
        for exercise in assistant_message:
            # Split by ':', expecting format like "exercise name: description"
            name_desc = exercise.split(':', 1)
            if len(name_desc) == 2:
                recommended_exercises.append({
                    "name": name_desc[0].strip().strip("'"),
                    "description": name_desc[1].strip().strip("'")
                })
        print(jsonify(recommended_exercises) )
        return jsonify({
            "exercises": recommended_exercises  # Return only the recommended exercise names and descriptions
        })

    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({"error": "An unexpected error occurred."}), 500





# Curl counter variables
counter = 0
stage = "up"  # Initialize stage to 'up' to start the counting correctly
is_paused = False  # Variable to control whether the rep counter is paused
is_stopped = False  # Variable to control whether the rep counter is stopped

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
    global counter, stage, is_paused, is_stopped

    # If the counter is stopped, don't count any reps and reset the counter
    if is_stopped:
        return jsonify({"reps": 0, "message": "Rep counter is stopped."})

    # If the counter is paused, just return the current rep count without any changes
    if is_paused:
        return jsonify({"reps": counter, "message": "Rep counter is paused."})

    data = request.get_json()

    # Validate incoming data
    if 'angle' not in data:
        return jsonify({"error": "Angle parameter is required."}), 400

    angle = data['angle']

    # Curl counter logic (only if not paused or stopped)
    if angle > 160 and stage != "down":  # Moving to the down stage
        stage = "down"
    elif angle < 30 and stage == "down":  # Moving to the up stage
        stage = "up"
        counter += 1  # Increment counter only when transitioning from down to up

    return jsonify({"reps": counter})

# Route to pause the rep counter
@app.route('/pause', methods=['POST'])
def pause_counter():
    global is_paused, is_stopped
    if not is_stopped:
        is_paused = True
    return jsonify({"message": "Rep counter paused."})

# Route to stop the rep counter and reset the counter to 0
@app.route('/stop', methods=['POST'])
def stop_counter():
    global counter, is_paused, is_stopped
    counter = 0
    is_paused = False  # Reset pause state when stopping
    is_stopped = True  # Set stopped to true
    return jsonify({"message": "Rep counter stopped and reset to 0."})

# Route to resume the rep counter
@app.route('/resume', methods=['POST'])
def resume_counter():
    global is_paused, is_stopped
    if is_stopped:
        return jsonify({"message": "Cannot resume because the counter is stopped. Please start the exercise again."}), 400

    is_paused = False
    is_stopped = False
    return jsonify({"message": "Rep counter resumed."})

# Route to start the counter again after stopping
@app.route('/start', methods=['POST'])
def start_counter():
    global counter, is_paused, is_stopped
    counter = 0  # Reset the counter
    is_paused = False
    is_stopped = False  # Reset the stopped state
    return jsonify({"message": "Rep counter started from zero."})

# @app.route('/api/count_reps', methods=['POST'])
# def count_reps():
#     global counter, stage
#     data = request.get_json()

#     # Validate incoming data
#     if 'angle' not in data:
#         return jsonify({"error": "Angle parameter is required."}), 400

#     angle = data['angle']

#     # Curl counter logic
#     if angle > 160 and stage != "down":  # Moving to the down stage
#         stage = "down"
#     elif angle < 30 and stage == "down":  # Moving to the up stage
#         stage = "up"
#         counter += 1  # Increment counter only when transitioning from down to up

#     return jsonify({"reps": counter})


# Run the app
if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000, debug=False)  # debug set to False