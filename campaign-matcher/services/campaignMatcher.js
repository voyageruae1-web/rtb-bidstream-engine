const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function findMatchingCampaigns(bidRequest) {
  const matchedCampaigns = await prisma.campaign.findMany({
    where: {
      status: "ACTIVE"
    }
  });

  return matchedCampaigns;
}

module.exports = {
  findMatchingCampaigns
};