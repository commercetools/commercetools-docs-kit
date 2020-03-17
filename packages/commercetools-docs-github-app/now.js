const { toLambda } = require('probot-serverless-now');
const app = require('./index.js');

module.exports = toLambda(app);
