
# Set base image
FROM node:18-alpine

# Set environment variables
ARG VITE_DIGITRANSIT_SUBSCRIPTION_KEY=${VITE_DIGITRANSIT_SUBSCRIPTION_KEY}
ARG VITE_MAPBOX_ACCESS_TOKEN=${VITE_MAPBOX_ACCESS_TOKEN}

ENV VITE_DIGITRANSIT_SUBSCRIPTION_KEY=${VITE_DIGITRANSIT_SUBSCRIPTION_KEY}
ENV VITE_MAPBOX_ACCESS_TOKEN=${VITE_MAPBOX_ACCESS_TOKEN}

# Set working directory for the application 
WORKDIR /app

# Copy package.json
COPY package.json .

# Install dependencies
RUN npm install

# Install serve
RUN npm i -g serve

# Copy the rest of the application
COPY . .

# Build the application
RUN VITE_MAPBOX_ACCESS_TOKEN=${VITE_MAPBOX_ACCESS_TOKEN} VITE_DIGITRANSIT_SUBSCRIPTION_KEY=${VITE_DIGITRANSIT_SUBSCRIPTION_KEY} npm run build

# Expose port 3000
EXPOSE 3000

# Run the application
CMD [ "serve", "-s", "dist" ]