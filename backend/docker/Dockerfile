FROM node:14-alpine

WORKDIR /app
COPY . .
RUN yarn install
EXPOSE 3000

CMD [ "yarn", "ts-node", "src/server.ts" ]
