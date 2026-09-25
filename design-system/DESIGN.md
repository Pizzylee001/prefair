---
version: alpha
name: PreFair
description: A cross-venue valuation desk comparing the same private company across two tokenized pre-IPO venues, normalized to implied company value. Two routes, a market board and a company detail, with an isometric 3D comparison scene.
colors:
  ground: "#F1F2F3"
  surface: "#FFFFFF"
  ink: "#0B0E13"
  ink-secondary: "#454B52"
  ink-tertiary: "#6A7079"
  line: "#D7DADE"
  accent-fill: "#EAB308"
  accent-ink: "#8A5A00"
  on-accent: "#16130A"
typography:
  display:
    fontFamily: "Syne"
    fontSize: "clamp(38px, 6vw, 70px)"
    fontWeight: 800
    lineHeight: 0.96
    letterSpacing: "-0.02em"
  h2:
    fontFamily: "Syne"
    fontSize: "clamp(24px, 3.4vw, 34px)"
    fontWeight: 700
    lineHeight: 1.04
    letterSpacing: "-0.015em"
  body:
    fontFamily: "Manrope"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.6
  data:
    fontFamily: "IBM Plex Mono"
    fontSize: "14px"
    fontWeight: 500
    lineHeight: 1.4
    fontFeature: "'tnum' 1"
  label:
    fontFamily: "IBM Plex Mono"
    fontSize: "11px"
    fontWeight: 500
    letterSpacing: "0.08em"
spacing:
  unit: "4px"
  scale: ["4px", "8px", "12px", "16px", "22px", "30px", "44px", "54px"]
  container: "1160px"
rounded:
  control: "10px"
  panel: "14px"
  pill: "999px"
motion:
  tier: standard
  scene: "isometric bars fade and rise once, 700ms, ease-out cubic-bezier(0.16, 1, 0.3, 1)"
  hover: "150ms ease-out"
  reduced-motion: "no scene animation, static final state"
---

# PreFair, design specification (direction: Overlap)

Source of truth for the build. Every decision traces to a named source: the
approved brief, the frozen idea engine, attached pack files
(`01-ui-ux-design.md`, `08-anti-slop-filter.md`, `09-ledger.md`), the live API
payloads, the GapBrief anti-reference, or the project preview. Lee rejected
two earlier directions, the first as a quadrant he had used before and the
second as too close to GapBrief.

## 0. Rotation history and why this direction

- Direction 1 (rejected): light mineral paper, hairlines, warm rust accent.
  Same calm light quadrant as Signal Lock v2.
- Direction 2, Tape (rejected): dark instrument, mono table, colophon
  footer with a SOURCES line. Lee flagged it against
  gapbrief.vercel.app. I fetched GapBrief's markup and confirmed the
  overlap: wordmark plus square glyph, a status strip, a mono data table in
  hairline panels, and a colophon footer. That is a structural fingerprint
  collision, not just a palette one, so rotation must move structure, type,
  and logo, not only color.
- Direction 3, Overlap (this one): light, high-contrast, editorial-modern.
  A floating pill nav, bottom-aligned oversized heading, an isometric 3D
  scene as the hero visual, big-number split rows, a blocky bordered table
  instead of a rounded panel, and a statement footer. Different header,
  different body structure, different footer, different type, different
  logo concept from both the earlier directions and from GapBrief.

## 1. Visual Theme and Atmosphere

- Design Read: Reading this as an operating valuation desk for a
  crypto-curious retail user comparing pre-IPO token venues, with a
  confident editorial-modern voice, leaning toward a geometric
  high-contrast board with one dimensional data scene.
- Surface mode: Operate, both routes. Order follows the task. The hero
  carries the one visual thesis (the gap is the product) because the brief
  needs a memorable first impression for a judged entry.
- Mood: a design-driven market desk. Big type, real numbers, one bold
  accent, and one 3D moment that shows the gap as physical height.
