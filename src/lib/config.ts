// Content taken from Jack's own printed flyer — keep it to what Jack's
// actually told customers, no invented reviews or credentials.

// Service area confirmed by Owen; postcodes are the towns' own districts
export const jacksAreas = [
  { town: "Cleveleys", postcode: "FY5" },
  { town: "Thornton", postcode: "FY5" },
  { town: "Fleetwood", postcode: "FY7" },
  { town: "Bispham", postcode: "FY2" },
  { town: "Poulton", postcode: "FY6" },
  { town: "Blackpool", postcode: "FY1–FY4" },
];

export const jacksDemo = {
  businessName: "Jack's DIY",
  tagline: "Small jobs. Big difference.",
  email: "JacksDIY2026@outlook.com",
  phone: "+447759939231",
  phoneDisplay: "07759 939231",
  area: "Cleveleys, Thornton & the Fylde coast",
  areas: jacksAreas.map((a) => a.town),
  values: ["High quality work", "Friendly & professional", "Based locally in FY5"],
  // Keep this wording exact — it's a qualification in progress, not a full electrician's ticket
  qualification: "Electrical T Level: year one complete, now in year two at college",
};

// The most common jobs, shown on the home page job list. `job` must match an
// entry in jacksAllServices exactly so a tick on either page is the same tick;
// `label` is the shorter wording shown in the list.
export const jacksQuickJobs = [
  {
    title: "Electrical & TV",
    jobs: [
      { job: "Replace sockets and switches", label: "Replace a socket or switch" },
      { job: "Change light fittings and pendants", label: "Change a light fitting" },
      { job: "TV wall mounting (brick or plasterboard)", label: "Mount a TV on the wall" },
    ],
  },
  {
    title: "Joinery",
    jobs: [
      { job: "Shelves and floating shelves", label: "Put up shelves" },
      { job: "Hang, trim and adjust internal doors", label: "Hang or adjust a door" },
      { job: "Wall panelling", label: "Wall panelling" },
    ],
  },
  {
    title: "Assembly & fitting",
    jobs: [
      { job: "Wardrobes and chests of drawers", label: "Build a wardrobe or drawers" },
      { job: "Hang pictures, mirrors and clocks", label: "Hang pictures or mirrors" },
      { job: "Blinds (roller, Venetian, Roman)", label: "Put up blinds" },
    ],
  },
  {
    title: "Decorating",
    jobs: [
      { job: "Painting walls and ceilings", label: "Paint a room" },
      { job: "Painting doors, skirting and woodwork", label: "Paint doors or skirting" },
      { job: "Filling cracks and holes", label: "Fill cracks and holes" },
    ],
  },
];

export const jacksRoom = {
  title: "Living room makeover",
  features: ["Acoustic wall panelling", "Timber framework", "Light & socket fittings", "Painting"],
  finished: {
    src: "/images/jacks-diy-demo/room-media-wall-wide.jpg",
    alt: "The finished media wall: a wall-mounted TV recessed between two lit alcoves, flanked by acoustic slat panels with wall lights, above a long floating cabinet",
    // Percent positions on the 16:9 crop — re-measure if the photo changes
    notes: [
      { label: "Wall lights", at: [56, 7], targets: [[17, 47], [94.6, 47]] },
      { label: "Alcove lights", at: [56, 27], targets: [[35.6, 40], [77, 40]] },
      { label: "Acoustic slat panelling", at: [13, 30], targets: [[8, 62]] },
      { label: "Timber-framed media wall, painted", at: [57, 78], targets: [[33, 76]] },
      { label: "Cupboards", at: [80, 93], targets: [[66, 93]] },
    ] as { label: string; at: [number, number]; targets: [number, number][] }[],
  },
  video: "/images/jacks-diy-demo/room-walkthrough.mp4",
  poster: "/images/jacks-diy-demo/room-walkthrough-poster.jpg",
  stills: [
    {
      src: "/images/jacks-diy-demo/room-panelling.jpg",
      alt: "Timber framework built across a wall and painted dark navy, behind a cream corner sofa",
    },
    {
      src: "/images/jacks-diy-demo/room-slat-wall.jpg",
      alt: "Acoustic slat wall panelling with a wall light casting light up and down, beside a white alcove",
    },
    {
      src: "/images/jacks-diy-demo/room-switches.jpg",
      alt: "A brushed steel double socket with USB ports and a matching light switch on a pale grey wall",
    },
  ],
};

