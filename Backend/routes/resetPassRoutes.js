const express = require("express");
const router = express.Router();

const resetPassControllers = require("../controllers/resetPassControllers");

router.get("/updatepassword/:id", resetPassControllers.updatePass);

router.get("/resetpass/:id", resetPassControllers.resetPass);

router.post("/forgotpass", resetPassControllers.forgotpass);

module.exports = router;
