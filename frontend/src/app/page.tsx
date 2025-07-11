import Link from "next/link";
import { Campaign } from "@/types";

async function getCampaigns(): Promise<Campaign[]> {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const res = await fetch(`${apiUrl}/api/campaigns`, {
      cache: "no-store",
    });
    if (!res.ok) {
      return [];
    }
    return res.json();
  } catch (error) {
    console.error("Failed to fetch campaigns:", error);
    return [];
  }
}

export default async function Home() {
  const campaigns = await getCampaigns();

  return (
    <div className="bg-gray-50 min-h-screen">
      <main className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Campaign Management System
          </h1>
          <p className="mt-4 text-lg leading-8 text-gray-600">
            Welcome! Below is a list of all available campaigns.
          </p>
        </div>

        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="px-4 py-5 sm:px-6">
            <h2 className="text-xl font-semibold text-gray-800">
              Available Campaigns
            </h2>
          </div>
          <ul role="list" className="divide-y divide-gray-200">
            {campaigns.length > 0 ? (
              campaigns.map((campaign) => (
                <li key={campaign.id}>
                  <Link
                    href={`/${campaign.slug}`}
                    className="block hover:bg-gray-50"
                  >
                    <div className="px-4 py-4 sm:px-6">
                      <div className="flex items-center justify-between">
                        <p className="text-lg font-medium text-indigo-600 truncate">
                          {campaign.name}
                        </p>
                        <div className="ml-2 flex-shrink-0 flex">
                          <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            /{campaign.slug}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                </li>
              ))
            ) : (
              <li className="px-4 py-4 sm:px-6">
                <p className="text-gray-500">
                  No campaigns found. Run the seeder in the backend to populate
                  the database.
                </p>
              </li>
            )}
          </ul>
        </div>
      </main>
    </div>
  );
}
