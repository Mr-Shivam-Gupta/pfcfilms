/** Site-wide constants from client (PFC FILMS Production House & Institute) */

export const SITE = {
  name: "PFC FILMS",
  tagline: "PFC Films Production House & Institute",
  directorName: "Pramod Kumar Gupta",
  directorTitle: "Director / Producer / Writer / DOP / Actor",
} as const;

export const ADDRESS = {
  landmark: "K, Get K Samne",
  line1: "110/237, Jawahar Nagar Rd, Kamla Nehru Park",
  locality: "Kanpur",
  region: "Uttar Pradesh",
  postalCode: "208012",
  country: "India",
  /** Full single-line for display */
  full: "K, Get K Samne, 110/237, Jawahar Nagar Rd, Kamla Nehru Park, Kanpur, Uttar Pradesh 208012, India",
  /** Short for footers / compact UI */
  short: "110/237, Jawahar Nagar Rd, Kamla Nehru Park, Kanpur, UP 208012",
} as const;

export const GOOGLE_MAPS_URL =
  "https://www.google.com/maps?daddr=110%2F237%2C+Jawahar+Nagar+Rd%2C+Kamla+Nehru+Park%2C+Kanpur%2C+Uttar+Pradesh+208012";

export const SOCIAL = {
  youtube: "https://www.youtube.com/@pfcfilmsproductionhousemum3450",
  facebook: "https://www.facebook.com/pfc.films/",
  instagram: "https://www.instagram.com/pfcfilms/",
  justdial:
    "https://www.justdial.com/Kanpur/Pfc-Films-Barra/0512PX512-X512-200104174025-X1D8_BZDET",
} as const;

export const PHONE = "8176000084";
export const PHONE_DISPLAY = "81760 00084";
export const PHONE_E164 = "+918176000084";

/** Production house definition (from Director Pramod Gupta) */
export const PRODUCTION_HOUSE_DESCRIPTION =
  "A production house is that organization which gets a movie made. It basically is a team of people with different talents who pool in their resources and use them to produce the best piece of art. They also provide the necessary finances that are required to make the film.";

/** What PFC FILMS produces */
export const PRODUCES = [
  "Movies",
  "Short films",
  "Web series",
  "Music & music albums",
  "Ad films",
  "Documentaries",
  "Hindi albums",
  "Reality TV shows",
  "Bhojpuri albums",
  "Live shows",
  "TV shows",
] as const;

/** What PFC FILMS teaches */
export const TEACHES = [
  "Acting",
  "Modeling",
  "Dancing",
  "Singing",
  "Videography",
  "Cinematography",
  "Video editing",
  "Photography",
  "Camera",
  "Light",
  "Mixing",
] as const;

export const GOOGLE_REVIEWS = { rating: 4.9, count: 133 } as const;
