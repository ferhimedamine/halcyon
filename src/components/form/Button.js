import React from 'react';
import { Button as ReactstrapButton, Spinner } from 'reactstrap';

export const Button = ({ loading, disabled, children, ...rest }) => {
    return (
        <ReactstrapButton disabled={loading || disabled} {...rest}>
            {loading ? (
                <>
                    <Spinner type="grow" size="sm" />
                    <Spinner type="grow" size="sm" />
                    <Spinner type="grow" size="sm" />
                </>
            ) : (
                children
            )}
        </ReactstrapButton>
    );
};
