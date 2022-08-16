FROM node:16.13.2-alpine
RUN mkdir /home/node/api 
WORKDIR /home/node/api
COPY src ./src
COPY package.json package-lock.json ./
RUN npm install
COPY tsconfig.json .prettierrc .eslintrc.js nest-cli.json tsconfig.build.json .env ./
EXPOSE 3000
CMD ["npm","run","start:dev"]