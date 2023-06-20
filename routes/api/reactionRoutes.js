const router = require('express').Router();
const addReaction = require('../../controllers/reactionController'); 


// POST route to add a reaction to a thought
router.route('/:thoughtId').post((req, res) => {
    const { thoughtId } = req.params;
    const { reactionBody } = req.body;
  
    try {
      addReaction(thoughtId, reactionBody);
      res.sendStatus(200);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  });

module.exports = router;

