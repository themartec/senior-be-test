FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run type-check
RUN npm run build-only
FROM nginx:stable-alpine AS production-stage
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.cfg /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
