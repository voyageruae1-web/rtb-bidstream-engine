const express = require("express");
const app = express();

const validateBidRequest = require("../shared/validators/validateBidRequest");

app.use(express.json());

app.post("/bidrequest", validateBidRequest, (req, res) => {
  return res.json({
    status: "VALID_REQUEST",
    bidRequest: req.validatedBody,
  });
});

app.listen(5000, () => {
  console.log("Gateway running on port 5000");
});