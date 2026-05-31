const campaigns = require("./campaigns");

function matchCampaign(bidRequest) {
  console.log("Matching campaigns for:", bidRequest.bidId);

  const eligible = campaigns.filter((c) => {
    return (
      c.targetPublisher === bidRequest.publisher &&
      c.budget > 0
    );
  });

  console.log("Eligible campaigns:", eligible.map(c => c.id));

  return eligible;
}

module.exports = { matchCampaign };