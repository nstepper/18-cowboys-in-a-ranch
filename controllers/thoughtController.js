const thoughtController = {
    // Controller method to get all thoughts
    getAllThoughts(req, res) {
      // Implement the logic to fetch all thoughts from the database
      Thought.find()
        .sort({ createdAt: -1 })
        .then((thoughts) => res.json(thoughts))
        .catch((err) => {
          console.log(err);
          res.status(500).json(err);
        });
    },
    
    // Controller method to get a single thought by its id
    getThoughtById(req, res) {
      // Implement the logic to fetch a thought by id from the database
      Thought.findById(req.params.thoughtId)
        .then((thought) => {
          if (!thought) {
            return res.status(404).json({ message: 'No thought found with this id' });
          }
          res.json(thought);
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json(err);
        });
    },
    
    // Controller method to create a new thought
    createThought(req, res) {
      // Implement the logic to create a thought and associate it with the user
      Thought.create(req.body)
        .then((thought) => {
          return User.findByIdAndUpdate(
            req.body.userId,
            { $push: { thoughts: thought._id } },
            { new: true }
          );
        })
        .then((user) => {
          if (!user) {
            return res.status(404).json({ message: 'No user found with this id' });
          }
          res.json({ message: 'Thought created successfully' });
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json(err);
        });
    },
    
    // Controller method to update a thought by its id
    updateThought(req, res) {
      // Implement the logic to update a thought by id
      Thought.findByIdAndUpdate(req.params.thoughtId, req.body, { new: true })
        .then((thought) => {
          if (!thought) {
            return res.status(404).json({ message: 'No thought found with this id' });
          }
          res.json({ message: 'Thought updated successfully' });
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json(err);
        });
    },
    
    // Controller method to delete a thought by its id
    deleteThought(req, res) {
      // Implement the logic to delete a thought by id
      Thought.findByIdAndRemove(req.params.thoughtId)
        .then((thought) => {
          if (!thought) {
            return res.status(404).json({ message: 'No thought found with this id' });
          }
          return User.findByIdAndUpdate(
            thought.userId,
            { $pull: { thoughts: thought._id } },
            { new: true }
          );
        })
        .then((user) => {
          if (!user) {
            return res.status(404).json({ message: 'No user found with this id' });
          }
          res.json({ message: 'Thought deleted successfully' });
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json(err);
        });
    }
  };
  
  module.exports = thoughtController;