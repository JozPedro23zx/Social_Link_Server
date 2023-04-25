FROM node:18

WORKDIR /app/sl/server

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install

COPY . .

CMD [ "node", "src/server.js" ]