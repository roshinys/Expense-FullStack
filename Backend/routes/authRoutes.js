const express = require("express");

const router = express.Router();

const authContollers = require("../controllers/authControllers");
const middleware = require("../middleware/auth");

router.post("/postUser", authContollers.postUser);
router.post("/getUser", authContollers.getUser);
router.put("/updateUser", middleware.authenticate, authContollers.updateUser);
router.get(
  "/userDetails",
  middleware.authenticate,
  authContollers.getUserDetails
);

module.exports = router;
