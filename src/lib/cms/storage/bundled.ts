/** The JSON files compiled into the build: used for reading when files cannot be written. */
import about from "../../../../content/about.json";
import events from "../../../../content/events.json";
import gallery from "../../../../content/gallery.json";
import meta from "../../../../content/_meta.json";
import milestones from "../../../../content/milestones.json";
import news from "../../../../content/news.json";
import programs from "../../../../content/programs.json";
import rectors from "../../../../content/rectors.json";
import settings from "../../../../content/settings.json";
import staff from "../../../../content/staff.json";

export const bundled: Record<string, unknown> = {
  about, events, gallery, _meta: meta, milestones, news, programs, rectors, settings, staff,
};
