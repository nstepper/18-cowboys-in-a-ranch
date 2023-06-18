const User = require('../models/User');

// GET all users
const getAllUsers = (req, res) => {
  User.find({})
    .populate('thoughts')
    .populate('friends')
    .then(users => {
      res.json(users);
    })
    .catch(err => {
      res.status(500).json(err);
    });
};

// GET a single user by its _id
const getUserById = (req, res) => {
  User.findById(req.params.id)
    .populate('thoughts')
    .populate('friends')
    .then(user => {
      if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
      }
      res.json(user);
    })
    .catch(err => {
      res.status(500).json(err);
    });
};

// POST a new user
const createUser = (req, res) => {
  User.create(req.body)
    .then(user => {
      res.json(user);
    })
    .catch(err => {
      res.status(400).json(err);
    });
};

// PUT to update a user by its _id
const updateUser = (req, res) => {
  User.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(user => {
      if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
      }
      res.json(user);
    })
    .catch(err => {
      res.status(400).json(err);
    });
};

// DELETE to remove a user by its _id
const deleteUser = (req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then(user => {
      if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
      }
      // Bonus: Remove user's associated thoughts
      return Thought.deleteMany({ username: user.username });
    })
    .then(() => {
      res.json({ message: 'User and associated thoughts deleted' });
    })
    .catch(err => {
      res.status(400).json(err);
    });
};

// POST to add a new friend to a user's friend list
const addFriend = (req, res) => {
  User.findByIdAndUpdate(
    req.params.userId,
    { $addToSet: { friends: req.params.friendId } },
    { new: true }
  )
    .then(user => {
      if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
      }
      res.json(user);
    })
    .catch(err => {
      res.status(400).json(err);
    });
};

// DELETE to remove a friend from a user's friend list
const removeFriend = (req, res) => {
  User.findByIdAndUpdate(
    req.params.userId,
    { $pull: { friends: req.params.friendId } },
    { new: true }
  )
    .then(user => {
      if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
      }
      res.json(user);
    })
    .catch(err => {
      res.status(400).json(err);
    });
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend
};
