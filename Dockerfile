# Use an official nginx image
FROM nginx:alpine

# Copy static files to nginx directory
COPY ./client /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