// Same wall, mid-job and finished
export const jacksBeforeAfter = {
  title: "Socket swap",
  before: {
    src: "/images/jacks-diy-demo/job-socket-before.jpg",
    alt: "An old socket pulled away from the wall with its wires exposed, before the new one is fitted",
  },
  after: {
    src: "/images/jacks-diy-demo/job-socket-level.jpg",
    alt: "The new double socket fitted flush, with a spirit level across the top showing it's straight",
  },
};

export const jacksWork = [
  {
    src: "/images/jacks-diy-demo/job-outdoor-light.jpg",
    alt: "A black outdoor wall lantern with a motion sensor, fitted on red brick under the eaves",
    title: "Outdoor sensor light",
  },
  {
    src: "/images/jacks-diy-demo/job-socket-spur.jpg",
    alt: "A white double socket and fused spur fitted side by side on a blockwork wall",
    title: "Double socket and fused spur",
  },
];

// 0 = Sunday, matching Date.getDay()
export const jacksWeek = [
  { day: "Mon", dayIndex: 1, full: true },
  { day: "Tue", dayIndex: 2, full: false },
  { day: "Wed", dayIndex: 3, full: false },
  { day: "Thu", dayIndex: 4, full: false },
  { day: "Fri", dayIndex: 5, full: true },
  { day: "Sat", dayIndex: 6, full: true },
  { day: "Sun", dayIndex: 0, full: true },
];

// Full list for the Services page. Left out on purpose: electrical jobs that
// need notifying (outdoor sockets, bathroom heaters/towel rails).
// `trade` picks which background shape shows behind each category.
export const jacksAllServices = [
  {
    id: "electrical",
    title: "Electrical",
    icon: "lightning" as const,
    trade: "bolt",
    jobs: [
      "Replace sockets and switches",
      "Add USB and USB-C sockets",
      "Add an extra socket",
      "Change light fittings and pendants",
      "Fit or replace spotlights and downlights",
      "Fit wall lights",
      "Fit outdoor lights",
      "Fit smart switches and smart bulbs",
      "Fit LED strip and under-cabinet lighting",
      "Replace fused spurs",
      "Replace extractor fans",
    ],
  },
  {
    id: "tv",
    title: "TV & media walls",
    icon: "television" as const,
    trade: "bolt",
    jobs: [
      "TV wall mounting (brick or plasterboard)",
      "Hide TV cables in the wall",
      "Cable trunking and tidying",
      "Mount soundbars and speakers",
      "Media walls",
    ],
  },
  {
    id: "joinery",
    title: "Joinery & carpentry",
    icon: "hammer" as const,
    trade: "hammer",
    jobs: [
      "Shelves and floating shelves",
      "Alcove shelving and cupboards",
      "Fitted wardrobes",
      "Hang, trim and adjust internal doors",
      "Fit door handles and hinges",
      "Skirting boards and architrave",
      "Wall panelling",
      "Acoustic slat panelling",
      "Timber framework and stud walls",
      "Boxing in pipes",
      "Repair woodwork and door frames",
      "Fit handrails and bannisters",
    ],
  },
  {
    id: "flat-pack",
    title: "Flat pack & assembly",
    icon: "package" as const,
    trade: "hammer",
    jobs: [
      "Wardrobes and chests of drawers",
      "Beds and bunk beds",
      "Desks, tables and chairs",
      "Kids' furniture and cots",
      "Garden furniture",
      "Sheds and playhouses",
      "Fix furniture to the wall (anti-tip)",
      "Take furniture apart for moving",
    ],
  },
  {
    id: "decorating",
    title: "Painting & decorating",
    icon: "paint-brush" as const,
    trade: "roller",
    jobs: [
      "Painting walls and ceilings",
      "Feature walls",
      "Painting doors, skirting and woodwork",
      "Stripping wallpaper",
      "Filling cracks and holes",
      "Small plaster patch repairs",
      "Painting fences, sheds and front doors",
    ],
  },
  {
    id: "flooring",
    title: "Flooring & tiling",
    icon: "squares-four" as const,
    trade: "roller",
    jobs: [
      "Floor boarding (MDF and ply)",
      "Boarding uneven floors flat",
      "Door bars and thresholds",
      "Fix squeaky floorboards",
    ],
  },
  {
    id: "hanging",
    title: "Hanging & fitting",
    icon: "frame-corners" as const,
    trade: "roller",
    jobs: [
      "Hang pictures, mirrors and clocks",
      "Curtain poles and tracks",
      "Blinds (roller, Venetian, Roman)",
      "Bathroom accessories and cabinets",
      "Replace toilet seats",
      "Coat hooks and racks",
      "Letterboxes, door numbers and house signs",
    ],
  },
  {
    id: "outdoor",
    title: "Outdoor",
    icon: "tree" as const,
    trade: "hammer",
    jobs: [
      "Fence panel repairs and replacement",
      "Washing lines and rotary airers",
      "Christmas lights",
    ],
  },
  {
    id: "moving",
    title: "Moving & landlord jobs",
    icon: "house-line" as const,
    trade: "hammer",
    jobs: [
      "Landlord and end-of-tenancy repairs",
      "Moving-in jobs, the whole list in one visit",
      "Odd jobs: anything not listed, just ask",
    ],
  },
];

