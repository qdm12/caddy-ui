# Caddy UI

*Caddy UI is a web frontend to interact with the Caddy server*

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

- Works with Caddy v2.0.0 (you can use [this Docker image](https://github.com/qdm12/caddy-scratch))
- Compatible with `amd64`, `386`, `arm64` and `arm32v7` CPU architectures
- Runs without root
- Docker image tags and sizes are available [here](https://hub.docker.com/r/qmcgaw/caddy-ui/tags)

## Setup

### With an existing Caddyfile

1. **If you run Caddy in a container**, add to your Caddyfile global configuration block `admin 0.0.0.0:2019` and reload the configuration. Ensure Caddy's port `2019` is reachable somehow (i.e. with `-p 2019:2019/tcp`).
1. As Caddy v2.0.0 persists automatically its configuration in *autosave.json*, your Caddyfile will be used exclusively by the caddy-ui container. Therefore, change your Caddy command to `caddy run --resume` (with the Docker image `qmcgaw/caddy-scratch`, run it with `docker run ... qmcgaw/caddy-scratch run --resume`)
1. Create a `data` directory and move your Caddyfile in `data/Caddyfile`
1. As this container is running without root as user with id `1000`, change the ownership and permission of the data directory on your host:

    ```sh
    chown -R 1000 data
    chmod -R 700 data
    ```

1. Assuming your current file path is `yourpath`, run the container with:

    ```sh
    docker run -d -p 8000:8000/tcp -e CADDY_API_ENDPOINT=http://host.docker.internal:2019 -v /yourpath/data:/data qmcgaw/caddy-ui
    ```

    You can also use docker-compose with `docker-compose up -d` and the following docker-compose.yml:

    ```yml
    version: "3.7"
      services:
        caddy-ui:
            image: qmcgaw/caddy-ui
            ports:
              - 8000:8000/tcp
            environment:
              - CADDY_API_ENDPOINT=http://host.docker.internal:2019
            volumes:
              - ./data:/data
    ```

1. Access the web app at [http://localhost:8000](http://localhost:8000).

### With a new Caddyfile

The following only uses [docker-compose](https://docs.docker.com/compose/install/) for simplicity, although you can do without it in more steps.

1. Download [docker-compose.yml](https://github.com/qdm12/caddy-ui/blob/master/docker-compose.yml)
1. Run the Caddy container alone once so that it auto saves the default Caddyfile:

    ```sh
    docker-compose up -d caddy
    docker-compose stop caddy
    ```

    This is needed such that the Caddy API is accessible by 0.0.0.0:2019 instead of the built-in localhost:2019.
1. In docker-compose.yml, uncomment the line `command: run --resume`. This makes Caddy run from the last successful config it used, even if it no Caddyfile is provided (the `autosave.json` is stored in an anonymous volume at `/caddydir`).
1. Launch the Caddy container and the Caddy UI server container with

    ```sh
    docker-compose up -d
    ```

    By default, your caddy-ui data (only the Caddyfile for now) is persisted in another anonymous Docker volume at `/data`.

1. Access the web app at [http://localhost:8000](http://localhost:8000).

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

- [ ] Change public icons and logos
- [ ] Wire up with Caddy UI server
- [ ] Unit tests
- [ ] Readme instructions
- [ ] Refresh modal

## License

This repository is under an [MIT license](https://github.com/qdm12/caddy-ui/master/license) unless otherwise indicated
