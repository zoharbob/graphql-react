const express = require('express');
const graphqlHTTP = require('express-graphql');
const cors = require('cors');
const { GraphQLSchema } = require('graphql');
const { queryType, mutationType } = require('./schema');

const port = 4000;
const app = express();

const schema = new GraphQLSchema({query: queryType, mutation: mutationType});

app.use(cors());
app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true,
}));

app.listen(port, () => {
   console.log('listening on port', port);
});