# Interval Run

A simple, no-build mobile web app for building and running interval-training runs: set a warm up, a repeating "every X min, work for X min" interval, and a cool down, then run through it with a live countdown timer, audio/vibration cues, and a summary screen at the end.

## Running it

No build step or server required — just open `index.html` in a browser (add it to your phone's home screen for an app-like feel). If your browser blocks local scripts, serve it with any static server, e.g.:

```
python3 -m http.server 8000
```

then visit `http://localhost:8000` from your phone (on the same network) or your computer.

## What's inside

- **Setup** — set a warm up and cool down (in minutes), then add one or more intervals defined as "every X min, work for X min, for N rounds". The rest time per round is automatically calculated (every − for). A live summary shows the full breakdown and total run time. Your last setup is remembered (`localStorage`).
- **Run** — a full-screen countdown timer that walks through warm up → each interval's work/rest rounds → cool down, with a color-coded phase pill, overall progress bar, elapsed time, pause/resume, skip, and stop controls. Phase transitions trigger a short tone and vibration (where supported), and the screen is kept awake during the run (where supported) so it won't lock mid-run.
- **Done** — a completion screen with total time and a breakdown of warm up / work / rest / cool down, plus a button to start another run.

## Notes

- Everything runs client-side; no data is sent anywhere.
- Audio cues use the Web Audio API and vibration uses the Vibration API — both are best-effort and silently no-op on browsers/devices that don't support them (e.g. iOS Safari does not support vibration).
