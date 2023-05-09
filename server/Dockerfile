FROM node:10-alpine

WORKDIR /code

COPY package.json .

RUN npm install

COPY . /code/.

CMD [ "node", "server.js" ]
