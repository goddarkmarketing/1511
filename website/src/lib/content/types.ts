export type Experience = {
  slug: string;
  title: string;
  nickname: string;
  boat: string;
  duration: string;
  capacity: string;
  price: string;
  agentPrice: string;
  longtailPrice: string;
  timeWindows: string[];
  stops: string;
  tags: string[];
  summary: string;
  image: string;
  gallery: string[];
  bestFor: string[];
  highlights: string[];
  itinerary: { time: string; detail: string }[];
  includes: string[];
  meetingPoint: string;
  travelTime: string;
  notes: string[];
};

export type Boat = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  longDescription: string;
  image: string;
  gallery: string[];
  features: string[];
  highlights: { title: string; detail: string }[];
  specs: { label: string; value: string }[];
  idealFor: string[];
};

export type Destination = {
  slug: string;
  name: string;
  blurb: string;
  subtitle: string;
  image: string;
  gallery: string[];
  bestFor: string[];
  bestTime: string;
  howToGetThere: string;
  recommendedBoat: string;
  about: string[];
  relatedExperienceSlugs: string[];
};

export type JournalPost = {
  slug: string;
  title: string;
  tag: string;
  date: string;
  image: string;
  excerpt: string;
  body: string[];
};

export type AddOn = {
  id: string;
  name: string;
  price: string;
  detail: string;
};

export type SiteContent = {
  philosophies: { title: string; description: string }[];
  experiences: Experience[];
  boats: Boat[];
  longtailRates: { program: string; duration: string; price: string }[];
  transferRoutes: { from: string; to: string; price: string }[];
  transferNotes: string[];
  guestPolicy: string[];
  parkFees: { guest: string; fee: string }[];
  bookingTerms: { title: string; detail: string }[];
  whatToBring: string[];
  pierInfo: { label: string; value: string }[];
  trustPoints: { title: string; detail: string }[];
  responsibleGuidelines: { title: string; detail: string }[];
  partnerProperties: { name: string; note: string }[];
  serviceAreas: string[];
  destinations: Destination[];
  travelStyles: { title: string; detail: string }[];
  testimonials: { quote: string; name: string; place: string }[];
  addOns: AddOn[];
  journalPosts: JournalPost[];
  faqs: { q: string; a: string }[];
};
