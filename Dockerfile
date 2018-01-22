FROM node:carbon-alpine

RUN apk add --no-cache tini

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

ENV NODE_ENV production
COPY package.json .
COPY package-lock.json .
RUN npm install && npm cache clean --force
COPY . .

ENTRYPOINT ["/sbin/tini", "--", "npx", "noflo-nodejs"]