FROM node:lts-alpine3.14
EXPOSE 3001
RUN mkdir -p /home/tftf
WORKDIR "/home/tftf"
COPY package.json yarn.lock ./
RUN yarn install
COPY . .
RUN yarn run build
CMD ["yarn", "run", "start:prod"]
