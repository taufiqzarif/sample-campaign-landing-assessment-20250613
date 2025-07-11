import { Section } from "@/types";

interface HeroProps {
  section: Section;
}

const Hero = ({ section }: HeroProps) => {
  const content = section.contents?.[0]?.content;
  if (!content) return null;

  const { title, subtitle, imageUrl } = content;

  return (
    <div
      className="relative bg-cover bg-center text-white py-24 px-10 object-fill"
      style={{ backgroundImage: `url(${imageUrl})` }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 text-center">
        <h1 className="text-4xl font-bold md:text-6xl">{title}</h1>
        <p className="mt-4 text-lg md:text-xl">{subtitle}</p>
      </div>
    </div>
  );
};

export default Hero;
