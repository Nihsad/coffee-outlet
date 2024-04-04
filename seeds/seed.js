const sequelize = require('../config/connection');
const { User, CoffeeShop, Feedback } = require('../models');

const userData = require('./userData.json');
const coffeeShopData = require('./coffeeShopData.json');
const feedbackData = require('./feedbackData.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    });

    await CoffeeShop.bulkCreate(coffeeShopData);

    await Feedback.bulkCreate(feedbackData);

    process.exit(0);
};

seedDatabase();