module.exports.base64Encode = obj =>
    Buffer.from(JSON.stringify(obj), 'utf8').toString('base64');

module.exports.base64Decode = str => {
    if (!str) {
        return undefined;
    }

    try {
        return JSON.parse(Buffer.from(str, 'base64').toString('utf8'));
    } catch (error) {
        // ignore errors
        return undefined;
    }
};
