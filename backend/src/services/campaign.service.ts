import { Campaign } from "../../models/campaign";
import { Product } from "../../models/product";
import { Section } from "../../models/section";
import { SectionContent } from "../../models/sectionContent";
import { Template } from "../../models/template";

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

export const getCampaignBySlug = async (slug: string, lang?: string) => {
  const language = lang || "en";

  const campaign = await Campaign.findOne({
    where: { slug },
    include: [
      {
        model: Product,
        through: { attributes: [] },
      },
      {
        model: Template,
        include: [{ model: Section }],
      },
    ],
  });

  if (!campaign || !campaign.template) {
    return null;
  }

  const sectionIds = campaign.template.sections.map((s) => s.id);

  const sectionContents = await SectionContent.findAll({
    where: {
      campaignId: campaign.id,
      sectionId: sectionIds,
      language: language,
    },
  });

  const contentsBySectionId = new Map<number, any[]>();
  sectionContents.forEach((content) => {
    const sectionId = content.sectionId;
    if (!contentsBySectionId.has(sectionId)) {
      contentsBySectionId.set(sectionId, []);
    }
    try {
      content.content = JSON.parse(content.content as any);
    } catch (e) {
      /* ignore */
    }
    contentsBySectionId.get(sectionId)!.push(content.get({ plain: true }));
  });

  campaign.template.sections.forEach((section) => {
    section.contents = contentsBySectionId.get(section.id) || [];
  });

  const plainCampaign = campaign.get({ plain: true });

  plainCampaign.template.sections.forEach((section: any) => {
    section.contents = contentsBySectionId.get(section.id) || [];
  });

  return plainCampaign;
};
