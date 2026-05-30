const { Kafka } = require("kafkajs");

const kafka = new Kafka({
  clientId: "rtb-bidstream-engine",
  brokers: ["localhost:9092"],
});

const producer = kafka.producer();

const consumer = kafka.consumer({
  groupId: "rtb-group",
});

module.exports = {
  kafka,
  producer,
  consumer,
};