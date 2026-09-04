# ZVoice — Feature Worksheet

Working document for anyone building on `voice.zvoiceai.io`.

## The rule

Every feature is written as one row:

| What the user does | What the product must give back | Is it done? |
|---|---|---|
| **INPUT** | **OUTPUT** | **STATUS** |

A feature is only ticked `[x]` when the output actually happens in a browser —
not when the code merely compiles. When you finish one, tick it here in the
same commit as the code. When you add a new feature, add its row **before**
you write it, so the expected output is agreed up front.

## Status legend

| Mark | Meaning |
|---|---|
| `[x]` | Done and verified in a browser |
| `[~]` | Built but unverified, or partially working |
| `[ ]` | Not started |
| `[!]` | Blocked — needs a decision, content, or credentials |

---

# Part 1 — Shipped

| ID | Feature | User input | Expected output | Status |
|---|---|---|---|---|
| F-01 | Sticky navbar | Scrolls the page | Nav stays on top; gains border + blur past 8px | `[x]` |
| F-02 | Mobile menu | Taps hamburger (<768px) | Panel opens with links; tapping a link closes it | `[x]` |
| F-03 | Smooth anchor scroll | Clicks Features / How it works / Pricing / FAQ | Page glides to the section, heading clear of the navbar | `[x]` |
| F-04 | Scroll reveal | Scrolls toward a section | Cards fade + rise in, staggered | `[x]` |
| F-05 | Rotating headline | Waits on the hero | Business word swaps every 2.2s with a drawn underline | `[x]` |
| F-06 | Sample call player | Clicks play in hero | Real audio plays, waveform fills, timer counts to 1:00 | `[x]` |
| F-07 | Player seek | Clicks a point on the hero waveform | Audio jumps to that position | `[x]` |
| F-08 | Industry strip | Reads under the hero CTA | Six business types with icons | `[x]` |
| F-09 | Hero call card | Lands on the page | Live-call mock: waveform, transcript, outcome chips, pulse rings | `[x]` |
| F-10 | Call-flow demo | Scrolls to "Watch a call" | 6 steps auto-play and loop, each with its own screen | `[x]` |
| F-11 | Call-flow pause | Clicks Pause | Sequence freezes; button flips to Play | `[x]` |
| F-12 | Call-flow step jump | Clicks any step in the list | Demo jumps to that step, and seeks the audio if sound is on | `[x]` |
| F-13 | Call-flow sound | Clicks "Hear the call" | Audio plays **and drives** the animation — cannot drift | `[x]` |
| F-14 | Audio arbitration | Starts one player while the other plays | The other stops; never two voices at once | `[x]` |
| F-15 | Off-screen pause | Scrolls the demo out of view | Animation and audio stop; resume on return | `[x]` |
| F-16 | Features bento | Scrolls to Why ZVoice | One large dark tile + four cards, staggered reveal | `[x]` |
| F-17 | How it works | Scrolls to How it works | 3 alternating steps, ghost numerals, example chips | `[x]` |
| F-18 | Use cases | Scrolls to Built for | 3 cards, each its own accent colour, hover glow | `[x]` |
| F-19 | Pricing plans | Scrolls to Pricing | 3 tiers; Growth raised and highlighted | `[x]` |
| F-20 | Billing conditions | Reads under the plans | 8 billing terms stated in the open, not hidden in legal | `[x]` |
| F-21 | Pricing legal links | Looks before buying | Refund / Cancellation / Terms links on the pricing section | `[x]` |
| F-22 | Signup consent copy | Reads under a plan CTA | "By creating an account you agree to…" with both links | `[x]` |
| F-23 | FAQ accordion | Clicks a question | That answer opens, the previous closes; icon rotates | `[x]` |
| F-24 | Footer legal IA | Scrolls to the footer | Product / Company / Legal / Accessibility columns | `[x]` |
| F-25 | Cookie banner | First visit | Banner with Accept All / Reject Non-Essential / Manage | `[x]` |
| F-26 | Cookie preferences | Clicks Manage, or the footer link | Modal with 4 categories; Necessary locked on | `[x]` |
| F-27 | Consent persistence | Chooses, then reloads | Choice remembered; banner does not return | `[x]` |
| F-28 | Reduced motion | OS "reduce motion" is on | All animation and smooth scroll disabled | `[x]` |
| F-29 | Responsive layout | Any width from 390px up | Single column on mobile, no horizontal scroll | `[x]` |
| F-30 | Client routing | Visits `/legal/<slug>` directly | That page renders; nav and footer still work | `[x]` |
| F-31 | Legal page layout | Opens any policy | Title, date, draft notice, body, sticky "on this page" TOC | `[x]` |
| F-32 | Cross-page anchors | Clicks Pricing while on a legal page | Goes home *and* scrolls to that section | `[x]` |
| F-33 | 404 page | Hits an unbuilt URL | Branded page explaining it, with links to every policy | `[x]` |

## Detail on the non-obvious ones

### F-13 — Call-flow sound sync

