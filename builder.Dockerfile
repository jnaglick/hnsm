FROM node:14
WORKDIR /app
COPY package.json package-lock.json lerna.json tsconfig.base.json ./
COPY src/ src/
RUN npm run install:ci
CMD npm run build