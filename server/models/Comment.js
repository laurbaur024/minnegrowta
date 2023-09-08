const {Schema, model, Types, ObjectId} = require('mongoose');

const commentSchema = new Schema (
  {
    text: {
      type: String,
      required: true
    },

    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },

    forumId: {
      type: Schema.Types.ObjectId,
      ref: 'Forum'
    },
    
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

// commentSchema.virtual('createdTime').get(function () {
//   return this.createdAt.toDateString()
// })

const Comment = model('Comment', commentSchema)

module.exports = Comment