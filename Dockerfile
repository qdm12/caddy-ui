ARG NODE_VERSION=14
ARG ALPINE_VERSION=3.12

FROM node:${NODE_VERSION}-alpine${ALPINE_VERSION} AS builder
WORKDIR /workspace
COPY package.json yarn.lock ./
RUN yarn install --no-progress
COPY . .
RUN yarn lint
RUN yarn test --watchAll=false --passWithNoTests
RUN yarn build

FROM scratch
COPY --from=builder --chown=1000:1000 /workspace/build/ /ui/
