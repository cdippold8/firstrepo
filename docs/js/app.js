/* ------------------------------------------------------------------
   App logic: tabs, learning path, lesson library, YouTube embeds with
   live title/channel/duration lookups, and localStorage-backed progress.
------------------------------------------------------------------ */

const STORAGE_KEY = "sketchbook.progress.v1";

function loadProgress() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  } catch (e) {
    return {};
  }
}
function saveProgress() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}
let progress = loadProgress();

function isVideoWatched(lessonId, videoId) {
  return !!(progress[lessonId] && progress[lessonId].videos && progress[lessonId].videos[videoId]);
}
function setVideoWatched(lessonId, videoId, watched) {
  if (!progress[lessonId]) progress[lessonId] = { videos: {} };
  if (!progress[lessonId].videos) progress[lessonId].videos = {};
  progress[lessonId].videos[videoId] = watched;
  saveProgress();
}
function watchedCount(lesson) {
  return lesson.videos.filter((v) => isVideoWatched(lesson.id, v.id)).length;
}
function isLessonComplete(lesson) {
  return watchedCount(lesson) === lesson.videos.length;
}

/* ---------------------- YouTube IFrame API ---------------------- */

let ytApiLoading = false;
let ytApiReady = false;
const pendingPlayerInits = [];

function ensureYouTubeApi() {
  if (ytApiReady || ytApiLoading) return;
  ytApiLoading = true;
  const tag = document.createElement("script");
  tag.src = "https://www.youtube.com/iframe_api";
  document.head.appendChild(tag);
}

window.onYouTubeIframeAPIReady = function () {
  ytApiReady = true;
  pendingPlayerInits.splice(0).forEach((fn) => fn());
};

function createYouTubePlayer(elementId, videoId, onReady) {
  const init = () => {
    if (!document.getElementById(elementId)) return; // view changed before API loaded
    new YT.Player(elementId, {
      videoId: videoId,
      playerVars: { rel: 0, modestbranding: 1 },
      events: { onReady: (e) => onReady(e.target) }
    });
  };
  if (ytApiReady && window.YT && window.YT.Player) {
    init();
  } else {
    pendingPlayerInits.push(init);
    ensureYouTubeApi();
  }
}

function fetchOEmbed(videoId) {
  const watchUrl = "https://www.youtube.com/watch?v=" + videoId;
  return fetch("https://www.youtube.com/oembed?url=" + encodeURIComponent(watchUrl) + "&format=json").then((r) => {
    if (!r.ok) throw new Error("oEmbed failed");
    return r.json();
  });
}

function formatDuration(seconds) {
  const mm = Math.floor(seconds / 60);
  const ss = Math.round(seconds % 60).toString().padStart(2, "0");
  return mm + ":" + ss;
}

function updateTimeBadge(lessonId, videoId, seconds) {
  const el = document.getElementById(`time-${lessonId}-${videoId}`);
  if (!el || !seconds) return;
  const over = seconds > MAX_LESSON_MINUTES * 60;
  el.textContent = formatDuration(seconds) + (over ? " — runs a bit long" : " ✓ under 15 min");
  el.classList.remove("loading");
  el.classList.toggle("over", over);
}

/* ---------------------------- Tabs ---------------------------- */

function switchTab(tab) {
  document.querySelectorAll(".tab-btn").forEach((b) => b.classList.toggle("active", b.dataset.tab === tab));
  document.querySelectorAll(".panel").forEach((p) => p.classList.toggle("active", p.id === "panel-" + tab));
  if (tab === "path") renderPath();
  if (tab === "lessons") { showLessonsGrid(); renderLessonsGrid(); }
  if (tab === "progress") renderProgress();
}

document.getElementById("tabs").addEventListener("click", (e) => {
  const btn = e.target.closest(".tab-btn");
  if (!btn) return;
  switchTab(btn.dataset.tab);
});

/* ---------------------------- Path ---------------------------- */

