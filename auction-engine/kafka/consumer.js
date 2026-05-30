const { consumer } = require("../../shared/kafka/client");
const { runAuction } = require("../services/auction.service");

async function startConsumer() {
  await consumer.connect();

  await consumer.subscribe({
  topic: "bid-requests",
  fromBeginning: true
});

  await consumer.run({
    eachMessage: async ({ message }) => {
      const bidRequest = JSON.parse(
        message.value.toString()
      );

      console.log(
        "Auction Engine received:",
        bidRequest.bidId
      );

      const result = runAuction(bidRequest);

      console.log(
        "Auction Result:",
        result
      );
    }
  });
}

module.exports = {
  startConsumer
};