const { AuthenticationError, ForbiddenError } = require('apollo-server');
const { skip } = require('graphql-resolvers');
const { verifyToken } = require('../_utils/jwt');
const { isAuthorized } = require('../_utils/auth');

module.exports.context = async ({ req, event }) => {
    const headers = (req || event).headers;
    const authHeader = headers.authorization || headers.Authorization || '';
    const socketId = headers.socket || headers.Socket || '';

    const token = authHeader.replace(/bearer /giu, '');
    if (!token) {
        return {};
    }

    const payload = await verifyToken(token);
    return {
        payload,
        socketId
    };
};

module.exports.isAuthenticated = requiredRoles => (_, __, { payload }) => {
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
