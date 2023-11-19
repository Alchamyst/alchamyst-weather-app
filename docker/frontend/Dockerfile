FROM node:20.9.0-alpine AS build

WORKDIR /app

# Copy the package.json and package-lock.json and install dependencies
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Use Nginx to serve the application
FROM nginx:alpine

# Copy the 'dist' directory from the build image to the web server's root directory
COPY --from=build /app/dist /usr/share/nginx/html

# Move our nginx config into webserver
COPY ./docker/frontend/nginx.conf /etc/nginx/nginx.conf
EXPOSE 3000

# Start Nginx when the container runs
CMD ["nginx", "-g", "daemon off;"]
