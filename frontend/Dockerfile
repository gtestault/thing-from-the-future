FROM node:lts-alpine3.14 as builder
RUN mkdir -p /home/frontend
WORKDIR "/home/frontend"
COPY package.json yarn.lock ./
RUN yarn install
COPY . .
RUN yarn build --configuration production

FROM nginx:1.21-alpine
RUN mkdir -p /var/www/tftf
WORKDIR /var/www/tftf
COPY --from=builder /home/frontend/dist/frontend .
COPY ./nginx.conf /etc/nginx/nginx.conf
CMD ["nginx", "-g", "daemon off;"]
