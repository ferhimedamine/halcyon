const { ApolloServer } = require('apollo-server-micro');
const { typeDefs, resolvers, context } = require('./_graphql');
const { openConnection } = require('./_utils/mongo');

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context,
    introspection: true,
    playground: true,
    plugins: [
        {
            serverWillStart() {
                return openConnection();
            }
        }
    ]
});

const handler = server.createHandler({ path: '/api' });

module.exports.config = {
    api: {
        bodyParser: false
    }
};

module.exports = handler;
