# Sketchbook

A simple, no-build web app for learning the basics of sketching, using YouTube as the content library. Short pencil- and ink-only tutorials from real YouTube creators are organized into eight themed lessons that build on each other, from line control through drawing a real object.

## Running it

No build step or server required — just open `index.html` in a browser. If your browser blocks local scripts (including the live YouTube lookups), serve it with any static server, e.g.:

```
python3 -m http.server 8000
```

then visit `http://localhost:8000`.

## What's inside

- **Path** — the eight lessons in suggested order, grouped into Foundations, Ink Techniques, and Putting It Together, with an overall progress bar and a "Continue" button that jumps to your next lesson.
- **Lessons** — a filterable grid (All / Pencil / Ink) of every lesson. Each lesson pairs two short YouTube tutorials around one theme (line control, basic 3D forms, perspective, pencil shading, ink hatching, ink stippling, gesture sketching, and simple still life).
- **Supplies** — the handful of cheap materials needed for pencil vs. ink sketching.
- **Progress** — an at-a-glance list of which lessons are complete, with a reset option.

Opening a lesson embeds its two videos directly (YouTube's IFrame Player API) and fetches each video's real title, creator, and runtime live from YouTube in your browser — so what you see is always the actual video, not a static guess. A badge shows the real runtime and flags it if a video happens to run past the 15-minute target. Checking "Watched" on both videos marks the lesson complete; progress is stored locally in your browser (`localStorage`) — nothing is sent anywhere.

## Curation notes

Lessons are limited to **pencil or ink** tutorials only (no paint/digital), and each lesson's videos were chosen from well-known, beginner-focused sketching channels (e.g. Circle Line Art School, Alphonso Dunn) intended to run well under 15 minutes. Exact runtimes are confirmed live from YouTube rather than hardcoded, since that's the only fully reliable source of truth.
