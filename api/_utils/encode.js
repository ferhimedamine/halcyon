module.exports.base64Encode = obj =>
    Buffer.from(JSON.stringify(obj), 'utf8').toString('base64');

module.exports.base64Decode = str =>
    JSON.parse(Buffer.from(str, 'base64').toString('utf8'));
