const mongoose = require("mongoose");
mongoose.set("debug", true);
mongoose.Promise = Promise;
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/migraineTracker",
  {
    keepAlive: true
  }
);

module.exports.User = require("./user");
module.exports.MyHeadaches = require("./myHeadaches");
