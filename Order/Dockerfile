FROM ubuntu
RUN apt-get update
RUN apt-get install -y curl 
RUN curl -sL https://deb.nodesource.com/setup_20.x | bash -
RUN apt-get upgrade -y
RUN apt-get install -y nodejs

COPY src src
COPY .env .env
COPY nodemon.json nodemon.json
COPY package-lock.json package-lock.json
COPY package.json package.json
COPY tsconfig.json tsconfig.json

RUN npm install 
ENTRYPOINT  ["npx", "ts-node", "./src/index.ts"]