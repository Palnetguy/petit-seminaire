# Website content

Everything the school updates lives in this folder, one JSON file per section.
There are two ways to change it:

1. **The dashboard (easiest).** Run the site (`npm run dev`), open
   http://localhost:3000/admin, sign in, edit, save. The dashboard writes these
   files for you and checks every field.
2. **By hand.** Open a file in VS Code, change the text, save. Then check the
   page in the browser before pushing.

Then commit and push to GitHub. Vercel republishes the site automatically.

## The files

| File | What it controls | Page |
| --- | --- | --- |
| `news.json` | News stories (title, date, photo, summary, `published`) | Home |
| `events.json` | Upcoming events. Past dates are hidden automatically. | Home |
| `gallery.json` | Photos and their captions/categories, in display order | Gallery, Home |
| `staff.json` | Leadership and teachers, in display order | Staff, About |
| `milestones.json` | History timeline entries, in order | History |
| `rectors.json` | The two lists of rectors | History |
| `settings.json` | School name, motto, phone, email, address, visiting hours, home page numbers | Everywhere |
| `about.json` | Mission, vision, values, community, "why choose us" | About |
| `programs.json` | Levels, A-Level combinations, subjects, activities | Programs |
| `_meta.json` | Who changed what and when (filled in by the dashboard) | none |

## Rules when editing by hand

- **Keep the quotes and commas.** JSON is strict: text goes in `"double quotes"`,
  items are separated by commas, and there is no comma after the last item.
  VS Code underlines mistakes in red.
- **Dates** are written `"2026-12-06"` (year-month-day).
- **`published`** is `true` or `false`, without quotes. `false` hides an item
  without deleting it.
- **Photos**: put the image in `public/img/...` (keep it under about 1 MB, around
  1600px wide) and write its path starting with `/img/`, for example
  `"/img/life/brass-band.jpg"`. Photos added through the dashboard go to
  `public/uploads/` automatically.
- **Every item in a list needs a unique `id`**: short, lowercase, with dashes,
  e.g. `"christmas-mass-2026"`.
- **Allowed values** for `tag`, `category`, `group` and `color` are listed in
  `src/lib/cms/schema.ts`.

If the site shows an error after a hand edit, the JSON is probably broken.
Undo the change, or paste the file into a JSON validator to find the missing
comma or quote.
