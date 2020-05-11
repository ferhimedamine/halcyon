import React, { useState } from 'react';
import jwtDecode from 'jwt-decode';
import { getItem, setItem, removeItem } from '../../utils/storage';
import { setUserContext } from '../../utils/logger';

export const AuthContext = React.createContext({});

const getInitialState = () => {
    const accessToken = getItem('accessToken');
    if (!accessToken) {
        return {
            accessToken: undefined,
            currentUser: undefined
        };
    }

    const currentUser = jwtDecode(accessToken);
    setUserContext(currentUser);

    return {
        accessToken,
        currentUser
    };
};

export const AuthProvider = ({ children }) => {
    const initialState = getInitialState();

    const [state, setState] = useState(initialState);

    const setToken = (accessToken, persist) => {
        setItem('accessToken', accessToken, persist);

        const currentUser = jwtDecode(accessToken);
        setUserContext(currentUser);

        setState({
            ...state,
            accessToken,
            currentUser
        });
    };

    const removeToken = () => {
        removeItem('accessToken');

        setUserContext(undefined);

        setState({
            ...state,
            accessToken: undefined,
            currentUser: undefined
        });
    };

    const setSocketId = socketId => {
        setState({
            ...state,
            socketId
        });
    };

    return (
        <AuthContext.Provider
            value={{ ...state, setToken, removeToken, setSocketId }}
        >
            {children}
        </AuthContext.Provider>
    );
};
