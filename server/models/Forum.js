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
    commentId: [
      {
      type: Schema.Types.ObjectId,
      ref: "Comment",
    }
    ],
    // dateCreated: {
    //   type: Date,
    //   default: Date.now
    // },
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
)

const Forum = model('Forum', forumSchema)

// forumSchema.virtual('createdTime').get(function () {
//   return this.createdAt.toDateString()
// })

module.exports = Forum