import React from 'react';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { GET_LOCAL_CONTEXT } from '../../graphql';
import { isAuthorized } from '../../utils/auth';
import { Container, Jumbotron, Button } from 'reactstrap';
import { PublicRoute } from './PublicRoute';

export const PrivateRoute = ({
    component: PrivateComponent,
    requiredRoles,
    ...rest
}) => {
    const { data } = useQuery(GET_LOCAL_CONTEXT);

    if (!isAuthorized(data?.currentUser)) {
        return <Redirect to="/login" />;
    }

    if (!isAuthorized(data?.currentUser, requiredRoles)) {
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
