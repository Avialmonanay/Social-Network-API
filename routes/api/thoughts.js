const router = require('express').Router();
const {
getAllThoughts,
getSingleThought,
addThought,
updateThought,
deleteThought,
addReaction,
deleteReaction,
} = require('../../Controllers/thoughtController')


// /api/thoughts 
router
    .route('/')
    .get(getAllThoughts)
    .post(addThought);

// /api/thoughts/:id
router 
    .route('/:id')
    .get(getSingleThought)
    .put(updateThought)
    .delete(deleteThought);

// /api/thoughts/:thoughtId/reactions 
router
    .route('/:thoughtId/reactions')
    .post(addReaction)

    // /api/thoughts/:thoughtId/reactions/:reactionId
router
    .route('/:thoughtId/reactions/:reactionId')
    .delete(deleteReaction)


module.exports = router;