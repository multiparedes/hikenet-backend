FROM node:20.8.0

RUN mkdir -p /app/node_modules && chown -R node:node /app

WORKDIR /app

COPY package*.json /app

USER node

RUN npm install

COPY --chown=node:node . .

EXPOSE 8000

CMD [ "npm", "run", "docker" ]