export default {
    GRAPHQL_URL: process.env.REACT_APP_GRAPHQL_URL || '/api',
    GRAPHQL_WS: process.env.REACT_APP_GRAPHQL_WS || 'ws://localhost:3000/api',
    PUSHER_APPKEY: process.env.REACT_APP_PUSHER_APPKEY,
    PUSHER_CLUSTER: process.env.REACT_APP_PUSHER_CLUSTER,
    SENTRY_DSN: process.env.REACT_APP_SENTRY_DSN,
    SENTRY_ENVIRONMENT: process.env.REACT_APP_SENTRY_ENVIRONMENT
};
