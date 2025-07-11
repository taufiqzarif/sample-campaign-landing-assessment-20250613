export interface Product {
  id: number;
  name: string;
  price: string;
  imageUrl: string;
}

export interface SectionContent {
  id: number;
  campaignId: number;
  sectionId: number;
  language: "en" | "my";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  content: any;
}

export interface Section {
  id: number;
  name: string;
  type: "hero" | "product-list" | "footer";
  contents: SectionContent[];
}

export interface Template {
  id: number;
  name: string;
  sections: Section[];
}

export interface Campaign {
  id: number;
  name: string;
  slug: string;
  template: Template;
  products: Product[];
}
