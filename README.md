# Petit Séminaire Saint Léon Kabgayi: website

The website of Rwanda's oldest minor seminary (founded 1912). It grew out of a project by the
seminary's own students: their pages, wireframes and photos are kept locally in `LINKED/` (not committed: 364 MB).

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (all pages are static)
```

## Where things live

| What | Where |
| --- | --- |
| All school text (motto, staff, programs, news, gallery list) | `src/content/school.ts` |
| History timeline and rectors | `src/content/history.ts` |
| Pages (one folder per URL) | `src/app/<page>/page.tsx` |
| Shared pieces (header, footer, crest, reveal animations) | `src/components/` |
| 3D scenes (Three.js) | `src/components/three/` |
| Colours, fonts, global styles | `src/app/globals.css` |
| Photos | `public/img/` |

**To change text, edit the `content/` files.** You should not need to touch any layout code.

## The 3D scenes

- `CrestScene`: the school crest as an extruded 3D shield that follows the cursor.
- `RegisterField`: 5,154 particles, one per name in the seminary register. As you scroll, they move
  from a cloud into a ledger and then into a cross. Nº 81 (Mgr Bigirumwami) glows gold.
- `ImigongoWall`: a field of pyramids in the colours of *imigongo* (Rwandan geometric art) that ripples
  around the cursor.

Each scene only renders while it is on screen (`CanvasShell.tsx`), so phones stay cool.

## To confirm with the administration

Search for `TODO` in `src/content/school.ts`: the official email address, the A-Level combinations
offered today, and rectors after 2013.
