'use strict';

require('dotenv/config');

var _graphqlTools = require('graphql-tools');

var _express = _interopRequireDefault(require('express'));

var _expressGraphql = _interopRequireDefault(require('express-graphql'));

var _fs = require('fs');

var _path = require('path');

var _resolvers = require('./lib/resolvers');

var _cors = _interopRequireDefault(require('cors'));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

const app = (0, _express.default)();
const port = process.env.port || 3000;
const isDev = process.env.NODE_ENV !== 'production';
app.use((0, _cors.default)()); //Lectura del esquema

const typeDefs = (0, _fs.readFileSync)(
  (0, _path.join)(__dirname, './lib', 'schema.graphql'),
  'utf-8'
); //Esquema - Define que va a hacer el API en GrapQL
//Query - consutas de información y el retorno

const schema = (0, _graphqlTools.makeExecutableSchema)({
  typeDefs,
  resolvers: _resolvers.resolvers,
}); //Ejecutamos el middlewate

app.use(
  '/api',
  (0, _expressGraphql.default)({
    schema,
    rootValue: _resolvers.resolvers,
    graphiql: isDev,
  })
);
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/api`);
});
