FROM node:20-alpine AS build
WORKDIR /app
COPY /canva-app-fe/package*.json ./
RUN npm install
COPY /canva-app-fe .
COPY app.env .env
RUN npm run build

FROM nginx:stable-alpine AS production-stage
COPY --from=build /app/dist /usr/share/nginx/html
COPY /canva-app-fe/nginx.cfg /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