- Philosophy: normalization plus a decision, presented with enough design
  character that it does not read as a data dump or another dark tape.
- Background treatment: the light ground `#F1F2F3` is the field; the scene
  carries a soft isometric floor grid, and content sections sit on the
  ground with white only where a surface is truly raised (hovered rows,
  the detail panel, inputs). Reason: a flat single fill with no structure
  is the flat-default failure (pack 08 R-01). The floor grid is a
  blueprint-style device, which pack 08 R-07 restricts, so it is used only
  inside the isometric scene where a measured plane is the literal subject.
  It is not a page-wide background.

## 2. Color Palette and Roles

Palette family from the ledger vocabulary: **Monochrome + one saturated
pop**. Off-black ink on a light grey ground with a single saturated yellow
accent, plus a dark yellow for accent text that must pass contrast. Chosen
against the last two families and against GapBrief's green, and it is
neither the restricted cream family nor a banned blue-purple.

| Token | Hex | Role |
|-------|-----|------|
| ground | #F1F2F3 | page field, light grey, not pure white |
| surface | #FFFFFF | raised surface: hovered rows, detail panel, inputs |
| ink | #0B0E13 | headings, primary values, borders, the dark button |
| ink-secondary | #454B52 | body and supporting prose |
| ink-tertiary | #6A7079 | mono labels and captions |
| line | #D7DADE | interior row hairlines |
| accent-fill | #EAB308 | highlight fill: heading highlight, isometric bar, caveat edge |
| accent-ink | #8A5A00 | accent used as text (spread figures), darkened to pass AA |
| on-accent | #16130A | text on the accent fill |

Contrast, measured against `ground` #F1F2F3: ink 17.4:1,
ink-secondary 8.4:1, ink-tertiary 4.9:1, accent-ink 5.6:1. Yellow
`accent-fill` is never used as text, because yellow on light fails contrast;
it is a fill only, and text that sits on it uses `on-accent` (12.6:1). This
split is the honest fix for the classic yellow-contrast trap (pack 08 R-25).

One accent only (pack 08 R-29). Yellow means "the gap" and "the highlight."
Nothing else is tinted. The dark ink does the structural work.

## 3. Typography Rules

Font pairing from the catalog: **Fashion Forward, Syne + Manrope** (pack 09,
section B), with IBM Plex Mono as a data utility face. Against the earlier
directions (Outfit + Work Sans, then JetBrains + IBM Plex Sans) and against
GapBrief (Bebas Neue + Source Sans 3 + JetBrains Mono), this is a new
pairing. Syne is a distinctive display face used with restraint, not a
system face and not a default serif.

| Role | Family | Size | Weight | Line height | Tracking |
|------|--------|------|--------|-------------|----------|
| Display (h1) | Syne | clamp(38px, 6vw, 70px) | 800 | 0.96 | -0.02em |
| Section (h2) | Syne | clamp(24px, 3.4vw, 34px) | 700 | 1.04 | -0.015em |
| Body | Manrope | 15px | 400 | 1.6 | 0 |
| Data value | IBM Plex Mono | 14px | 500 | 1.4 | tnum on |
| Mono label | IBM Plex Mono | 11px | 500 | 1.4 | 0.08em uppercase |

Mono is confined to data and labels (pack 01 mono-as-costume rule). Prose is
Manrope. Body measure caps at 62ch. The hero h1 keeps to two lines and only
four text elements: tagline, headline, lede, action row (pack 01 hero rule).

Production font load, self-hosted or via next/font. These Google Fonts URLs
identify families and weights only and must never ship as a bare `<link>`
(pack 01, pack 02):

- Syne: https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&display=swap
- Manrope: https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&display=swap
- IBM Plex Mono: https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&display=swap

## 4. Component Stylings

