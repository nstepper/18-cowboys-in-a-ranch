import { Thought } from '../models';

const reactionController = {
  // Controller function to add a reaction to a thought
  addReaction({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $push: { reactions: body } },
      { new: true, runValidators: true }
    )
      .then(thoughtData => {
        if (!thoughtData) {
          // If no thought is found with the given id, return a 404 status
          res.status(404).json({ message: 'No thought found with this id!' });
          return;
        }
        // If the thought is found, return the updated thought data
        res.json(thoughtData);
      })
      .catch(err => {
        console.log(err);
        res.sendStatus(500);
      });
  },

  // Controller function to remove a reaction from a thought
  deleteReaction({ params }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $pull: { reactions: { reactionId: params.reactionId } } },
      { new: true }
    )
      .then(thoughtData => {
        if (!thoughtData) {
          // If no thought is found with the given id, return a 404 status
          res.status(404).json({ message: 'No thought found with this id!' });
          return;
        }
        // If the thought is found, return the updated thought data
        res.json(thoughtData);
      })
      .catch(err => {
        console.log(err);
        res.sendStatus(500);
      });
  }
};

export default reactionController;
