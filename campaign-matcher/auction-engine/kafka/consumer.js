const { consumer } = require("../../shared/kafka/client");
const { runAuction } = require("../services/auction.service");
const { matchCampaign } = require("../../campaign-matcher/matcher");

async function startConsumer() {
  await consumer.connect();

  await consumer.subscribe({
    topic: "bid-requests",
    fromBeginning: true,
  });

  await consumer.run({
    eachMessage: async ({ message }) => {
      try {
        const bidRequest = JSON.parse(message.value.toString());

        console.log("\n==============================");
        console.log("📩 Incoming Bid:");
        console.log(bidRequest);

        console.log("\n🎯 Matching Campaigns...");
        const eligibleCampaigns = matchCampaign(bidRequest);

        if (!eligibleCampaigns || eligibleCampaigns.length === 0) {
          console.log("❌ No eligible campaigns → bid rejected");
          return;
        }

        console.log("✅ Eligible campaigns found:", eligibleCampaigns.length);

        console.log("\n⚖️ Running Auction...");
        const result = runAuction(bidRequest);

        console.log("🏆 Auction Result:");
        console.log(result);

        console.log("==============================\n");
      } catch (error) {
        console.error("❌ Consumer Error:", error);
      }
    },
  });
}

module.exports = {
  startConsumer,
};