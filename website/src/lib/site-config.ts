export const siteUrl = "https://www.trangvoyage.com";

export const contact = {
  line: "https://line.me/R/ti/p/@trangvoyage",
  whatsapp: "https://wa.me/660805199906",
  phone: "0805199906",
  phoneHref: "tel:+66805199906",
  email: "trangvoyage@gmail.com",
  facebook: "https://www.facebook.com/share/1StfJeEqyw/",
  instagram: "https://www.instagram.com/trangvoyage",
  tiktok: "https://www.tiktok.com/@trang.voyage0",
  maps: "https://maps.app.goo.gl/dN87mAVATopunMpU6",
};

/**
 * Base guest count for package pricing.
 * Program Speedboat rate card states 1-8 guests; the website brief states 6.
 * Confirm with the owner before publishing, then change this single value.
 */
export const pricingConfig = {
  baseGuests: 8,
  maxGuests: 14,
  extraAdultSpeedboat: 1000,
  extraChildSpeedboat: 600,
  extraAdultLongtail: 700,
  extraChildLongtail: 500,
  depositRate: 0.5,
};

/** Demo payment details. Replace with real merchant data before going live. */
export const paymentConfig = {
  isMock: true,
  promptPayId: "080-519-9906",
  bankName: "Kasikorn Bank",
  bankAccountName: "Trang Voyage Co., Ltd.",
  bankAccountNumber: "123-4-56789-0",
  methods: ["promptpay", "transfer", "card"] as const,
};

export type PaymentMethod = (typeof paymentConfig.methods)[number];

export const heroImages = {
  home: "/images/hero/aerial.jpg",
  experiences: "/images/hero/sea.jpg",
  boats: "/images/boats/speedboat.png",
  destinations: "/images/destinations/laoliang.jpg",
  plan: "/images/hero/sunset.jpg",
  journal: "/images/hero/cave.jpg",
  about: "/images/hero/aerial.jpg",
  contact: "/images/hero/sunset.jpg",
  faq: "/images/destinations/mook.jpg",
  reviews: "/images/destinations/kradan.jpg",
  transfers: "/images/boats/speedboat-2.png",
  bookingInfo: "/images/hero/cliff.jpg",
  partners: "/images/destinations/libong.jpg",
  responsible: "/images/destinations/rok-2.jpg",
  checkout: "/images/destinations/kradan-2.jpg",
};
