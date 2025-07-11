import { Request, Response } from "express";
import * as templateService from "../services/template.service";

export const createTemplate = async (req: Request, res: Response) => {
  try {
    const template = await templateService.createTemplate(req.body);
    res.status(201).json(template);
  } catch (error) {
    res.status(500).json({ error: "Failed to create template" });
  }
};

export const getAllTemplates = async (req: Request, res: Response) => {
  try {
    const templates = await templateService.getAllTemplates();
    res.status(200).json(templates);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve templates" });
  }
};

export const getTemplateById = async (req: Request, res: Response) => {
  try {
    const template = await templateService.getTemplateById(
      parseInt(req.params.id)
    );
    if (template) {
      res.status(200).json(template);
    } else {
      res.status(404).json({ error: "Template not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve template" });
  }
};

export const updateTemplate = async (req: Request, res: Response) => {
  try {
    const template = await templateService.updateTemplate(
      parseInt(req.params.id),
      req.body
    );
    if (template) {
      res.status(200).json(template);
    } else {
      res.status(404).json({ error: "Template not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to update template" });
  }
};

export const deleteTemplate = async (req: Request, res: Response) => {
  try {
    const success = await templateService.deleteTemplate(
      parseInt(req.params.id)
    );
    if (success) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: "Template not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to delete template" });
  }
};
