const router = require('express').Router();
const { User, Feedback, CoffeeShop } = require('../models');
const { sendSignUpEmail } = require('../public/js/sendMail');
const withAuth = require('../utils/auth');

// GET homepage
router.get('/', async (req, res) => {
  res.render('homepage', {
    loggedIn: req.session.loggedIn,
  });
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
  res.render('login');
});

//Signup/registration route
router.get('/signup', (req, res) => {
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

router.get('/addCoffeeshop', withAuth, async (req, res) => {
  res.render('addCoffeeshop', {
    loggedIn: req.session.loggedIn,
  });
});

router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Feedback }, { model: CoffeeShop }],
    });

    const user = userData.get({ plain: true });
    console.log(user);
    res.render('profile', {
      ...user,
      loggedIn: true
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// Error handling middleware
router.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send('Something went wrong');
});

module.exports = router;