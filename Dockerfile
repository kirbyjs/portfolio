FROM node:10 as build

WORKDIR /usr/src/app
ENV HOME /usr

# Install app dependencies
COPY package*.json ./

RUN npm i

# Bundle app source
COPY . .

RUN npm run build

# Production build
FROM node:10-alpine as production

WORKDIR /usr/src/app
ENV HOME /usr
ENV NODE_ENV production

COPY --from=build /usr/src/app/assets ./assets
COPY --from=build /usr/src/app/lib ./lib
COPY --from=build /usr/.npm /usr/.npm

COPY package*.json ./

RUN npm ci --only=production

EXPOSE 80 443
CMD [ "npm", "start" ]
