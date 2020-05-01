import ApolloClient from 'apollo-client';
import { split } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { setContext } from 'apollo-link-context';
import { onError } from 'apollo-link-error';
import { getMainDefinition } from 'apollo-utilities';
import { InMemoryCache } from 'apollo-cache-inmemory';
import jwtDecode from 'jwt-decode';
import { toast } from 'react-toastify';
import { GET_LOCAL_CONTEXT } from './queries';
import { getItem, setItem, removeItem } from '../utils/storage';

const cache = new InMemoryCache();

const httpLink = new HttpLink({
    uri: process.env.REACT_APP_GRAPHQL_URL
});

const wsLink = new WebSocketLink({
    uri: process.env.REACT_APP_GRAPHQL_WS,
    options: {
        reconnect: true,
        connectionParams: () => ({
            authorization: getToken()
        })
    }
});

const authLink = setContext(() => ({
    headers: {
        authorization: getToken()
    }
}));

const link = split(
    ({ query }) => {
        const { kind, operation } = getMainDefinition(query);
        return kind === 'OperationDefinition' && operation === 'subscription';
    },
    wsLink,
    httpLink
);

const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
        for (const graphQLError of graphQLErrors || []) {
            switch (graphQLError.extensions.code) {
                case 'BAD_USER_INPUT':
                    toast.error(graphQLError.message);
                    break;

                case 'UNAUTHENTICATED':
                    removeToken();
                    break;

                case 'FORBIDDEN':
                    toast.warn(graphQLError.message);
                    break;

                default:
                    toast.error(
                        graphQLError.message ||
                            'An unknown error has occurred whilst communicating with the server.'
                    );

                    break;
            }
        }
    }

    if (networkError) {
        toast.error(
            'An unknown error has occurred whilst communicating with the server.'
        );
    }
});

const getToken = () => {
    const { accessToken } = cache.readQuery({ query: GET_LOCAL_CONTEXT });
    return accessToken ? `Bearer ${accessToken}` : '';
};

export const setToken = (accessToken, persist) => {
    setItem('accessToken', accessToken, persist);
    client.resetStore();
};

export const removeToken = () => {
    removeItem('accessToken');
    client.resetStore();
};

const onResetStore = () => {
    const accessToken = getItem('accessToken');
    if (accessToken) {
        const decodedToken = jwtDecode(accessToken);

        cache.writeData({
            data: {
                accessToken,
                currentUser: {
                    __typename: 'DecodedToken',
                    ...decodedToken
                }
            }
        });
    } else {
        cache.writeData({
            data: {
                accessToken: null,
                currentUser: null
            }
        });
    }

    wsLink.subscriptionClient.close(false, false);
};

onResetStore();

export const client = new ApolloClient({
    link: authLink.concat(errorLink).concat(link),
    cache,
    resolvers: {}
});

client.onResetStore(onResetStore);
