//controller handles all of the different functions for managing thoughts in the mongoDb.

const { User, Thoughts} = require('../models')


//export all thought functions to be used in the routes folder.
module.exports={

//gets all thoughts    
getAllThoughts(req, res)  {
    Thoughts.find({}, (err, result) => {
        if (result) {
            res.status(200).json(result);
        } else {
            console.log('Uh Oh, something went wrong');
            res.status(500).json({ message: 'something went wrong' })
        }
    })
},

//gets a single thought by ID provided in the API Request Params
getSingleThought(req, res) {
    Thoughts.findOne({ _id: req.params.id }, (err, result) => {
        if (result) {
            res.status(200).json(result);
        } else {
            console.log('Uh Oh, something went wrong');
            res.status(500).json({ message: 'something went wrong' })
        }
    })
},

//adds a new thought
addThought(req, res) {
    const newThought = new Thoughts({ thoughtText: req.body.thoughtText, username: req.body.username })
    newThought.save();
    if (newThought) {
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
},

//updates a single thought by ID provided in the API Request Params and Json fields in the Request Body
updateThought (req, res) {
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
},

//deletes a single thought by ID provided in the API Request Params
deleteThought(req, res) {
    //finds the thought and returns thoughtResult to get additional information.
    Thoughts.findOne({ _id: req.params.id }, (err, thoughtResult) => {

        //upon thought deletion find the associated user and remove the thought ID from the thoughts array on their document.
        User.findOneAndUpdate(
            { username: thoughtResult.username },
            { $pull: { thoughts: req.params.id }},
            { new: true },
            (err, result) => {
                if (result) {
                    console.log(`Updated: ${result}`);
                } else {
                    console.log(err);
                }
            } 
        )
    })

    //Deletes the document from the DB.
    Thoughts.findOneAndDelete({ _id: req.params.id }, (err, result) => {
        if (result) {
            res.status(200).json(result);
            console.log(`Deleted: ${result}`);
        } else {
            console.log('Uh Oh, something went wrong');
            res.status(500).json({ message: 'something went wrong' });
        }
    })
},

//Adds a reaction to a thought by ID provided in the Request Params.
addReaction(req, res) {
    Thoughts.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } },
        { runValidators: true, new: true }
      )
        .then((thoughts) =>
          !thoughts
            ? res.status(404).json({ message: 'No Thought with this id!' })
            : res.json(thoughts)
        )
        .catch((err) => res.status(500).json(err));
    
},

//deletes a single reaction by ID provided in the Request Params
deleteReaction(req, res) {
    
    Thoughts.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: {reactions: { reactionId: req.params.reactionId } } },
        { runValidators: true, new: true }
      )
        .then((thoughts) =>
        
          !thoughts
            ? res.status(404).json({ message: 'No Thought with this id!' })
            : res.json(thoughts)
        )
        .catch((err) => res.status(500).json(err));
},

}
