FROM node:20-alpine AS build

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:20-alpine

RUN npm install -g serve@14

WORKDIR /app
COPY --from=build /app/dist ./dist

EXPOSE 3000

# Sin modo SPA (-s): privacy.html debe servirse como archivo estático real
CMD serve dist -l ${PORT:-3000}
