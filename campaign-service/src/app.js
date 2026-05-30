const express = require("express");
const cors = require("cors");

const campaignRoutes = require("./routes/campaign.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  return res.json({
    status: "Campaign Service Running"
  });
});

app.use("/campaigns", campaignRoutes);

module.exports = app;