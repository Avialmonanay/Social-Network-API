const mongoose = require('mongoose');
const thoughts = require('./thoughts')

const usersSchema = new mongoose.Schema({
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
        match: /.+\@.+\..+/
    },
    thoughts: [thoughts],
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

usersSchema
    .virtual('friendCount')
    .get(function () {
        return this.friends.length
    })

const User = mongoose.model('User', usersSchema);
module.exports = User;