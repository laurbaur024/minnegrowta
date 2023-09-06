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
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    commentId: {
      type: Schema.Types.ObjectId,
      ref: "Comment",
    },
    dateCreated: {
      type: Date,
      default: Date.now
    },

  }
)

const Forum = model('Plant', forumSchema)

module.exports = Forum