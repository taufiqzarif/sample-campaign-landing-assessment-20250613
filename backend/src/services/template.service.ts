import { Template } from "../../models/template";

export const createTemplate = async (data: any) => {
  return await Template.create(data);
};

export const getAllTemplates = async () => {
  return await Template.findAll();
};

export const getTemplateById = async (id: number) => {
  return await Template.findByPk(id);
};

export const updateTemplate = async (id: number, data: any) => {
  const template = await Template.findByPk(id);
  if (template) {
    return await template.update(data);
  }
  return null;
};

export const deleteTemplate = async (id: number) => {
  const template = await Template.findByPk(id);
  if (template) {
    await template.destroy();
    return true;
  }
  return false;
};
