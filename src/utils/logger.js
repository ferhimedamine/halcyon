import * as Sentry from '@sentry/browser';
import config from './config';

export const initializeLogger = () =>
    Sentry.init({
        dsn: config.SENTRY_DSN,
        environment: config.SENTRY_ENVIRONMENT
    });

export const setUserContext = user => Sentry.setUser(user);

export const captureException = (error, errorInfo) => {
    console.error(error, errorInfo);

    Sentry.withScope(scope => {
        scope.setExtras(errorInfo);
        Sentry.captureException(error);
    });
};

export const showReportDialog = () => Sentry.showReportDialog();
