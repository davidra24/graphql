import { graphql, buildSchema } from 'graphql';

//Esquema - Define que va a hacer el API en GrapQL
//Query - consutas de información y el retorno
const schema = buildSchema(`
    type Query {
        hello: String
    }
`);

//Ejecuta el query (esquema, nombreQuery)
graphql(schema, '{ hello }').then((data) => console.log(data));