- **File:** `src/components/CallFlow.jsx`
- **Input:** click "Hear the call".
- **Output:** audio starts *at the step already on screen*, then the audio clock
  becomes the source of truth — `active` and `progress` are derived from
  `audio.currentTime`, so picture and sound cannot drift apart.
- **Key data:** `CUES = [0, 3.65, 11.53, 18.53, 26.16, 41.62]` — the second at
  which each of the 6 steps begins inside `public/sample-call.mp3`.
- **Replacing the audio means re-measuring `CUES`.** See "Audio pipeline" below.
- **Edge cases already handled:** browser blocks autoplay, falls back to the
  silent timer; scrolled out of view, pauses; hero player starts, this stops.

### F-14 — Audio arbitration

- **File:** `src/lib/audio.js`
- Two players exist (hero + call flow). Starting either calls
  `claimAudio('<owner>')`; every other player subscribed through `onAudioClaim`
  hears a name that is not its own and pauses itself.
- **Adding a third player?** Call `claimAudio` on play, subscribe on mount.

### F-25 / F-26 / F-27 — Consent

- **Files:** `src/lib/consent.js`, `src/components/CookieConsent.jsx`
- Stored at `localStorage['zvoice.consent.v1']` as `{ prefs, at, version }`.
- **Gate every non-essential script** on
  `hasConsent('analytics' | 'marketing' | 'functional')`. Nothing loads before a
  choice is made — that is the whole point of the gate.
- Accept and Reject carry equal visual weight on purpose. Do not make Reject
  quieter than Accept.
- Bump the `v1` key if the categories change, so returning visitors re-choose.

### F-04 — Scroll reveal

- **File:** `src/lib/useScrollReveal.js`, called once from `App.jsx`.
- Opt an element in with `data-reveal`; stagger it with an inline
  `style={{ transitionDelay: '120ms' }}`.
- The hiding CSS is gated behind `.zv-js`, which the hook adds, and there is a
  2s fallback that reveals everything if the observer never reports. **Keep
  both** — without them a failed observer leaves a blank page.

---

# Part 2 — Not built yet

| ID | Feature | User input | Expected output | Status |
|---|---|---|---|---|
| P-01 | Legal pages | Clicks any footer legal link | The actual policy page loads | `[~]` |
| P-02 | Routing | Visits `/legal/privacy-policy` | App renders that route instead of 404 | `[x]` |
| P-03 | Signup | Clicks Start free trial | Real signup form with a Terms checkbox | `[ ]` |
| P-04 | Login | Clicks Log in | Real login screen | `[ ]` |
| P-05 | Contact form | Clicks Contact / Talk to sales | Form that reaches a human, with confirmation | `[ ]` |
| P-06 | Real call recording | Clicks play | A genuine ZVoice call, not the TTS placeholder | `[!]` |
| P-07 | Analytics | Consents to analytics | Script loads *only then*; pageviews recorded | `[ ]` |
| P-08 | Integrations page | Clicks Integrations | Page listing calendar / CRM integrations (currently 404s) | `[ ]` |
| P-09 | Docs page | Clicks Documenzvoiceai | Developer documentation (currently 404s) | `[ ]` |
| P-10 | About / Contact pages | Clicks About or Contact | Those pages load (currently 404s; needs your real company details) | `[ ]` |
| P-11 | 404 page | Hits a bad URL | Branded not-found page with a way back | `[x]` |
| P-12 | SEO + social | Shares the link | OG image, description, canonical URL, sitemap | `[ ]` |
| P-13 | Deployment | Visits voice.zenxai.io | The live site, HTTPS, correct domain | `[ ]` |
| P-16 | SPA fallback | Loads `/legal/privacy-policy` directly in production | Server returns index.html, not its own 404 | `[ ]` |
| P-14 | Demo booking | Clicks "Hear a live demo call" | Books or triggers a real demo call | `[ ]` |
| P-15 | Accessibility pass | Uses keyboard / screen reader | Full keyboard path, visible focus, correct labels | `[ ]` |

## Blocked items — what unblocks them

| ID | Blocked on | Who provides it |
|---|---|---|
| P-01 | **Drafts are now written** for all 11 documents in `src/content/legal.js`. They still need counsel sign-off for your jurisdictions, and the 90+ `[bracketed]` placeholders filled in. Remove the amber draft banner in `src/pages/LegalPage.jsx` once signed off. | Legal counsel |
| P-06 | A real recorded ZVoice call (~60s, mono, clean). Replace `public/sample-call.mp3`, keep the filename, then re-measure `CUES`. | Product |
| — | Confirm the placeholder billing numbers in `BILLING_TERMS` ($0.12/min overage, 14-day trial, no rollover) against real billing. | Finance |

---

# Part 3 — Developer reference

