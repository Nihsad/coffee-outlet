const router = require('express').Router();
const { Feedback } = require('../../models');
const withAuth = require('../../utils/auth');

// This route is for creating a new feedback - endpoint: /localhost:3001/api/feedbacks/id
router.post('/:id', withAuth, async (req, res) => {
    console.log(req.body);
    try {
        const currentDate = new Date();
        const newFeedback = await Feedback.create({
            description: req.body.description,
            date: currentDate,
            user_id: req.session.user_id,
            coffee_shop_id: req.params.id,
        });

        res.status(200).json(newFeedback);
        console.log(newFeedback);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.get('/addfeedback', withAuth, async (req, res) => {
    res.render('addfeedback', {
        loggedIn: req.session.loggedIn,
    });
});

module.exports = router;