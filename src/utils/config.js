export default {
    GRAPHQL_URL: process.env.REACT_APP_GRAPHQL_URL || '/api',
    GRAPHQL_WS: process.env.REACT_APP_GRAPHQL_WS || 'ws://localhost:3000/api',
    SENTRY_DSN: process.env.REACT_APP_SENTRY_DSN,
    SENTRY_ENVIRONMENT: process.env.REACT_APP_SENTRY_ENVIRONMENT
};
