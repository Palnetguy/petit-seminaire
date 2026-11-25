# Petit Séminaire Saint Léon Kabgayi: website

The website of Rwanda's oldest minor seminary (founded 1912), with a content dashboard. It grew
out of a project by the seminary's own students: their pages, wireframes and photos are kept
locally in `LINKED/` (not committed: 364 MB).

## Run it

```bash
npm install
npm run dev      # website: http://localhost:3000   dashboard: http://localhost:3000/admin
npm run build    # production build (public pages are static)
```

## Updating content

All content lives in [`content/`](content/README.md) as JSON files, one per section (news,
events, gallery, staff, history, school details…).

- **Dashboard:** run `npm run dev`, open `/admin`, sign in (development password: `saintleon`),
  edit and save. Saving writes the JSON files and stores uploaded photos in `public/uploads/`.
  Then commit and push.
- **By hand:** edit the JSON files directly. See [`content/README.md`](content/README.md).

On the live site (Vercel) the dashboard is **read-only**, because Vercel cannot save files.
Editing there will work once a database is connected (see below).

### Configuration

Copy `.env.example` to `.env.local`. In production set:

| Variable | Purpose |
| --- | --- |
| `ADMIN_PASSWORD` | Dashboard password (required in production) |
| `SESSION_SECRET` | 32+ random characters used to sign login cookies (required in production) |
| `CMS_STORAGE` | `local` (JSON files) or `readonly`. Defaults: `local` in development, `readonly` in production |

## How the dashboard works

| Piece | Where |
| --- | --- |
| Collection definitions: fields, labels, validation, types | `src/lib/cms/schema.ts` |
| Storage (local JSON files / read-only; database later) | `src/lib/cms/storage/` |
| Login session (signed cookie) and route protection | `src/lib/cms/session.ts`, `src/lib/cms/auth.ts`, `src/proxy.ts` |
| Server actions (save, delete, reorder, publish) | `src/app/admin/actions.ts` |
| Dashboard pages | `src/app/admin/` |
| Form engine (renders any collection from its schema) | `src/components/admin/Fields.tsx` |

To add a field, add it to the collection in `schema.ts` (and to its type at the bottom of that
file). The form, validation and saving pick it up automatically.

**Connecting a database later:** write `src/lib/cms/storage/database.ts` implementing the
`ContentStorage` interface in `storage/types.ts` (read a collection, write changes), select it in
`storage/index.ts` with `CMS_STORAGE=database`, and make the public pages read through storage
instead of importing the JSON files (`src/content/school.ts`, `src/content/history.ts`). The
dashboard itself does not change.

## Where things live

| What | Where |
| --- | --- |
| Public pages (one folder per URL) | `src/app/(site)/<page>/page.tsx` |
| Content loaders used by the pages | `src/content/school.ts`, `src/content/history.ts` |
| Shared pieces (header, footer, crest, reveal animations) | `src/components/` |
| 3D scenes (Three.js) | `src/components/three/` |
| Colours, fonts, global styles | `src/app/globals.css` |
| Photos | `public/img/` (site), `public/uploads/` (added from the dashboard) |

## The 3D scenes

- `CrestScene`: the school crest as an extruded 3D shield that follows the cursor.
- `RegisterField`: 5,154 particles, one per name in the seminary register. As you scroll, they move
  from a cloud into a ledger and then into a cross. Nº 81 (Mgr Bigirumwami) glows gold.
- `ImigongoWall`: a field of pyramids in the colours of *imigongo* (Rwandan geometric art) that ripples
  around the cursor.

Each scene only renders while it is on screen (`CanvasShell.tsx`), so phones stay cool.

## To confirm with the administration

The official email address, the A-Level combinations offered today, and the rectors after 2013.
All three can be edited in the dashboard.
