FROM node:14
WORKDIR /web-api
CMD npm ci --no-optional && npm run build