- **Floating pill nav (archetype N5).** Sticky at 14px, pill radius,
  1.5px ink border, translucent white with 10px blur. Brand mark plus word
  set, three quiet links, one dark pill CTA. The venue key from the earlier
  direction is dropped to avoid the Tape status-strip fingerprint; the board
  header labels its own columns instead.
- **Logo: two overlapping circles.** One ink ring and one yellow-filled
  ring that overlap, encoding "two venues, one company." It is a distinct
  mark, not a wordmark plus a glyph, which separates it from GapBrief's
  square glyph. It reads at 26px and scales down to a favicon.
- **Hero.** Bottom-aligned heading in the left column, 3D scene in the
  right column. Headline "One company. Two prices." with a yellow highlight behind the second clause. Lede under 25 words. Two actions.
- **Isometric 3D scene (signature device).** A generated SVG, not a raster
  and not a library. Two boxes on an isometric floor grid, heights drawn to
  scale from the real marks (Tessera 0.8, PreStocks 1.96), each labeled with
  value and venue. This is the dimensional element the brief asked for, and
  its job is to make the gap physical rather than a number. Accessibility:
  the SVG carries a `role="img"` and an `aria-label` stating both values and
  the comparison, because the visual is meaningful (pack 01 alt-text rule).
  Motion: bars fade and rise once on load, 700ms ease-out, disabled under
  reduced motion, final state holds.
- **Big-number split rows.** Company in display type with mono tickers
  under it, both venue values in mono on the right, spread in `accent-ink`
  as the largest number. Separated by 1.5px ink rules, no card, no box.
  States: default, loading (values show a muted "reading venues" label),
  error (row names the failing venue and offers retry), empty (company on
  one venue only, shown with one value and a note).
- **Board table.** Blocky: a 3px ink top rule, uppercase mono header, 1.5px
  ink header underline, white on row hover. Real `<table>` with
  `scope="col"`. Horizontal scroll inside its wrapper below 680px, no page
  overflow. This replaces the rounded card table from the rejected
  direction, so the board no longer matches GapBrief's panel look.
- **Detail panel.** 1.5px ink border, 14px radius, two columns split by a
  1.5px ink divider. Left is the normalization list (mono field tag, plain
  description, value, computed total in accent). Right is the planner.
- **Planner controls.** Visible labels above controls, mono values, 1.5px
  ink border, 10px radius, 3px `accent-ink` focus ring at 2px offset.
- **Verdict line.** Display type with the key phrase on a yellow highlight.
- **Key-value grid.** 1.5px ink grid lines, mono values.
- **Primary action.** One dark pill-radius button, white label. Hover
  darkens to #23282F, focus 3px accent-ink ring, disabled at 55 percent.
- **Caveat block.** Manrope prose with a 4px `accent-fill` left edge, the
  single deliberate colored edge, carrying the "not arbitrage" warning.
- **Footer.** A statement headline ("The gap is the product. Not advice."),
  a plain risk disclaimer, and one mono build line. This is a statement
  footer (archetype Ft5), not a link-column colophon.

## 5. Layout Principles

- Spacing scale: 4 / 8 / 12 / 16 / 22 / 30 / 44 / 54 (pack 01 8pt rhythm).
- Container: max 1160px, 22px gutters.
- Route 1: hero with the scene, then the ranked big-number list, then the
  blocky table. Route 2: the two-column detail panel. Six structural
  families across the page, no family reused.
- Order from the task: impression (hero and scene), ranking, full board,
  single-company decision, method.
- No card grid, no bento, no centered hero, no left-margin labels
  (pack 01 refuse list).

## 6. Depth and Elevation

- Elevation language: high-contrast borders plus one genuine 3D scene. Page
  surfaces are flat with 1.5px ink borders; the only dimensional depth is
  the isometric scene, which is a data metaphor, not decoration. Reason:
  pack 08 R-12 restricts shadows; none are used. The 3D earns its place
  because the brief asked for 3D and it carries the core comparison.
