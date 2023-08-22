# Use an official Node.js runtime as the base image
FROM node:18

# Set the working directory in the container
WORKDIR /app/Backend

# Copy package.json and package-lock.json to the container
COPY ./package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the backend source code
COPY . .

# Expose the port that the app will run on
EXPOSE 8000

# Define the command to start the app
CMD ["npm", "start"]
