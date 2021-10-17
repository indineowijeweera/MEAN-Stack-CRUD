var express = require("express");
var router = express.Router();

const customer = require("../api/customer")

router.get("/", (req, res) => {
  res.send("Node API");
});

router.use("/customer", customer);


module.exports = router;
