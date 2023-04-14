'use strict';

// Modules
const _ = require('lodash');

// Supported versions
const supportedVersions = [
  '8',
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
      '8': 'elasticsearch:8.7.0',
      '7': 'elasticsearch:7.17.9',
      '6': 'elasticsearch:6.8.23',
      '5': 'elasticsearch:5.6.16', //No ARM versions available
    },
    patchesSupported: true,
    confSrc: __dirname,
    healthcheck: 'curl -XGET localhost:9200',
    plugins: [],
    port: '9200',
    mem: '1025m',
    remoteFiles: {
      server: '/usr/share/elasticsearch/config/elasticsearch.yml',
    },
  },
  parent: '_service',
  builder: (parent, config) => class LandoElasticSearch extends parent {
    constructor(id, options = {}) {
      options = _.merge({}, config, options);
      const elasticsearch = {
        image: `elasticsearch:${options.version}`,
        command: '/launch.sh',
        environment: {
          ELASTICSEARCH_IS_DEDICATED_NODE: 'no',
          'cluster.name': 'bespin',
          'node.name': 'lando',
          'discovery.type': 'single-node',
          'http.port': '9200',
          ELASTICSEARCH_PLUGINS: options.plugins.join(';'),
          ELASTICSEARCH_HEAP_SIZE: options.mem,
          ELASTICSEARCH_PLUGINS_DIR: '/usr/share/elasticsearch/plugins',
          LANDO_NEEDS_EXEC: 'DOEEET',
        },
        volumes: [
          `${options.data}:/usr/share/elasticsearch/data`,
          `${options.confDest}/launch.sh:/launch.sh`,
        ],
      };
      // Add some info
      options.info = {environment: elasticsearch.environment};
      // Send it downstream
      super(id, options, {services: _.set({}, options.name, elasticsearch)});
    };
  },
};
