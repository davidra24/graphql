import 'dotenv/config';
import { makeExecutableSchema } from 'graphql-tools';
import express from 'express';
import gqlMiddleware from 'express-graphql';
import { readFileSync } from 'fs';
import { join } from 'path';
import { resolvers } from '../lib/resolvers';
import { connectDB } from '../lib/db';

const app = express();
const port = process.env.port || 3000;

//Lectura del esquema
const typeDefs = readFileSync(
  join(__dirname, '../lib', 'schema.graphql'),
  'utf-8'
);

//Esquema - Define que va a hacer el API en GrapQL
//Query - consutas de información y el retorno
const schema = makeExecutableSchema({ typeDefs, resolvers });

//Ejecutamos el middlewate
app.use(
  '/api',
  gqlMiddleware({
    schema,
    rootValue: resolvers,
    graphiql: true,
  })
);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/api`);
});
