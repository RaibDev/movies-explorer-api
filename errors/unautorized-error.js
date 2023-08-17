module.exports = class Unautorized extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 401;
  }
};
