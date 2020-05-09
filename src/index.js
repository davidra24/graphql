import { graphql, buildSchema } from 'graphql';

//Esquema - Define que va a hacer el API en GrapQL
//Query - consutas de información y el retorno
const schema = buildSchema(`
    type Query {
        hello: String,
        saludo: String
    }
`);

//Configura los resolvers
const resolvers = {
  hello: () => 'Hola mundo',
  saludo: () => 'Hola a todos',
};

//Ejecuta el query (esquema, nombreQuery)
graphql(schema, '{ hello, saludo }', resolvers).then((data) =>
  console.log(data)
);
