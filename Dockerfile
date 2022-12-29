FROM node:12-alpine

# The destination of the api in the container
WORKDIR /usr/src/api

# Moves the package.json, package-loc.json and tsconfig.json to the specified workdir
COPY package*.json ./
COPY tsconfig.json ./

RUN npm install

COPY . .

EXPOSE 8000

CMD ["yarn", "dev"]
