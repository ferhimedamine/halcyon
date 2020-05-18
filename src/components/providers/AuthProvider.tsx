import React, { useState } from 'react';
import jwtDecode from 'jwt-decode';
import { getItem, setItem, removeItem } from '../../utils/storage';
import { DecodedToken } from '../../utils/auth';
import { setUserContext } from '../../utils/logger';

export interface AuthProviderState {
    accessToken?: string;
    currentUser?: DecodedToken;
}

export interface AuthContext extends AuthProviderState {
    setToken: (token: string, persist?: boolean) => void;
    removeToken: () => void;
}

export const AuthContext = React.createContext<AuthContext>({
    accessToken: undefined,
    currentUser: undefined,
    setToken: () => {},
    removeToken: () => {}
});

const getInitialState = (): AuthProviderState => {
    const accessToken = getItem('accessToken');
    if (!accessToken) {
        return {
            accessToken: undefined,
            currentUser: undefined
        };
    }

    const currentUser = jwtDecode<DecodedToken>(accessToken);
    setUserContext(currentUser);

    return {
        accessToken,
        currentUser
    };
};

export const AuthProvider: React.FC = ({ children }) => {
    const initialState = getInitialState();

    const [state, setState] = useState<AuthProviderState>(initialState);

    const setToken = (accessToken: string, persist?: boolean) => {
        setItem('accessToken', accessToken, persist);

        const currentUser = jwtDecode<DecodedToken>(accessToken);
        setUserContext(currentUser);

        setState({
            accessToken,
            currentUser
        });
    };

    const removeToken = () => {
        removeItem('accessToken');

        setUserContext(null);

        setState({
            accessToken: undefined,
            currentUser: undefined
        });
    };

    return (
        <AuthContext.Provider value={{ ...state, setToken, removeToken }}>
            {children}
        </AuthContext.Provider>
    );
};
