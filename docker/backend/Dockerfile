FROM node:20.9.0-alpine 

WORKDIR /app

COPY package*.json ./

RUN npm install --production

COPY ./server ./server

EXPOSE 3001

CMD ["node", "./server/index.js"]