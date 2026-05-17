FROM node:20-alpine

RUN apk add --no-cache python3 make g++

WORKDIR /app

# Backend dependencies
COPY backend/package*.json ./backend/
RUN cd backend && npm ci

# Copy backend source
COPY backend/ ./backend/

# Ports: 3000 = NestJS API | 5173 = Vite dev server (when frontend is scaffolded)
EXPOSE 3000 5173

CMD ["sh", "-c", "cd /app/backend && npm run start:dev"]
