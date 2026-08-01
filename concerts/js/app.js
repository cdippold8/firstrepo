(function () {
  const TIME_ZONE = "America/Los_Angeles"; // all venues are in the Pacific time zone
  const STORAGE_KEY = "concerts.manual.v1";
  const MONTH_NAMES = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];

  // Extracts the venue-local (Pacific) date/time parts, independent of the
  // viewer's own browser timezone.
  function pacificParts(d) {
    const dtf = new Intl.DateTimeFormat("en-US", {
      timeZone: TIME_ZONE,
      year: "numeric",
      month: "numeric",
      day: "numeric",
      weekday: "short",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
    const parts = Object.fromEntries(dtf.formatToParts(d).map((p) => [p.type, p.value]));
    return {
      year: Number(parts.year),
      month: Number(parts.month) - 1, // 0-indexed to match MONTH_NAMES
      day: Number(parts.day),
      weekday: parts.weekday,
      hour: parts.hour,
      minute: parts.minute,
      dayPeriod: parts.dayPeriod,
    };
  }

  // Converts a "wall clock" date + time, entered as Pacific local time, into
  // the correct absolute instant (as an ISO string), regardless of the
  // viewer's own timezone or the current Pacific UTC offset (PDT vs PST).
  function pacificWallTimeToISOString(year, month, day, hour, minute) {
    const guessUTC = Date.UTC(year, month, day, hour, minute);
    const dtf = new Intl.DateTimeFormat("en-US", {
      timeZone: TIME_ZONE,
      timeZoneName: "longOffset",
    });
    const offsetLabel = dtf.formatToParts(new Date(guessUTC)).find((p) => p.type === "timeZoneName").value;
    const match = offsetLabel.match(/GMT([+-])(\d{2}):?(\d{2})?/);
    const sign = match[1] === "-" ? -1 : 1;
    const offsetMs = sign * (Number(match[2]) * 60 + Number(match[3] || 0)) * 60000;
    return new Date(guessUTC - offsetMs).toISOString();
  }

  function formatTime(p) {
    const minuteStr = p.minute === "00" ? "" : `:${p.minute}`;
    return `${p.hour}${minuteStr} ${p.dayPeriod}`;
  }

  // Days between two Pacific calendar dates (ignoring time-of-day), used for
  // "days until" — computed against "today" in Pacific time as well.
  function daysBetween(a, b) {
    const utcA = Date.UTC(a.year, a.month, a.day);
    const utcB = Date.UTC(b.year, b.month, b.day);
    return Math.round((utcA - utcB) / 86400000);
  }

  function daysUntilLabel(days) {
    if (days < 0) return null;
    if (days === 0) return "Today";
    if (days === 1) return "Tomorrow";
    if (days < 14) return `In ${days} days`;
    if (days < 60) return `In ${Math.round(days / 7)} weeks`;
    return `In ${Math.round(days / 30)} months`;
  }

  function escapeHtml(str) {
    const div = document.createElement("div");
    div.textContent = str == null ? "" : String(str);
    return div.innerHTML;
  }

  function loadManualConcerts() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  }

  function saveManualConcerts(list) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  }

  function removeManualConcert(id) {
    const list = loadManualConcerts().filter((c) => c.id !== id);
    saveManualConcerts(list);
    render();
  }

  function render() {
    const nowParts = pacificParts(new Date());
    const allConcerts = [...CONCERTS, ...loadManualConcerts()];

    const upcoming = allConcerts
      .map((c) => ({ ...c, parts: pacificParts(new Date(c.date)) }))
      .filter((c) => daysBetween(c.parts, nowParts) >= 0)
      .sort((a, b) => new Date(a.date) - new Date(b.date));

    const root = document.getElementById("app");
    const summary = document.getElementById("summary");

    if (upcoming.length === 0) {
      summary.textContent = "No upcoming concerts found.";
      root.innerHTML = '<p class="empty">Nothing on the calendar right now — go buy some tickets.</p>';
      return;
    }

    summary.textContent = `${upcoming.length} upcoming concert${upcoming.length === 1 ? "" : "s"}`;

    const groups = new Map();
    for (const c of upcoming) {
      const key = `${c.parts.year}-${c.parts.month}`;
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key).push(c);
    }

    root.innerHTML = "";
    for (const [key, concerts] of groups) {
      const [year, month] = key.split("-").map(Number);

      const section = document.createElement("section");
      section.className = "month-group";

      const heading = document.createElement("h2");
      heading.className = "month-heading";
      const isCurrentMonth = year === nowParts.year && month === nowParts.month;
      heading.textContent = `${MONTH_NAMES[month]} ${year}${isCurrentMonth ? " — this month" : ""}`;
      section.appendChild(heading);

      const list = document.createElement("div");
      list.className = "concert-list";

      for (const c of concerts) {
        const card = document.createElement("article");
        card.className = "concert-card";

        const days = daysBetween(c.parts, nowParts);
        const badge = daysUntilLabel(days);
        const isManual = Boolean(c.id);

        card.innerHTML = `
          <div class="concert-date">
            <div class="concert-weekday">${c.parts.weekday}</div>
            <div class="concert-day">${c.parts.day}</div>
          </div>
          <div class="concert-info">
            <h3 class="concert-artist">${escapeHtml(c.artist)}</h3>
            <div class="concert-meta">
              <span class="concert-time">${formatTime(c.parts)}</span>
              <span class="concert-sep">·</span>
              <span class="concert-venue">${escapeHtml(c.venue)}</span>
            </div>
            ${c.address ? `<div class="concert-address">${escapeHtml(c.address)}</div>` : ""}
            <div class="concert-source">${escapeHtml(c.source)}</div>
          </div>
          ${badge ? `<div class="concert-badge">${badge}</div>` : ""}
          ${isManual ? '<button type="button" class="concert-remove" title="Remove">&times;</button>' : ""}
        `;

        if (isManual) {
          card.querySelector(".concert-remove").addEventListener("click", () => removeManualConcert(c.id));
        }

        list.appendChild(card);
      }

      section.appendChild(list);
      root.appendChild(section);
    }
  }

  function setupAddForm() {
    const toggle = document.getElementById("addToggle");
    const form = document.getElementById("addForm");
    const cancel = document.getElementById("addCancel");

    toggle.addEventListener("click", () => {
      form.hidden = !form.hidden;
      toggle.textContent = form.hidden ? "+ Add concert" : "Cancel";
      if (!form.hidden) document.getElementById("fieldArtist").focus();
    });

    cancel.addEventListener("click", () => {
      form.reset();
      form.hidden = true;
      toggle.textContent = "+ Add concert";
    });

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const artist = document.getElementById("fieldArtist").value.trim();
      const dateVal = document.getElementById("fieldDate").value; // YYYY-MM-DD
      const timeVal = document.getElementById("fieldTime").value; // HH:MM
      const venue = document.getElementById("fieldVenue").value.trim();
      const address = document.getElementById("fieldAddress").value.trim();

      if (!artist || !dateVal || !timeVal || !venue) return;

      const [year, month, day] = dateVal.split("-").map(Number);
      const [hour, minute] = timeVal.split(":").map(Number);

      const concert = {
        id: `manual-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        artist,
        date: pacificWallTimeToISOString(year, month - 1, day, hour, minute),
        venue,
        address,
        source: "Added manually",
      };

      const list = loadManualConcerts();
      list.push(concert);
      saveManualConcerts(list);

      form.reset();
      form.hidden = true;
      toggle.textContent = "+ Add concert";
      render();
    });
  }

  setupAddForm();
  render();
})();
