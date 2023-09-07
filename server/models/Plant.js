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

    type: {
      type: String,
      required: true
    },

    sowSpace: {
      type: String,
      required: true
    },
    
    climbing: {
      type: Boolean,

    },

    sun: {
      type: String,
      required: true
    },

    zone: {
      type: String,
      // required: true
    },

    annual: {
      type: Boolean,
      required: true
    },

    maturity: {
      type: String,
      required: true
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
)

const Plant = model('Plant', plantSchema)

module.exports = Plant