const router = require('express').Router();
const { User, Feedback, CoffeeShop } = require('../models');
const withAuth = require('../utils/auth');

// GET all Feedbacks for homepage
router.get('/', async (req, res) => {
  try {
    const coffeeShopData = await CoffeeShop.findAll({
      // include: [
        // {
        //   model: User,
        //   attributes: ['username'],
        // },
        // {
        //   model: Feedback,
        //   attributes: ['description', 'created_on', 'user_id', 'coffee_shop_id'],
        //   include: {
        //     model: User,
        //     attributes: ['username'],
        //   }
        // },
      // ],
    });
    // console.log(coffeeShopData);
    // Define the `Feedbacks` variable here
    const coffeeshops = coffeeShopData.map((coffeeshop) => coffeeshop.get({ plain: true }));
    // console.log(coffeeshops);
    // Render the homepage with Feedbacks
    res.render('homepage', {
      coffeeshops,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.log(err);
    // Handle the error
    res.status(500).json(err);
    // next(err);
  }
});


//Login route
router.get('/login', (req, res, next) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }
  next();
}, (req, res) => {
  res.render('login');
});

//Signup/registration route
router.get('/signup', (req, res, next) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }
  next();
}, (req, res) => {
  res.render('signup');
});

// Error handling middleware
router.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send('Something went wrong');
});

module.exports = router;