import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";
import passport from "passport";
import exerciseRoutes from "./routes/exerciseRoute.js";
import userRoutes from "./routes/userRoute.js";
import authRoutes from "./routes/authRoute.js";
import progressRoutes from "./routes/progressRoute.js";
import { signToken,signRefreshToken,durationToMilliseconds } from "./controllers/authController.js"; // Import signToken function
import { initializePassport } from './config/passport.js'; // Import your passport configuration
import googleAuthRoutes from './routes/googleRoute.js'; // Import your Google OAuth routes
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
app.use('/api/v1/auth', googleAuthRoutes); // Mount your routes on /api/v1/auth
app.use("/api/v1/progress", progressRoutes);

// Root route
app.get("/", (req, res) => {
  res.status(200).json({ message: "This contains API for sajilorehab" });
});


app.get('/wake-up', (req, res) => {
  res.send('Node.js backend is awake!');
});







export { app };