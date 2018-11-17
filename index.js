require("dotenv").config(); // process.env._____
const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/auth");
const errorHandler = require("./handlers/error");
const headacheRoutes = require("./routes/headaches");
const { loginRequired, ensureCorrectUser } = require("./middleware/auth");
const db = require("./models");

const PORT = process.env.PORT || 3026;

app.use(morgan("tiny"));
app.use(bodyParser.json());
app.use(cors());

app.use("/api/auth", authRoutes);
app.use(
  "/api/users/:id/headaches",
  loginRequired,
  ensureCorrectUser,
  headacheRoutes
);

app.get("/api/users/:id/headaches", loginRequired, async function(
  req,
  res,
  next
) {
  try {
    let myHeadaches = await db.MyHeadaches.find({ user: req.params.id })
      .sort({
        symbol: "desc"
      })
      .populate("user", {
        username: true
      });
    return res.status(200).json(myHeadaches);
  } catch (err) {
    return next(err);
  }
});

app.use(function(req, res, next) {
  let err = new Error("Not Found");
  err.status = 404;
  next(err);
});

app.use(errorHandler);

app.listen(PORT, function() {
  console.log("connected on port", PORT);
});
