FROM nginx:1.27.0-alpine

# Upgrade all packages to fix vulnerabilities
RUN apk update && apk upgrade

# Install Node.js and npm
RUN apk add --no-cache nodejs npm

# Install json-server globally
RUN npm install -g json-server



COPY . /usr/share/nginx/html

# Copy your users.json data file
COPY data/users.json /data/users.json

# Add a startup script to run both nginx and json-server
COPY --chmod=755 start.sh /start.sh

EXPOSE 80

CMD ["/start.sh"]