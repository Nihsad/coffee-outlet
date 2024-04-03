const User = require('./User');
const CoffeeShop = require('./CoffeeShop');
const Review = require('./Review');

User.hasMany(Review, {
    foreignKey: 'user_id',
    // Set to CASCADE so that when a User is deleted, all associated Reviews are deleted as well
    onDelete: 'CASCADE'
});

Review.belongsTo(User, {
    foreignKey: 'user_id'
});

CoffeeShop.hasMany(Review, {
    foreignKey: 'coffee_shop_id',
    // Set to CASCADE so that when a CoffeeShop is deleted, all associated Reviews are deleted as well
    onDelete: 'CASCADE'
});

Review.belongsTo(CoffeeShop, {
    foreignKey: 'coffee_shop_id'
});

module.exports = { User, CoffeeShop, Review };