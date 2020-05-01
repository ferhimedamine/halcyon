import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Container
} from 'reactstrap';
import { removeToken, GET_LOCAL_CONTEXT } from '../../graphql';
import { isAuthorized, USER_ADMINISTRATOR } from '../../utils/auth';

export const Header = () => {
    const history = useHistory();
    const [isOpen, setIsOpen] = useState(false);
    const { data } = useQuery(GET_LOCAL_CONTEXT);

    useEffect(() => {
        const listen = history.listen(() => setIsOpen(false));
        return () => listen();
    }, [history]);

    const isAuthenticated = isAuthorized(data?.currentUser);
    const isUserAdmin = isAuthorized(data?.currentUser, USER_ADMINISTRATOR);

    const logout = () => {
        removeToken();
        history.push('/');
    };

    const toggle = () => setIsOpen(!isOpen);

    return (
        <header>
            <Navbar color="dark" dark expand="md" fixed="top">
                <Container>
                    <NavbarBrand to="/" tag={Link}>
                        Halcyon
                    </NavbarBrand>
                    <NavbarToggler onClick={toggle} />
                    <Collapse isOpen={isOpen} navbar>
                        <Nav navbar>
                            {isUserAdmin && (
                                <NavItem>
                                    <NavLink to="/user" tag={Link}>
                                        Users
                                    </NavLink>
                                </NavItem>
                            )}
                        </Nav>

                        <Nav navbar className="ml-auto">
                            {isAuthenticated ? (
                                <UncontrolledDropdown nav inNavbar>
                                    <DropdownToggle nav caret>
                                        {data.currentUser.given_name}{' '}
                                        {data.currentUser.family_name}{' '}
                                    </DropdownToggle>
                                    <DropdownMenu right>
                                        <DropdownItem
                                            to="/my-account"
                                            tag={Link}
                                        >
                                            My Account
                                        </DropdownItem>
                                        <DropdownItem onClick={logout}>
                                            Logout
                                        </DropdownItem>
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                            ) : (
                                <>
                                    <NavItem>
                                        <NavLink to="/login" tag={Link}>
                                            Login
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink to="/register" tag={Link}>
                                            Register
                                        </NavLink>
                                    </NavItem>
                                </>
                            )}
                        </Nav>
                    </Collapse>
                </Container>
            </Navbar>
        </header>
    );
};
