# Upcoming Concerts

A simple, no-build web app that shows your upcoming concerts, organized by month, with date, time, venue, and address.

## Running it

No build step or server required — just open `index.html` in a browser. If your browser blocks local scripts, serve it with any static server, e.g.:

```
python3 -m http.server 8000
```

then visit `http://localhost:8000`.

## How the concert list is built

This app doesn't call the Gmail/Calendar APIs directly from the browser (that would require setting up OAuth). Instead, the concert list in `js/data.js` is a snapshot: Claude scanned Gmail and Google Calendar and hand-picked events that represent an actual concert you're going to, using two signals:

- **Ticket purchase confirmations** — order confirmation emails from ticket vendors (Etix, Ticketmaster, AXS, StubHub, Eventbrite, etc.), not onsale alerts, newsletters, or "recommended for you" marketing emails.
- **Calendar events you were added to** — confirmed calendar entries for a show, with a venue/location and (usually) a ticket link in the description.

Sports, theater, comedy, and non-music events were excluded, as were past shows and events you were only ever *offered* tickets to.

### Adding a concert manually

Click **+ Add concert** at the top of the page and fill in the artist, date, time, venue, and (optionally) address. Enter the time as Pacific time — that's the time zone all the venues above are in. Manually added concerts are saved in your browser's `localStorage`, mixed in with the rest of the list, and show an **×** button so you can remove them. They only live in the browser you added them from — they aren't written back to `js/data.js` and won't show up if you open the app on another device.

### Refreshing the list after buying a ticket

Two ways, depending on how much you want Claude involved:

1. **Fast — add it yourself.** Use the **+ Add concert** form above. Good for one-offs, but it's local to that browser (see above).
2. **Durable — ask Claude to add it.** Tell Claude what you bought (or just say "rescan my Gmail for new concert tickets"), and ask it to add the entry to `concerts/js/data.js` and commit the change. This is the version that persists in the repo and shows up everywhere, including in a freshly republished artifact link.

If you're using the hosted artifact link Claude gave you rather than running this repo yourself, the **+ Add concert** button works the same way there — it's the same page, just published as a standalone file. Baked-in concerts (the ones Claude found in Gmail/Calendar) can only be removed by asking Claude to edit `js/data.js`, since they're not stored in `localStorage`.
