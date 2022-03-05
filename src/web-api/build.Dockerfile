FROM node:14
# COPY tsconfig.base.json .
WORKDIR /src/web-api
CMD npm run build
