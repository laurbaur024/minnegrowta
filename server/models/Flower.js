const {Schema, model, Types, ObjectId} = require('mongoose');

const flowerSchema = new Schema (
  {
    name: {
      type: String,
      required: true
    },

    image: {
      type: String,
      // required: true
    },

    sun: {
      type: Boolean,
      required: true
    },

    zone: {
      type: Number,
      required: true
    },

    annual: {
      type: Boolean,
      required: true
    },

    bloomingSeason: {
      type: String,
      // required: true
    },

    height: {
      type: String,
      required: true
    }
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
)

const Flower = model('Flower', flowerSchema)

module.exports = Flower