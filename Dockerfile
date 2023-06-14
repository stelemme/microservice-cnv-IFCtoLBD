FROM node:19-alpine

WORKDIR /usr/src/app
COPY package*.json ./
COPY ./public ./public
COPY ./cli ./cli
COPY ./src ./src

RUN apk add --no-cache build-base cmake libstdc++ bash
RUN apk add openjdk17-jre
RUN chmod +x /usr/src/app/cli/IFCtoLBD_CLI.jar

CMD npm install && \
    npm run start