import { Section } from "@/types";

interface FooterProps {
  section: Section;
}

const Footer = ({ section }: FooterProps) => {
  const content = section.contents?.[0]?.content;
  if (!content) return null;

  const { text } = content;

  return (
    <footer className="bg-gray-800 text-white p-4 text-center mt-auto">
      <p>{text}</p>
    </footer>
  );
};

export default Footer;
