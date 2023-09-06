const {Schema, model, Types, ObjectId} = require('mongoose');

const commentSchema = new Schema (
  {
    text: {
      type: String,
      required: true
    },
    userId: {
      type: Number
    },
    postId: {
      type: Number
    },
    dateCreated: {
      type: Date,
      default: Date.now
    },

  }
)

const Comment = model('Plant', commentSchema)

module.exports = Comment