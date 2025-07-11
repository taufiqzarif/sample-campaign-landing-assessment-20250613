import { Request, Response } from "express";
import * as sectionService from "../services/section.service";

export const createSection = async (req: Request, res: Response) => {
  try {
    const section = await sectionService.createSection(req.body);
    res.status(201).json(section);
  } catch (error) {
    console.error("Error creating section:", error);
    res.status(500).json({ error: "Failed to create section" });
  }
};

export const getAllSections = async (req: Request, res: Response) => {
  try {
    const sections = await sectionService.getAllSections();
    res.status(200).json(sections);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve sections" });
  }
};

export const getSectionById = async (req: Request, res: Response) => {
  try {
    const section = await sectionService.getSectionById(
      parseInt(req.params.id)
    );
    if (section) {
      res.status(200).json(section);
    } else {
      res.status(404).json({ error: "Section not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve section" });
  }
};

export const updateSection = async (req: Request, res: Response) => {
  try {
    const section = await sectionService.updateSection(
      parseInt(req.params.id),
      req.body
    );
    if (section) {
      res.status(200).json(section);
    } else {
      res.status(404).json({ error: "Section not found" });
    }
  } catch (error) {
    console.error("Error updating section:", error);
    res.status(500).json({ error: "Failed to update section" });
  }
};

export const deleteSection = async (req: Request, res: Response) => {
  try {
    const success = await sectionService.deleteSection(parseInt(req.params.id));
    if (success) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: "Section not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to delete section" });
  }
};
