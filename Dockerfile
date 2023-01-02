## Build Web Application
FROM node:16 as builder
ENV NODE_ENV = dev
WORKDIR /app
COPY package.json ./
RUN npm install
COPY ./ .
RUN npm run build

## Dockerize
FROM ubuntu:18.04
RUN mkdir -p /var/app
WORKDIR /var/app
RUN apt-get update -y
RUN apt-get install ffmpeg -y
RUN apt-get update -y \
    && apt-get -y install curl gnupg ca-certificates \
    && curl -L https://deb.nodesource.com/setup_16.x | bash \
    && apt-get update -y \
    && apt-get install -y nodejs
COPY --from=builder /app/package.json /var/app/package.json
COPY --from=builder /app/.env.docker /var/app/.env
RUN mkdir storages
RUN npm install
COPY --from=builder /app/dist /var/app
COPY --from=builder /app/src/fonts /var/app/fonts

USER root
CMD ["npm", "start"]