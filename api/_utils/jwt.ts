import { sign, verify } from 'jsonwebtoken';
import { User } from '../_data/userRepository';
import { DecodedToken } from './auth';
import { config } from './config';

export const verifyToken = async (token: string) => {
    try {
        return verify(token, config.JWT_SECURITYKEY, {
            issuer: config.JWT_ISSUER,
            audience: config.JWT_AUDIENCE
        }) as DecodedToken;
    } catch (error) {
        // ignore errors
        return undefined;
    }
};

export const generateToken = (user: User) => {
    const payload = {
        sub: user.id,
        email: user.emailAddress,
        given_name: user.firstName,
        family_name: user.lastName,
        role: (user.roles || []).join()
    };

    const expiresIn = 3600;

    const accessToken = sign(payload, config.JWT_SECURITYKEY, {
        issuer: config.JWT_ISSUER,
        audience: config.JWT_AUDIENCE,
        expiresIn
    });

    return {
        accessToken,
        expiresIn
    };
};
