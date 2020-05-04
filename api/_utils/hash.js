const bcrypt = require('bcryptjs');

module.exports.generateHash = str => bcrypt.hash(str, 10);

module.exports.verifyHash = (str, hashedString) =>
    bcrypt.compare(str, hashedString);
