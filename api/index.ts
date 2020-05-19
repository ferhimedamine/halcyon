import { ApolloServer } from 'apollo-server-micro';
import { typeDefs, resolvers, context } from './_schema';
import { loggerPlugin } from './_utils/logger';

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context,
    plugins: [loggerPlugin],
    introspection: true,
    playground: true
});

const handler = server.createHandler({ path: '/api' });

export const config = {
    api: {
        bodyParser: false
    }
};

export default handler;
