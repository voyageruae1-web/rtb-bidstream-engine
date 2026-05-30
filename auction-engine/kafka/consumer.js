const { consumer } = require("../../shared/kafka/client");
const topics = require("../../shared/kafka/topics");

async function startConsumer() {
  await consumer.connect();
  await consumer.subscribe({
    topic: topics.BID_REQUEST,
    fromBeginning: false,
  });

  await consumer.run({
    eachMessage: async ({ message }) => {
      const bid = JSON.parse(message.value.toString());

      console.log("Received bid:", bid);

      const result = {
        win: true,
        price: Math.random() * 5,
      };

      console.log("Auction result:", result);
    },
  });
}

module.exports = { startConsumer };