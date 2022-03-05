FROM node:14
COPY tsconfig.base.json .
WORKDIR /src/web-client
CMD npm run build
