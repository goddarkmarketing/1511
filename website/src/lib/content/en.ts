import type { SiteContent } from "./types";

const sharedIncludes = [
  "Private SR29 speedboat with captain and 2 staff",
  "Local guide throughout the trip",
  "Drinking water, ice, coconut, soft drinks",
  "Snacks, fruit, Thai tea and sandwiches",
  "Life jackets, snorkel masks and mouthpieces",
  "Towels and cushion set for bow photos",
  "JBL Marine sound system on board",
  "Stand-up paddle board",
  "Travel insurance",
];

const sharedNotes = [
  "National park fees are not included: THB 40 for Thai guests, THB 200 for foreign guests (THB 400 for foreign guests on Koh Rok).",
  "Program may change with weather, sea conditions and safety. The captain's decision is final.",
  "No seafood brought on board and no smoking inside the boat.",
];

export const en: SiteContent = {
  philosophies: [
    { title: "Private", description: "Your boat. Your people. Your pace." },
    { title: "Personal", description: "A journey designed around you." },
    { title: "Local", description: "Discover Trang beyond the usual route." },
    { title: "Premium", description: "Thoughtful service from sea to shore." },
  ],

  experiences: [
    {
      slug: "koh-kradan-escape",
      title: "Koh Kradan Escape",
      nickname: "Quiet mornings, private beaches",
      boat: "Private Speedboat",
      duration: "Half Day / 5 hrs",
      capacity: "Base price 1-8 guests",
      price: "9,900",
      agentPrice: "8,910",
      longtailPrice: "4,990",
      timeWindows: ["Morning 08:00 - 13:00", "Sunset 14:00 - 19:00"],
      stops: "2 beaches, 1 snorkel stop",
      tags: ["Beach", "Snorkeling", "Half Day"],
      summary:
        "Crystal-clear water, white sand, and a private morning or sunset pace on Koh Kradan.",
      image: "/images/experiences/kradan-escape.jpg",
      gallery: [
        "/images/destinations/kradan.jpg",
        "/images/destinations/kradan-2.jpg",
        "/images/hero/aerial.jpg",
      ],
      bestFor: ["Couples", "Families", "First visit to Trang"],
      highlights: [
        "Koh Kradan main beach with the branch and swing photo spots",
        "Bow photos over the shallow reef line at Ao Phai",
        "Snorkel at Ao Niang - staghorn coral and clownfish",
        "Secret sunset beach with almost no other visitors",
      ],
      itinerary: [
        {
          time: "07:45 / 13:45",
          detail:
            "Check in at the orange administration building, Hat Yao Pier, Trang.",
        },
        {
          time: "08:00 / 14:00",
          detail:
            "Depart by private speedboat. Your guide introduces the route toward Koh Kradan.",
        },
        {
          time: "08:30 / 14:30",
          detail:
            "Arrive Koh Kradan. Fine white sand and the popular branch and swing photo spots, quiet in the early hours.",
        },
        {
          time: "09:30 / 15:30",
          detail: "Bow photos above the shallow reef line at Ao Phai.",
        },
        {
          time: "10:00 / 16:00",
          detail:
            "Snorkel at Ao Niang - staghorn coral, cabbage coral and schools of clownfish.",
        },
        {
          time: "11:00 / 17:00",
          detail:
            "Secret sunset beach for private relaxing, with Thai tea and sandwiches served on board.",
        },
        { time: "12:30 / 18:30", detail: "Arrive back at Hat Yao Pier." },
      ],
      includes: sharedIncludes,
      meetingPoint: "Hat Yao Pier, Trang (orange administration building)",
      travelTime: "About 20 minutes from Hat Yao Pier",
      notes: [
        "The half-day Koh Kradan program does not include a lunch box.",
        ...sharedNotes,
      ],
    },
    {
      slug: "trang-sea-emerald-cave",
      title: "Trang Sea & Emerald Cave",
      nickname: "2 islands, 4 stops",
      boat: "Private Speedboat",
      duration: "Full Day / 6 hrs",
      capacity: "Base price 1-8 guests",
      price: "13,900",
      agentPrice: "12,510",
      longtailPrice: "6,990",
      timeWindows: ["09:00 - 15:00"],
      stops: "2 beaches, 2 snorkel stops, Emerald Cave",
      tags: ["Cave", "Snorkeling", "Full Day"],
      summary:
        "Explore Koh Mook's Emerald Cave and the quieter corners of the Trang Sea.",
      image: "/images/experiences/emerald-cave.jpg",
      gallery: [
        "/images/destinations/mook.jpg",
        "/images/destinations/emerald.jpg",
        "/images/hero/cave.jpg",
      ],
      bestFor: ["Adventure", "Photography", "Friends"],
      highlights: [
        "Emerald Cave - an Unseen Thailand swim-through to a hidden beach",
        "Koh Kradan beach time plus Ao Phai bow photos",
        "Two snorkel stops including Khon Mai Khao or Tiger Cave",
        "Full-day rhythm with a lunch box on a quiet beach",
      ],
      itinerary: [
        {
          time: "08:45",
          detail:
            "Check in at the orange administration building, Hat Yao Pier, Trang.",
        },
        {
          time: "09:00",
          detail:
            "Depart by private speedboat toward Koh Kradan and the Emerald Cave.",
        },
        {
          time: "09:30",
          detail:
            "Arrive Koh Kradan for clear water, white sand and the popular photo spots.",
        },
        { time: "10:15", detail: "Bow photos over the shallow reef at Ao Phai." },
        {
          time: "11:00",
          detail: "Snorkel at Ao Niang - staghorn coral and clownfish.",
        },
        {
          time: "11:30",
          detail: "Secret beach for a private lunch box prepared on board.",
        },
        {
          time: "12:30",
          detail: "Cruise to the Emerald Cave at Koh Mook (15 minutes).",
        },
        {
          time: "13:00",
          detail:
            "Emerald Cave - swim in to see the emerald water inside the sea cave.",
        },
        { time: "14:00", detail: "Snorkel at Khon Mai Khao or Tiger Cave." },
        { time: "15:00", detail: "Arrive back at Hat Yao Pier." },
      ],
      includes: [...sharedIncludes, "Lunch box"],
      meetingPoint: "Hat Yao Pier, Trang (orange administration building)",
      travelTime: "About 20 minutes to Koh Kradan, 15 minutes on to Koh Mook",
      notes: ["Emerald Cave access depends on tide and swell.", ...sharedNotes],
    },
    {
      slug: "koh-laoliang-escape",
      title: "Koh Laoliang Escape",
      nickname: "The hidden island of Trang",
      boat: "Private Speedboat",
      duration: "Full Day / 6 hrs",
      capacity: "Base price 1-8 guests",
      price: "13,900",
      agentPrice: "12,510",
      longtailPrice: "6,990",
      timeWindows: ["09:00 - 15:00"],
      stops: "2 beaches, 1 snorkel stop, squid fishing",
      tags: ["Cliffs", "Scenic", "Full Day"],
      summary:
        "Dramatic limestone cliffs and open Andaman views on a private full-day escape.",
      image: "/images/experiences/laoliang.jpg",
      gallery: [
        "/images/destinations/laoliang.jpg",
        "/images/destinations/laoliang-2.jpg",
        "/images/hero/cliff.jpg",
      ],
      bestFor: ["Couples", "Scenic lovers", "Content creators"],
      highlights: [
        "Squid fishing with sashimi prepared on board",
        "The Laoliang tunnel - a genuinely unseen photo spot",
        "Beach picnic setup with paddle boarding",
        "Snorkel at Laoliang Nong with reef fish and clownfish",
      ],
      itinerary: [
        {
          time: "08:45",
          detail:
            "Check in at the orange administration building, Hat Yao Pier, Trang.",
        },
        {
          time: "09:00",
          detail:
            "Depart toward Koh Laoliang, a small and little-known island south of Trang.",
        },
        {
          time: "09:45",
          detail:
            "Squid fishing to prepare sashimi on board. Results vary with daily conditions.",
        },
        {
          time: "10:45",
          detail: "Photos at the Laoliang tunnel and cave atmosphere.",
        },
        {
          time: "11:30",
          detail:
            "Bow photos with the Laoliang backdrop - a private-island feeling with very few people.",
        },
        {
          time: "12:00",
          detail:
            "Lunch box at Laoliang Pee with a small beach picnic setup and paddle boarding.",
        },
        {
          time: "13:00",
          detail: "Snorkel around Laoliang Nong to see reef fish and clownfish.",
        },
        { time: "14:00", detail: "Depart back to Hat Yao Pier." },
        { time: "15:00", detail: "Arrive back at the pier." },
      ],
      includes: [...sharedIncludes, "Lunch box", "Beach picnic setup"],
      meetingPoint: "Hat Yao Pier, Trang (orange administration building)",
      travelTime: "About 30 minutes from Hat Yao Pier",
      notes: [
        "Squid fishing depends on weather and daily conditions.",
        ...sharedNotes,
      ],
    },
    {
      slug: "koh-rok-expedition",
      title: "Koh Rok Expedition",
      nickname: "Queen of the Andaman",
      boat: "Private Speedboat",
      duration: "Full Day / 7 hrs",
      capacity: "Base price 1-8 guests",
      price: "17,900",
      agentPrice: "16,110",
      longtailPrice: "9,490",
      timeWindows: ["09:00 - 16:00"],
      stops: "2 beaches, 3 snorkel stops",
      tags: ["Snorkeling", "Marine", "Expedition"],
      summary:
        "A full-day private expedition for snorkeling, marine life, and wide beach time.",
      image: "/images/experiences/rok.jpg",
      gallery: [
        "/images/destinations/rok.jpg",
        "/images/destinations/rok-2.jpg",
        "/images/hero/sea.jpg",
      ],
      bestFor: ["Snorkelers", "Families", "Longer day seekers"],
      highlights: [
        "Three snorkel stops - the richest water on our route",
        "Ao Man Sai reef with brain coral and reef fish",
        "Laem Lak Khet, known for clear water and parrotfish",
        "White sand and wide beach time at Rok Nai",
      ],
      itinerary: [
        {
          time: "08:45",
          detail:
            "Check in at the orange administration building, Hat Yao Pier, Trang.",
        },
        {
          time: "09:00",
          detail:
            "Depart toward Koh Rok, the island known as the Queen of the Andaman.",
        },
        {
          time: "09:50",
          detail: "Arrive for white sand, clear blue water and island scenery.",
        },
        {
          time: "10:50",
          detail: "Snorkel at Rok Nok, Ao Man Sai - reef fish and brain coral.",
        },
        {
          time: "11:50",
          detail:
            "Snorkel at Laem Lak Khet, known for clear water and parrotfish.",
        },
        { time: "12:50", detail: "Lunch box on the beach at Rok Nai." },
        {
          time: "14:30",
          detail: "Final snorkel stop at the island between Rok Nok and Rok Nai.",
        },
        { time: "15:00", detail: "Depart back to Hat Yao Pier." },
        { time: "16:00", detail: "Arrive back at the pier." },
      ],
      includes: [...sharedIncludes, "Lunch box"],
      meetingPoint: "Hat Yao Pier, Trang (orange administration building)",
      travelTime: "About 50 minutes from Hat Yao Pier",
      notes: [
        "Foreign guests pay THB 400 national park fee on the Koh Rok program.",
        "Longer sea transfer - best in fair conditions.",
        ...sharedNotes,
      ],
    },
  ],

  boats: [
    {
      id: "speedboat",
      name: "Private Premium Speedboat",
      tagline: "Go Further. See More. Experience More.",
      description:
        "SR29 with Suzuki 250HP - quiet, content-friendly, and built for couples, families, and private groups who want more time at sea.",
      longDescription:
        "Our private premium speedboat is designed for guests who want comfort, range, and privacy. With a new Suzuki 250HP engine, rear swim platform, freshwater rinse, and premium seating, it is ideal for half-day escapes and full-day expeditions across the Trang Sea.",
      image: "/images/boats/speedboat.png",
      gallery: [
        "/images/boats/speedboat.png",
        "/images/boats/speedboat-2.png",
        "/images/hero/aerial.jpg",
      ],
      features: [
        "Up to 14 guests",
        "Rear swim platform",
        "Rear platform seating",
        "Freshwater rinse",
        "Premium seats and pillows",
        "Toilet and changing room",
        "JBL Marine sound",
        "Captain and 2 staff",
      ],
      highlights: [
        {
          title: "New boat, new engine",
          detail:
            "A new Suzuki 250HP engine runs quietly, rides comfortably, and avoids fuel smell on board.",
        },
        {
          title: "Rear swim platform",
          detail:
            "Safer entry and exit from the water, ideal for snorkeling and swimming.",
        },
        {
          title: "Rear platform seating",
          detail: "Seating at the rear platform for resting, photos and views.",
        },
        {
          title: "Premium seating",
          detail:
            "New seats with premium pillows for a more comfortable, more luxurious feel.",
        },
        {
          title: "Toilet and changing room",
          detail: "Added comfort and convenience for guests during the trip.",
        },
        {
          title: "Freshwater rinse",
          detail: "Rinse off after snorkeling or swimming in the sea.",
        },
        {
          title: "JBL Marine sound",
          detail: "Full-boat sound system for the atmosphere you want.",
        },
        {
          title: "Comfort and privacy",
          detail:
            "Built around comfort and privacy - well suited to couples, families and international guests.",
        },
        {
          title: "Content-friendly design",
          detail: "A layout designed for photography and social media content.",
        },
      ],
      specs: [
        { label: "Boat", value: "SR29" },
        { label: "Engine", value: "Suzuki 250HP" },
        { label: "Maximum capacity", value: "14 guests" },
        { label: "Crew", value: "Captain + 2 staff" },
        { label: "Base package", value: "1-8 guests" },
        { label: "Extra adult", value: "THB 1,000 per person" },
        { label: "Extra child", value: "THB 600 per person" },
      ],
      idealFor: ["Couples", "Families", "Friends", "Flexible travellers"],
    },
    {
      id: "longtail",
      name: "Premium Longtail Boat",
      tagline: "Slow Down. Feel the Sea.",
      description:
        "A slower, more local rhythm for photography, couples, and travellers who want the sea without the rush.",
      longDescription:
        "Premium longtail is for guests who prefer atmosphere over distance. It suits slow travel, sunset light, local coastal character, and intimate groups who want the journey itself to feel like part of the experience.",
      image: "/images/boats/longtail.jpg",
      gallery: [
        "/images/boats/longtail.jpg",
        "/images/boats/longtail-2.jpg",
        "/images/hero/sunset.jpg",
      ],
      features: [
        "Half and full day",
        "Local atmosphere",
        "Sunset friendly",
        "Relaxed pace",
        "Photo moments",
        "Intimate groups",
      ],
      highlights: [
        {
          title: "Slow travel pace",
          detail:
            "A gentler rhythm where the journey itself is part of the experience.",
        },
        {
          title: "Local character",
          detail:
            "The coastal atmosphere of Trang, closer to shore and closer to daily life.",
        },
        {
          title: "Sunset light",
          detail:
            "Well suited to golden hour, photography and quiet couples time.",
        },
      ],
      specs: [
        { label: "Style", value: "Premium longtail" },
        { label: "Pace", value: "Slow / scenic" },
        { label: "Best for", value: "Couples and photography" },
        { label: "Extra adult", value: "THB 700 per person" },
        { label: "Extra child", value: "THB 500 per person" },
      ],
      idealFor: ["Couples", "Slow travel", "Photography", "Relaxation"],
    },
  ],

  longtailRates: [
    {
      program: "Koh Kradan Escape",
      duration: "Half Day (08:00-13:00 / 14:00-19:00)",
      price: "4,990",
    },
    {
      program: "Koh Kradan Escape",
      duration: "Full Day (09:00-15:30)",
      price: "5,990",
    },
    {
      program: "Trang Sea & Emerald Cave",
      duration: "Full Day (09:00-15:30)",
      price: "6,990",
    },
    {
      program: "Koh Laoliang Escape",
      duration: "Full Day (09:00-15:30)",
      price: "6,990",
    },
    {
      program: "Koh Rok Expedition",
      duration: "Full Day (09:00-16:00)",
      price: "9,490",
    },
  ],

  transferRoutes: [
    { from: "Hat Yao Pier or Koh Libong", to: "Koh Libong", price: "3,500" },
    { from: "Hat Yao Pier or Koh Libong", to: "Koh Kradan", price: "5,500" },
    { from: "Hat Yao Pier or Koh Libong", to: "Koh Mook", price: "5,500" },
    { from: "Hat Yao Pier or Koh Libong", to: "Koh Ngai", price: "7,000" },
    { from: "Hat Yao Pier or Koh Libong", to: "Koh Lanta", price: "13,000" },
    { from: "Hat Yao Pier or Koh Libong", to: "Koh Phi Phi", price: "26,000" },
    { from: "Hat Yao Pier or Koh Libong", to: "Railay", price: "26,000" },
    { from: "Hat Yao Pier or Koh Libong", to: "Koh Lipe", price: "30,000" },
  ],

  transferNotes: [
    "Prices are for up to 8 guests. The boat carries a maximum of 14 guests.",
    "Van transfer within Trang town or to Trang airport is available from THB 2,400.",
    "Transfer timing is subject to weather and sea conditions.",
  ],

  guestPolicy: [
    "Children under 5 years travel free.",
    "Children 5-10 years: THB 600 per child on speedboat.",
    "Guests over 10 years are charged at the adult rate of THB 1,000 per person.",
    "Premium longtail extra guests: THB 700 per adult and THB 500 per child.",
    "Base package price covers 1-8 guests. The boat carries a maximum of 14 guests.",
  ],

  parkFees: [
    { guest: "Thai guests", fee: "40" },
    { guest: "Foreign guests", fee: "200" },
    { guest: "Foreign guests - Koh Rok program", fee: "400" },
  ],

  bookingTerms: [
    {
      title: "Deposit",
      detail:
        "A 50% deposit confirms your booking. The remaining balance is paid before departure. Once the deposit is received, the booking is confirmed.",
    },
    {
      title: "Reschedule",
      detail:
        "You may move your travel date with at least 7 days notice, subject to availability.",
    },
    {
      title: "Cancellation by guest",
      detail:
        "We reserve the right not to refund the deposit in the case of cancellation by the guest.",
    },
    {
      title: "Weather policy",
      detail:
        "Programs may change with weather, sea level and safety conditions. In strong wind or when authorities suspend sailing, we may change the route, change the departure time, or move the date. The captain's decision is final for the safety of all passengers.",
    },
  ],

  whatToBring: [
    "Swimwear",
    "Sunscreen",
    "Sandals",
    "A change of clothes",
    "Camera or phone",
  ],

  pierInfo: [
    {
      label: "Meeting point",
      value:
        "Hat Yao Pier, Trang (the pier for Koh Libong) - orange administration building",
    },
    { label: "From Trang town", value: "About 50 minutes by road" },
    { label: "Parking", value: "THB 50 for the day, THB 100 overnight" },
    { label: "Facilities", value: "Public toilets available at the pier" },
    {
      label: "Travel times",
      value:
        "Koh Kradan about 20 min, Koh Laoliang about 30 min, Koh Rok about 50 min",
    },
  ],

  trustPoints: [
    {
      title: "Local captain",
      detail:
        "Our captain reads the tide, swell and crowd timing so your day stays calm instead of rushed.",
    },
    {
      title: "Crew of two",
      detail:
        "Every trip runs with a captain and two staff, plus a local guide throughout the route.",
    },
    {
      title: "Safety equipment",
      detail:
        "Life jackets, snorkel masks and mouthpieces are prepared and checked before every departure.",
    },
    {
      title: "Boat preparation",
      detail:
        "The boat is cleaned, fuelled and set up before you arrive so departure is on time.",
    },
    {
      title: "Guest care",
      detail:
        "Freshwater rinse, towels, cushions and shade are looked after between every stop.",
    },
    {
      title: "Travel insurance",
      detail: "Tourist travel insurance is included on every private experience.",
    },
  ],

  responsibleGuidelines: [
    {
      title: "No touching coral",
      detail:
        "We brief every guest before snorkeling. Coral is fragile and slow to recover.",
    },
    {
      title: "No feeding marine life",
      detail: "We watch fish behave naturally rather than changing it with food.",
    },
    {
      title: "Carry our waste back",
      detail: "Everything we bring to a beach returns to the mainland with us.",
    },
    {
      title: "Reef-safe habits",
      detail: "We encourage reef-safe sunscreen and shaded cover-ups instead.",
    },
    {
      title: "Respect anchoring zones",
      detail: "We anchor only in sand and approved areas, never on reef.",
    },
    {
      title: "Support local",
      detail:
        "Local crew, local guides and local suppliers keep the value in Trang.",
    },
  ],

  partnerProperties: [
    { name: "Libong Beach Resort", note: "Beachfront stay on Koh Libong" },
    {
      name: "Le Dugong Libong Resort",
      note: "Quiet island resort on Koh Libong",
    },
    { name: "Libong Loft Home", note: "Local loft stay on Koh Libong" },
  ],

  serviceAreas: [
    "Trang mainland",
    "Hat Yao Pier",
    "Koh Libong",
    "Koh Mook",
    "Koh Kradan",
    "Koh Ngai",
    "Koh Rok",
    "Koh Laoliang",
  ],

  destinations: [
    {
      slug: "koh-kradan",
      name: "Koh Kradan",
      blurb: "White sand and glass-clear water.",
      subtitle: "A paradise of simplicity",
      image: "/images/destinations/kradan.jpg",
      gallery: [
        "/images/destinations/kradan.jpg",
        "/images/destinations/kradan-2.jpg",
        "/images/experiences/kradan-escape.jpg",
      ],
      bestFor: ["Couples", "Families", "Beach lovers"],
      bestTime: "November - April",
      howToGetThere: "About 20 minutes by private speedboat from Hat Yao Pier.",
      recommendedBoat: "Private Speedboat or Premium Longtail",
      about: [
        "Koh Kradan is one of Trang's most photographed islands - known for pale sand, clear shallow water, and soft beach lines that feel private when timed well.",
        "The island's best-known spots are the branch and swing photo corners on the main beach, the shallow reef line at Ao Phai, and the snorkel water at Ao Niang with staghorn coral and clownfish.",
        "A private morning departure is often the most peaceful way to experience the island before day-trip crowds arrive, and the secret sunset beach on the far side stays quiet almost all day.",
      ],
      relatedExperienceSlugs: ["koh-kradan-escape", "trang-sea-emerald-cave"],
    },
    {
      slug: "koh-mook",
      name: "Koh Mook",
      blurb: "Home of the Emerald Cave.",
      subtitle: "Cave light and quiet shores",
      image: "/images/destinations/mook.jpg",
      gallery: [
        "/images/destinations/mook.jpg",
        "/images/destinations/emerald.jpg",
        "/images/hero/cave.jpg",
      ],
      bestFor: ["Adventure", "Photography", "First-timers"],
      bestTime: "November - April",
      howToGetThere: "Private boat from Hat Yao Pier, timed around cave tides.",
      recommendedBoat: "Private Speedboat",
      about: [
        "Koh Mook is famous for the Emerald Cave - an Unseen Thailand swim-through that opens into a hidden beach under open sky.",
        "Because access depends on tide and swell, private timing with a local crew makes a meaningful difference.",
        "Nearby snorkel water at Khon Mai Khao and Tiger Cave rounds out a full day in the Trang Sea.",
      ],
      relatedExperienceSlugs: ["trang-sea-emerald-cave"],
    },
    {
      slug: "koh-laoliang",
      name: "Koh Laoliang",
      blurb: "Limestone drama on open sea.",
      subtitle: "The hidden island of Trang",
      image: "/images/destinations/laoliang.jpg",
      gallery: [
        "/images/destinations/laoliang.jpg",
        "/images/destinations/laoliang-2.jpg",
        "/images/hero/cliff.jpg",
      ],
      bestFor: ["Scenic lovers", "Couples", "Content creators"],
      bestTime: "November - April",
      howToGetThere: "About 30 minutes by private speedboat from Hat Yao Pier.",
      recommendedBoat: "Private Speedboat",
      about: [
        "Koh Laoliang is defined by dramatic limestone and vivid water - a strong choice when guests want scenery as much as beach time.",
        "It sits south of Trang and stays little known, which is exactly why it feels like a private island on most days.",
        "The Laoliang tunnel, squid fishing with sashimi on board, and snorkeling around Laoliang Nong are the highlights of the day.",
      ],
      relatedExperienceSlugs: ["koh-laoliang-escape"],
    },
    {
      slug: "koh-rok",
      name: "Koh Rok",
      blurb: "Snorkel-rich full-day expedition.",
      subtitle: "Queen of the Andaman",
      image: "/images/destinations/rok.jpg",
      gallery: [
        "/images/destinations/rok.jpg",
        "/images/destinations/rok-2.jpg",
        "/images/experiences/rok.jpg",
      ],
      bestFor: ["Snorkelers", "Families", "Full-day travellers"],
      bestTime: "November - April",
      howToGetThere: "About 50 minutes by private speedboat from Hat Yao Pier.",
      recommendedBoat: "Private Speedboat",
      about: [
        "Koh Rok rewards a longer day - richer snorkel water, wider beaches, and the feeling of going further into the Andaman.",
        "Ao Man Sai at Rok Nok and the clear water at Laem Lak Khet are the two standout snorkel stops, with lunch on the beach at Rok Nai.",
        "Foreign guests pay a THB 400 national park fee on this program.",
      ],
      relatedExperienceSlugs: ["koh-rok-expedition"],
    },
    {
      slug: "koh-libong",
      name: "Koh Libong",
      blurb: "Quiet shores and dugong waters.",
      subtitle: "Slower Trang, closer to shore",
      image: "/images/destinations/libong.jpg",
      gallery: [
        "/images/destinations/libong.jpg",
        "/images/boats/longtail.jpg",
        "/images/hero/sunset.jpg",
      ],
      bestFor: ["Slow travel", "Nature", "Resort stays"],
      bestTime: "November - April",
      howToGetThere: "Short transfer from Hat Yao Pier, from THB 3,500.",
      recommendedBoat: "Premium Longtail or private charter",
      about: [
        "Koh Libong is quieter and more local in feeling - a natural bridge between mainland Trang and the outer islands, and a base for stay plus experience journeys.",
        "Hat Yao Pier is the departure point for Libong, which makes it the easiest island to combine with a private transfer.",
      ],
      relatedExperienceSlugs: ["koh-kradan-escape"],
    },
  ],

  travelStyles: [
    { title: "Romantic", detail: "Quiet coves, sunset light, just your people." },
    { title: "Family", detail: "Safe pacing, soft beaches, space to breathe." },
    {
      title: "Adventure",
      detail: "Further islands, longer days, more water time.",
    },
    {
      title: "Slow & Relaxed",
      detail: "Longtail rhythm and unhurried shore moments.",
    },
    {
      title: "Premium",
      detail: "Thoughtful service, picnic setups, private crew.",
    },
  ],

  testimonials: [
    {
      quote:
        "It never felt like a tour. The day moved at our pace - private boat, quiet beaches, and a crew that actually listened.",
      name: "Elena M.",
      place: "Singapore",
    },
    {
      quote:
        "Koh Kradan in the morning with almost no one around. Exactly the Trang day we hoped for.",
      name: "James & Aria",
      place: "Australia",
    },
    {
      quote:
        "More personal than any island package we have booked in Thailand. We will come back for Koh Rok.",
      name: "Napat K.",
      place: "Bangkok",
    },
  ],

  addOns: [
    {
      id: "drone",
      name: "Drone Reel",
      price: "2,500",
      detail: "Cinematic aerial video of your day.",
    },
    {
      id: "photographer",
      name: "Professional Photographer",
      price: "3,500",
      detail: "Private photographer throughout the trip.",
    },
    {
      id: "picnic",
      name: "Premium Picnic Setup",
      price: "1,000",
      detail: "Beach picnic styling with a snack set.",
    },
    {
      id: "lunch-upgrade",
      name: "Premium Lunch Upgrade",
      price: "350",
      detail:
        "Per person. Steamed prawn, crab, black squid, fried fish or sour curry.",
    },
    {
      id: "sunset",
      name: "Sunset Extension",
      price: "2,500",
      detail: "Extra time on the water to stay for sunset.",
    },
    {
      id: "seafood-wine",
      name: "Seafood Set + Wine",
      price: "2,800",
      detail:
        "Squid, prawn and fish (1 kg each) with wine and snacks - for sunset programs.",
    },
    {
      id: "hotel-transfer",
      name: "Hotel Transfer",
      price: "2,400",
      detail: "Van transfer within Trang town or Trang airport.",
    },
    {
      id: "gopro",
      name: "GoPro",
      price: "800",
      detail: "Underwater camera for the day.",
    },
  ],

  journalPosts: [
    {
      slug: "koh-kradan-morning",
      title: "Why Koh Kradan feels different in the morning",
      tag: "Island Notes",
      date: "12 Mar 2026",
      image: "/images/destinations/kradan-2.jpg",
      excerpt: "Timing changes everything on Trang's most famous beach.",
      body: [
        "Koh Kradan is beautiful at any hour, but a private morning departure changes the emotional temperature of the day. Fewer boats. Softer light. More room to move at your own pace.",
        "The branch and swing photo spots on the main beach are the ones everyone comes for, and before mid-morning you can usually have them to yourselves.",
        "That is why our Koh Kradan Escape offers both morning and sunset windows - so the island matches the kind of day you actually want.",
      ],
    },
    {
      slug: "speedboat-or-longtail",
      title: "Speedboat or longtail: choosing your Trang pace",
      tag: "Planning",
      date: "28 Feb 2026",
      image: "/images/boats/longtail-2.jpg",
      excerpt:
        "Distance versus atmosphere - both are private, both are intentional.",
      body: [
        "Choose speedboat when you want more islands, more snorkel time, and a longer radius. Koh Rok, for example, is a 50 minute run from Hat Yao Pier and only makes sense with range.",
        "Choose longtail when the journey itself is the point - slower, local, and deeply photographic, especially in the last hours of light.",
        "Both are private charters. The difference is pace, not service.",
      ],
    },
    {
      slug: "emerald-cave-private",
      title: "Emerald Cave: what a private visit feels like",
      tag: "Guides",
      date: "10 Feb 2026",
      image: "/images/destinations/emerald.jpg",
      excerpt: "Tide, timing, and a crew that knows when to wait.",
      body: [
        "Emerald Cave is not a checkbox stop. Tide matters. Swell matters. Crowd pressure matters.",
        "A private boat lets your crew wait for a cleaner window and keep the experience calm instead of rushed.",
        "On our Trang Sea and Emerald Cave program we usually reach the cave in the early afternoon, after beach time and lunch, when the light inside is at its best.",
      ],
    },
  ],

  faqs: [
    {
      q: "Where do we meet?",
      a: "At Hat Yao Pier in Trang - the pier for Koh Libong. Check in at the orange administration building. It is about 50 minutes by road from Trang town, with public toilets and parking at THB 50 for the day or THB 100 overnight.",
    },
    {
      q: "How many guests are included in the base price?",
      a: "The package price covers 1-8 guests. The boat carries a maximum of 14. Extra adults are THB 1,000 per person on speedboat and THB 700 on premium longtail.",
    },
    {
      q: "How is pricing for children handled?",
      a: "Children under 5 travel free. Children 5-10 years are THB 600 per child on speedboat. Guests over 10 are charged at the adult rate.",
    },
    {
      q: "Are national park fees included?",
      a: "No. Park fees are paid separately: THB 40 for Thai guests and THB 200 for foreign guests, or THB 400 for foreign guests on the Koh Rok program.",
    },
    {
      q: "How do I confirm a booking?",
      a: "A 50% deposit confirms your booking, with the balance paid before departure. You can move your date with at least 7 days notice.",
    },
    {
      q: "What should I bring?",
      a: "Swimwear, sunscreen, sandals, a change of clothes, and your camera or phone. Towels, snorkel gear and life jackets are provided.",
    },
    {
      q: "Can we customize the route?",
      a: "Yes. Private experiences can be adjusted around your group, preferred pace, and sea conditions.",
    },
    {
      q: "What happens in bad weather?",
      a: "Safety comes first. We may change the route, the departure time, or the date according to sea conditions. The captain's decision is final.",
    },
    {
      q: "Do you offer hotel transfer?",
      a: "Yes. Van transfer within Trang town or to Trang airport is available from THB 2,400. We also run private boat transfers between Trang and nearby islands.",
    },
    {
      q: "Are there rules on board?",
      a: "Please do not bring seafood on board, and smoking inside the boat is not permitted.",
    },
    {
      q: "Is this a shared tour?",
      a: "No. Trang Voyage is built around private boat experiences - your boat, your people, your pace.",
    },
  ],
};
