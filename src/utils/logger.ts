import { ErrorInfo } from 'react';
import * as Sentry from '@sentry/browser';
import { DecodedToken } from './auth';
import config from './config';

export const initializeLogger = () =>
    Sentry.init({
        dsn: config.SENTRY_DSN,
        environment: config.SENTRY_ENVIRONMENT
    });

export const setUserContext = (user: DecodedToken | null) =>
    Sentry.setUser(user);

export const captureException = (error: Error, errorInfo?: ErrorInfo) => {
    console.error(error, errorInfo);

    Sentry.withScope(scope => {
        errorInfo && scope.setExtras(errorInfo);
        Sentry.captureException(error);
    });
};

export const showReportDialog = () => Sentry.showReportDialog();
