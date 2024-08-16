FROM node:20-alpine AS build

WORKDIR /opt/app

COPY . /opt/app

RUN npm ci \
    && npm run build \
    && npm prune --production


FROM node:20-alpine

ENV NODE_ENV=production

USER node
WORKDIR /opt/app

COPY --from=build /opt/app/package*.json /opt/app/
COPY --from=build /opt/app/node_modules/ /opt/app/node_modules/
COPY --from=build /opt/app/dist/ /opt/app/dist/

EXPOSE 3000

CMD ["npm", "run", "start:production"]