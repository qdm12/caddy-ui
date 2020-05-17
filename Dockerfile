ARG NODE_VERSION=12
ARG GO_VERSION=1.14
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

FROM golang:${GO_VERSION}-alpine${ALPINE_VERSION} AS http-builder
WORKDIR /tmp/http-server
RUN printf "package main\n\nimport \"net/http\"\n\nfunc main() {\n	http.Handle(\"/\", http.FileServer(http.Dir(\"/srv\")))\n	http.ListenAndServe(\":8080\", nil)\n}" > main.go
RUN CGO_ENABLED=0 go build -ldflags="-s -w" -o http-server

FROM scratch
ENTRYPOINT [ "/http-server" ]
EXPOSE 8080/tcp
COPY --from=http-builder --chown=1000 tmp/http-server/http-server /http-server
COPY --from=react-builder --chown=1000 /workspace/build/ /srv/
USER 1000
