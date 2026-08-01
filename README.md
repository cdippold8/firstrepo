# 10 Down

A simple, no-build web app for a 10-lb weight-loss plan: low-cholesterol meals and snacks Monday–Friday (weekends off the meal plan), a 7-day training schedule built around running, walking, yoga, and lifting, seasonal recipes, a generated grocery list, and a weigh-in tracker.

## Running it

No build step or server required — just open `index.html` in a browser. If your browser blocks local scripts, serve it with any static server, e.g.:

```
python3 -m http.server 8000
```

then visit `http://localhost:8000`.

## What's inside

- **Today** — today's meals (if it's a weekday) and today's workout, plus a live view of your weight-loss progress.
- **Meal Plan** — two alternating weekday rotations (Week A / Week B) so meals don't repeat every week. Each dinner links to a full recipe. One dinner per week is a bulk-cooked recipe that covers two nights.
- **Exercise** — a 7-day training split: lifting, running (easy + intervals), yoga, and an easy weekend walk.
- **Recipes** — full ingredient lists and steps for every dinner, all built around current-season (late-summer) produce, with a note on why each recipe supports lower cholesterol.
- **Grocery List** — auto-generated from whichever week is selected, grouped by category, with checkboxes that persist in the browser.
- **Progress** — set a starting weight, log weigh-ins, and track progress toward the 10-lb goal with a simple chart. All data is stored locally in your browser (`localStorage`) — nothing is sent anywhere.

## Notes

- The plan is general guidance, not medical advice — check with a doctor or dietitian before making major diet or exercise changes, especially around cholesterol management.
- Data (weigh-ins, checked grocery items, selected week) lives only in your browser's local storage. Clearing browser data will reset it.
