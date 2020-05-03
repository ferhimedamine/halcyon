const { ApolloServer } = require('apollo-server-micro');
const { typeDefs, resolvers, context } = require('./_graphql');
const { mongoPlugin } = require('./_utils/mongo');
const { loggerPlugin } = require('./_utils/logger');

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context,
    introspection: true,
    playground: true,
    plugins: [loggerPlugin, mongoPlugin]
});

const handler = server.createHandler({ path: '/api' });

module.exports.config = {
    api: {
        bodyParser: false
    }
};

module.exports = handler;
