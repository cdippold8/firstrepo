(function () {
  const TIME_ZONE = "America/Los_Angeles"; // all venues are in the Pacific time zone
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

  function render() {
    const nowParts = pacificParts(new Date());

    const upcoming = CONCERTS
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

        card.innerHTML = `
          <div class="concert-date">
            <div class="concert-weekday">${c.parts.weekday}</div>
            <div class="concert-day">${c.parts.day}</div>
          </div>
          <div class="concert-info">
            <h3 class="concert-artist">${c.artist}</h3>
            <div class="concert-meta">
              <span class="concert-time">${formatTime(c.parts)}</span>
              <span class="concert-sep">·</span>
              <span class="concert-venue">${c.venue}</span>
            </div>
            <div class="concert-address">${c.address}</div>
            <div class="concert-source">${c.source}</div>
          </div>
          ${badge ? `<div class="concert-badge">${badge}</div>` : ""}
        `;

        list.appendChild(card);
      }

      section.appendChild(list);
      root.appendChild(section);
    }
  }

  render();
})();
