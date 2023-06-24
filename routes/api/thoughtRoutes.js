const router = require('express').Router();
const addReaction = require('../../controllers/reactionController');

// POST route to add a reaction to a thought
router.post('/:thoughtId', (req, res) => {
  const { thoughtId } = req.params;
  const { reactionBody } = req.body;
  
  // Call the addReaction function with the thoughtId and reactionBody
  const newReaction = addReaction(thoughtId, reactionBody);

  res.json(newReaction);
});

module.exports = router;