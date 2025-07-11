import { Campaign } from "../../models/campaign";

export const createCampaign = async (data: any) => {
  return await Campaign.create(data);
};

export const getAllCampaigns = async () => {
  return await Campaign.findAll();
};

export const getCampaignById = async (id: number) => {
  return await Campaign.findByPk(id);
};

export const updateCampaign = async (id: number, data: any) => {
  const campaign = await Campaign.findByPk(id);
  if (campaign) {
    return await campaign.update(data);
  }
  return null;
};

export const deleteCampaign = async (id: number) => {
  const campaign = await Campaign.findByPk(id);
  if (campaign) {
    await campaign.destroy();
    return true;
  }
  return false;
};
