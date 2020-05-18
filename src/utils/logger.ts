import { ErrorInfo } from 'react';
import * as Sentry from '@sentry/browser';
import config from './config';
import { DecodedToken } from '../components';

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
