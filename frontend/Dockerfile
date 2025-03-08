# Use Node.js for building
FROM node:20-alpine AS build

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the frontend code
COPY . .

# Build the frontend
RUN npm run build

# Serve frontend with Nginx
FROM nginx:alpine

# Copy build files to Nginx
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose the default Nginx port
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
