# Use Nginx to serve the application
FROM nginx:alpine

# Move our nginx config into webserver
COPY ./docker/frontend/nginx.conf /etc/nginx/nginx.conf

EXPOSE 5000

# Start Nginx when the container runs
CMD ["nginx", "-g", "daemon off;"]
