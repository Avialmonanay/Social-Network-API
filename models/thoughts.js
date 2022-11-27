const mongoose = require('mongoose');
const User = require('./users')


//subdocument
const reactionsSchema = new mongoose.Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
    },
    reactionBody: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
},
    {
        toJSON: {
            getters: true,
        },
        id: false,
    }
)

//Parent document
const thoughtsSchema = new mongoose.Schema({
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
    },
    username: [
        User,
        { required: true }
    ],
    reactions: [reactionsSchema],
    createdAt: {
        type: Date,
        default: Date.now,
    },
},
    {
        toJSON: {
            getters: true,
            virtuals: true,
        },
        id: false,
    }
);
thoughtsSchema
    .virtual('reactionCount')
    .get(function () {
        return this.reactions.length
    })

const Thoughts = mongoose.model('Thoughts', thoughtsSchema);
module.exports = Thoughts;