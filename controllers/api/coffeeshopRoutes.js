const router = require('express').Router();
const { CoffeeShop } = require('../../models');
const withAuth = require('../../utils/auth');

// // This route is for getting all coffee shops - endpoint: /localhost:3001/api/coffeeshops --TESTED CHECK!
// router.get('/', async (req, res) => {
//     try {
//         const coffeeShopData = await CoffeeShop.findAll();
//         res.status(200).json(coffeeShopData);
//     } catch (err) {
//         res.status(500).json(err);
//     }
// });

// This route is for getting the coffeeshops of a specific city 
// endpoint: /localhost:3001/api/coffeeshops/city/:city
router.get('/city/:city', async (req, res) => {
    try {
        const coffeeshops = await CoffeeShop.findAll({
            where: {
                city: req.params.city,
            },
        });
        console.log(coffeeshops);
        const coffeeShopPlain = coffeeshops.map(coffeeshop => coffeeshop.toJSON());
        // const coffeeShops = coffeeShopData.map((coffeeShop) => coffeeShop.get({ plain: true }));
        // res.status(200).json(coffeeShopData);
        console.log(coffeeShopPlain);
        res.render('city', {
            coffeeshops: coffeeShopPlain,
            // logged_in: req.session.logged_in,
        });
        // console.log(...coffeeshops)
    } catch (err) {
        res.status(500).json(err);
    }
});

// This route is for creating a new coffee shop - endpoint: /localhost:3001/api/coffeeshops --TESTED CHECK!
router.post('/', withAuth, async (req, res) => {
    try {
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

module.exports = router;