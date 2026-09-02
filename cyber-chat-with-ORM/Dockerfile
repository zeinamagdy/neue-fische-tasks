FROM node:22-alpine

WORKDIR /usr/src/app

# 1. Install all dependencies (including devDependencies needed for build)
COPY package*.json ./
RUN npm install

# 2. Copy source code and COMPILE TypeScript inside Docker
COPY . .
# 3. Explicitly compile using npx nest build
RUN npx nest build
# 3. Clean up node_modules and keep only production dependencies
RUN npm prune --omit=dev

EXPOSE 3000

# 4. Run the compiled JavaScript directly (Fast & lightweight)
CMD ["node", "dist/src/main"]