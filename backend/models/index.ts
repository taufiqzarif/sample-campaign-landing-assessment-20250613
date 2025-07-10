import { Sequelize } from "sequelize-typescript";
import { Campaign } from "./campaign";
import { CampaignProduct } from "./campaignProduct";
import { Product } from "./product";
import { Section } from "./section";
import { SectionContent } from "./sectionContent";
import { Template } from "./template";
import { TemplateSection } from "./templateSection";

const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.js")[env];

const sequelize = new Sequelize({
	...config,
	models: [
		Campaign,
		CampaignProduct,
		Product,
		Section,
		SectionContent,
		Template,
		TemplateSection,
	],
});

const db = {
	sequelize,
	Sequelize,
	Campaign,
	CampaignProduct,
	Product,
	Section,
	SectionContent,
	Template,
	TemplateSection,
};

export default db;
