FROM node:14
WORKDIR /app
COPY src/ src/
COPY package.json package-lock.json lerna.json tsconfig.base.json ./
RUN npm run install:ci
CMD npm run build