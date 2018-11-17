const express = require("express");
const router = express.Router({ mergeParams: true });

const {
  createHeadache,
  getHeadache,
  deleteHeadache,
  getAllHeadaches
} = require("../handlers/myHeadaches");

router.route("/").post(createHeadache);

// Delete route
// prefix - /api/users/:id/headache
router
  .route("/:headache_id")
  .get(getHeadache)
  .delete(deleteHeadache);

router.route("/allHeadaches").get(getAllHeadaches);

module.exports = router;
