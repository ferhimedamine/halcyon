const { sign, verify } = require('jsonwebtoken');
const config = require('./config');

module.exports.verifyToken = async token => {
    let result = undefined;

    try {
        result = verify(token, config.JWT_SECURITYKEY, {
            issuer: config.JWT_ISSUER,
            audience: config.JWT_AUDIENCE
        });
    } catch (error) {
        // ignore errors
    }

    return result;
};

module.exports.generateToken = user => {
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
