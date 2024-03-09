FROM node:20.8.0

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . .

EXPOSE 8000

CMD ["sh", "-c", "npx sequelize-cli db:migrate && npm run start"]