function renderPath() {
  const total = LESSONS.length;
  const done = LESSONS.filter(isLessonComplete).length;
  document.getElementById("pathProgressFill").style.width = (done / total) * 100 + "%";
  document.getElementById("pathProgressLabel").textContent = `${done} of ${total} lessons complete`;

  const nextLesson = LESSONS.find((l) => !isLessonComplete(l)) || LESSONS[0];
  const continueBtn = document.getElementById("continueBtn");
  continueBtn.textContent =
    done === 0 ? `Start Lesson 1: ${LESSONS[0].title}` :
    done === total ? "Review a Lesson" :
    `Continue: Lesson ${nextLesson.order} — ${nextLesson.title}`;
  continueBtn.onclick = () => { switchTab("lessons"); openLessonDetail(nextLesson.id); };

  const roadmap = document.getElementById("roadmap");
  roadmap.innerHTML = "";
  let currentTrack = null;
  LESSONS.forEach((lesson) => {
    if (lesson.track !== currentTrack) {
      currentTrack = lesson.track;
      const heading = document.createElement("div");
      heading.className = "track-heading";
      heading.textContent = currentTrack;
      roadmap.appendChild(heading);
    }
    const complete = isLessonComplete(lesson);
    const item = document.createElement("div");
    item.className = "roadmap-item" + (complete ? " done" : "");
    item.innerHTML = `
      <div class="roadmap-num">${lesson.order}</div>
      <div class="roadmap-body">
        <h3>${lesson.title}</h3>
        <p class="muted">${lesson.blurb}</p>
        <div class="roadmap-badges">
          <span class="medium-badge medium-${lesson.medium}">${lesson.medium}</span>
        </div>
      </div>
      ${complete ? '<span class="roadmap-check">✓</span>' : ""}
    `;
    item.addEventListener("click", () => { switchTab("lessons"); openLessonDetail(lesson.id); });
    roadmap.appendChild(item);
  });
}

/* ------------------------- Lessons grid ------------------------- */

let currentMediumFilter = "all";

function showLessonsGrid() {
  document.getElementById("lessonsGridView").style.display = "";
  document.getElementById("lessonDetailView").style.display = "none";
}

function renderLessonsGrid() {
  const grid = document.getElementById("lessonsGrid");
  grid.innerHTML = "";
  const filtered = LESSONS.filter((l) => currentMediumFilter === "all" || l.medium === currentMediumFilter);
  filtered.forEach((lesson) => {
    const complete = isLessonComplete(lesson);
    const card = document.createElement("div");
    card.className = "lesson-card" + (complete ? " completed" : "");
    card.innerHTML = `
      <div class="lesson-card-top">
        <h3>${lesson.order}. ${lesson.title}</h3>
        ${complete ? '<span class="roadmap-check">✓</span>' : ""}
      </div>
      <p>${lesson.blurb}</p>
      <div class="lesson-card-footer">
        <span class="medium-badge medium-${lesson.medium}">${lesson.medium}</span>
        <span>${watchedCount(lesson)}/${lesson.videos.length} watched</span>
      </div>
    `;
    card.addEventListener("click", () => openLessonDetail(lesson.id));
    grid.appendChild(card);
  });
}

document.getElementById("mediumFilter").addEventListener("click", (e) => {
  const btn = e.target.closest(".filter-btn");
  if (!btn) return;
  currentMediumFilter = btn.dataset.medium;
  document.querySelectorAll(".filter-btn").forEach((b) => b.classList.toggle("active", b === btn));
  renderLessonsGrid();
});

document.getElementById("backToLessons").addEventListener("click", showLessonsGrid);

/* ------------------------- Lesson detail ------------------------- */

function openLessonDetail(lessonId) {
  const lesson = LESSONS.find((l) => l.id === lessonId);
  if (!lesson) return;
  document.querySelectorAll(".tab-btn").forEach((b) => b.classList.toggle("active", b.dataset.tab === "lessons"));
  document.querySelectorAll(".panel").forEach((p) => p.classList.toggle("active", p.id === "panel-lessons"));
  document.getElementById("lessonsGridView").style.display = "none";
  document.getElementById("lessonDetailView").style.display = "";
  renderLessonDetail(lesson);
}

function videoCardHtml(lesson, v) {
  const watched = isVideoWatched(lesson.id, v.id);
  const channelText = v.fallbackChannel || "Loading creator…";
  return `
    <div class="video-card">
      <div class="video-embed"><div id="ytplayer-${lesson.id}-${v.id}"></div></div>
      <div class="video-meta">
        <div>
          <div class="video-title" id="title-${lesson.id}-${v.id}">${v.fallbackTitle}</div>
          <div class="video-channel" id="channel-${lesson.id}-${v.id}">${channelText}</div>
          <span class="time-badge loading" id="time-${lesson.id}-${v.id}">Checking length…</span>
        </div>
        <div class="video-actions">
          <a class="video-link" href="https://www.youtube.com/watch?v=${v.id}" target="_blank" rel="noopener">Open on YouTube</a>
          <label class="watched-toggle">
            <input type="checkbox" id="watched-${lesson.id}-${v.id}" ${watched ? "checked" : ""} />
            Watched
          </label>
        </div>
      </div>
    </div>
  `;
}

