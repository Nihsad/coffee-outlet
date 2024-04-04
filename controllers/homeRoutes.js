const router = require('express').Router();
const { User, Feedback, CoffeeShop } = require('../models');
// const withAuth = require('../utils/auth');

// GET all Feedbacks for homepage
router.get('/', async (req, res) => {
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

    const Feedbacks = FeedbackData.map((Feedback) => Feedback.get({ plain: true }));

    res.render('homepage', {
      Feedbacks,
      // logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;