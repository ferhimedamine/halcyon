export interface DecodedToken {
    sub: string;
    given_name: string;
    family_name: string;
    role: string | string[];
}

export const USER_ADMINISTRATOR = [
    'System Administrator',
    'User Administrator'
];

export const isAuthorized = (user?: DecodedToken, requiredRoles?: string[]) => {
    if (!user) {
        return false;
    }

    if (!requiredRoles) {
        return true;
    }

    if (!user.role) {
        return false;
    }

    const userRoles = user.role || [];
    if (!requiredRoles.some(value => userRoles.includes(value))) {
        return false;
    }

    return true;
};
