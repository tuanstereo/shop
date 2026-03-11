FROM node:20-alpine

WORKDIR /app

# Copy dependency manifests first to leverage Docker layer cache.
COPY frontend/package*.json ./
RUN npm install

# Copy frontend source code after dependencies are installed.
COPY frontend/ ./

EXPOSE 3000

CMD ["npm", "run", "dev", "--", "-H", "0.0.0.0"]
