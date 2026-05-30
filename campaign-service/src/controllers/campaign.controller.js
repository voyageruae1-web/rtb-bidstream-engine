const campaignService = require("../services/campaign.service");

const createCampaign = async (req, res) => {
  try {
    const campaign = await campaignService.createCampaign(req.body);

    return res.status(201).json(campaign);
  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
};

const getCampaigns = async (req, res) => {
  try {
    const campaigns = await campaignService.getCampaigns();

    return res.json(campaigns);
  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
};

const getCampaignById = async (req, res) => {
  try {
    const campaign = await campaignService.getCampaignById(req.params.id);

    return res.json(campaign);
  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
};

const updateCampaign = async (req, res) => {
  try {
    const campaign = await campaignService.updateCampaign(
      req.params.id,
      req.body
    );

    return res.json(campaign);
  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
};

const deleteCampaign = async (req, res) => {
  try {
    await campaignService.deleteCampaign(req.params.id);

    return res.json({
      message: "Campaign deleted"
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
};

module.exports = {
  createCampaign,
  getCampaigns,
  getCampaignById,
  updateCampaign,
  deleteCampaign
};