## Setup

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build into dist/
npm run lint     # oxlint
```

Stack: **React 19 + Vite 8 + Tailwind v4**. Tailwind v4 has no
`tailwind.config.js` — design tokens live in the `@theme` block at the top of
`src/index.css`.

## File map

```
src/
  App.jsx                 routes + useScrollReveal + useRouteScroll + <CookieConsent/>
  main.jsx                <BrowserRouter> wrapper
  content/
    legal.js              COMPANY facts + all 11 policy documents (the text)
  pages/
    Home.jsx              the landing sections, in order
    LegalPage.jsx         renders any policy by :slug, builds its TOC
    NotFound.jsx          404
  index.css               @theme tokens, keyframes, reveal + scroll CSS
  lib/
    audio.js              one-player-at-a-time arbitration
    consent.js            cookie categories, storage, hasConsent() gate
    useScrollReveal.js    IntersectionObserver reveal
    useRouteScroll.js     top-on-navigate, or scroll to :hash
  components/
    Navbar.jsx            F-01, F-02
    Hero.jsx              F-05 .. F-09   (383 lines)
    CallFlow.jsx          F-10 .. F-15   (551 lines, holds CUES)
    Features.jsx          F-16
    HowItWorks.jsx        F-17
    UseCases.jsx          F-18
    Pricing.jsx           F-19 .. F-22   (holds BILLING_TERMS)
    FAQ.jsx               F-23
    CTA.jsx
    Footer.jsx            F-24           (holds the legal link table)
    CookieConsent.jsx     F-25, F-26
    IndustryStrip.jsx     F-08
public/
  sample-call.mp3         60s two-voice sample call (473 KB)
  favicon.svg
```

## Design tokens

Defined in `src/index.css` — use these, do not hardcode hexes.

| Token | Value | Use |
|---|---|---|
| `ink` | `#0b0d17` | Headings, dark panels |
| `ink-soft` | `#4b4f5e` | Body copy |
| `mist` | `#f6f7fb` | Alternating section background |
| `line` | `#e7e8f0` | Borders, dividers |
| `brand-500` | `#4f46e5` | Primary actions, accents |
| `brand-600` | `#4338ca` | Hover state |
| `accent-500` | `#14b8a6` | Secondary accent |

Fonts: `font-display` (Manrope) for headings, default sans (Inter) for body.
Sections alternate `bg-white` / `bg-mist` — keep that rhythm when adding one.

## Animation keyframes

In `src/index.css`: `zv-wave` (audio bars), `zv-ring` (pulse rings),
`zv-float` (drifting chips), `zv-word-in` (fade + rise entry), `zv-draw`
(underline). Tag animated elements `zv-anim` so reduced-motion can kill them.

## Audio pipeline — replacing the sample call

The current file is Windows TTS, generated turn by turn so each step's start
time could be measured. To swap in a real recording:

1. Put the new file at `public/sample-call.mp3` (mono, ~64kbps, under ~500 KB).
2. Note the second at which each of the 6 steps begins.
3. Update `CUES` in `src/components/CallFlow.jsx`.
4. The hero player needs no change — it reads `loadedmetadata` and adapts.

## Editing the legal pages

All 11 documents live in one file: `src/content/legal.js`. There is no CMS and
no per-page component — `LegalPage.jsx` renders whichever policy matches the
`:slug` in the URL.

- **Company facts** — edit the `COMPANY` object once; every document uses it.
- **A document** — find its entry in `POLICIES`. Shape is
  `{ slug, title, tagline, sections: [{ h, p: [...], ul: [...], after: [...] }] }`.
  `p` and `ul` are both optional; `after` is prose that follows a list.
- **A new document** — add an entry to `POLICIES` and a link in `Footer.jsx`.
  The route, the TOC and the "other documents" list all build themselves.
- Section headings become anchor ids automatically, so `#how-to-cancel` works.
- **Once counsel signs off**, delete the amber draft banner in
  `src/pages/LegalPage.jsx` and set `COMPANY.updated`.

## Adding a new section — checklist

- [ ] Add the row to Part 1 of this worksheet **first** (input → output)
- [ ] Create `src/components/<Name>.jsx`
- [ ] Import and place it in `src/App.jsx`
- [ ] Give the `<section>` an `id` if the navbar should link to it
- [ ] Alternate the background (`bg-white` / `bg-mist`)
- [ ] Add `data-reveal` to the heading block and cards, stagger with `transitionDelay`
- [ ] Use design tokens, not raw hex
- [ ] Check at 390px, 768px, 1440px
- [ ] `npm run build` passes
- [ ] Tick the row `[x]`

## Verification pass before any release

- [ ] `npm run build` with no errors
- [ ] Nav links land correctly, heading not hidden under the navbar
- [ ] Hero audio plays; call-flow sound plays and stays in sync
- [ ] Only one audio source can play at a time
- [ ] Cookie banner appears fresh, choice persists across reload
- [ ] Footer "Cookie Preferences" reopens the modal
- [ ] No horizontal scrollbar at 390px
- [ ] Reduced-motion setting disables animation
- [ ] Keyboard: every button reachable, focus visible
- [ ] No console errors

---

*Update this file in the same commit as the code it describes. A worksheet that
lags behind the code is worse than no worksheet.*
