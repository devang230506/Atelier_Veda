export type Project = {
  slug: string;
  title: string;
  category: string;
  location: string;
  area: string;
  year: string;
  summary: string;
  image: string;
  alt: string;
  gallery: { src: string; alt: string }[];
  palette: string[];
};

export const projects: Project[] = [
  {
    slug: "sabarmati-courtyard-house",
    title: "Sabarmati Courtyard House",
    category: "Residence · Concept study",
    location: "Ahmedabad, Gujarat",
    area: "4,800 sq ft",
    year: "2026",
    summary: "A timber-screened home arranged around a quiet courtyard, bringing filtered daylight and open air into the everyday rhythm of the house.",
    image: "https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?auto=format&fit=crop&w=1400&q=80",
    alt: "Warm contemporary living room with natural materials and soft daylight",
    gallery: [
      { src: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1280&q=80", alt: "Pale oak and stone details in a softly lit living room" },
      { src: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1280&q=80", alt: "Sunlight passing through a calm contemporary home" },
    ],
    palette: ["Lime plaster", "Oak", "Handmade brick"],
  },
  {
    slug: "varaha-penthouse",
    title: "Varaha Penthouse",
    category: "Apartment interior · Concept study",
    location: "Surat, Gujarat",
    area: "3,200 sq ft",
    year: "2026",
    summary: "Soft textiles, quiet stone and custom joinery temper the scale of a glass-wrapped city home.",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=80",
    alt: "Contemporary apartment living area with large windows and warm natural finishes",
    gallery: [
      { src: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1280&q=80", alt: "Quiet apartment interior in a pale stone and oak palette" },
      { src: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1280&q=80", alt: "Warm daylight across a refined residential interior" },
    ],
    palette: ["Travertine", "Brushed brass", "Linen"],
  },
  {
    slug: "tapi-riverside-studio",
    title: "Tapi Riverside Studio",
    category: "Workplace · Concept study",
    location: "Surat, Gujarat",
    area: "6,000 sq ft",
    year: "2026",
    summary: "A light-filled studio where timber, planted thresholds and acoustic surfaces make shared work feel calm.",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1400&q=80",
    alt: "Daylit open-plan studio with long work tables and indoor greenery",
    gallery: [
      { src: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1280&q=80", alt: "Shared studio workspace arranged around natural light" },
      { src: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1280&q=80", alt: "Collaborative workplace with long timber tables" },
    ],
    palette: ["Ash", "Sage", "Acoustic felt"],
  },
  {
    slug: "dune-villa",
    title: "Dune Villa",
    category: "Hospitality · Concept study",
    location: "Kutch, Gujarat",
    area: "9,500 sq ft",
    year: "2026",
    summary: "Low earthen volumes and shaded courts create a retreat shaped by the stillness of its landscape.",
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1400&q=80",
    alt: "Modern villa opening toward a landscape and reflecting pool",
    gallery: [
      { src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1280&q=80", alt: "Sun-washed villa living space opening to a terrace" },
      { src: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1280&q=80", alt: "Warm, tactile interior framed by natural light" },
    ],
    palette: ["Rammed earth", "Local stone", "Weathered timber"],
  },
  {
    slug: "linen-and-stone-flat",
    title: "Linen & Stone Flat",
    category: "Apartment interior · Concept study",
    location: "Vadodara, Gujarat",
    area: "1,400 sq ft",
    year: "2026",
    summary: "A compact plan made generous through built-in storage, clear sightlines and a restrained palette.",
    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1400&q=80",
    alt: "Compact apartment interior with a calm palette and built-in storage",
    gallery: [
      { src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1280&q=80", alt: "Compact living area with warm timber and soft neutral finishes" },
      { src: "https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?auto=format&fit=crop&w=1280&q=80", alt: "A bright residential interior with considered furniture" },
    ],
    palette: ["Linen", "Oak", "Pale limestone"],
  },
  {
    slug: "hillside-gallery",
    title: "Hillside Gallery",
    category: "Culture · Concept study",
    location: "Gandhinagar, Gujarat",
    area: "12,000 sq ft",
    year: "2026",
    summary: "A sequence of tactile concrete rooms follows the slope, with a precise ribbon of daylight guiding the visit.",
    image: "https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?auto=format&fit=crop&w=1400&q=80",
    alt: "Minimal gallery space with sculptural concrete walls and a quiet exhibition layout",
    gallery: [
      { src: "https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?auto=format&fit=crop&w=1280&q=80", alt: "Sculptural gallery interior and quiet exhibition space" },
      { src: "https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?auto=format&fit=crop&w=1280&q=80", alt: "Textural interior details and a restrained material palette" },
    ],
    palette: ["Board-formed concrete", "Oak", "Soft white light"],
  },
  {
    slug: "olive-court-residence",
    title: "Olive Court Residence",
    category: "Residence · Concept study",
    location: "Anand, Gujarat",
    area: "3,900 sq ft",
    year: "2026",
    summary: "A shaded garden court anchors a family home, with generous openings and quiet transitions between inside and out.",
    image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1400&q=80",
    alt: "Natural modern home with warm wood, stone and a garden-facing living room",
    gallery: [
      { src: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1280&q=80", alt: "A quiet contemporary home with a garden outlook" },
      { src: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1280&q=80", alt: "Material study of timber, stone and soft daylight" },
    ],
    palette: ["Local stone", "Oiled teak", "Garden green"],
  },
  {
    slug: "monsoon-house",
    title: "Monsoon House",
    category: "Residence · Concept study",
    location: "Bharuch, Gujarat",
    area: "5,200 sq ft",
    year: "2026",
    summary: "Deep verandahs, tactile plaster and sheltered thresholds make a home for slow mornings and the first rain.",
    image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1400&q=80",
    alt: "Softly lit residential interior with natural wood and layered textures",
    gallery: [
      { src: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1280&q=80", alt: "A warm living room with crafted furniture and layered textiles" },
      { src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1280&q=80", alt: "Natural materials and gentle daylight in a modern home" },
    ],
    palette: ["Lime plaster", "Smoked oak", "Aged bronze"],
  },
  {
    slug: "stillwater-retreat",
    title: "Stillwater Retreat",
    category: "Hospitality · Concept study",
    location: "Saputara, Gujarat",
    area: "8,600 sq ft",
    year: "2026",
    summary: "A small retreat follows the contours of its hillside setting, pairing sheltered rooms with long views and quiet rituals.",
    image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1400&q=80",
    alt: "A contemporary hillside retreat framed by trees and landscape",
    gallery: [
      { src: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1280&q=80", alt: "A modern retreat with a quiet poolside view" },
      { src: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1280&q=80", alt: "A calm interior palette of pale stone and natural timber" },
    ],
    palette: ["Earth-render", "River stone", "Linen"],
  },
  {
    slug: "common-ground-studio",
    title: "Common Ground Studio",
    category: "Workplace · Concept study",
    location: "Ahmedabad, Gujarat",
    area: "4,100 sq ft",
    year: "2026",
    summary: "A flexible studio brings focused work and shared exchange together through warm timber, planted edges and adaptable rooms.",
    image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1400&q=80",
    alt: "Contemporary shared studio with natural light, desks and indoor plants",
    gallery: [
      { src: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1280&q=80", alt: "Open studio workspace with long shared tables" },
      { src: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1280&q=80", alt: "Collaborative office interior with natural materials" },
    ],
    palette: ["White oak", "Sage", "Woven acoustic panels"],
  },
];
