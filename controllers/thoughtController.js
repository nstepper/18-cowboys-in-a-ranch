const User = require('../models/user');
const Thought = require('../models/thought');

const thoughtController = {
    getAllThoughts(req, res) {
      Thought.find({})
        .populate({
          path: 'reactions',
          select: '-__v'
        })
        .select('-__v')
        .sort({ createdAt: -1 })
        .then(thoughtData => res.json(thoughtData))
        .catch(err => {
          console.log(err);
          res.sendStatus(500);
        });
    },
  
    getThoughtById({ params }, res) {
      Thought.findOne({ _id: params.id })
        .populate({
          path: 'reactions',
          select: '-__v'
        })
        .select('-__v')
        .then(thoughtData => {
          if (!thoughtData) {
            res.status(404).json({ message: 'No thought found with this id!' });
            return;
          }
          res.json(thoughtData);
        })
        .catch(err => {
          console.log(err);
          res.sendStatus(500);
        });
    },
  
    createThought({ body }, res) {
      Thought.create(body)
        .then(({ _id }) => {
          return User.findOneAndUpdate(
            { _id: body.userId },
            { $push: { thoughts: _id } },
            { new: true }
          );
        })
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
  
    updateThought({ params, body }, res) {
      Thought.findOneAndUpdate({ _id: params.id }, body, { new: true })
        .then(thoughtData => {
          if (!thoughtData) {
            res.status(404).json({ message: 'No thought found with this id!' });
            return;
          }
          res.json(thoughtData);
        })
        .catch(err => {
          console.log(err);
          res.sendStatus(500);
        });
    },
  
    deleteThought({ params }, res) {
      Thought.findOneAndDelete({ _id: params.id })
        .then(deletedThought => {
          if (!deletedThought) {
            res.status(404).json({ message: 'No thought found with this id!' });
            return;
          }
          return User.findOneAndUpdate(
            { username: deletedThought.username },
            { $pull: { thoughts: params.id } },
            { new: true }
          );
        })
        .then(userData => {
          if (!userData) {
            res.status(404).json({ message: 'No user found with this username!' });
            return;
          }
          res.json(userData);
        })
        .catch(err => {
          console.log(err);
          res.sendStatus(500);
        });
    },
  
    addReaction({ params, body }, res) {
      Thought.findOneAndUpdate(
        { _id: params.thoughtId },
        { $push: { reactions: body } },
        { new: true, runValidators: true }
      )
        .populate({
          path: 'reactions',
          select: '-__v'
        })
        .select('-__v')
        .then(thoughtData => {
          if (!thoughtData) {
            res.status(404).json({ message: 'No thought found with this id!' });
            return;
          }
          res.json(thoughtData);
        })
        .catch(err => {
          console.log(err);
          res.sendStatus(500);
        });
    },
  
    deleteReaction({ params }, res) {
      Thought.findOneAndUpdate(
        { _id: params.thoughtId },
        { $pull: { reactions: { reactionId: params.reactionId } } },
        { new: true }
      )
        .populate({
          path: 'reactions',
          select: '-__v'
        })
        .select('-__v')
        .then(thoughtData => {
          if (!thoughtData) {
            res.status(404).json({ message: 'No thought found with this id!' });
            return;
          }
          res.json(thoughtData);
        })
        .catch(err => {
          console.log(err);
          res.sendStatus(500);
        });
    }
  };
  

  module.exports = thoughtController;
