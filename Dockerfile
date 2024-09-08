FROM node:20.17.0-alpine AS build

WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . ./
RUN yarn build

FROM httpd:2.4.62-alpine

COPY --from=build /app/dist /usr/local/apache2/htdocs/
