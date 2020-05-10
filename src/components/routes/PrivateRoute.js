import React, { useContext } from 'react';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import { Container, Jumbotron, Button } from 'reactstrap';
import { AuthContext } from '../providers/AuthProvider';
import { PublicRoute } from './PublicRoute';
import { isAuthorized } from '../../utils/auth';

export const PrivateRoute = ({
    component: PrivateComponent,
    requiredRoles,
    ...rest
}) => {
    const { currentUser } = useContext(AuthContext);

    if (!isAuthorized(currentUser)) {
        return <Redirect to="/login" />;
    }

    if (!isAuthorized(currentUser, requiredRoles)) {
        return (
            <PublicRoute
                title="Access Denied"
                component={
                    <Jumbotron>
                        <Container>
                            <h1 className="display-3">Access Denied</h1>
                            <hr />
                            <p className="lead">
                                Sorry, you do not have access to this resource.
                            </p>

                            <p className="text-right">
                                <Button
                                    to="/"
                                    color="primary"
                                    size="lg"
                                    tag={Link}
                                >
                                    Home
                                </Button>
                            </p>
                        </Container>
                    </Jumbotron>
                }
            />
        );
    }

    return <PublicRoute component={PrivateComponent} {...rest} />;
};
