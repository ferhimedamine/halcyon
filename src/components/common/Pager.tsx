import React from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

export interface PagerProps {
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    onNextPage: () => void;
    onPreviousPage: () => void;
}

export const Pager: React.FC<PagerProps> = ({
    hasNextPage,
    hasPreviousPage,
    onNextPage,
    onPreviousPage
}) => {
    if (!hasNextPage && !hasPreviousPage) {
        return null;
    }

    return (
        <Pagination className="d-flex justify-content-center">
            {hasPreviousPage && (
                <PaginationItem>
                    <PaginationLink onClick={onPreviousPage}>
                        Previous
                    </PaginationLink>
                </PaginationItem>
            )}
            {hasNextPage && (
                <PaginationItem>
                    <PaginationLink onClick={onNextPage}>Next</PaginationLink>
                </PaginationItem>
            )}
        </Pagination>
    );
};
