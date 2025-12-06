---
title: Configuration
description: Learn how to configure the Lando Elasticsearch service.
---

# Configuration

Here are the configuration options, set to the default values, for this service. If you are unsure about where this goes or what this means we *highly recommend* scanning the [services documentation](https://docs.lando.dev/services/lando-3.html) to get a good handle on how the magicks work.

Also note that options, in addition to the [build steps](https://docs.lando.dev/services/lando-3.html#build-steps) and [overrides](https://docs.lando.dev/services/lando-3.html#overrides) that are available to every service, are shown below:

```yaml
services:
  myservice:
    type: elasticsearch:9
    portforward: false
    mem: 1025m
    plugins: []
    config:
      server: SEE BELOW
```

## Port forwarding

`portforward` will allow you to access this service externally by assigning a port directly on your host's `localhost`. Note that `portforward` can be set to either `true` or a specific `port` but we *highly recommend* you set it to `true` unless you have pretty good knowledge of how port assignment works or you have a **very** compelling reason for needing a locked down port.

`portforward: true` will prevent inevitable port collisions and provide greater reliability and stability across Lando apps. That said, one downside of `portforward: true` is that Docker will assign a different port every time you restart your application. You can read more about accessing services externally [over here](https://docs.lando.dev/guides/external-access.html).

`tl;dr`

**Recommended**

```yaml
services:
  myservice:
    type: elasticsearch:9
    portforward: true
```

**Not recommended**

```yaml
services:
  myservice:
    type: elasticsearch:9
    portforward: 9200
```

## Using a custom elasticsearch.yml

You may need to override the default config with your own [elasticsearch config file](https://www.elastic.co/guide/en/elasticsearch/reference/current/settings.html#settings). Note that [according to the underlying upstream image](https://github.com/bitnami/bitnami-docker-elasticsearch#configuration-file) this will _completely_ replace the default config. Further note that by default our elasticsearch services start as `data` nodes. If you want to activate your node to also be an `ingest` node then check out [this example](https://github.com/lando/elasticsearch/blob/main/examples/custom/config/custom.yml).

If you do this, you must use a file that exists inside your application and express it relative to your project root as shown below:

**A hypothetical project**

Note that you can put your configuration files anywhere inside your application directory. We use a `config` directory in the below example but you can call it whatever you want such as `.lando`.

```bash
./
|-- config
   |-- elasticsearch.yml
|-- .lando.yml
```

**Landofile's elastic config**

```yaml
services:
  myservice:
    type: elasticsearch:9
    config:
      server: config/elasticsearch.yml
```

## Getting information

You can get connection and credential information about your elasticsearch instance by running [`lando info`](https://docs.lando.dev/cli/info.html). It may also be worth checking out our [accessing services externally guide](https://docs.lando.dev/guides/external-access.html).

## Adding Kibana for Elasticsearch

If you want to add a Kibana service for your Elasticsearch, you can easily use a [custom compose service](https://docs.lando.dev/plugins/compose).
The version of Kibana should match your version of Elasticsearch!

```yaml
services:
  kibana:
    type: compose
    services:
      image: bitnamilegacy/kibana:9.1.2-debian-12-r0
      command: '/opt/bitnami/scripts/kibana/entrypoint.sh /opt/bitnami/scripts/kibana/run.sh'
```
