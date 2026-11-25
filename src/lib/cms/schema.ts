/**
 * Content schema: the single definition of every editable collection.
 *
 * It drives three things at once:
 *  1. the dashboard forms (field types → inputs),
 *  2. server-side validation of everything that is saved,
 *  3. the shape of the JSON files in /content.
 *
 * To add a field: add it here and to the matching type below. The dashboard
 * picks it up automatically.
 */

export type Field =
  | { name: string; label: string; type: "text"; required?: boolean; help?: string; placeholder?: string; max?: number }
  | { name: string; label: string; type: "textarea"; required?: boolean; help?: string; rows?: number; max?: number }
  | { name: string; label: string; type: "date"; required?: boolean; help?: string }
  | { name: string; label: string; type: "time"; required?: boolean; help?: string }
  | { name: string; label: string; type: "number"; required?: boolean; help?: string }
  | { name: string; label: string; type: "boolean"; help?: string }
  | { name: string; label: string; type: "select"; options: readonly string[]; required?: boolean; help?: string }
  | { name: string; label: string; type: "image"; required?: boolean; help?: string; folder: string }
  | { name: string; label: string; type: "tags"; help?: string }
  | { name: string; label: string; type: "group"; fields: Field[]; help?: string }
  | { name: string; label: string; type: "list"; fields: Field[]; itemLabel: string; help?: string; titleField?: string };

type Base = {
  key: string;
  label: string;
  rw: string; // Kinyarwanda label
  description: string;
  icon: string;
  publicPath: string; // page where the content appears
  fields: Field[];
};
export type ListCollection = Base & {
  kind: "list";
  singular: string;
  titleField: string;
  subtitle?: (item: Record<string, unknown>) => string;
  imageField?: string;
  dateField?: string;
  sortable: boolean;
  bulkImageField?: string; // enables multi-photo upload
};
export type SingleCollection = Base & { kind: "single" };
export type Collection = ListCollection | SingleCollection;

export const NEWS_TAGS = ["Academics", "Faith", "Sport", "Events", "Community", "Announcement"] as const;
export const GALLERY_CATEGORIES = ["Faith", "Academics", "Student life", "Campus", "Events"] as const;
export const STAFF_GROUPS = ["Leadership", "Teaching staff"] as const;
export const SUBJECT_COLORS = ["Lapis blue", "Chapel brick", "Hill green", "Navy"] as const;

const statement: Field[] = [
  { name: "short", label: "Short statement", type: "textarea", rows: 2, required: true, max: 300 },
  { name: "long", label: "Full text", type: "textarea", rows: 6, required: true, max: 2000 },
];

