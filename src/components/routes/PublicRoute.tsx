import React from 'react';
import { Route } from 'react-router';
import { RouteProps } from 'react-router-dom';

const siteName = 'Halcyon';
const seperator = ' // ';

export interface PublicRouteProps extends RouteProps {
    title?: string;
}

export const PublicRoute: React.FC<PublicRouteProps> = ({
    component: PublicComponent,
    title,
    ...rest
}) => {
    document.title = title ? `${title} ${seperator} ${siteName}` : siteName;
    return <Route component={PublicComponent} {...rest} />;
};