function updateCompleteBar(lesson) {
  const bar = document.getElementById("completeBar");
  if (!bar) return;
  const complete = isLessonComplete(lesson);
  bar.className = "lesson-complete-bar" + (complete ? "" : " incomplete");
  bar.innerHTML = complete
    ? "<span>✓ Lesson complete — nice work!</span>"
    : `<span>Watch both videos above to complete this lesson (${watchedCount(lesson)}/${lesson.videos.length} so far).</span>`;
}

function renderLessonDetail(lesson) {
  const container = document.getElementById("lessonDetailContent");
  const materialsHtml = lesson.materials.map((m) => `<li>${m}</li>`).join("");
  const videosHtml = lesson.videos.map((v) => videoCardHtml(lesson, v)).join("");
  container.innerHTML = `
    <div class="lesson-detail-head">
      <h2>${lesson.order}. ${lesson.title}</h2>
      <div class="lesson-detail-badges">
        <span class="medium-badge medium-${lesson.medium}">${lesson.medium}</span>
        <span class="medium-badge">${lesson.track}</span>
      </div>
      <p class="muted">${lesson.blurb}</p>
    </div>
    <div class="detail-section">
      <h4>Materials</h4>
      <ul class="materials-list">${materialsHtml}</ul>
    </div>
    <div class="detail-section">
      <h4>Videos</h4>
      <div class="video-list">${videosHtml}</div>
    </div>
    <div class="detail-section">
      <h4>Practice</h4>
      <div class="practice-box">${lesson.practice}</div>
    </div>
    <div class="lesson-complete-bar" id="completeBar"></div>
  `;
  updateCompleteBar(lesson);

  lesson.videos.forEach((v) => {
    const playerElId = `ytplayer-${lesson.id}-${v.id}`;
    createYouTubePlayer(playerElId, v.id, (player) => {
      updateTimeBadge(lesson.id, v.id, player.getDuration());
    });

    fetchOEmbed(v.id)
      .then((data) => {
        const titleEl = document.getElementById(`title-${lesson.id}-${v.id}`);
        const channelEl = document.getElementById(`channel-${lesson.id}-${v.id}`);
        if (titleEl && data.title) titleEl.textContent = data.title;
        if (channelEl && data.author_name) channelEl.textContent = data.author_name;
      })
      .catch(() => { /* keep fallback title/channel from data.js */ });

    const checkbox = document.getElementById(`watched-${lesson.id}-${v.id}`);
    if (checkbox) {
      checkbox.addEventListener("change", () => {
        setVideoWatched(lesson.id, v.id, checkbox.checked);
        updateCompleteBar(lesson);
      });
    }
  });
}

/* ---------------------------- Progress ---------------------------- */

function renderProgress() {
  const total = LESSONS.length;
  const done = LESSONS.filter(isLessonComplete).length;
  document.getElementById("progressCount").textContent = done;
  document.getElementById("progressTotal").textContent = total;
  document.getElementById("progressFill").style.width = (done / total) * 100 + "%";

  const list = document.getElementById("progressList");
  list.innerHTML = "";
  LESSONS.forEach((lesson) => {
    const complete = isLessonComplete(lesson);
    const wc = watchedCount(lesson);
    const status = complete ? "Complete" : wc > 0 ? `${wc}/${lesson.videos.length} watched` : "Not started";
    const row = document.createElement("div");
    row.className = "progress-row" + (complete ? " done" : "");
    row.style.cursor = "pointer";
    row.innerHTML = `
      <span class="progress-row-title">${lesson.order}. ${lesson.title}</span>
      <span class="progress-row-status">${status}</span>
    `;
    row.addEventListener("click", () => { switchTab("lessons"); openLessonDetail(lesson.id); });
    list.appendChild(row);
  });
}

document.getElementById("resetProgress").addEventListener("click", () => {
  if (!confirm("Reset all lesson progress? This cannot be undone.")) return;
  progress = {};
  saveProgress();
  renderProgress();
});

/* ---------------------------- Init ---------------------------- */

document.getElementById("maxMinutesLabel").textContent = MAX_LESSON_MINUTES;
renderPath();
