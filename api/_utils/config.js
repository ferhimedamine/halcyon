module.exports = {
    FAUNADB_SECRET: process.env.FAUNADB_SECRET,
    JWT_SECURITYKEY: process.env.JWT_SECURITYKEY || 'change-me',
    JWT_ISSUER: process.env.JWT_ISSUER || 'HalcyonApi',
    JWT_AUDIENCE: process.env.JWT_AUDIENCE || 'HalcyonClient',
    MAILGUN_DOMAIN: process.env.MAILGUN_DOMAIN,
    MAILGUN_APIKEY: process.env.MAILGUN_APIKEY,
    MAILGUN_NOREPLY: process.env.MAILGUN_NOREPLY || 'noreply@chrispoulter.com',
    SEED_EMAILADDRESS: process.env.SEED_EMAILADDRESS,
    SEED_PASSWORD: process.env.SEED_PASSWORD,
    PUSHER_APPKEY: process.env.PUSHER_APPKEY,
    PUSHER_APPID: process.env.PUSHER_APPID,
    PUSHER_SECRET: process.env.PUSHER_SECRET,
    PUSHER_CLUSTER: process.env.PUSHER_CLUSTER,
    SENTRY_DSN: process.env.SENTRY_DSN,
    SENTRY_ENVIRONMENT: process.env.SENTRY_ENVIRONMENT
};
