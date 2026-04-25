import { LINKS } from "./constants";

export const profile = {
  name: "Andrew Henrice",
  role: "Software developer, founder, traveler, and photographer",
  shortRole: "Software developer and founder",
  origin: "Brazil",
  location: "South Korea",
  email: "andrewhenrice@dawnwebs.com",
  emailHref: LINKS.email,
  companyName: "Dawn Labs & Dawn Web",
  companyUrl: "https://dawnwebs.com",
  description:
    "Andrew Henrice is a Brazilian software developer based in South Korea, building thoughtful web experiences while writing, traveling, and photographing the world along the way.",
  links: LINKS,
  sameAs: [LINKS.github, LINKS.linkedin, LINKS.instagram, LINKS.twitter],
};

export const navigation = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blog" },
  { href: "/travel", label: "Travel" },
  { href: "/photography", label: "Photography" },
  { href: "/contact", label: "Contact" },
];
