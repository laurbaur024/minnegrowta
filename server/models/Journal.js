const {Schema, model, Types, ObjectId} = require('mongoose');

const journalSchema = new Schema (
  {
    title: {
      type: String,
      required: true
    },
    image: {
      type: String,
    },
    text: {
      type: String,
      required: true
    },
    userId: [
      {
      type: Schema.Types.ObjectId,
      ref: "User",
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

const Journal = model('Journal', journalSchema)

module.exports = Journal