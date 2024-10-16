# Step 1: Build the app
FROM node:18 AS builder

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Vite app
RUN npm run build

# Step 2: Serve the app
FROM nginx:alpine

# Copy the built app from the builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Set environment variable for port
ENV PORT 80

# Expose the port
EXPOSE $PORT

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
