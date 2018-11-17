const mongoose = require("mongoose");
const User = require("./user");

const myHeadacheSchema = new mongoose.Schema(
  {
    date: {
      type: String,
      unique: true
    },
    painLevel: Number,
    comment: String,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  },
  {
    timestamps: true
  }
);

myHeadacheSchema.pre("remove", async function(next) {
  try {
    console.log("models/myHeadaches.js - this.user", this.user);

    let user = await User.findById(this.user);
    console.log("models/myHeadaches.js - user", user);
    // remove the id of the headache entry from the list
    user.myHeadaches.remove(this.id);
    //save the user
    await user.save();
    return next();
  } catch (err) {
    return next(err);
  }
});

const MyHeadaches = mongoose.model("MyHeadaches", myHeadacheSchema);

module.exports = MyHeadaches;
