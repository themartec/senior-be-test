FROM node:18-alpine As development
WORKDIR /usr/src/app
RUN apk update
RUN apk add ffmpeg
COPY --chown=node:node package.json ./
RUN npm install
COPY --chown=node:node . .
USER node
RUN ls