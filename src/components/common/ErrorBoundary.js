import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Jumbotron, Button } from 'reactstrap';
import { captureException, showReportDialog } from '../../utils/logger';

export class ErrorBoundary extends React.Component {
    state = { hasError: false };

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        captureException(error, errorInfo);
    }

    render() {
        if (!this.state.hasError) {
            return this.props.children;
        }

        return (
            <Jumbotron>
                <Container>
                    <h1 className="display-3">Error</h1>
                    <hr />
                    <p className="lead">
                        Sorry, something went wrong. Please try again later.
                    </p>

                    <p className="text-right">
                        <Button
                            to="/"
                            color="danger"
                            size="lg"
                            className="mr-1"
                            onClick={() => showReportDialog()}
                        >
                            Report Feedback
                        </Button>
                        <Button to="/" color="primary" size="lg" tag={Link}>
                            Home
                        </Button>
                    </p>
                </Container>
            </Jumbotron>
        );
    }
}
