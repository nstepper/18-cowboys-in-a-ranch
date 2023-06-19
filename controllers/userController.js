const { User, Thought } = require('../models');

const userController = {
  // Get all users
  getAllUsers(req, res) {
    User.find({})
      .populate({
        path: 'thoughts',
        select: '-__v'
      })
      .select('-__v -password')
      .then(userData => res.json(userData))
      .catch(err => {
        console.log(err);
        res.sendStatus(500);
      });
  },

  // Get a single user by ID
  getUserById({ params }, res) {
    User.findOne({ _id: params.id })
      .populate({
        path: 'thoughts',
        select: '-__v'
      })
      .select('-__v -password')
      .then(userData => {
        if (!userData) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        res.json(userData);
      })
      .catch(err => {
        console.log(err);
        res.sendStatus(500);
      });
  },

  // Create a new user
  createUser({ body }, res) {
    User.create(body)
      .then(userData => res.json(userData))
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // Update a user by ID
  updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
      .then(userData => {
        if (!userData) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        res.json(userData);
      })
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // Delete a user by ID
  deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.id })
      .then(deletedUser => {
        if (!deletedUser) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        // Remove the user's associated thoughts
        return Thought.deleteMany({ username: deletedUser.username });
      })
      .then(() => {
        res.json({ message: 'User and associated thoughts deleted successfully!' });
      })
      .catch(err => {
        console.log(err);
        res.sendStatus(500);
      });
  },

  // Add a friend to a user's friend list
  addFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $push: { friends: params.friendId } },
      { new: true }
    )
      .then(userData => {
        if (!userData) {
          res.status(404).json({ message: 'No user found with this userId!' });
          return;
        }
        res.json(userData);
      })
      .catch(err => {
        console.log(err);
        res.sendStatus(500);
      });
  },

  // Remove a friend from a user's friend list
  removeFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $pull: { friends: params.friendId } },
      { new: true }
    )
      .then(userData => {
        if (!userData) {
          res.status(404).json({ message: 'No user found with this userId!' });
          return;
        }
        res.json(userData);
      })
      .catch(err => {
        console.log(err);
        res.sendStatus(500);
      });
  }
};

module.exports = userController;
