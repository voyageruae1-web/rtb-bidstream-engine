const { producer } = require("../shared/kafkaClient");

async function sendBidRequest(data) {
  try {
    await producer.connect();

    await producer.send({
      topic: "bid-requests",
      messages: [
        {
          key: String(data.id),
          value: JSON.stringify(data),
        },
      ],
    });

    console.log(`Bid Request Sent: ${data.id}`);
  } catch (error) {
    console.error("Kafka Producer Error:", error);
  }
}

module.exports = {
  sendBidRequest,
};