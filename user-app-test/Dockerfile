FROM node:21-alpine3.18

WORKDIR /service

COPY ./package*.json ./tsconfig.json ./

RUN --mount=type=secret,id=npmrc,target=.npmrc npm ci

COPY ./src ./src
COPY ./migrations ./migrations
COPY ./migration-ds.ts ./migration-ds.ts

RUN npm run build

RUN npm prune --production
RUN rm ./tsconfig.json

RUN rm -rf ./src
RUN rm -rf ./migrations

CMD [ "npm", "run", "start"]