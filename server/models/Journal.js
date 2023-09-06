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
    dateCreated: {
      type: Date,
      default: Date.now
    },

  }
)

const Journal = model('Plant', journalSchema)

module.exports = Journal