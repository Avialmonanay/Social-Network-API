const router = require('express').Router();
const { User } = require('../../models')

router.get('/', (req, res) => {
    User.find({}, (err, result) => {
        if (result) {
            res.status(200).json(result);
        } else {
            console.log('Uh Oh, something went wrong');
            res.status(500).json({ message: 'something went wrong' })
        }
    })
})

router.get('/:id', (req, res) => {
    User.findOne({ _id: req.params.id }, (err, result) => {
        if (result) {
            res.status(200).json(result);
        } else {
            console.log('Uh Oh, something went wrong');
            res.status(500).json({ message: 'something went wrong' })
        }
    })
})

router.post('/', (req, res) => {
    const newUser = new User({ username: req.body.username, email: req.body.email })
    newUser.save();
    if (newUser) {
        res.status(200).json(newUser)
    } else {
        console.log('Uh Oh, something went wrong');
        res.status(500).json({ message: 'something went wrong' });
    }
})

router.put('/:id', (req, res) => {
    User.findOneAndUpdate(
        { _id: req.params.id },
        {
            username: req.body.username,
            email: req.body.email
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

router.delete('/:id', (req, res) => {
    User.findOneAndDelete({ _id: req.params.id }, (err, result) => {
        if (result) {
            res.status(200).json(result);
            console.log(`Deleted: ${result}`);
        } else {
            console.log('Uh Oh, something went wrong');
            res.status(500).json({ message: 'something went wrong' });
        }
    })
})

// begin friend change routes

router.post('/:id/friends/:friendId', (req, res) => {
    User.findOneandUpdate(
        { _id: req.params.id },
        { $addToSet: { friends: req.params.friendId } },
        { new: true },
        (err, result) => {
            if (result) {
                res.status(200).json(result),
                    console.log(`Updated: ${result}`)
            } else {
                console.log('Uh Oh, something went wrong');
                res.status(500).json({ message: 'something went wrong' });
            }
        }
    )
})

router.delete('/:id/friends/:friendId', (req, res) => {
    User.findOneandUpdate(
        { _id: req.params.id },
        { $pull: { friends: req.params.friendId } },
        { new: true },
        (err, result) => {
            if (result) {
                res.status(200).json(result),
                    console.log(`Updated: ${result}`)
            } else {
                console.log('Uh Oh, something went wrong');
                res.status(500).json({ message: 'something went wrong' });
            }
        }
    )
})
module.exports = router;