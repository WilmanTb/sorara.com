export type ProjectCategory = "Website" | "Web Application" | "Mobile Application" | "Business System";

export type Project = {
  slug: string;
  title: string;
  category: ProjectCategory;
  shortDescription: string;
  overview: string;
  problem: string;
  solution: string;
  technologies: string[];
  features: string[];
  color: string;
  image: string;
  imageAlt: string;
};

export const projects: Project[] = [
  {
    slug: "shopora",
    title: "Shopora",
    category: "Web Application",
    shortDescription: "A warmer, more considered way to discover things worth keeping.",
    overview: "Shopora is a concept storefront that makes independent homeware feel as special online as it does in person. Thoughtful editorial, an easy-to-browse catalog, and a calm checkout keep the focus on the objects.",
    problem: "Online stores often make browsing feel like sorting through an endless shelf. Independent shops need a digital experience that feels curated without making the basics hard to find.",
    solution: "We imagined a quietly confident storefront with expressive product storytelling, clear paths through the catalog, and a checkout that stays out of the way.",
    technologies: ["Next.js", "TypeScript", "Stripe concept", "Responsive UI"],
    features: ["Curated product catalog", "Editorial product details", "Cart and checkout concept", "Order management view"],
    color: "#d8c6a9",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1400&q=85",
    imageAlt: "A thoughtfully styled collection of neutral clothing and accessories",
  },
  {
    slug: "manageflow",
    title: "ManageFlow",
    category: "Business System",
    shortDescription: "A calmer command center for the moving parts of a growing business.",
    overview: "ManageFlow is a concept business management workspace that brings tasks, team activity, and reporting into one clear view. It is designed to turn operational noise into a useful picture of what needs attention.",
    problem: "As teams grow, information gets scattered across spreadsheets, messages, and disconnected tools. It becomes harder to see the whole picture and easier for small tasks to slip.",
    solution: "A focused dashboard makes priorities visible, connects everyday workflows, and keeps reporting legible for the people making decisions.",
    technologies: ["Next.js", "TypeScript", "SQL Server concept", "Dashboard UX"],
    features: ["At-a-glance business metrics", "Workflow and task tracking", "Team activity overview", "Reporting dashboard concept"],
    color: "#b7ff6b",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1400&q=85",
    imageAlt: "A clean desk with a laptop displaying analytics charts",
  },
  {
    slug: "dinenow",
    title: "DineNow",
    category: "Website",
    shortDescription: "A neighborhood restaurant with a little more room to whet your appetite.",
    overview: "DineNow is a concept website for a neighborhood restaurant built around good food and good company. It brings the menu, reservation path, and essential visit details together in one inviting place.",
    problem: "A restaurant's digital home should make people hungry and make planning a visit effortless. Too often the menu, hours, and booking details are buried or out of date.",
    solution: "An editorial, image-led experience gives the food the spotlight while keeping reservations, location, and hours close at hand.",
    technologies: ["Next.js", "TypeScript", "Responsive design", "Accessibility"],
    features: ["Restaurant landing page", "Menu presentation", "Reservation interface concept", "Location and contact details"],
    color: "#ff8b75",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1400&q=85",
    imageAlt: "Warmly lit restaurant dining room ready for dinner service",
  },
  {
    slug: "gather-church",
    title: "Gather Church",
    category: "Website",
    shortDescription: "A welcoming digital home for a neighborhood church and its community.",
    overview: "Gather Church is a fictional website concept designed to help a local congregation welcome newcomers and keep its community connected. Service details, events, and sermon resources share one calm, approachable home.",
    problem: "People looking for a church often need simple answers first: when to come, what to expect, and where to find community. Those details can be hard to locate across scattered pages and social posts.",
    solution: "A warm, accessible website brings visit information, community events, ministry groups, and sermon resources into a clear experience for first-time visitors and regular members alike.",
    technologies: ["Next.js", "TypeScript", "CMS concept", "Accessibility"],
    features: ["Service times and first-visit guide", "Community events calendar", "Sermon and media library", "Ministry and community group directory"],
    color: "#d8c8b8",
    image: "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?auto=format&fit=crop&w=1400&q=85",
    imageAlt: "Sunlight illuminating the interior of a church",
  },
  {
    slug: "brightpath-school",
    title: "Brightpath School",
    category: "Website",
    shortDescription: "A cheerful, clear first step into a school community.",
    overview: "Brightpath School is a fictional school website concept that helps families explore the school's learning approach, admissions, calendar, and parent resources in one welcoming place.",
    problem: "Families need trustworthy school information while comparing options, but key details like admissions, school life, and calendars are often scattered across pages and documents.",
    solution: "A friendly, organized website gives prospective families a clear path to admissions information and gives current families one dependable place for updates and resources.",
    technologies: ["Next.js", "TypeScript", "CMS concept", "Responsive design"],
    features: ["Admissions and enrollment information", "School calendar and announcements", "Learning approach and campus overview", "Parent and student resource hub"],
    color: "#c5dfd4",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1400&q=85",
    imageAlt: "A bright classroom arranged for a day of learning",
  },
  {
    slug: "harborlight-hotel",
    title: "Harborlight Hotel",
    category: "Website",
    shortDescription: "A slower, sunlit stay with room to make yourself at home.",
    overview: "Harborlight Hotel is a fictional boutique hotel website concept designed to make planning a restorative stay feel as thoughtful as the visit itself. Guests can explore rooms, discover amenities, and check sample availability in one calm experience.",
    problem: "Hotel websites can make it difficult to compare rooms, understand what is included, or feel confident about the experience before booking.",
    solution: "A warm editorial website pairs clear room details and amenities with an easy-to-use availability preview and direct access to essential stay information.",
    technologies: ["Next.js", "TypeScript", "Responsive design", "Booking UX concept"],
    features: ["Room and suite discovery", "Amenity and stay information", "Guest and date availability preview", "Booking flow concept with demo-only confirmation"],
    color: "#c7d6e5",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1400&q=85",
    imageAlt: "A tranquil boutique hotel courtyard with a swimming pool",
  },
];

export const projectCategories = ["All", "Website", "Web Application", "Mobile Application", "Business System"] as const;