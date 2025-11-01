const { users } = require('../data');

exports.findByEmail = (email) => users.find(u => u.email === email);
exports.findById = (id) => users.find(u => u.id === id);
exports.create = (user) => users.push(user);
exports.addFavorite = (userId, dishId) => {
  const user = exports.findById(userId);
  if (user && !user.favorites.includes(dishId)) {
    user.favorites.push(dishId);
  }
};
exports.getFavorites = (userId) => {
  const user = exports.findById(userId);
  return user ? user.favorites : [];
};
