const campaigns = require("../data/campaigns");

function findMatchingCampaigns(bidRequest) {
  const matched = campaigns.filter(
    (campaign) => campaign.publisher === bidRequest.publisher
  );

  return matched;
}

module.exports = {
  findMatchingCampaigns
};