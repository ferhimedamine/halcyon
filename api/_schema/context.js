const { AuthenticationError, ForbiddenError } = require('apollo-server');
const { verifyToken } = require('../_utils/jwt');
const { isAuthorized } = require('../_utils/auth');

module.exports.context = async ({ req }) => {
    const { headers } = req;
    const authHeader = headers.authorization || headers.Authorization || '';
    const socketId = headers.socket || headers.Socket || '';

    const token = authHeader.replace(/bearer /giu, '');
    if (!token) {
        return { socketId };
    }

    const payload = await verifyToken(token);
    return {
        payload,
        socketId
    };
};

module.exports.isAuthenticated = (resolverFn, requiredRoles) => (
    parent,
    args,
    context,
    info
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
