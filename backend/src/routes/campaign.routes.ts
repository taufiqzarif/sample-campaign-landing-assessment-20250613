import { Router } from "express";
import * as campaignController from "../controllers/campaign.controller";

const router = Router();

router.post("/", campaignController.createCampaign);
router.get("/", campaignController.getAllCampaigns);
router.get("/:id", campaignController.getCampaignById);
router.put("/:id", campaignController.updateCampaign);
router.delete("/:id", campaignController.deleteCampaign);

export default router;
