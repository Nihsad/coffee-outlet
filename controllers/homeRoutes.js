const router = require('express').Router();
const { User, Review, CoffeeShop } = require('../models');
// const withAuth = require('../utils/auth');

// GET all reviews for homepage
router.get('/', async (req, res) => {
  try {
    const reviewData = await Review.findAll({
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

    const reviews = reviewData.map((review) => review.get({ plain: true }));

    res.render('homepage', {
      reviews,
      // logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;