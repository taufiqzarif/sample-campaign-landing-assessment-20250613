import db from "../models";

const seed = async () => {
	console.log("Seeding database...");
	// Clear database in reverse order of creation to avoid foreign key constraints
	await db.CampaignProduct.destroy({
		where: {},
		truncate: true,
		cascade: true,
	});
	await db.SectionContent.destroy({ where: {}, truncate: true, cascade: true });
	await db.Campaign.destroy({ where: {}, truncate: true, cascade: true });
	await db.Product.destroy({ where: {}, truncate: true, cascade: true });
	await db.TemplateSection.destroy({
		where: {},
		truncate: true,
		cascade: true,
	});
	await db.Section.destroy({ where: {}, truncate: true, cascade: true });
	await db.Template.destroy({ where: {}, truncate: true, cascade: true });
	console.log("Previous data cleared.");

	// 1. Create Template
	const template = await db.Template.create({ name: "Default Template" });

	// 2. Create Sections
	const heroSection = await db.Section.create({ name: "Hero", type: "hero" });
	const productSection = await db.Section.create({
		name: "Product List",
		type: "product-list",
	});
	const footerSection = await db.Section.create({
		name: "Footer",
		type: "footer",
	});

	// Link Sections to Template
	await template.addSection(heroSection, { through: { order: 1 } });
	await template.addSection(productSection, { through: { order: 2 } });
	await template.addSection(footerSection, { through: { order: 3 } });

	// 3. Create Products
	const products = await db.Product.bulkCreate([
		{
			name: "Stylish Summer T-Shirt",
			price: 29.99,
			imageUrl:
				"https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1780&auto=format&fit=crop",
		},
		{
			name: "Cool Sunglasses",
			price: 49.99,
			imageUrl:
				"https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=1780&auto=format&fit=crop",
		},
		{
			name: "Hat",
			price: 19.99,
			imageUrl:
				"https://images.unsplash.com/photo-1521369909029-2afed882baee?q=80&w=1780&auto=format&fit=crop",
		},
		{
			name: "Water Bottle",
			price: 15.99,
			imageUrl:
				"https://images.unsplash.com/photo-1616118132534-381148898bb4?q=80&w=1780&auto=format&fit=crop",
		},
	]);

	// 4. Create Campaigns
	const campaigns = await db.Campaign.bulkCreate([
		{
			name: "Summer Sale Campaign",
			slug: "summer-sale-campaign",
			templateId: template.id,
		},
		{
			name: "Father's Day 2025",
			slug: "fathersday2025",
			templateId: template.id,
		},
		{
			name: "Mooncake Festival 2025",
			slug: "mooncakefestival2025",
			templateId: template.id,
		},
	]);

	// 5. Link Products to Campaigns & Create Section Content
	const sectionContents = [];
	for (const campaign of campaigns) {
		// Link all products to each campaign
		await campaign.addProducts(products);

		// Create content for hero and footer sections for each campaign and each language
		for (const lang of ["en", "my"] as const) {
			let heroContent: { title: string; subtitle: string; imageUrl: string };
			let footerContent: { text: string };

			switch (lang) {
				case "my":
					heroContent = {
						title: `Selamat Datang ke kempen ${campaign.name}! (MY)`,
						subtitle: "Tawaran istimewa hanya untuk anda.",
						imageUrl:
							"https://images.unsplash.com/photo-1593642532400-2682810df593?q=80&w=1778&auto=format&fit=crop",
					};
					footerContent = {
						text: `© 2025 ${campaign.name}. Hak cipta terpelihara. (MY)`,
					};
					break;
				case "en":
				default:
					heroContent = {
						title: `Welcome to our ${campaign.name} campaign! (EN)`,
						subtitle: "Special deals just for you.",
						imageUrl:
							"https://images.unsplash.com/photo-1593642532400-2682810df593?q=80&w=1778&auto=format&fit=crop",
					};
					footerContent = {
						text: `© 2025 ${campaign.name}. All rights reserved. (EN)`,
					};
					break;
			}

			sectionContents.push(
				{
					campaignId: campaign.id,
					sectionId: heroSection.id,
					language: lang,
					content: JSON.stringify(heroContent),
				},
				{
					campaignId: campaign.id,
					sectionId: footerSection.id,
					language: lang,
					content: JSON.stringify(footerContent),
				}
			);
		}
	}

	await db.SectionContent.bulkCreate(sectionContents);

	console.log("Database seeded successfully!");
};

seed()
	.catch((err) => {
		console.error("Failed to seed database:", err);
		process.exit(1);
	})
	.finally(() => {
		db.sequelize.close();
	});
