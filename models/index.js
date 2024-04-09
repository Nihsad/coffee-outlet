const User = require('./User');
const CoffeeShop = require('./CoffeeShop');
const Feedback = require('./Feedback');

User.hasMany(Feedback, {
    foreignKey: 'user_id',
    // Set to CASCADE so that when a User is deleted, all associated Feedbacks are deleted as well
    onDelete: 'CASCADE'
});

User.hasMany(CoffeeShop, {
    foreignKey: 'user_id',
    // Set to CASCADE so that when a User is deleted, all associated CoffeeShops are deleted as well
    onDelete: 'CASCADE'
});

Feedback.belongsTo(User, {
    foreignKey: 'user_id'
});

CoffeeShop.belongsTo(User, {
    foreignKey: 'user_id'
});

CoffeeShop.hasMany(Feedback, {
    foreignKey: 'coffee_shop_id',
    // Set to CASCADE so that when a CoffeeShop is deleted, all associated Feedbacks are deleted as well
    onDelete: 'CASCADE'
});

Feedback.belongsTo(CoffeeShop, {
    foreignKey: 'coffee_shop_id'
});

//Testing commits

module.exports = { User, CoffeeShop, Feedback };