# Caddy UI

*SHORT_DESCRIPTION*

<img height="200" src="title.svg?sanitize=true">

[![Build status](https://github.com/qdm12/caddy-ui/workflows/Buildx%20latest/badge.svg)](https://github.com/qdm12/caddy-ui/actions?query=workflow%3A%22Buildx+latest%22)
[![Docker Pulls](https://img.shields.io/docker/pulls/qmcgaw/caddy-ui.svg)](https://hub.docker.com/r/qmcgaw/caddy-ui)
[![Docker Stars](https://img.shields.io/docker/stars/qmcgaw/caddy-ui.svg)](https://hub.docker.com/r/qmcgaw/caddy-ui)
[![Image size](https://images.microbadger.com/badges/image/qmcgaw/caddy-ui.svg)](https://microbadger.com/images/qmcgaw/caddy-ui)
[![Image version](https://images.microbadger.com/badges/version/qmcgaw/caddy-ui.svg)](https://microbadger.com/images/qmcgaw/caddy-ui)

[![Join Slack channel](https://img.shields.io/badge/slack-@qdm12-yellow.svg?logo=slack)](https://join.slack.com/t/qdm12/shared_invite/enQtOTE0NjcxNTM1ODc5LTYyZmVlOTM3MGI4ZWU0YmJkMjUxNmQ4ODQ2OTAwYzMxMTlhY2Q1MWQyOWUyNjc2ODliNjFjMDUxNWNmNzk5MDk)
[![GitHub last commit](https://img.shields.io/github/last-commit/qdm12/caddy-ui.svg)](https://github.com/qdm12/caddy-ui/issues)
[![GitHub commit activity](https://img.shields.io/github/commit-activity/y/qdm12/caddy-ui.svg)](https://github.com/qdm12/caddy-ui/issues)
[![GitHub issues](https://img.shields.io/github/issues/qdm12/caddy-ui.svg)](https://github.com/qdm12/caddy-ui/issues)

## Features

- Compatible with `amd64`, `386`, `arm64`, `arm32v7`, `arm32v6`, `ppc64le` and `s390x` CPU architectures.
- [Docker image tags and sizes](https://hub.docker.com/r/qmcgaw/caddy-ui/tags)

## Setup

1. Use the following command:

    ```sh
    docker run -d qmcgaw/caddy-ui
    ```

    You can also use [docker-compose.yml](https://github.com/qdm12/caddy-ui/blob/master/docker-compose.yml) with:

    ```sh
    docker-compose up -d
    ```

1. You can update the image with `docker pull qmcgaw/caddy-ui:latest` or use one of [tags available](https://hub.docker.com/r//qmcgaw/caddy-ui/tags)

### Environment variables

| Environment variable | Default | Possible values | Description |
| --- | --- | --- | --- |
|  |  |  |  |

## Development

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

- [ ] Change public icons and logos
- [ ] Write some dummy tests

## License

This repository is under an [MIT license](https://github.com/qdm12/caddy-ui/master/license) unless otherwise indicated
