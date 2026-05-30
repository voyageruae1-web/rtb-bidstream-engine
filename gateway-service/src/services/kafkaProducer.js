// gateway-service/src/services/kafkaProducer.js
const { kafka } = require('../../../shared/kafkaClient');

const producer = kafka.producer();

const connectProducer = async () => {
  await producer.connect();
  console.log('Kafka Producer Connected');
};

const publishBidRequest = async (payload) => {
  await producer.send({
    topic: 'bid-requests',
    messages: [
      {
        value: JSON.stringify(payload),
      },
    ],
  });
};

module.exports = {
  connectProducer,
  publishBidRequest,
};