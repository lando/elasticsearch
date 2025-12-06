---
title: Elasticsearch Lando Plugin
description: Add a highly configurable Elasticsearch service to Lando for local development with all the power of Docker and Docker Compose.
---

# Elasticsearch

[Elasticsearch](https://www.elastic.co/elasticsearch/) is a search and analytics engine, commonly used as a substitute for Solr or for collecting log and metrics data.

You can easily add it to your Lando app by adding an entry to the [services](https://docs.lando.dev/services/lando-3.html) top-level config in your [Landofile](https://docs.lando.dev/landofile).

```yaml
services:
  myservice:
    type: elasticsearch:9
```

## Supported versions

*   [9](https://hub.docker.com/r/bitnamilegacy/elasticsearch/tags?name=9.)
*   [9.1.x](https://hub.docker.com/r/bitnamilegacy/elasticsearch/tags?name=9.1.)
*   [9.0.x](https://hub.docker.com/r/bitnamilegacy/elasticsearch/tags?name=9.0.)
*   [8](https://hub.docker.com/r/bitnamilegacy/elasticsearch/tags?name=8.)
*   [8.18.x](https://hub.docker.com/r/bitnamilegacy/elasticsearch/tags?name=8.18.)
*   [8.17.x](https://hub.docker.com/r/bitnamilegacy/elasticsearch/tags?name=8.17.)
*   [8.16.x](https://hub.docker.com/r/bitnamilegacy/elasticsearch/tags?name=8.16.)
*   [8.15.x](https://hub.docker.com/r/bitnamilegacy/elasticsearch/tags?name=8.15.)
*   [8.14.x](https://hub.docker.com/r/bitnamilegacy/elasticsearch/tags?name=8.14.)
*   [8.13.x](https://hub.docker.com/r/bitnamilegacy/elasticsearch/tags?name=8.13.)
*   [8.12.x](https://hub.docker.com/r/bitnamilegacy/elasticsearch/tags?name=8.12.)
*   [8.11.x](https://hub.docker.com/r/bitnamilegacy/elasticsearch/tags?name=8.11.)
*   [8.10.x](https://hub.docker.com/r/bitnamilegacy/elasticsearch/tags?name=8.10.)
*   [8.9.x](https://hub.docker.com/r/bitnamilegacy/elasticsearch/tags?name=8.9.)
*   [8.8.x](https://hub.docker.com/r/bitnamilegacy/elasticsearch/tags?name=8.8.)
*   [8.7.x](https://hub.docker.com/r/bitnamilegacy/elasticsearch/tags?name=8.7.)
*   [8.6.x](https://hub.docker.com/r/bitnamilegacy/elasticsearch/tags?name=8.6.)
*   [8.5.x](https://hub.docker.com/r/bitnamilegacy/elasticsearch/tags?name=8.5.)
*   [8.4.x](https://hub.docker.com/r/bitnamilegacy/elasticsearch/tags?name=8.4.)
*   [8.3.x](https://hub.docker.com/r/bitnamilegacy/elasticsearch/tags?name=8.3.)
*   [8.2.x](https://hub.docker.com/r/bitnamilegacy/elasticsearch/tags?name=8.2.)
*   [8.1.x](https://hub.docker.com/r/bitnamilegacy/elasticsearch/tags?name=8.1.)
*   [7](https://hub.docker.com/r/bitnamilegacy/elasticsearch/tags?name=7.)
*   [7.17.x](https://hub.docker.com/r/bitnamilegacy/elasticsearch/tags?name=7.17.)
*   [7.16.x](https://hub.docker.com/r/bitnamilegacy/elasticsearch/tags?name=7.16.)
*   [7.15.x](https://hub.docker.com/r/bitnamilegacy/elasticsearch/tags?name=7.15.)
*   [7.14.x](https://hub.docker.com/r/bitnamilegacy/elasticsearch/tags?name=7.14.)
*   [7.13.x](https://hub.docker.com/r/bitnamilegacy/elasticsearch/tags?name=7.13.)
*   [7.12.x](https://hub.docker.com/r/bitnamilegacy/elasticsearch/tags?name=7.12.)
*   [7.11.x](https://hub.docker.com/r/bitnamilegacy/elasticsearch/tags?name=7.11.)
*   [7.10.x](https://hub.docker.com/r/bitnamilegacy/elasticsearch/tags?name=7.10.)
*   [7.9.x](https://hub.docker.com/r/bitnamilegacy/elasticsearch/tags?name=7.9.)
*   [7.8.x](https://hub.docker.com/r/bitnamilegacy/elasticsearch/tags?name=7.8.)
*   [7.7.x](https://hub.docker.com/r/bitnamilegacy/elasticsearch/tags?name=7.7.)
*   [7.6.x](https://hub.docker.com/r/bitnamilegacy/elasticsearch/tags?name=7.6.)
*   [7.5.x](https://hub.docker.com/r/bitnamilegacy/elasticsearch/tags?name=7.5.)
*   [7.4.x](https://hub.docker.com/r/bitnamilegacy/elasticsearch/tags?name=7.4.)
*   [7.3.x](https://hub.docker.com/r/bitnamilegacy/elasticsearch/tags?name=7.3.)
*   [6](https://hub.docker.com/r/bitnamilegacy/elasticsearch/tags?name=6.)
*   [6.8.x](https://hub.docker.com/r/bitnamilegacy/elasticsearch/tags?name=6.8.)
*   [6.7.x](https://hub.docker.com/r/bitnamilegacy/elasticsearch/tags?name=6.7.)
*   [6.6.x](https://hub.docker.com/r/bitnamilegacy/elasticsearch/tags?name=6.6.)
*   [6.5.x](https://hub.docker.com/r/bitnamilegacy/elasticsearch/tags?name=6.5.)
*   [5](https://hub.docker.com/r/bitnamilegacy/elasticsearch/tags?name=5.)
*   [custom](https://docs.lando.dev/services/lando-3.html#overrides)

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

But make sure you use one of the available [patch tags](https://hub.docker.com/r/bitnamilegacy/elasticsearch/tags) for the underlying image we are using.

## Other requirements

Elasticsearch requires you set the kernel property `vm.max_map_count` to at least `262144` in order to run correctly. Lando will attempt to set this on install if you use any of our official package installers for Windows, macOS, Debian, RPM or Pacman.

However, if you are installing from source or via another pathway you will need to set this manually. Generally this can be accomplished with the following:

```bash
sysctl -w vm.max_map_count=262144
```

But we recommend you check out the following issue for more information:
<https://github.com/lando/lando/issues/1967>

