FROM node:alpine

RUN npm install -g @angular/cli

# Install shared
WORKDIR /usr/src/app/shared
COPY shared .
RUN npm install
RUN npm run build

# Install ng client
WORKDIR /usr/src/app/ng
COPY ng .
RUN npm install

# Serve
CMD ["ng", "serve", "--host", "0.0.0.0"]

EXPOSE 4200