// Photo strip straight under the home page hero
export const jacksStrip = [
  {
    src: "/images/jacks-diy-demo/room-media-wall-wide.jpg",
    alt: "A finished media wall with a recessed TV between two lit alcoves",
    caption: "Media wall",
  },
  {
    src: "/images/jacks-diy-demo/room-slat-wall.jpg",
    alt: "Acoustic slat wall panelling with a wall light casting light up and down",
    caption: "Slat panelling",
  },
  {
    src: "/images/jacks-diy-demo/job-socket-level.jpg",
    alt: "A new double socket with a spirit level across the top showing it's straight",
    caption: "Socket, checked level",
  },
  {
    src: "/images/jacks-diy-demo/job-outdoor-light.jpg",
    alt: "A black outdoor wall light with a motion sensor, fitted on red brick",
    caption: "Outdoor light",
  },
];

export const jacksSteps = [
  {
    title: "Tick your jobs",
    text: "Pick from the list, or browse every job Jack does. Add a photo if you can.",
  },
  {
    title: "Jack replies with a price",
    text: "A free quote by email, with no obligation to go ahead.",
  },
  {
    title: "Booked in when it suits you",
    text: "Any evening from 5pm, or all day on a Monday, Friday or weekend.",
  },
];

// Answers only use facts Jack has given us. Also output as FAQPage
// structured data on the home page, so keep them as plain sentences.
export const jacksFaqs = [
  {
    q: "How do I get a quote?",
    a: "Tick the jobs you need, either on the list at the top of the page or on the services page, then fill in the short form. It opens your email with everything written out for Jack. Or call or text Jack on 07759 939231. Quotes are free with no obligation.",
  },
  {
    q: "When is Jack available?",
    a: "Every evening from 5pm, and all day on Mondays, Fridays, Saturdays and Sundays, so you don't need to take time off work.",
  },
  {
    q: "Which areas do you cover?",
    a: "Cleveleys, Thornton, Fleetwood, Bispham, Poulton and Blackpool. If you're just outside those areas, ask anyway.",
  },
  {
    q: "What electrical work can Jack do?",
    a: "Small electrical jobs like sockets, switches and light fittings. Jack has completed year one of an Electrical T Level and is now in year two. Bigger work, like new circuits or replacing a fuse box, needs a registered electrician.",
  },
  {
    q: "Is any job too small?",
    a: "No. Small jobs are what Jack's DIY is for, so a single shelf or one light fitting is fine. If you have a few, put them all on one list and they can be done in one visit.",
  },
  {
    q: "Can I send photos of the job?",
    a: "Yes, please do. Attach them to the email the quote form opens. A photo helps Jack give you an accurate price.",
  },
];

// Real reviews only — none yet. Add them here as Jack gets them; the
// Reviews section on the home page hides itself automatically while this
// is empty, and appears as soon as it has at least one entry. `rating` is
// 1-5. `job` and `location` are optional, short context (e.g. "Socket swap",
// "Cleveleys") — never invent a review or fill this with example/placeholder
// quotes, this is a real business.
export const jacksReviews: {
  name: string;
  rating: 1 | 2 | 3 | 4 | 5;
  quote: string;
  job?: string;
  location?: string;
}[] = [];
