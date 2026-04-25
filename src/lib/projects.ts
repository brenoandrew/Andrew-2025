export type Project = {
  title: string;
  href: string;
  description: string;
  tags: string[];
  status: string;
  image?: string;
  label?: string;
};

export const featuredProjects: Project[] = [
  {
    title: "Dawn Labs & Dawn Web",
    href: "https://dawnwebs.com",
    description:
      "A creative technology studio focused on practical web products, strong user experience, and tools that help people move ideas into the world.",
    tags: ["Founder", "Web", "Product", "UX"],
    status: "Building now",
    image: "/portfolio/work-abstract-01.png",
    label: "Studio",
  },
];
