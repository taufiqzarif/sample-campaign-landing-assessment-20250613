import { Request, Response } from "express";
import * as campaignService from "../services/campaign.service";

export const createCampaign = async (req: Request, res: Response) => {
  try {
    const campaign = await campaignService.createCampaign(req.body);
    res.status(201).json(campaign);
  } catch (error) {
    res.status(500).json({ error: "Failed to create campaign" });
  }
};

export const getAllCampaigns = async (req: Request, res: Response) => {
  try {
    const campaigns = await campaignService.getAllCampaigns();
    res.status(200).json(campaigns);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve campaigns" });
  }
};

export const getCampaignById = async (req: Request, res: Response) => {
  try {
    const campaign = await campaignService.getCampaignById(
      parseInt(req.params.id)
    );
    if (campaign) {
      res.status(200).json(campaign);
    } else {
      res.status(404).json({ error: "Campaign not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve campaign" });
  }
};

export const updateCampaign = async (req: Request, res: Response) => {
  try {
    const campaign = await campaignService.updateCampaign(
      parseInt(req.params.id),
      req.body
    );
    if (campaign) {
      res.status(200).json(campaign);
    } else {
      res.status(404).json({ error: "Campaign not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to update campaign" });
  }
};

export const deleteCampaign = async (req: Request, res: Response) => {
  try {
    const success = await campaignService.deleteCampaign(
      parseInt(req.params.id)
    );
    if (success) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: "Campaign not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to delete campaign" });
  }
};

export const getCampaignBySlug = async (req: Request, res: Response) => {
  try {
    const campaign = await campaignService.getCampaignBySlug(
      req.params.slug,
      req.query.lang as string
    );
    if (campaign) {
      res.status(200).json(campaign);
    } else {
      res.status(404).json({ error: "Campaign not found" });
    }
  } catch (error) {
    console.error("Error fetching campaign by slug:", error);
    res.status(500).json({ error: "Failed to retrieve campaign" });
  }
};
