const { dishes } = require('../data');

exports.create = (dish) => dishes.push(dish);
exports.findById = (id) => dishes.find(d => d.id === id);
exports.findAll = () => dishes;
exports.findManyByIds = (ids) => dishes.filter(d => ids.includes(d.id));
