const { ApolloServer } = require('apollo-server-micro');
const { typeDefs, resolvers, context } = require('./_graphql');
const { loggerPlugin } = require('./_utils/logger');

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context,
    plugins: [loggerPlugin],
    introspection: true,
    playground: true
});

const handler = server.createHandler({ path: '/api' });

module.exports.config = {
    api: {
        bodyParser: false
    }
};

module.exports = handler;
