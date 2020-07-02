# Caddy UI

*Caddy UI is a web frontend to interact with the Caddy server*

⚠️ This is under heavy development, expect some breaking changes or non functional images!

<img height="200" src="https://raw.githubusercontent.com/qdm12/caddy-ui/master/title.svg?sanitize=true">

[![Web build status](https://github.com/qdm12/caddy-ui/workflows/Docker%20build/badge.svg)](https://github.com/qdm12/caddy-ui/actions?query=workflow%3A%22Docker+build%22)
[![Docker build status](https://github.com/qdm12/caddy-ui-server/workflows/Buildx%20latest/badge.svg)](https://github.com/qdm12/caddy-ui-server/actions?query=workflow%3A%22Buildx+latest%22)
[![Docker Pulls](https://img.shields.io/docker/pulls/qmcgaw/caddy-ui.svg)](https://hub.docker.com/r/qmcgaw/caddy-ui)
[![Docker Stars](https://img.shields.io/docker/stars/qmcgaw/caddy-ui.svg)](https://hub.docker.com/r/qmcgaw/caddy-ui)
[![Image size](https://images.microbadger.com/badges/image/qmcgaw/caddy-ui.svg)](https://microbadger.com/images/qmcgaw/caddy-ui)
[![Image version](https://images.microbadger.com/badges/version/qmcgaw/caddy-ui.svg)](https://microbadger.com/images/qmcgaw/caddy-ui)

[![Join Slack channel](https://img.shields.io/badge/slack-@qdm12-yellow.svg?logo=slack)](https://join.slack.com/t/qdm12/shared_invite/enQtOTE0NjcxNTM1ODc5LTYyZmVlOTM3MGI4ZWU0YmJkMjUxNmQ4ODQ2OTAwYzMxMTlhY2Q1MWQyOWUyNjc2ODliNjFjMDUxNWNmNzk5MDk)
[![GitHub last commit](https://img.shields.io/github/last-commit/qdm12/caddy-ui.svg)](https://github.com/qdm12/caddy-ui/issues)
[![GitHub commit activity](https://img.shields.io/github/commit-activity/y/qdm12/caddy-ui.svg)](https://github.com/qdm12/caddy-ui/issues)
[![GitHub issues](https://img.shields.io/github/issues/qdm12/caddy-ui.svg)](https://github.com/qdm12/caddy-ui/issues)

## Features

- Edit your Caddy server configuration in JSON or YML
- Works with Caddy v2.0.0 (you can use [this Docker image](https://github.com/qdm12/caddy-scratch))
- Compatible with `amd64`, `386`, `arm64` and `arm32v7` CPU architectures
- Runs without root
- Tiny Docker image of 11MB
- Docker image tags and sizes are available [here](https://hub.docker.com/r/qmcgaw/caddy-ui/tags)

## Setup

1. **If you run Caddy in a container**, make the admin api listen on `0.0.0.0:2019`and ensure Caddy's port `2019` is reachable somehow (i.e. with `-p 2019:2019/tcp`). You should also run caddy with `--resume` so that it uses its auto saved json configuration when it is restarted.
1. Run this container:

    ```sh
    docker run -d -p 8000:8000/tcp -e CADDY_API_ENDPOINT="http://somehost:2019" qmcgaw/caddy-ui
    ```

    You can also use docker-compose with `docker-compose up -d` and the following [docker-compose.yml](https://github.com/qdm12/caddy-ui/blob/master/docker-compose.yml):

    ```yml
    version: "3.7"
      services:
        caddy:
          image: qmcgaw/caddy-scratch
          container_name: caddy
          command: --resume
          expose:
            - 2019:2019/tcp
          ports:
            - 8080:8080/tcp
            - 8443:8443/tcp
          environment:
            - TZ=
        caddy-ui:
          image: qmcgaw/caddy-ui
          ports:
            - 8000:8000/tcp
          environment:
            - CADDY_API_ENDPOINT=http://caddy:2019
    ```

1. Access the web app at [http://localhost:8000](http://localhost:8000).

### Environment variables

| Environment variable | Default | Description |
| --- | --- | --- |
| `CADDY_API_ENDPOINT` | `http://localhost:2019` | Caddy API endpoint address |
| `LOG_ENCODING` | `console` | Logging format, can be `json` or `console` |
| `LOG_LEVEL` | `info` | Logging level, can be `debug`, `info`, `warning`, `error` |
| `NODE_ID` | `-1` | Node ID for logger (`-1` to disable) |
| `LISTENING_PORT` | `8000` | Internal listening TCP port |
| `ROOT_URL` | `/` | URL path, used if behind a reverse proxy |
| `TZ` | `America/Montreal` | Timezone string |
| `CORS_WHITELIST` |  | Comma separated list of hosts to whitelist for CORS, use only for development |

### Update

You can update the image with `docker pull qmcgaw/caddy-ui` or use one of [tags available](https://hub.docker.com/r/qmcgaw/caddy-ui/tags)

## Development

You might want to first refer to the [Caddy UI Server repository](https://github.com/qdm12/caddy-ui-server) which contains more architectural information and contains this repository as a Git submodule.

1. Setup your environment

    <details><summary>Using VSCode and Docker</summary><p>

    1. Install [Docker](https://docs.docker.com/install/)
       - On Windows, share a drive with Docker Desktop and have the project on that partition
       - On OSX, share your project directory with Docker Desktop
    1. With [Visual Studio Code](https://code.visualstudio.com/download), install the [remote containers extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)
    1. In Visual Studio Code, press on `F1` and select `Remote-Containers: Open Folder in Container...`
    1. Your dev environment is ready to go!... and it's running in a container :+1:

    </p></details>

    <details><summary>Locally</summary><p>

    Install [Nodejs](https://nodejs.org/en/download/) and [Docker](https://www.docker.com/products/docker-desktop), with eventually [yarn](https://classic.yarnpkg.com/en/docs/install/)

    </p></details>

1. Commands available:

    ```sh
    # Starts the development server with ts-node
    yarn start
    # Test the code
    yarn test
    # Lint the code
    yarn lint
    # Build the app for production
    yarn build
    # Build the Docker image
    docker build -t qmcgaw/caddy-ui .
    ```

1. See [Contributing](.github/CONTRIBUTING.md) for more information on how to contribute to this repository.

## TODOs

- [ ] Check editor content on upload click
- [ ] Change public icons and logos
- [ ] Unit tests
- [ ] Refresh modal

## License

This repository is under an [MIT license](https://github.com/qdm12/caddy-ui/master/license) unless otherwise indicated
