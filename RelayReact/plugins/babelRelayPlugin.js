const getBabelRelayPlugin = require('babel-relay-plugin');
const schema = require('../../graphql-schema.json');

module.exports = getBabelRelayPlugin(schema.data);
