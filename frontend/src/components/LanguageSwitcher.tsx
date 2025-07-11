"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";

const LanguageSwitcher = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentLang = searchParams.get("lang") || "en";

  const handleLanguageChange = (newLang: string) => {
    const params = new URLSearchParams(searchParams);
    if (newLang === "en") {
      params.delete("lang"); // Remove lang param for default English
    } else {
      params.set("lang", newLang);
    }

    const queryString = params.toString();
    const newUrl = queryString ? `${pathname}?${queryString}` : pathname;
    router.push(newUrl);
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      <select
        value={currentLang}
        onChange={(e) => handleLanguageChange(e.target.value)}
        className="bg-black border border-gray-300 rounded-md px-3 py-2 text-sm shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="en">English</option>
        <option value="my">Bahasa Malaysia</option>
        <option value="cn">中文</option>
      </select>
    </div>
  );
};

export default LanguageSwitcher;
