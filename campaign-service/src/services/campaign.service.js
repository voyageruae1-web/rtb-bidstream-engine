const prisma = require("../config/prisma");

const createCampaign = async (data) => {
  return prisma.campaign.create({
    data
  });
};

const getCampaigns = async () => {
  return prisma.campaign.findMany({
    orderBy: {
      createdAt: "desc"
    }
  });
};

const getCampaignById = async (id) => {
  return prisma.campaign.findUnique({
    where: { id }
  });
};

const updateCampaign = async (id, data) => {
  return prisma.campaign.update({
    where: { id },
    data
  });
};

const deleteCampaign = async (id) => {
  return prisma.campaign.delete({
    where: { id }
  });
};

module.exports = {
  createCampaign,
  getCampaigns,
  getCampaignById,
  updateCampaign,
  deleteCampaign
};