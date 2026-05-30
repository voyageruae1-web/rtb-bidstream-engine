const { kafka } = require("../../shared/kafkaClient");

async function createTopics() {
  const admin = kafka.admin();

  await admin.connect();

  console.log("Creating Kafka topics...");

  await admin.createTopics({
    topics: [
      {
        topic: "bid-requests",
        numPartitions: 1,
        replicationFactor: 1,
      },
      {
        topic: "bid-responses",
        numPartitions: 1,
        replicationFactor: 1,
      },
      {
        topic: "win-notices",
        numPartitions: 1,
        replicationFactor: 1,
      },
      {
        topic: "click-events",
        numPartitions: 1,
        replicationFactor: 1,
      },
    ],
  });

  console.log("Kafka topics created successfully");

  await admin.disconnect();
}

createTopics().catch(console.error);