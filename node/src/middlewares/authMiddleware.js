import jwt from 'jsonwebtoken';
import User from '../models/userModel.js'; // Assuming you have a User model to fetch user details

// Middleware to protect routes and verify JWT token
export const protect = async (req, res, next) => {
    let token;
    // Check if the Authorization header is present and starts with 'Bearer'
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        // Extract the token from the Authorization header
        token = req.headers.authorization.split(' ')[1];
    }

    // If no token is found, return an error response
    if (!token) {
        return res.status(401).json({ status: 'fail', message: 'You are not logged in!' });
    }

    try {
        // Verify the token and decode its payload
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Check if the user still exists in the database
        const currentUser = await User.findById(decoded.id);
        if (!currentUser) {
            return res.status(401).json({ status: 'fail', message: 'The user belonging to this token does no longer exist.' });
        }

        // Attach the user object to the request object
        req.user = currentUser;
        // Proceed to the next middleware or route handler
        next();
    } catch (err) {
        // If token verification fails, return an error response
        return res.status(401).json({ status: 'fail', message: 'Invalid token!' });
    }
};

// Middleware to restrict access based on user roles
export const restrictTo = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ status: 'fail', message: 'You do not have permission to perform this action' });
        }
        next();
    };
};