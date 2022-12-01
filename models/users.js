const { Schema, model } = require('mongoose');

//User Schema manages user thoughts and friends
const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        //custom regex expression to check for email validity.
        match: /^([a-z0-9_.-]+)@([\da-z.-]+).([a-z.]{2,6})$/
    },
    thoughts: [{
        type:Schema.Types.ObjectId,
        ref:'Thoughts'
    }],
    friends: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
},
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

//virtual to show total friend count.
userSchema
    .virtual('friendCount')
    .get(function () {
        return this.friends.length
    })

const User = model('user', userSchema);

module.exports = User;