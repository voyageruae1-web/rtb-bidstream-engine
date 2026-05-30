const { producer } = require("../../shared/kafka/client");
const topics = require("../../shared/kafka/topics");

async function startProducer() {
  await producer.connect();
  console.log("Kafka Producer connected");
}

async function sendBidRequest(data) {
  await producer.send({
    topic: topics.BID_REQUEST,
    messages: [
      {
        key: data.id,
        value: JSON.stringify(data),
      },
    ],
  });
}

module.exports = { startProducer, sendBidRequest };