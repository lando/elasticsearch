'use strict';

// Modules
const path = require('path');
const _ = require('lodash');

// Supported versions
const supportedVersions = [
  '8',
  '8.15.x',
  '8.14.x',
  '8.13.x',
  '8.12.x',
  '8.11.x',
  '8.10.x',
  '8.9.x',
  '8.8.x',
  '8.7.x',
  '8.6.x',
  '8.5.x',
  '8.4.x',
  '8.3.x',
  '8.2.x',
  '8.1.x',
  '7',
  '7.17.x',
  '7.16.x',
  '7.15.x',
  '7.14.x',
  '7.13.x',
  '7.12.x',
  '7.11.x',
  '7.10.x',
  '7.9.x',
  '7.8.x',
  '7.7.x',
  '7.6.x',
  '7.5.x',
  '7.4.x',
  '7.3.x',
  '6',
  '6.8.x',
  '6.7.x',
  '6.6.x',
  '6.5.x',
  '5',
  '5.6.x',
];

// Builder
module.exports = {
  name: 'elasticsearch',
  config: {
    version: '6',
    supported: supportedVersions,
    pinPairs: {
      '8': 'bitnami/elasticsearch:8.15.2-debian-12-r0',
      '7': 'bitnami/elasticsearch:7.17.24-debian-12-r0',
      '6': 'bitnami/elasticsearch:6.8.23-debian-10-r77',
      '5': 'bitnami/elasticsearch:5.6.16-debian-9-r3',
    },
    patchesSupported: true,
    confSrc: path.resolve(__dirname, '..', 'config'),
    healthcheck: 'curl -XGET localhost:9200',
    plugins: [],
    port: '9200',
    mem: '1025m',
    remoteFiles: {
      server: '/opt/bitnami/elasticsearch/config/elasticsearch.yml',
    },
  },
  parent: '_service',
  builder: (parent, config) => class LandoElasticSearch extends parent {
    constructor(id, options = {}) {
      options = _.merge({}, config, options);
      const elasticsearch = {
        image: `bitnami/elasticsearch:${options.version}`,
        command: '/launch.sh',
        environment: {
          ELASTICSEARCH_IS_DEDICATED_NODE: 'no',
          ELASTICSEARCH_CLUSTER_NAME: 'bespin',
          ELASTICSEARCH_NODE_NAME: 'lando',
          ELASTICSEARCH_PORT_NUMBER: 9200,
          ELASTICSEARCH_PLUGINS: options.plugins.join(';'),
          ELASTICSEARCH_HEAP_SIZE: options.mem,
          LANDO_NEEDS_EXEC: 'DOEEET',
        },
        volumes: [
          `${options.confDest}/launch.sh:/launch.sh`,
          `${options.data}:/bitnami/elasticsearch/data`,
        ],
      };
      // Add some info
      options.info = {environment: elasticsearch.environment};
      // Send it downstream
      super(id, options, {services: _.set({}, options.name, elasticsearch)});
    };
  },
};
