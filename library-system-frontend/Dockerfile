# Use the official Node.js image as the base image for building the Angular app
# FROM node:12.22.12 AS build
FROM node:18 AS build

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package files and install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the application source code
# COPY . .

ADD . /usr/src/app

# Build the Angular application
RUN npm run build

# Use a smaller NGINX base image for serving the Angular app
FROM nginx:alpine

# Copy the built Angular app from the previous stage
COPY --from=build /usr/src/app/dist/library-system /usr/share/nginx/html

# Expose the port that NGINX will run on
EXPOSE 80

# Command to start NGINX
CMD ["nginx", "-g", "daemon off;"]