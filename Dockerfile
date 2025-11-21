# =========================================
# Stage 1: Build the React application
# =========================================
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Install dev dependencies needed for build
RUN npm install --save-dev vite @vitejs/plugin-react

# Copy application code
COPY . .

# Accept build argument for database URL
ARG VITE_DATABASE_URL

# Build the application (Vite will embed VITE_* env vars)
RUN npm run build

# =========================================
# Stage 2: Serve with Nginx
# =========================================
FROM nginx:alpine

# Copy built files from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]