export const collections: Collection[] = [
  {
    key: "news",
    kind: "list",
    label: "News",
    singular: "news item",
    rw: "Amakuru",
    description: "Stories shown in the “Life at the seminary” section of the home page.",
    icon: "📰",
    publicPath: "/",
    titleField: "title",
    imageField: "image",
    dateField: "date",
    sortable: false,
    subtitle: (i) => [i.tag, i.date].filter(Boolean).join(" · "),
    fields: [
      { name: "title", label: "Headline", type: "text", required: true, max: 140 },
      { name: "rw", label: "Kinyarwanda headline", type: "text", help: "Shown in italics above the headline.", max: 140 },
      { name: "date", label: "Date", type: "date", required: true },
      { name: "tag", label: "Category", type: "select", options: NEWS_TAGS, required: true },
      { name: "image", label: "Photo", type: "image", folder: "news", required: true },
      { name: "text", label: "Summary", type: "textarea", rows: 4, required: true, max: 600 },
      { name: "published", label: "Published on the website", type: "boolean" },
    ],
  },
  {
    key: "events",
    kind: "list",
    label: "Events",
    singular: "event",
    rw: "Kalendari",
    description: "Upcoming dates. Past events disappear from the website automatically.",
    icon: "📅",
    publicPath: "/",
    titleField: "title",
    dateField: "date",
    sortable: false,
    subtitle: (i) => [i.date, i.time, i.place].filter(Boolean).join(" · "),
    fields: [
      { name: "title", label: "Event", type: "text", required: true, max: 140 },
      { name: "date", label: "Date", type: "date", required: true },
      { name: "time", label: "Time", type: "time" },
      { name: "place", label: "Place", type: "text", max: 120 },
      { name: "text", label: "Details", type: "textarea", rows: 3, max: 600 },
      { name: "published", label: "Published on the website", type: "boolean" },
    ],
  },
  {
    key: "gallery",
    kind: "list",
    label: "Gallery",
    singular: "photo",
    rw: "Amafoto",
    description: "Photos on the Gallery page and in the home page photo strip (first 10).",
    icon: "🖼️",
    publicPath: "/gallery",
    titleField: "alt",
    imageField: "src",
    sortable: true,
    bulkImageField: "src",
    subtitle: (i) => String(i.category ?? ""),
    fields: [
      { name: "src", label: "Photo", type: "image", folder: "gallery", required: true },
      { name: "alt", label: "Caption", type: "text", required: true, help: "Describe the photo. It is also read aloud to blind visitors.", max: 160 },
      { name: "category", label: "Category", type: "select", options: GALLERY_CATEGORIES, required: true },
    ],
  },
  {
    key: "staff",
    kind: "list",
    label: "Staff",
    singular: "staff member",
    rw: "Abarezi",
    description: "Leadership and teachers on the Staff and About pages. Drag order = display order.",
    icon: "👥",
    publicPath: "/staff",
    titleField: "name",
    imageField: "image",
    sortable: true,
    subtitle: (i) => [i.group, i.role].filter(Boolean).join(" · "),
    fields: [
      { name: "title", label: "Title", type: "text", placeholder: "Fr., Abbé, Sr. … (optional)", max: 20 },
      { name: "name", label: "Full name", type: "text", required: true, max: 80 },
      { name: "role", label: "Role or subject", type: "text", required: true, placeholder: "e.g. Rector, or Physics · A-Level", max: 80 },
      { name: "group", label: "Group", type: "select", options: STAFF_GROUPS, required: true },
      { name: "image", label: "Portrait", type: "image", folder: "staff", help: "A head-and-shoulders photo. Leave empty to show the crest." },
    ],
  },
  {
    key: "milestones",
    kind: "list",
    label: "History timeline",
    singular: "milestone",
    rw: "Amateka",
    description: "Entries on the History page timeline, in order.",
    icon: "📜",
    publicPath: "/history",
    titleField: "title",
    imageField: "image",
    sortable: true,
    subtitle: (i) => [i.year, i.date].filter(Boolean).join(" · "),
    fields: [
      { name: "year", label: "Year", type: "text", required: true, max: 4 },
      { name: "date", label: "Day and month", type: "text", placeholder: "e.g. 4 October", max: 40 },
      { name: "place", label: "Place", type: "text", max: 80 },
      { name: "title", label: "Title", type: "text", required: true, max: 100 },
      { name: "text", label: "Text", type: "textarea", rows: 5, required: true, max: 1200 },
      { name: "image", label: "Image (optional)", type: "image", folder: "history" },
      { name: "key", label: "Key moment (shown larger, gold marker)", type: "boolean" },
    ],
  },
  {
    key: "settings",
    kind: "single",
    label: "School details",
    rw: "Amakuru y'ishuri",
    description: "Name, motto, contact details, visiting hours and the numbers on the home page.",
    icon: "🏫",
    publicPath: "/contact",
    fields: [
      {
        name: "_identity", label: "Identity", type: "group", fields: [
          { name: "name", label: "School name", type: "text", required: true },
          { name: "kinyarwandaName", label: "Name in Kinyarwanda", type: "text" },
          { name: "motto", label: "Motto (Kinyarwanda)", type: "text", required: true },
          { name: "mottoEn", label: "Motto (English)", type: "text" },
          { name: "mottoLong", label: "Mission sentence (Kinyarwanda)", type: "textarea", rows: 2 },
          { name: "mottoLongEn", label: "Mission sentence (English)", type: "textarea", rows: 2 },
        ],
      },
      {
        name: "_contact", label: "Contact", type: "group", fields: [
          { name: "phone", label: "Phone", type: "text", required: true },
          { name: "email", label: "Email", type: "text", required: true },
          { name: "addressLines", label: "Address lines", type: "tags", help: "One line per entry, e.g. “Muhanga District”." },
          { name: "mapLat", label: "Map latitude", type: "number" },
          { name: "mapLng", label: "Map longitude", type: "number" },
        ],
      },
      { name: "hours", label: "Visiting hours", type: "list", itemLabel: "row", titleField: "day", fields: [
        { name: "day", label: "Day(s)", type: "text", required: true },
        { name: "time", label: "Hours", type: "text", required: true },
      ] },
      { name: "stats", label: "Home page numbers", type: "list", itemLabel: "number", titleField: "label", help: "The four large figures under “Since 1912”.", fields: [
        { name: "value", label: "Number", type: "number", required: true },
        { name: "label", label: "Label", type: "text", required: true },
        { name: "note", label: "Small note", type: "text" },
        { name: "prefix", label: "Before the number", type: "text", placeholder: "e.g. Nº" },
        { name: "suffix", label: "After the number", type: "text", placeholder: "e.g. +" },
        { name: "isYear", label: "It is a year (no thousands comma)", type: "boolean" },
      ] },
    ],
  },
  {
    key: "about",
    kind: "single",
    label: "About texts",
    rw: "Abo turi bo",
    description: "Mission, vision, values, community and “why choose us” on the About page.",
    icon: "✝️",
    publicPath: "/about",
    fields: [
      { name: "mission", label: "Mission", type: "group", fields: statement },
      { name: "vision", label: "Vision", type: "group", fields: statement },
      { name: "values", label: "Values", type: "group", fields: statement },
      { name: "community", label: "Community", type: "group", fields: statement },
      { name: "valueWords", label: "Values ribbon (single words)", type: "tags" },
      { name: "whyUs", label: "Why choose us", type: "list", itemLabel: "reason", titleField: "title", fields: [
        { name: "title", label: "Reason", type: "text", required: true },
        { name: "text", label: "Explanation", type: "text" },
      ] },
    ],
  },
  {
    key: "programs",
    kind: "single",
    label: "Programs",
    rw: "Amasomo",
    description: "Levels, A-Level combinations, subjects and activities on the Programs page.",
    icon: "🔬",
    publicPath: "/programs",
    fields: [
      { name: "levels", label: "Levels", type: "list", itemLabel: "level", titleField: "title", fields: [
        { name: "code", label: "Letter", type: "text", required: true, max: 2 },
        { name: "title", label: "Title", type: "text", required: true },
        { name: "years", label: "Years", type: "text" },
        { name: "text", label: "Description", type: "textarea", rows: 3 },
      ] },
      { name: "combinations", label: "A-Level combinations", type: "list", itemLabel: "combination", titleField: "code", fields: [
        { name: "code", label: "Code", type: "text", required: true, max: 6 },
        { name: "name", label: "Subjects", type: "text", required: true },
        { name: "note", label: "Note", type: "text" },
      ] },
      { name: "subjects", label: "Subject groups", type: "list", itemLabel: "group", titleField: "name", fields: [
        { name: "name", label: "Group name", type: "text", required: true },
        { name: "items", label: "Subjects", type: "tags" },
        { name: "color", label: "Colour", type: "select", options: SUBJECT_COLORS, required: true },
      ] },
      { name: "coCurricular", label: "Beyond the classroom", type: "list", itemLabel: "activity", titleField: "title", fields: [
        { name: "title", label: "Activity", type: "text", required: true },
        { name: "text", label: "Description", type: "textarea", rows: 2 },
        { name: "image", label: "Photo", type: "image", folder: "programs", required: true },
      ] },
    ],
  },
  {
    key: "rectors",
    kind: "single",
    label: "Rectors",
    rw: "Abayobozi",
    description: "The two lists of rectors on the History page.",
    icon: "📋",
    publicPath: "/history",
    fields: [
      { name: "whiteFathers", label: "White Fathers (1912 – 1959)", type: "list", itemLabel: "rector", titleField: "name", fields: [
        { name: "name", label: "Name", type: "text", required: true },
        { name: "period", label: "Period", type: "text", required: true },
        { name: "note", label: "Note", type: "text" },
      ] },
      { name: "diocesan", label: "Diocesan priests (since 1959)", type: "list", itemLabel: "rector", titleField: "name", fields: [
        { name: "name", label: "Name", type: "text", required: true },
        { name: "period", label: "Period", type: "text", required: true, help: "Write “Present” for the current rector." },
        { name: "note", label: "Note", type: "text" },
      ] },
    ],
  },
];

