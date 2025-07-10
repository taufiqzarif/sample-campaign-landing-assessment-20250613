import db from "../models";

const seed = async () => {
	console.log("Seeding database...");
	// Clear database in reverse order of creation
	await db.CampaignProduct.destroy({ where: {} });
	await db.SectionContent.destroy({ where: {} });
	await db.Campaign.destroy({ where: {} });
	await db.Product.destroy({ where: {} });
	await db.TemplateSection.destroy({ where: {} });
	await db.Section.destroy({ where: {} });
	await db.Template.destroy({ where: {} });
	console.log("Previous data cleared.");

	// Add seed data
	const template = await db.Template.create({ name: "Default Template" });

	const heroSection = await db.Section.create({ name: "Hero", type: "hero" });
	const productSection = await db.Section.create({
		name: "Product List",
		type: "product-list",
	});
	const footerSection = await db.Section.create({
		name: "Footer",
		type: "footer",
	});

	await db.TemplateSection.bulkCreate([
		{ templateId: template.id, sectionId: heroSection.id, order: 1 },
		{ templateId: template.id, sectionId: productSection.id, order: 2 },
		{ templateId: template.id, sectionId: footerSection.id, order: 3 },
	]);

	const products = await db.Product.bulkCreate([
		{
			name: "Cool Gadget",
			price: 49.99,
			imageUrl: "https://images.unsplash.com/photo-1556888335-23631cd2801a?q=80&w=1770&auto=format&fit=crop",
		},
		{
			name: "Awesome Widget",
			price: 24.99,
			imageUrl: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?q=80&w=1770&auto=format&fit=crop",
		},
		{
			name: "Super Thing",
			price: 99.99,
			imageUrl: "https://images.unsplash.com/photo-1556888335-23631cd2801a?q=80&w=1770&auto=format&fit=crop",
		},
		{
			name: "Generic Item",
			price: 19.99,
			imageUrl: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=1770&auto=format&fit=crop",
		},
	]);

	const campaigns = await db.Campaign.bulkCreate([
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

	const contents = [];
	for (const campaign of campaigns) {
		for (const section of [heroSection, footerSection]) {
			for (const lang of ["en", "cn", "my"] as const) {
				let content = "";
				if (section.type === "hero") {
					if (lang === "en")
						content = `<h1>Welcome to ${campaign.slug} (EN)</h1>`;
					if (lang === "cn")
						content = `<h1>欢迎来到 ${campaign.slug} (CN)</h1>`;
					if (lang === "my")
						content = `<h1>Selamat Datang ke ${campaign.slug} (MY)</h1>`;
				} else if (section.type === "footer") {
					if (lang === "en") content = `<p>&copy; 2025 (EN)</p>`;
					if (lang === "cn") content = `<p>&copy; 2025 (CN)</p>`;
					if (lang === "my") content = `<p>&copy; 2025 (MY)</p>`;
				}
				contents.push({
					campaignId: campaign.id,
					sectionId: section.id,
					language: lang,
					content: content,
				});
			}
		}
	}
	await db.SectionContent.bulkCreate(contents);

	const campaignProducts = [];
	for (const campaign of campaigns) {
		for (const product of products) {
			campaignProducts.push({
				campaignId: campaign.id,
				productId: product.id,
			});
		}
	}
	await db.CampaignProduct.bulkCreate(campaignProducts);

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
