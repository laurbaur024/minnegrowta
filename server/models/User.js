const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new Schema(
  {
    username: {
      type: String,
      // unique: true,
      required: true,
    },

    email: {
      type: String,
      required: true,
      // unique: true,
      match: /.+\@.+\..+/,
    },

    password: {
      type: String,
      // required: true
    },

    favPlant: [
      {
        type: Schema.Types.ObjectId,
        ref: "Plant",
      },
    ],

    gardenPlant: [
      {
        type: Schema.Types.ObjectId,
        ref: "Plant",
      },
    ],

    myForums: [
      {
        type: Schema.Types.ObjectId,
        ref: "Forum",
      },
    ],

    myJournals: [
      {
        type: Schema.Types.ObjectId,
        ref: "Journal",
      },
    ],
  },
  {
    toJSON: {
      virtuals: false,
    },
    id: false,
  }
);

userSchema.method("verify", async function (pw) {
  return await bcrypt.compare(pw, this.password);
});

userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

const User = model("User", userSchema);
module.exports = User;
