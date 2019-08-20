const db = require("../models");

exports.createHeadache = async function(req, res, next) {
  console.log("createHeadache called");
  console.log(
    "handlers/myCoins.js - createCoin req, res, next -- REQ -",
    req.body,
    "REQ.PARAMS",
    req.params,
    "RES",
    res.body
  );
  try {
    let headache = await db.MyHeadaches.create({
      date: req.body.date,
      painLevel: req.body.painLevel,
      comment: req.body.comment,
      user: req.params.id
    });
    console.log("myHeadaches/handlers - req.body/headache", headache);
    console.log("req.params.id", req.params.id);

    let foundUser = await db.User.findById(req.params.id);
    console.log("foundUser", foundUser);
    foundUser.myHeadaches.push(headache._id);
    await foundUser.save();
    let foundHeadache = await db.MyHeadaches.findById(headache._id).populate(
      "user",
      {
        username: true
      }
    );
    return res.status(200).json(foundHeadache);
  } catch (err) {
    return next(err);
  }
};

exports.getHeadache = async function(req, res, next) {
  try {
    let headache = await db.MyHeadaches.find(req.params.headache_id);
    return res.status(200).json(headache);
  } catch (err) {
    return next(err);
  }
};

exports.deleteHeadache = async function(req, res, next) {
  console.log("deleteHeadache - req.params", req.params);
  try {
    let foundMyHeadache = await db.MyHeadaches.findById(req.params.headache_id);
    console.log("handlersmyHeadaches - foundMyHeadache", foundMyHeadache);
    await foundMyHeadache.remove();
    console.log("*** after foundMyHeadache.remove()");
    return res.status(200).json(foundMyHeadache);
  } catch (err) {
    return next(err);
  }
};

exports.getAllHeadaches = async function(req, res, next) {
  try {
    let allHeadaches = await db.MyHeadaches.find({}).sort({date: -1});
    return res.status(200).json(allHeadaches);
  } catch (err) {
    next(err);
  }
};
