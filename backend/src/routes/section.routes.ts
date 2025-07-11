import { Router } from "express";
import * as sectionController from "../controllers/section.controller";

const router = Router();

router.post("/", sectionController.createSection);
router.get("/", sectionController.getAllSections);
router.get("/:id", sectionController.getSectionById);
router.put("/:id", sectionController.updateSection);
router.delete("/:id", sectionController.deleteSection);

export default router;
