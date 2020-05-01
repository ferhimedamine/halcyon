import React from 'react';
import { Container, Spinner as ReactstrapSpinner } from 'reactstrap';

export const Spinner = () => (
    <Container className="spinner text-center">
        <ReactstrapSpinner type="grow" color="light" />
        <ReactstrapSpinner type="grow" color="light" />
        <ReactstrapSpinner type="grow" color="light" />
    </Container>
);