export const getCollection = (key: string) => collections.find((c) => c.key === key);
export const COLLECTION_KEYS = collections.map((c) => c.key);

/* ── Types of the JSON files (used by the public website) ─────────────── */

export type NewsItem = { id: string; title: string; rw: string; date: string; tag: string; image: string; text: string; published: boolean };
export type EventItem = { id: string; title: string; date: string; time: string; place: string; text: string; published: boolean };
export type GalleryItem = { id: string; src: string; alt: string; category: (typeof GALLERY_CATEGORIES)[number] };
export type StaffItem = { id: string; title: string; name: string; role: string; group: (typeof STAFF_GROUPS)[number]; image: string };
export type Milestone = { id: string; year: string; date: string; place: string; title: string; text: string; image: string; key: boolean };
export type Settings = {
  name: string; kinyarwandaName: string; motto: string; mottoEn: string; mottoLong: string; mottoLongEn: string;
  founded: number; foundedFull: string; addressLines: string[]; location: string; province: string; diocese: string;
  phone: string; email: string; mapLat: number; mapLng: number;
  hours: { day: string; time: string }[];
  stats: { value: number; label: string; note: string; prefix: string; suffix: string; isYear: boolean }[];
  registerCount: number;
};
type Statement = { short: string; long: string };
export type About = {
  mission: Statement; vision: Statement; values: Statement; community: Statement;
  valueWords: string[]; whyUs: { title: string; text: string }[];
};
export type Programs = {
  levels: { code: string; title: string; years: string; text: string }[];
  combinations: { code: string; name: string; note: string }[];
  subjects: { name: string; items: string[]; color: (typeof SUBJECT_COLORS)[number] }[];
  coCurricular: { title: string; text: string; image: string }[];
};
export type Rector = { name: string; period: string; note: string };
export type Rectors = { whiteFathers: Rector[]; diocesan: Rector[] };
export type Meta = Record<string, { updatedAt: string; updatedBy: string }>;
