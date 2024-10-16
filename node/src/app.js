import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";

import exerciseRoutes from "./routes/exerciseRoute.js";
import userRoutes from "./routes/userRoute.js";
import authRoutes from "./routes/authRoute.js";

// Initialize Express app
const app = express();

// __dirname replacement in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// CORS configuration for Express
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "*", // Default to your local frontend
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"], // Add allowed HTTP methods
  })
);

// JSON Parser configuration
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

// Setting up cookie parser
app.use(cookieParser());

// Serve static files from the 'public' directory
app.use("/public", express.static(path.join(__dirname, "../public")));

// Importing Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/exercises", exerciseRoutes);

// Root route
app.get("/", (req, res) => {
  res.status(200).json({ message: "This contains API for sajilorehab" });
});

// Integrate g4f for AI-based feedback generation
import { G4F } from "g4f";
const g4f = new G4F();

let angle_history = [];
let last_feedback_time = 0;

async function generate_feedback(angle_history) {
  if (angle_history.length === 0) {
    return "No movement detected.";
  }

  // Average the angles over the 15-second period
  const avg_left_shoulder = angle_history.reduce((sum, data) => sum + data.leftShoulderAngle, 0) / angle_history.length;
  const avg_right_shoulder = angle_history.reduce((sum, data) => sum + data.rightShoulderAngle, 0) / angle_history.length;
  const avg_left_elbow = angle_history.reduce((sum, data) => sum + data.leftElbowAngle, 0) / angle_history.length;
  const avg_right_elbow = angle_history.reduce((sum, data) => sum + data.rightElbowAngle, 0) / angle_history.length;
  const avg_left_wrist = angle_history.reduce((sum, data) => sum + data.leftWristAngle, 0) / angle_history.length;
  const avg_right_wrist = angle_history.reduce((sum, data) => sum + data.rightWristAngle, 0) / angle_history.length;

  // Construct user input with average angle details
  const user_input = `Average left shoulder angle: ${avg_left_shoulder.toFixed(2)} degrees, Average right shoulder angle: ${avg_right_shoulder.toFixed(2)} degrees, Average left elbow angle: ${avg_left_elbow.toFixed(2)} degrees, Average right elbow angle: ${avg_right_elbow.toFixed(2)} degrees, Average left wrist angle: ${avg_left_wrist.toFixed(2)} degrees, Average right wrist angle: ${avg_right_wrist.toFixed(2)} degrees.`;

  // Define ideal angles and tolerance
  const idealAngles = {
    leftShoulder: 60,
    rightShoulder: 60,
    leftElbow: 90,
    rightElbow: 90,
    leftWrist: 30,
    rightWrist: 30,
  };
  const tolerance = 5; // ±5 degrees tolerance

  // Check if the angles are within the acceptable range
  const isShoulderCorrect = Math.abs(avg_left_shoulder - idealAngles.leftShoulder) <= tolerance && 
                            Math.abs(avg_right_shoulder - idealAngles.rightShoulder) <= tolerance;
  const isElbowCorrect = Math.abs(avg_left_elbow - idealAngles.leftElbow) <= tolerance && 
                         Math.abs(avg_right_elbow - idealAngles.rightElbow) <= tolerance;
  const isWristCorrect = Math.abs(avg_left_wrist - idealAngles.leftWrist) <= tolerance && 
                         Math.abs(avg_right_wrist - idealAngles.rightWrist) <= tolerance;

  // Provide positive feedback if all angles are within the acceptable range
  if (isShoulderCorrect && isElbowCorrect && isWristCorrect) {
    return "You are doing it right, keep going!";
  }

  // If the angles are not correct, generate feedback
  const prompt = `You are a fitness assistant. Based on the user's bicep curl data over the past 10 seconds, give feedback on their form. The user performed bicep curls with the following average angles: ${user_input} Provide specific 5 to 10 word feedback on how to improve form or posturelike dont put your hand up align your shoulders etc.`;

  // Call the g4f chat model for feedback
  const messages = [
    { role: "system", content: "You are a fitness assistant." },
    { role: "user", content: prompt },
  ];

  try {
    const response = await g4f.chatCompletion(messages);
    console.log("Response from g4f:", response);  // Log the response for debugging

    // Since the response is a string directly
    return response;  
  } catch (error) {
    console.error("Error generating feedback:", error);
    return "Error generating feedback. Please try again.";
  }
}

// API endpoint for generating feedback
app.post("/api/get_feedback", async (req, res) => {
  const data = req.body;

  // Validate the incoming data
  if (!data || typeof data.leftShoulderAngle !== 'number' || typeof data.rightShoulderAngle !== 'number' || 
      typeof data.leftElbowAngle !== 'number' || typeof data.rightElbowAngle !== 'number' || 
      typeof data.leftWristAngle !== 'number' || typeof data.rightWristAngle !== 'number') {
    return res.status(400).json({ error: "Invalid angle data received" });
  }

  // Add new angle data to the history
  angle_history.push({
    leftShoulderAngle: data.leftShoulderAngle,
    rightShoulderAngle: data.rightShoulderAngle,
    leftElbowAngle: data.leftElbowAngle,
    rightElbowAngle: data.rightElbowAngle,
    leftWristAngle: data.leftWristAngle,
    rightWristAngle: data.rightWristAngle,
  });

  // Get the current time
  const current_time = Date.now();

  // Always provide feedback if data is received
  if (angle_history.length > 0) {
    const feedback = await generate_feedback(angle_history);
    angle_history = [];  // Reset after feedback generation
    last_feedback_time = current_time;

    return res.json({ feedback: feedback });
  } else {
    return res.json({ feedback: "No new feedback yet, keep going!" });
  }
});


export { app };
