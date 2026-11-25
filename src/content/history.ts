/**
 * History content, loaded from /content/milestones.json and /content/rectors.json
 * (editable in the dashboard). The curriculum summary stays here.
 */
import milestonesJson from "../../content/milestones.json";
import rectorsJson from "../../content/rectors.json";
import type { Milestone as MilestoneRow, Rectors } from "@/lib/cms/schema";

export type Milestone = {
  year: string;
  date?: string;
  title: string;
  text: string;
  image?: string;
  place?: string;
  key?: boolean;
};

export const milestones: Milestone[] = (milestonesJson as MilestoneRow[]).map((m) => ({
  year: m.year,
  date: m.date || undefined,
  place: m.place || undefined,
  title: m.title,
  text: m.text,
  image: m.image || undefined,
  key: m.key,
}));

const r = rectorsJson as Rectors;
const toRow = (x: { name: string; period: string; note: string }) => [x.name, x.period, x.note] as const;
export const rectors = { whiteFathers: r.whiteFathers.map(toRow), diocesan: r.diocesan.map(toRow) };

export const curriculum = [
  { era: "1913 →", title: "Classical humanities", text: "Greek and Latin, French, religion, arithmetic, music, drama and sport, alongside a life of prayer." },
  { era: "1962 →", title: "A national curriculum", text: "After independence, programmes are set by Rwanda's Ministry of Education rather than the colonial model." },
  { era: "Later", title: "Latin & science sections", text: "Latin sections, Maths–Physics, Latin and modern letters, Latin sciences in Biology–Chemistry, then Maths–Chemistry–Biology (MCB)." },
  { era: "Today", title: "Among the best", text: "State and civil society continue to rank Rwanda's seminaries among the best schools in the country." },
];
