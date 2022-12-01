const router = require('express').Router();
const {
    getAllUsers,
    getSingleUser,
    addUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend,
    } = require('../../Controllers/userController')



// /api/users
router
    .route('/')
    .get(getAllUsers)
    .post(addUser);

// /api/users/:id
router
    .route('/:id')
    .get(getSingleUser)
    .put(updateUser)
    .delete(deleteUser);

// /api/users/:id/friends/:friendId
router
    .route('/:id/friends/:friendId')
    .post(addFriend)
    .delete(deleteFriend);


module.exports = router;