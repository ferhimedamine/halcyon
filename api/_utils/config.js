module.exports = {
    MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/halcyon',
    JWT_SECURITYKEY: process.env.JWT_SECURITYKEY || 'change-me',
    JWT_ISSUER: process.env.JWT_ISSUER || 'HalcyonApi',
    JWT_AUDIENCE: process.env.JWT_AUDIENCE || 'HalcyonClient',
    SMTP_HOST: process.env.SMTP_HOST || 'smtp.mailgun.org',
    SMTP_PORT: parseInt(process.env.SMTP_PORT || '587'),
    SMTP_USERNAME: process.env.SMTP_USERNAME,
    SMTP_PASSWORD: process.env.SMTP_PASSWORD,
    SMTP_NOREPLY: process.env.SMTP_NOREPLY || 'noreply@chrispoulter.com',
    SEED_EMAILADDRESS: process.env.SEED_EMAILADDRESS,
    SEED_PASSWORD: process.env.SEED_PASSWORD,
    SENTRY_DSN: process.env.SENTRY_DSN,
    SENTRY_ENVIRONMENT: process.env.SENTRY_ENVIRONMENT
};
