FROM node:20.8.0

WORKDIR /app

# Copy package.json and lock file
COPY package.json .
COPY pnpm-lock.yaml .

# Install dependencies with pnpm
RUN npm install -g pnpm && \
    pnpm install

# Copy application code
COPY . .

EXPOSE 8000

# Copy wait-for-it.sh script
COPY wait-for-it.sh /usr/wait-for-it.sh
RUN chmod +x /usr/wait-for-it.sh

# Start the application only after the database is ready
CMD /usr/wait-for-it.sh mysqldb:$MYSQLDB_DOCKER_PORT -- pnpm start
