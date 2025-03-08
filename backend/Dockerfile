# Use official Node.js image
FROM node:20

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json first for better caching
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .
RUN npm run prisma:gen

# Expose backend port
EXPOSE 3000

# Run the backend in development mode
CMD ["npm", "run", "dev"]
