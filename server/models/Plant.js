const {Schema, model, Types, ObjectId} = require('mongoose');

const plantSchema = new Schema (
  {
    name: {
      type: String,
      required: true
    },

    image: {
      type: String,
      required: true
    },

    image: {
      type: String,
      required: true
    },

    sowSpace: {
      type: String,
      required: true
    },

    zone: {
      type: String,
      required: true
    },

    sun: {
      type: Boolean,
      required: true
    },

    annual: {
      type: Boolean,
      required: true
    },

    maturity: {
      type: String,
      required: true
    },
  }
)

const Plant = model('Plant', plantSchema)

module.exports = Plant