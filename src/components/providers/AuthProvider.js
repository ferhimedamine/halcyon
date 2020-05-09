import React, { useState } from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient, { InMemoryCache } from 'apollo-boost';
import jwtDecode from 'jwt-decode';
import { toast } from 'react-toastify';
import { getItem, setItem, removeItem } from '../../utils/storage';
import { setUserContext } from '../../utils/logger';
import config from '../../utils/config';

export const AuthContext = React.createContext({});

const getInitialState = () => {
    const accessToken = getItem('accessToken');
    if (!accessToken) {
        return {
            accessToken: undefined,
            currentUser: undefined
        };
    }

    return {
        accessToken,
        currentUser: jwtDecode(accessToken)
    };
};

export const AuthProvider = ({ children }) => {
    const initialState = getInitialState();

    const [state, setState] = useState(initialState);

    const cache = new InMemoryCache();

    const setToken = (accessToken, persist) => {
        const currentUser = jwtDecode(accessToken);

        setItem('accessToken', accessToken, persist);

        setUserContext(currentUser);

        setState({
            accessToken,
            currentUser
        });
    };

    const removeToken = () => {
        removeItem('accessToken');

        setUserContext(undefined);

        setState({
            accessToken: undefined,
            currentUser: undefined
        });
    };

    const client = new ApolloClient({
        uri: config.GRAPHQL_URL,
        cache,
        resolvers: {},
        request: operation =>
            operation.setContext({
                headers: {
                    authorization: state.accessToken
                        ? `Bearer ${state.accessToken}`
                        : ''
                }
            }),
        onError: ({ graphQLErrors, networkError }) => {
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
        }
    });

    console.log('NEW CLIENT', state);

    return (
        <AuthContext.Provider value={{ ...state, setToken, removeToken }}>
            <ApolloProvider client={client}>{children}</ApolloProvider>
        </AuthContext.Provider>
    );
};
