const router = require('express').Router();
const { User, Thoughts } = require('../../models')

router.get('/', (req, res) => {
    Thoughts.find({}, (err, result) => {
        if (result) {
            res.status(200).json(result);
        } else {
            console.log('Uh Oh, something went wrong');
            res.status(500).json({ message: 'something went wrong' })
        }
    })
})

router.get('/:id', (req, res) => {
    Thoughts.findOne({ _id: req.params.id }, (err, result) => {
        if (result) {
            res.status(200).json(result);
        } else {
            console.log('Uh Oh, something went wrong');
            res.status(500).json({ message: 'something went wrong' })
        }
    })
})

router.post('/', (req, res) => {
    const newThought = new Thoughts({ thoughtText: req.body.thoughtText, username: req.body.username })
    newThought.save();
    if (newThought) {
        console.log(thoughtId)
        User.findOneAndUpdate(
            { _id: req.body.userId },
            { $addToSet: { thoughts: newThought._id } },
            { new: true },
            (err, result) => {
                if (result) {
                    console.log(`Updated: ${result}`);
                } else {
                    console.log(err);
                }
            }
        )
        res.status(200).json(newThought)
    } else {
        console.log('Uh Oh, something went wrong');
        res.status(500).json({ message: 'something went wrong' });
    }
})

router.put('/:id', (req, res) => {
    Thoughts.findOneAndUpdate(
        { _id: req.params.id },
        {
            thoughtText: req.body.thoughtText,
        },
        { new: true },
        (err, result) => {
            if (result) {
                res.status(200).json(result)
                console.log(`Updated: ${result}`);
            } else {
                console.log('Uh Oh, something went wrong');
                res.status(500).json({ message: 'something went wrong' });
            }
        }
    )
})

module.exports = router;