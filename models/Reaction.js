const e = require('express');
const { Schema, model } = require('mongoose');

const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId()
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280
    },
    username: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: timestamp => formatDate(timestamp)
    }
  },
  {
    toJSON: {
      getters: true
    }
  }
);

function formatDate(timestamp) {
  // Add your custom date formatting logic here
  return new Date(timestamp).toISOString();
}

export default reactionSchema;
module.exports = reactionSchema;
