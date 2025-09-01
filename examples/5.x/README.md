# Elasticsearch 5 Example

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
# Should use version 5.x for the default version
lando exec defaults -- curl -XGET localhost:9200 | grep "number" | grep "5."

# Should use 1025m as the default heap size
lando exec defaults -- env | grep ELASTICSEARCH_HEAP_SIZE=1025m

# Should not portforward by default
lando info -s defaults | grep "not forwarded"

# Should be running as a data node
lando exec defaults -u root -- cat /opt/bitnami/elasticsearch/config/elasticsearch.yml | grep "data: true"

# Should use version 5.6.15 for the patch service
lando exec patch -- curl -XGET localhost:9200" | grep "number" | grep 5.6.15
```

## Destroy tests

Run the following commands to trash this app like nothing ever happened.

```bash
# Should be destroyed with success
lando destroy -y
lando poweroff
```

