//controller handles all of the different functions for managing thoughts in the mongoDb.

const { User } = require('../models')

//export all thought functions to be used in the routes folder.
module.exports = {

//gets all users     
getAllUsers(req, res) {
    User.find({}, (err, result) => {
        if (result) {
            res.status(200).json(result);
        } else {
            console.log('Uh Oh, something went wrong');
            res.status(500).json({ message: 'something went wrong' })
        }
    })
},

//gets a single user by ID provided in the API Request Params
getSingleUser (req, res) {
    User.findOne({ _id: req.params.id }, (err, result) => {
        if (result) {
            res.status(200).json(result);
        } else {
            console.log('Uh Oh, something went wrong');
            res.status(500).json({ message: 'something went wrong' })
        }
    })
},

//adds a new user
addUser(req, res) {
    const newUser = new User({ username: req.body.username, email: req.body.email })
    newUser.save();
    if (newUser) {
        res.status(200).json(newUser._id)
    } else {
        console.log('Uh Oh, something went wrong');
        res.status(500).json({ message: 'something went wrong' });
    }
},

//updates a single user by ID provided in the API Request Params and Json fields in the Request Body
updateUser(req, res) {
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
},

//deletes a single user by ID provided in the API Request Params
deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.id }, (err, result) => {
        if (result) {
            res.status(200).json(result);
            console.log(`Deleted: ${result}`);
        } else {
            console.log('Uh Oh, something went wrong');
            res.status(500).json({ message: 'something went wrong' });
        }
    })
},


//Adds a friend to a user by ID's provided in the Request Params
addFriend(req, res) {
    User.findOneAndUpdate(
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
},

//deletes a single friend on a user by ID's provided in the Request Params
deleteFriend (req, res) {
    User.findOneAndUpdate(
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
},
}