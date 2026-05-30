const express = require("express");
const { startProducer, sendBidRequest } = require("./kafka/producer");

const app = express();
app.use(express.json());

startProducer();

app.post("/bid", async (req, res) => {
  await sendBidRequest(req.body);

  res.json({
    status: "sent_to_kafka",
  });
});

app.listen(3000, () => {
  console.log("Gateway running on 3000");
});