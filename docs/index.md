---
title: Elasticsearch Lando Plugin
description: Add a highly configurable Elasticsearch service to Lando for local development with all the power of Docker and Docker Compose.
next: ./config.html
---

# Elasticsearch

[Elasticsearch](https://www.elastic.co/elasticsearch/) is a search and analytics engine, commonly used as a substitute for Solr or for collecting log and metrics data.

You can easily add it to your Lando app by adding an entry to the [services](https://docs.lando.dev/config/services.html) top-level config in your [Landofile](https://docs.lando.dev/config/lando.html).

```yaml
services:
  myservice:
    type: elasticsearch
```

## Supported versions

*   [8](https://hub.docker.com/r/bitnami/elasticsearch)
*   [8.2.x](https://hub.docker.com/r/bitnami/elasticsearch)
*   [8.1.x](https://hub.docker.com/r/bitnami/elasticsearch)
*   [7](https://hub.docker.com/r/bitnami/elasticsearch)
*   [7.17.x](https://hub.docker.com/r/bitnami/elasticsearch)
*   [7.16.x](https://hub.docker.com/r/bitnami/elasticsearch)
*   [7.15.x](https://hub.docker.com/r/bitnami/elasticsearch)
*   [7.14.x](https://hub.docker.com/r/bitnami/elasticsearch)
*   [7.13.x](https://hub.docker.com/r/bitnami/elasticsearch)
*   [7.12.x](https://hub.docker.com/r/bitnami/elasticsearch)
*   [7.11.x](https://hub.docker.com/r/bitnami/elasticsearch)
*   [7.10.x](https://hub.docker.com/r/bitnami/elasticsearch)
*   [7.9.x](https://hub.docker.com/r/bitnami/elasticsearch)
*   [7.8.x](https://hub.docker.com/r/bitnami/elasticsearch)
*   [7.7.x](https://hub.docker.com/r/bitnami/elasticsearch)
*   [7.6.x](https://hub.docker.com/r/bitnami/elasticsearch)
*   [7.5.x](https://hub.docker.com/r/bitnami/elasticsearch)
*   [7.4.x](https://hub.docker.com/r/bitnami/elasticsearch)
*   [7.3.x](https://hub.docker.com/r/bitnami/elasticsearch)
*   **[6](https://hub.docker.com/r/bitnami/elasticsearch)** **(default)**
*   [6.8.x](https://hub.docker.com/r/bitnami/elasticsearch)
*   [6.7.x](https://hub.docker.com/r/bitnami/elasticsearch)
*   [6.6.x](https://hub.docker.com/r/bitnami/elasticsearch)
*   [6.5.x](https://hub.docker.com/r/bitnami/elasticsearch)
*   [5](https://hub.docker.com/r/bitnami/elasticsearch)
*   [custom](https://docs.lando.dev/config/services.html#advanced)

## Patch versions

::: warning Not officially supported!
While we allow users to specify patch versions for this service, they are not *officially* supported, so if you use one, YMMV.
:::

To use a patch version, you can do something as shown below:

```yaml
services:
  myservice:
    type: elasticsearch:5.6.15
```

But make sure you use one of the available [patch tags](https://hub.docker.com/r/bitnami/elasticsearch/tags) for the underlying image we are using.

## Other requirements

Elasticsearch requires you set the kernel property `vm.max_map_count` to at least `262144` in order to run correctly. Lando will attempt to set this on install if you use any of our official package installers for Windows, macOS, Debian, RPM or Pacman.

However, if you are installing from source or via another pathway you will need to set this manually. Generally this can be accomplished with the following:

```bash
sysctl -w vm.max_map_count=262144
```

But we recommend you check out the following issue for more information:
<https://github.com/lando/lando/issues/1967>

## Custom Installation

This plugin is included with Lando by default. That means if you have Lando version `3.0.8` or higher then this plugin is already installed!

However if you would like to manually install the plugin, update it to the bleeding edge or install a particular version then use the below. Note that this installation method requires Lando `3.5.0+`.

:::: code-group
::: code-group-item LANDO 3.21+
```bash:no-line-numbers
lando plugin-add @lando/compose
```
:::
::: code-group-item HYPERDRIVE
```bash:no-line-numbers
# @TODO
# @NOTE: This doesn't actaully work yet
hyperdrive install @lando/compose
```
:::
::: code-group-item DOCKER
```bash:no-line-numbers
# Ensure you have a global plugins directory
mkdir -p ~/.lando/plugins

# Install plugin
# NOTE: Modify the "npm install @lando/elasticsearch" line to install a particular version eg
# npm install @lando/elasticsearch@0.5.2
docker run --rm -it -v ${HOME}/.lando/plugins:/plugins -w /tmp node:18-alpine sh -c \
  "npm init -y \
  && npm install @lando/elasticsearch --production --flat --no-default-rc --no-lockfile --link-duplicates \
  && npm install --production --cwd /tmp/node_modules/@lando/elasticsearch \
  && mkdir -p /plugins/@lando \
  && mv --force /tmp/node_modules/@lando/elasticsearch /plugins/@lando/elasticsearch"

# Rebuild the plugin cache
lando --clear
```
:::
::::

You should be able to verify the plugin is installed by running `lando config --path plugins` and checking for `@lando/elasticsearch`. This command will also show you _where_ the plugin is being loaded from.
