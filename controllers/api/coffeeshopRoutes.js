const router = require('express').Router();
const { CoffeeShop, Feedback, User } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/city/:city', async (req, res) => {
    try {
        const coffeeshops = await CoffeeShop.findAll({
            where: {
                city: req.params.city,
            },
        });
        const coffeeShopPlain = coffeeshops.map(coffeeshop => coffeeshop.toJSON());
        res.render('city', {
            coffeeshops: coffeeShopPlain,
            loggedIn: req.session.loggedIn,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// This route is for creating a new coffee shop - endpoint: /localhost:3001/api/coffeeshops --TESTED CHECK!
router.post('/addCoffeeshop', withAuth, async (req, res) => {
    try {
        const { name, picture, address, phone_number, city, price_range, latitude, longitude, website, wifi } = req.body;

        // Add validation for required fields
        if (!name || !picture || !address || !phone_number || !city || !price_range || !latitude || !longitude || !website || !wifi) {
            res.status(400).json({ message: 'Name, picture, address, phone_number, city, price_range, latitude, longitude, website, wifi are required fields!' });
            return;
        }

        const newCoffeeShop = await CoffeeShop.create({
            ...req.body,
            user_id: req.session.user_id,
        });
        res.status(200).json(newCoffeeShop);
    } catch (err) {
        res.status(400).json(err);
    }
});



// This route is for updating a coffee shop - endpoint: /localhost:3001/api/coffeeshops/:id
// TESTED CHECK!
router.put('/:id', withAuth, async (req, res) => {
    try {
        const updatedCoffeeShop = await CoffeeShop.update(req.body, {
            where: {
                id: req.params.id,
            },
        });

        if (!updatedCoffeeShop[0]) {
            res.status(404).json({ message: 'No coffee shop found with this id!' });
            return;
        }

        res.status(200).json(updatedCoffeeShop);
    } catch (err) {
        res.status(500).json(err);
    }
});

// This route is for deleting a coffee shop - endpoint: /localhost:3001/api/coffeeshops/:id
// TESTED CHECK!
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const deletedCoffeeShop = await CoffeeShop.destroy({
            where: {
                id: req.params.id,
            },
        });

        if (!deletedCoffeeShop) {
            res.status(404).json({ message: 'No coffee shop found with this id!' });
            return;
        }

        res.status(200).json(deletedCoffeeShop);
    } catch (err) {
        res.status(500).json(err);
    }
});

//get a specific coffee shop
router.get('/:id', async (req, res) => {
    try {
        const coffeeShopData = await CoffeeShop.findByPk(req.params.id, {
            include: [
                {
                    model: Feedback,
                    attributes: ['description', 'created_on', 'user_id', 'coffee_shop_id'],
                    include: {
                        model: User,
                        attributes: ['username'],
                    }
                },
            ],
        });

        if (!coffeeShopData) {
            res.status(404).json({ message: 'No coffee shop found with this id!' });
            return;
        }
        const coffeeShop = coffeeShopData.get({ plain: true });
        console.log(coffeeShop);
        res.render('coffeeshop', { 
            ...coffeeShop, 
            loggedIn: req.session.loggedIn 
        });
        console.log(coffeeShop);
        // res.status(200).json(coffeeShopData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;