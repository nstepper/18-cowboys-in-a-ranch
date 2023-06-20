const router = require('express').Router();
import { addReaction, removeReaction } from '../../controllers/reactionController';

// POST route to add a reaction to a thought
router.route('/:thoughtId').post(addReaction);

// DELETE route to remove a reaction from a thought
router.route('/:thoughtId/:reactionId').delete(removeReaction);

module.exports = router;

