# Use an official Node.js runtime as the base image
FROM node:20-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Expose the port that the app will run on
EXPOSE 2610

# Set environment variables (optional)
ENV PORT=2610

# Start the Node.js application in development mode
CMD ["npm", "run", "dev"]
