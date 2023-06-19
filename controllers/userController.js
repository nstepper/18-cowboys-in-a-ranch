import { User, Thought } from '../models';

const userController = {
  // Get all users
  getAllUsers(req, res) {
    User.find({})
      .populate({
        path: 'thoughts',
        select: '-__v'
      })
      .select('-__v -password')
      .sort({ _id: -1 })
      .then(userData => res.json(userData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // Get a user by ID
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
        res.status(500).json(err);
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
        // Remove associated thoughts
        return Thought.deleteMany({ _id: { $in: deletedUser.thoughts } });
      })
      .then(() => {
        res.json({ message: 'User and associated thoughts deleted!' });
      })
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // Add a friend to a user's friend list
  addFriend({ params }, res) {
    User.findOneAndUpdate({ _id: params.userId }, { $push: { friends: params.friendId } }, { new: true })
      .then(userData => {
        if (!userData) {
          res.status(404).json({ message: 'No user found with this userId!' });
          return;
        }
        res.json(userData);
      })
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // Remove a friend from a user's friend list
  removeFriend({ params }, res) {
    User.findOneAndUpdate({ _id: params.userId }, { $pull: { friends: params.friendId } }, { new: true })
      .then(userData => {
        if (!userData) {
          res.status(404).json({ message: 'No user found with this userId!' });
          return;
        }
        res.json(userData);
      })
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  }
};

export default userController;
