const express = require("express");

const router = express.Router();

const {
  receiveBidRequest
} = require("../controllers/bidController");

router.post("/bid", receiveBidRequest);

module.exports = router;