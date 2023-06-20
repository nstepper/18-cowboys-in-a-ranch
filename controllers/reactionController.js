const Thought = require('../models/thought');


const addReaction = (thoughtId, reactionBody) => {
  // Create a new reaction document using the Reaction model
  const newReaction = new Reaction({
    reactionBody,
  });


  // Find the thought by its ID and push the new reaction into the reactions array
  Thought.findByIdAndUpdate(
    thoughtId,
    { $push: { reactions: newReaction } },
    { new: true, runValidators: true }
  )
    .then((thought) => {
      if (!thought) {
        // Handle case where thought is not found
        throw new Error('Thought not found');
      }
      // Return the updated thought with the new reaction
      return thought;
    })
    .catch((err) => {
      // Handle any errors that occurred during the process
      console.log(err);
      throw new Error('Failed to add reaction');
    });
};

module.exports = { addReaction };