const { ApolloServer } = require('apollo-server-micro');
const { typeDefs, resolvers, context } = require('./_graphql');
const { openConnection } = require('./_utils/mongo');

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context
});

const handler = server.createHandler({ path: '/api' });

export const config = {
    api: {
        bodyParser: false
    }
};

export default (...args) => {
    openConnection().then(() => {
        handler(...args);
    });
};
