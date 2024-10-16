# Use a lightweight Node.js image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy only necessary files
COPY .next/standalone ./
COPY .next/static ./.next/static

# Expose the port the app runs on
EXPOSE 3000

# Set environment to production
ENV NODE_ENV=production

# Start the Next.js app
CMD node server.js
