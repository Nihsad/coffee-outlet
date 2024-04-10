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

router.put('/:id/edit', withAuth, async (req, res) => {
    try {
        const updatedFeedback = await Feedback.update(req.body, {
            where: {
                id: req.params.id,
            },
        });

        if (!updatedFeedback[0]) {
            res.status(404).json({ message: 'No feedback found with this id!' });
            return;
        }

        res.status(200).json(updatedFeedback);
    } catch (err) {
        res.status(500).json(err);
    }

});

module.exports = router;