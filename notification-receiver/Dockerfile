FROM node:21-alpine3.18

WORKDIR /service

COPY ./package*.json ./tsconfig.json ./

RUN --mount=type=secret,id=npmrc,target=.npmrc npm ci

COPY ./src ./src

RUN npm run build
RUN npm prune --production
RUN rm ./tsconfig.json
RUN rm -rf ./src

CMD [ "npm", "run", "start"]