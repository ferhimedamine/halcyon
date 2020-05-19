import { AuthenticationError, ForbiddenError } from 'apollo-server';
import { ContextFunction } from 'apollo-server-core';
import { skip } from 'graphql-resolvers';
import { verifyToken } from '../_utils/jwt';
import { isAuthorized } from '../_utils/auth';

export const context: ContextFunction = async ({ req, event }: any) => {
    const headers = (req || event).headers;
    const authHeader = headers.authorization || headers.Authorization || '';

    const token = authHeader.replace(/bearer /giu, '');
    if (!token) {
        return {};
    }

    const payload = await verifyToken(token);
    return {
        payload
    };
};

export const isAuthenticated = (requiredRoles?: string[]) => (
    _: any,
    __: any,
    { payload }: any
) => {
    if (!payload) {
        return new AuthenticationError('The token provided was invalid.');
    }

    const authorized = isAuthorized(payload, requiredRoles);
    if (!authorized) {
        return new ForbiddenError(
            'You are not authorized to view this resource.'
        );
    }

    return skip;
};
