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
# Should use version 8.15.2 for the default version
lando ssh -s defaults -c "curl -s -XGET localhost:9200" | grep "number" | grep "8.15.2"

# Should use 1025m as the default heap size
lando ssh -s defaults -c "env | grep ELASTICSEARCH_HEAP_SIZE=1025m"

# Should not portforward by default
lando info -s defaults | grep "not forwarded"

# Should be running as a custom cluster name
lando ssh -s defaults -u root -c "cat /opt/bitnami/elasticsearch/config/elasticsearch.yml" | grep 'name: bespin'

# Should use version 8.14.3 for the patch service
lando ssh -s patch -c "curl -s -XGET localhost:9200" | grep "number" | grep 8.14.3
```

Destroy tests
-------------

Run the following commands to trash this app like nothing ever happened.

```bash
# Should be destroyed with success
lando destroy -y
lando poweroff
```

