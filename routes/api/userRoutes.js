const router = require('express').Router();
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend
} = require('../../controllers/userController');

// GET routes
router.route('/').get(getAllUsers);
router.route('/:id').get(getUserById);

// POST route
router.route('/').post(createUser);

// PUT and DELETE routes
router.route('/:id').put(updateUser).delete(deleteUser);

// Friend routes
router.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend);

module.exports = router;