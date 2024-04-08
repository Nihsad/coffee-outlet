const router = require('express').Router();
const { User, Feedback, CoffeeShop } = require('../models');
const { sendSignUpEmail } = require('../public/js/sendMail');
const withAuth = require('../utils/auth');

// GET homepage
router.get('/', async (req, res) => {
  // try {
  //   const coffeeShopData = await CoffeeShop.findAll({
  //     // include: [
  //       // {
  //       //   model: User,
  //       //   attributes: ['username'],
  //       // },
  //       // {
  //       //   model: Feedback,
  //       //   attributes: ['description', 'created_on', 'user_id', 'coffee_shop_id'],
  //       //   include: {
  //       //     model: User,
  //       //     attributes: ['username'],
  //       //   }
  //       // },
  //     // ],
  //   });
  //   // console.log(coffeeShopData);
  //   // Define the `Feedbacks` variable here
  //   const coffeeshops = coffeeShopData.map((coffeeshop) => coffeeshop.get({ plain: true }));
  //   // console.log(coffeeshops);
  //   // Render the homepage with Feedbacks
  //   res.render('homepage', {
  //     coffeeshops,
  //     // loggedIn: req.session.loggedIn,
  //   });
  // } catch (err) {
  //   console.log(err);
  //   // Handle the error
  //   res.status(500).json(err);
  //   // next(err);
  // }
  res.render('homepage', { loggedIn: req.session.loggedIn });
});

// BUSCAR FUNCIONALIDAD!!
router.get('/city', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const coffeeshopData = await CoffeeShop.findByPk(req.session.user_id, {
      include: [{ model: Feedback }],
    });

    const coffeeshop = coffeeshopData.get({ plain: true });

    res.render('coffeeshop', {
      ...coffeeshop,
      loggedIn: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//Login route
router.get('/login', (req, res) => {
  // if (req.session.logged_in) {
  //   res.redirect('/');
  //   return;
  // }
//   // next();
// }, 
// (req, res) => {
  res.render('login');
});

//Signup/registration route
router.get('/signup', (req, res, next) => {
//   if (req.session.loggedIn) {
//     res.redirect('/');
//     return;
//   }
//   next();
// }, async (req, res) => {
//   try {
//     res.render('signup');
//   } catch (err) {
//     console.log(err);
//     res.status(500).send('Something went wrong');
//   }
  res.render('signup');
});

router.post('/send-signup-email', async (req, res) => {
  const { email } = req.body;
  try {
    await sendSignUpEmail(email);
    res.json({ message: 'Email sent successfully' });
  } catch (err) {
    console.error('Error sending signup email:', err);
    res.status(500).json({ message: 'Error sending email' });
  }
});


// Error handling middleware
router.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send('Something went wrong');
});

module.exports = router;