# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy configuration files
COPY package*.json ./
COPY tsconfig.json ./

# Install dependencies
RUN npm ci

# Copy Prisma schema and code files
COPY src ./src
COPY ../prisma ../prisma

# Generate Prisma Client and compile TypeScript
RUN npx prisma generate --schema=../prisma/schema.prisma
RUN npm run build

# Production stage
FROM node:20-alpine AS runner

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY ../prisma ../prisma

ENV NODE_ENV=production
ENV PORT=5000

EXPOSE 5000

CMD ["node", "dist/index.js"]
