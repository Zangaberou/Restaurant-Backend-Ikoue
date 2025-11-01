const { z } = require('zod');

const users = z.string();
const dishes = z.string();

module.exports = { users, dishes };