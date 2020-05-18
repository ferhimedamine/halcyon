import React from 'react';
import {
    Button as BaseButton,
    ButtonProps as BaseButtonProps,
    Spinner
} from 'reactstrap';

export interface ButtonProps extends BaseButtonProps {
    loading?: boolean;
    disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
    loading,
    disabled,
    children,
    ...rest
}) => (
    <BaseButton disabled={loading || disabled} {...rest}>
        {loading ? (
            <>
                <Spinner type="grow" size="sm" />
                <Spinner type="grow" size="sm" />
                <Spinner type="grow" size="sm" />
            </>
        ) : (
            children
        )}
    </BaseButton>
);
