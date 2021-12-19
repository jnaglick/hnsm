FROM node:14
WORKDIR /web-client
CMD npm ci --no-optional && npm run build
