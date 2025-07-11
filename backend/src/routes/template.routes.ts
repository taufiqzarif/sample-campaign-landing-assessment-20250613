import { Router } from "express";
import * as templateController from "../controllers/template.controller";

const router = Router();

router.post("/", templateController.createTemplate);
router.get("/", templateController.getAllTemplates);
router.get("/:id", templateController.getTemplateById);
router.put("/:id", templateController.updateTemplate);
router.delete("/:id", templateController.deleteTemplate);

export default router;
