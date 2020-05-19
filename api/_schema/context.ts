import { AuthenticationError, ForbiddenError } from 'apollo-server';
import { ContextFunction } from 'apollo-server-core';
import { IncomingMessage } from 'http';
import { ResolverFn } from './gen-types';
import { verifyToken } from '../_utils/jwt';
import { isAuthorized, DecodedToken } from '../_utils/auth';

export interface RequestContext {
    req: IncomingMessage;
}

export interface Context {
    payload?: DecodedToken;
}

export const context: ContextFunction<RequestContext, Context> = async ({
    req
}) => {
    const authHeader = req.headers.authorization || '';

    const token = authHeader.replace(/bearer /giu, '');
    if (!token) {
        return {};
    }

    const payload = await verifyToken(token);
    return {
        payload
    };
};

export const isAuthenticated = <
    TResult,
    TParent,
    TContext extends Context,
    TArgs
>(
    resolverFn: ResolverFn<TResult, TParent, TContext, TArgs>,
    requiredRoles?: string[]
): ResolverFn<TResult, TParent, TContext, TArgs> => (
    parent: TParent,
    args: TArgs,
    context: TContext,
    info: any
) => {
    const { payload } = context;

    if (!payload) {
        throw new AuthenticationError('The token provided was invalid.');
    }

    const authorized = isAuthorized(payload, requiredRoles);
    if (!authorized) {
        throw new ForbiddenError(
            'You are not authorized to view this resource.'
        );
    }

    return resolverFn(parent, args, context, info);
};
