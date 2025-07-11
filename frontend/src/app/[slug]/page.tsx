import { Campaign, Section } from "@/types";
import Hero from "@/components/Hero";
import ProductList from "@/components/ProductList";
import Footer from "@/components/Footer";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { headers } from "next/headers";

export const dynamic = "force-dynamic";

async function getCampaign(
  slug: string,
  lang: string
): Promise<Campaign | null> {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const res = await fetch(
      `${apiUrl}/api/campaigns/slug/${slug}?lang=${lang}`,
      { cache: "no-store" } // Disable cache for development
    );

    if (!res.ok) {
      return null;
    }
    return res.json();
  } catch (error) {
    console.error("Failed to fetch campaign:", error);
    return null;
  }
}

const SectionComponent = ({
  section,
  products,
}: {
  section: Section;
  products: Campaign["products"];
}) => {
  switch (section.type) {
    case "hero":
      return <Hero section={section} />;
    case "product-list":
      return <ProductList products={products} />;
    case "footer":
      return <Footer section={section} />;
    default:
      return null;
  }
};

export default async function CampaignPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  headers(); // Opt into dynamic rendering

  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;

  const lang =
    typeof resolvedSearchParams.lang === "string"
      ? resolvedSearchParams.lang
      : "en";
  const campaign = await getCampaign(resolvedParams.slug, lang);

  if (!campaign) {
    return <div className="text-center py-10">Campaign not found.</div>;
  }

  return (
    <main className="flex flex-col min-h-screen bg-white">
      <LanguageSwitcher />
      {campaign.template.sections
        .sort((a, b) => a.id - b.id) // Simple sort by id
        .map((section) => (
          <SectionComponent
            key={section.id}
            section={section}
            products={campaign.products}
          />
        ))}
    </main>
  );
}
