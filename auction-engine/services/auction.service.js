const {
  findMatchingCampaigns
} = require("../../campaign-matcher/services/campaignMatcher");

async function runAuction(bidRequest) {
  console.log("Running auction for:", bidRequest.bidId);

  const matchedCampaigns =
    findMatchingCampaigns(bidRequest);

  console.log(
    "Matched Campaigns:",
    matchedCampaigns
  );

  return {
    bidId: bidRequest.bidId,
    publisher: bidRequest.publisher,
    matchedCampaigns
  };
}

module.exports = {
  runAuction
};