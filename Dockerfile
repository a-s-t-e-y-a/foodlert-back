FROM node:alpine
WORKDIR /app
COPY ./package.json yarn.lock  ./
RUN yarn
COPY . .
EXPOSE 4000
CMD ["npm","run","dev"]