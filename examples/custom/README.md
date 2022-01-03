Elasticsearch Example
=====================

This example exists primarily to test the following documentation:

* [Elasticsearch Service](https://docs.devwithlando.io/tutorials/elasticsearch.html)

Start up tests
--------------

Run the following commands to get up and running
with this example.

```bash
# Should start up successfully
lando poweroff
lando start
```

Verification commands
---------------------

Run the following commands to validate things are rolling as they should.

```bash
# Should use the custom version specified for custom
lando ssh -s custom -c "curl -XGET localhost:9200" | grep "number" | grep "7."

# Should portforward for custom
lando info -s custom | grep "not forwarded" || echo $? | grep 1

# Should use the specified heap size when given
lando ssh -s custom -c "env | grep ELASTICSEARCH_HEAP_SIZE=1026m"

# Should mount custom config to the correct locations
lando ssh -s custom -u root -c "cat /opt/bitnami/elasticsearch/config/elasticsearch.yml" | grep "ingest: true"

# Should install any specified plugins successfully
#lando ssh -s custom -c "elasticsearch-plugin list" | grep "analysis-icu"
```

Destroy tests
-------------

Run the following commands to trash this app like nothing ever happened.

```bash
# Should be destroyed with success
lando destroy -y
lando poweroff
```

