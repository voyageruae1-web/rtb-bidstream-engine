const { Kafka } = require("kafkajs");

const kafka = new Kafka({
  clientId: "ranking-engine",
  brokers: ["localhost:9092"],
});

const consumer = kafka.consumer({ groupId: "ranking-group" });

async function runConsumer() {
  await consumer.connect();

  await consumer.subscribe({
    topic: "bid-requests",
    fromBeginning: false,
  });

  console.log("📥 Ranking Engine listening to bid-request...");

  await consumer.run({
    eachMessage: async ({ message }) => {
      const bidRequest = JSON.parse(message.value.toString());

      console.log("📊 Ranking received bid:", bidRequest.id);

      const score = Math.random() * 100;

      const rankedBid = {
        ...bidRequest,
        score,
        rankTime: Date.now(),
      };

      console.log("🏆 Ranked Bid:", rankedBid);
    },
  });
}

module.exports = runConsumer;