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

### Refreshing the list

This snapshot won't update itself — Gmail and Calendar keep changing. To refresh it, ask Claude to re-scan your Gmail and Calendar for concert tickets/invites and update `concerts/js/data.js` with anything new (or anything that's now in the past and should be removed).
