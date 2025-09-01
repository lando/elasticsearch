# Elasticsearch 7 Example

This example exists primarily to test the following documentation:

* [Elasticsearch Service](https://docs.lando.dev/plugins/elasticsearch)

## Start up tests

Run the following commands to get up and running
with this example.

```bash
# Should start up successfully
lando poweroff
lando start
```

## Verification commands

Run the following commands to validate things are rolling as they should.

```bash
# Should use version 7.17.26 for the default version
lando exec defaults -- curl -s -XGET localhost:9200 | grep "number" | grep "7.17.26"

# Should use 1025m as the default heap size
lando exec defaults -- env | grep ELASTICSEARCH_HEAP_SIZE=1025m

# Should not portforward by default
lando info -s defaults | grep "not forwarded"

# Should be running as a custom cluster name
lando exec defaults -u root -- cat /opt/bitnami/elasticsearch/config/elasticsearch.yml | grep 'name: bespin'

# Should use version 7.17.5 for the patch service
lando exec patch -- curl -s -XGET localhost:9200" | grep "number" | grep 7.17.5
```

## Destroy tests

Run the following commands to trash this app like nothing ever happened.

```bash
# Should be destroyed with success
lando destroy -y
lando poweroff
```

