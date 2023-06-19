const router = require('express').Router();
const {
  getAllThoughts,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction
} = require('../../controllers/thoughtController');

// GET routes
router.route('/').get(getAllThoughts);
router.route('/:id').get(getThoughtById);

// POST route
router.route('/').post(createThought);

// PUT and DELETE routes
router.route('/:id').put(updateThought).delete(deleteThought);

// Reaction routes
router.route('/:thoughtId/reactions').post(addReaction);
router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction);

module.exports = router;
export default router;

