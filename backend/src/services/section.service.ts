import { Section } from "../../models/section";
import { SectionContent } from "../../models/sectionContent";
import db from "../../models";

// Helper to parse content field
const parseContent = (section: Section | null) => {
  if (section && section.contents) {
    section.contents.forEach((contentItem) => {
      try {
        // The content is stored as a string, parse it back to JSON
        contentItem.content = JSON.parse(contentItem.content as any);
      } catch (e) {
        // Ignore if it's not valid JSON
      }
    });
  }
  return section;
};

export const createSection = async (data: any) => {
  const t = await db.sequelize.transaction();
  try {
    const { name, type, content, language, campaignId } = data;

    if (!campaignId) {
      throw new Error("campaignId is required");
    }

    const section = await Section.create({ name, type }, { transaction: t });
    if (content) {
      await SectionContent.create(
        {
          sectionId: section.id,
          campaignId: campaignId,
          language: language || "en",
          content: JSON.stringify(content),
        },
        { transaction: t }
      );
    }
    await t.commit();
    const result = await Section.findByPk(section.id, {
      include: [SectionContent],
    });
    return parseContent(result);
  } catch (error) {
    await t.rollback();
    throw error;
  }
};

export const getAllSections = async () => {
  const sections = await Section.findAll({ include: [SectionContent] });
  return sections.map((s) => parseContent(s));
};

export const getSectionById = async (id: number) => {
  const section = await Section.findByPk(id, { include: [SectionContent] });
  return parseContent(section);
};

export const updateSection = async (id: number, data: any) => {
  const t = await db.sequelize.transaction();
  try {
    const { name, type, content, language, campaignId } = data;
    const section = await Section.findByPk(id);

    if (!section) {
      await t.rollback();
      return null;
    }

    if (name || type) {
      await section.update({ name, type }, { transaction: t });
    }

    if (content) {
      if (!campaignId) {
        throw new Error("campaignId is required to update content");
      }
      const lang = language || "en";
      const [sectionContent, created] = await SectionContent.findOrCreate({
        where: { sectionId: id, language: lang, campaignId: campaignId },
        defaults: { content: JSON.stringify(content) },
        transaction: t,
      });

      if (!created) {
        await sectionContent.update(
          { content: JSON.stringify(content) },
          { transaction: t }
        );
      }
    }

    await t.commit();
    const result = await Section.findByPk(id, { include: [SectionContent] });
    return parseContent(result);
  } catch (error) {
    await t.rollback();
    throw error;
  }
};

export const deleteSection = async (id: number) => {
  const section = await Section.findByPk(id);
  if (section) {
    await SectionContent.destroy({ where: { sectionId: id } });
    await section.destroy();
    return true;
  }
  return false;
};
