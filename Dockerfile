ARG NODE_VERSION=14
ARG ALPINE_VERSION=3.11

FROM node:${NODE_VERSION}-alpine${ALPINE_VERSION} AS base
WORKDIR /workspace
COPY package.json yarn.lock ./
RUN yarn install --no-progress
COPY . .

FROM base AS tester
RUN yarn lint
RUN yarn test --ci --coverage

FROM base AS react-builder
RUN yarn build
