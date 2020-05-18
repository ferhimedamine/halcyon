import React, { useContext } from 'react';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import { Container, Jumbotron, Button } from 'reactstrap';
import { AuthContext } from '../providers/AuthProvider';
import { PublicRoute, PublicRouteProps } from './PublicRoute';
import { isAuthorized } from '../../utils/auth';

const AccessDenied: React.FC = () => (
    <Jumbotron>
        <Container>
            <h1 className="display-3">Access Denied</h1>
            <hr />
            <p className="lead">
                Sorry, you do not have access to this resource.
            </p>

            <p className="text-right">
                <Button to="/" color="primary" size="lg" tag={Link}>
                    Home
                </Button>
            </p>
        </Container>
    </Jumbotron>
);

export interface PrivateRouteProps extends PublicRouteProps {
    requiredRoles?: string[];
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({
    component: PrivateComponent,
    requiredRoles,
    ...rest
}) => {
    const { currentUser } = useContext(AuthContext);

    if (!isAuthorized(currentUser)) {
        return <Redirect to="/login" />;
    }

    if (!isAuthorized(currentUser, requiredRoles)) {
        return <PublicRoute title="Access Denied" component={AccessDenied} />;
    }

    return <PublicRoute component={PrivateComponent} {...rest} />;
};
