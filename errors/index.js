const Unautorized = require('./unautorized-error');
const Forbidden = require('./forbidden-error');
const NotFound = require('./not-found-error');
const BadRequest = require('./bad-request-error');
const Conflict = require('./conflict-error');

module.exports = {
  Unautorized,
  Forbidden,
  NotFound,
  BadRequest,
  Conflict,
};
