import * as Sentry from '@sentry/node';
import { PluginDefinition } from 'apollo-server-core';
import { config } from './config';

export const captureException = (error: Error) => {
    console.error(error);
    Sentry.captureException(error);
};

export const loggerPlugin: PluginDefinition = {
    serverWillStart() {
        Sentry.init({
            dsn: config.SENTRY_DSN,
            environment: config.SENTRY_ENVIRONMENT
        });
    },
    requestDidStart() {
        return {
            async didEncounterErrors(requestContext) {
                Sentry.withScope(scope => {
                    scope.setUser(requestContext.context.payload);

                    scope.setExtras({
                        operation: requestContext.operation,
                        operationName: requestContext.operationName,
                        request: requestContext.request,
                        response: requestContext.response,
                        source: requestContext.source
                    });

                    for (const error of requestContext.errors) {
                        Sentry.captureException(error);
                    }
                });

                await Sentry.flush(2000);
            }
        };
    }
};
