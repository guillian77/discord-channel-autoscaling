FROM node:12.18.1

MAINTAINER Aufrère Guillian <guillian.aufrere@gmail.com>

ENV NODE_ENV=production

COPY . /srv

WORKDIR /srv

RUN npm install --production

CMD node app.js
