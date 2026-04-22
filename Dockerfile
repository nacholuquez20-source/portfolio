FROM node:20-alpine

RUN npm install -g serve@13

WORKDIR /app
COPY . .

EXPOSE 3000

CMD serve -s . -l ${PORT:-3000}
