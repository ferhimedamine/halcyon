import ApolloClient, { InMemoryCache } from 'apollo-boost';
import jwtDecode from 'jwt-decode';
import { toast } from 'react-toastify';
import { GET_LOCAL_CONTEXT } from './queries';
import { getItem, setItem, removeItem } from '../utils/storage';
import { setUserContext } from '../utils/logger';
import config from '../utils/config';

const cache = new InMemoryCache();

const request = operation => {
    operation.setContext({
        headers: {
            authorization: getToken()
        }
    });
};

const onError = ({ graphQLErrors, networkError }) => {
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
};

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

export const setSocketId = (setSocketId) => {
    cache.writeData({
        data: {
            setSocketId
        }
    });
};

export const removeSocketId = () => {
    cache.writeData({
        data: {
            setSocketId: null
        }
    });
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

        setUserContext(decodedToken);
    } else {
        cache.writeData({
            data: {
                accessToken: null,
                currentUser: null
            }
        });

        setUserContext(undefined);
    }
};

onResetStore();

export const client = new ApolloClient({
    uri: config.GRAPHQL_URL,
    request,
    onError,
    cache,
    resolvers: {}
});

client.onResetStore(onResetStore);
