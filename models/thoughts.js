const { Schema, model } = require('mongoose');
const Reaction = require('./reactions')



const thoughtsSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
    },
    username: {type:String},
    reactions: [Reaction],
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



  
const Thoughts = model('Thoughts', thoughtsSchema);

module.exports = Thoughts
