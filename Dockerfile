FROM node:lts-alpine

WORKDIR /app

COPY package*.json ./

# installing express in order to serve dist directory within
# docker container, otherwise the only way for the app to navigate
# will be in-app navigation and there'll be no opportunity to navigate
# via browser (e.g. entering other venue id or page manually)
RUN npm install express

COPY src/server.js ./server.js

RUN npm install

COPY . .
COPY .env.production.local ./.env.production

# build app for production with minification
RUN npm run build

EXPOSE 8080
CMD [ "node", "server.js" ]