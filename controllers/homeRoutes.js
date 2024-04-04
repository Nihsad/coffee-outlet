const router = require('express').Router();
const { User, Feedback, CoffeeShop } = require('../models');
const withAuth = require('../utils/auth');

// GET all Feedbacks for homepage
router.get('/', async (req, res, next) => {
  try {
    const FeedbackData = await Feedback.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
        {
          model: CoffeeShop,
          attributes: ['name'],
        },
      ],
    });

    // Define the `Feedbacks` variable here
    const Feedbacks = FeedbackData.map((Feedback) => Feedback.get({ plain: true }));

    // Render the homepage with Feedbacks
    res.render('homepage', {
      Feedbacks,
      // logged_in: req.session.logged_in,
    });
  } catch (err) {
    // Handle the error
    next(err);
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