- One designed exception: the floating nav uses a 10px backdrop blur,
  meaning "content scrolls beneath the bar." That is the single blur on the
  page, within pack 08 R-10's dose cap of one to two elements.
- Radius system, one rule for the page: pill for the nav and buttons, 14px
  for the detail panel and 10px for controls and inputs (pack 01 shape
  lock, documented exception).
- No glows. The yellow highlight replaces glow as the attention device.

## 7. Do's and Don'ts

Do:
- Compare the same field on both venues. Label every figure for what it is
  (PreStocks market price, mark price, mark valuation; Tessera mark).
- Show both implied company values beside any "cheaper" claim.
- Keep the "not arbitrage" caveat on the same screen as the verdict.
- Use the 3D scene to make the gap real: heights are drawn to scale.
- Keep one accent, one action label, one theme.

Don't:
- Do not present the gap as arbitrage or free money.
- Do not re-display one venue's data as the product; the product is the
  cross-venue normalization and the decision.
- Do not reproduce GapBrief's fingerprint: no square glyph wordmark, no
  status strip, no mono-table-in-rounded-panel, no SOURCES colophon footer.
- Do not use yellow as text on light (contrast fails); yellow is a fill
  only.
- Do not use emoji as icons, gradient text, or a Cmd-K palette.
- Do not invent numbers or testimonials. Every figure is live API data or a
  labeled sample (pack 08 R-17, R-38).

## 8. Responsive Behavior

- Breakpoints: 390 / 640 / 760 / 900 / 1160 (pack 01).
- Hero stacks to one column below 900px, text above scene, scene shrinks
  with its viewBox.
- The ranked list hides the middle value column below 640px, leaving the
  company name and the spread.
- The table scrolls horizontally inside its wrapper below 680px.
- The detail panel collapses to one column below 860px.
- Touch targets 44px minimum on the nav CTA, the action, rows, inputs.
- The nav drops its text links below 760px, keeping brand and CTA.
- No horizontal overflow at 390px.

## 9. Signature, Motion and Depth

- Signature: the isometric 3D comparison scene. Named against the Magic UI
  families, it is closest to a dimensional data component, but it is
  generated SVG, not a library component, so no signature family is
  claimed (ledger rule 7). The last two projects used Number Ticker and
  Animated List.
- Dials (pack 01): VARIANCE 7 / MOTION 5 / DENSITY 5. Against Signal Lock
  v2 (4 / 3 / 7) and the rejected Tape (5 / 4 / 8), variance rises and
  density drops, so no two projects match on both VARIANCE and MOTION
  (ledger rule 8).
- Dials (pack 08 liveliness): ENERGY 2 / RHYTHM 3 / MOTION 2. A confident
  editorial board; sections change shape (hero scene, big-number list,
  table, panel, statement), scroll reveal only where it helps.
- Motion plan, standard tier:
  - Scene: bars rise and fade once on load, 700ms ease-out, staggered
    80ms.
  - Highlight: the headline highlight wipes in once on load, 500ms.
  - Hover: nav and action links shift color in 150ms; table rows fill
    white; no layout shift.
  - State: focus rings instant; loading and error states fade in over
    150ms.
  - Reduced motion: no rise, no wipe, no pulse; final state holds.
- Depth: borders and one 3D scene; no shadows (Section 6).

## Project identity record

- Project name: PreFair (Lee approved).
- Working directory: Lee's project repo. This spec lives at
  `design-system/DESIGN.md` there. Rendered previews live at
  `prefair-design/preview-overlap.html` and the two PNGs in this workspace.
- Direction: Overlap. Rejected earlier: the light-paper direction (reused
  quadrant) and Tape (too close to GapBrief).
- Routes built: two. Route 1 the board, Route 2 the company detail with the
  planner. No third route.
- Parked: shareable valuation card (cut for the clock); project-local
  ledger append (only after approval).
- Project-local ledger path: `<project>/design-system/LEDGER.md`.
