/**
 * Website content, loaded from the JSON files in /content.
 *
 * Edit content in the dashboard (/admin) or directly in /content/*.json.
 * Only design-related text (navigation, the four pillars, the student team)
 * stays in this file.
 */
import aboutJson from "../../content/about.json";
import galleryJson from "../../content/gallery.json";
import newsJson from "../../content/news.json";
import eventsJson from "../../content/events.json";
import programsJson from "../../content/programs.json";
import settingsJson from "../../content/settings.json";
import staffJson from "../../content/staff.json";
import type { About, EventItem, GalleryItem as GalleryRow, NewsItem, Programs, Settings, StaffItem } from "@/lib/cms/schema";

const settings = settingsJson as Settings;
const about = aboutJson as About;
const programsData = programsJson as Programs;

export const school = {
  ...settings,
  shortName: settings.name,
  map: { lat: settings.mapLat, lng: settings.mapLng },
  hours: settings.hours.map((h) => [h.day, h.time] as const),
};

export const stats = settings.stats.map((s) => ({
  value: s.value,
  label: s.label,
  note: s.note,
  prefix: s.prefix || undefined,
  suffix: s.suffix || undefined,
  plain: s.isYear,
}));

export const purpose = { mission: about.mission, vision: about.vision, values: about.values, community: about.community };
export const values = about.valueWords;
export const whyUs = about.whyUs;

export type Person = { name: string; role: string; image?: string; title?: string };
const toPerson = (s: StaffItem): Person => ({ name: s.name, role: s.role, image: s.image || undefined, title: s.title || undefined });
const staff = staffJson as StaffItem[];
export const leadership: Person[] = staff.filter((s) => s.group === "Leadership").map(toPerson);
export const teachers: Person[] = staff.filter((s) => s.group !== "Leadership").map(toPerson);

const COLOR_VARS: Record<string, string> = {
  "Lapis blue": "var(--lapis)",
  "Chapel brick": "var(--brick)",
  "Hill green": "var(--green)",
  Navy: "var(--navy-2)",
};
export const programs = {
  ...programsData,
  subjects: programsData.subjects.map((s) => ({ ...s, color: COLOR_VARS[s.color] ?? "var(--navy)" })),
};

const shortDate = (iso: string) => new Date(iso + "T12:00:00").toLocaleDateString("en-GB", { day: "2-digit", month: "short" });
export const news = (newsJson as NewsItem[])
  .filter((n) => n.published)
  .sort((a, b) => b.date.localeCompare(a.date))
  .map((n) => ({ ...n, iso: n.date, date: shortDate(n.date) }));

/** All published events; the home page filters out past ones in the browser. */
export const events = (eventsJson as EventItem[]).filter((e) => e.published).sort((a, b) => a.date.localeCompare(b.date));

export type GalleryItem = { src: string; alt: string; cat: GalleryRow["category"] };
export const gallery: GalleryItem[] = (galleryJson as GalleryRow[]).filter((g) => g.src).map((g) => ({ src: g.src, alt: g.alt, cat: g.category }));

/* ── Design text (not in the dashboard) ─────────────────────────────── */

export const nav = [
  { href: "/", label: "Home", rw: "Ahabanza" },
  { href: "/about", label: "About", rw: "Abo turi bo" },
  { href: "/history", label: "History", rw: "Amateka" },
  { href: "/programs", label: "Programs", rw: "Amasomo" },
  { href: "/staff", label: "Staff", rw: "Abarezi" },
  { href: "/gallery", label: "Gallery", rw: "Amafoto" },
  { href: "/contact", label: "Contact", rw: "Twandikire" },
] as const;
export const pillars = [
  {
    n: "I",
    title: "Spiritual",
    rw: "Ubukristu",
    text: "Daily Mass, prayer and the sacraments in a chapel that has formed generations of priests. Faith is the ground everything else grows from.",
    image: "/img/faith/chapel-prayer.jpg",
  },
  {
    n: "II",
    title: "Intellectual",
    rw: "Ubumenyi",
    text: "A rigorous science curriculum, examined nationally, carried by teachers who expect excellence and know every student by name.",
    image: "/img/academics/classroom.jpg",
  },
  {
    n: "III",
    title: "Human",
    rw: "Ikinyabupfura",
    text: "Discipline, honesty and responsibility, learned in shared dormitories, on the pitch, in the brass band and around the table.",
    image: "/img/life/brass-band-field.jpg",
  },
  {
    n: "IV",
    title: "Community",
    rw: "Ubufatanye",
    text: "Service to neighbours and to the nation. Learners, educators and parents working together to build a better Rwanda.",
    image: "/img/life/service.jpg",
  },
];

/** The student team who built the first version of this website. */
export const studentDevelopers = [
  "Armand", "Arsène", "Blaise", "Bonheur", "Darcy", "Idesbard", "Igikwiye",
  "Jay B", "Lavigne", "Mike", "Patient", "Rwakazina", "Xavier",
].map((n) => ({
  name: n,
  image: `/img/students/${n.normalize("NFD").toLowerCase().replace(/[^a-z]/g, "")}.jpg`,
}));
