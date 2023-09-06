const {Schema, model, Types, ObjectId} = require('mongoose');

const forumSchema = new Schema (
  {
    title: {
      type: String,
      required: true
    },
    image: {
      type: String,
    },
    content: {
      type: String,
      required: true
    },
    userId: {
      type: Number
    },
    commentId: {
      type: Number
    },
    dateCreated: {
      type: Date,
      default: Date.now
    },

  }
)

const Forum = model('Plant', forumSchema)

module.exports = Forum