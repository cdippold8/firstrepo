/* ------------------------------------------------------------------
   App logic: tabs, dashboard, meal plan, exercise, recipes,
   grocery list, and a localStorage-backed weight tracker.
------------------------------------------------------------------ */

const DAY_ORDER = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const WEEKDAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

const state = {
  selectedWeek: localStorage.getItem("wl_selectedWeek") || "A",
};

/* ---------------------------- TABS ---------------------------- */

function initTabs() {
  document.querySelectorAll(".tab-btn").forEach((btn) => {
    btn.addEventListener("click", () => switchTab(btn.dataset.tab));
  });
}

function switchTab(tab) {
  document.querySelectorAll(".tab-btn").forEach((b) => b.classList.toggle("active", b.dataset.tab === tab));
  document.querySelectorAll(".panel").forEach((p) => p.classList.toggle("active", p.id === `panel-${tab}`));
}

/* ---------------------------- WEEK SELECTION ---------------------------- */

function setWeek(weekKey) {
  state.selectedWeek = weekKey;
  localStorage.setItem("wl_selectedWeek", weekKey);
  document.querySelectorAll(".week-btn").forEach((b) => {
    const key = b.dataset.week || b.dataset.gweek;
    b.classList.toggle("active", key === weekKey);
  });
  renderMealPlan();
  renderGroceryList();
  renderDashboard();
}

function initWeekSwitch() {
  document.querySelectorAll("[data-week]").forEach((b) => b.addEventListener("click", () => setWeek(b.dataset.week)));
  document.querySelectorAll("[data-gweek]").forEach((b) => b.addEventListener("click", () => setWeek(b.dataset.gweek)));
  setWeek(state.selectedWeek);
}

/* ---------------------------- DASHBOARD ---------------------------- */

function renderDashboard() {
  const today = new Date();
  const dayName = DAY_ORDER[(today.getDay() + 6) % 7]; // Mon-first index
  const isWeekday = WEEKDAYS.includes(dayName);
  const week = WEEKS[state.selectedWeek];

  const mealCard = document.getElementById("todayMealCard");
  if (isWeekday) {
    const day = week.days[dayName];
    mealCard.innerHTML = `
      <div class="kicker">${dayName} · ${week.title}</div>
      <h3>Today's Meals</h3>
      ${["breakfast", "snackAm", "lunch", "snackPm", "dinner"].map((k) => mealRowHtml(k, day[k])).join("")}
    `;
  } else {
    mealCard.innerHTML = `
      <div class="kicker">${dayName}</div>
      <h3>Off the meal plan</h3>
      <p class="muted">Weekends are unstructured — eat sensibly, keep portions in check, and go easy on saturated fat and fried food. No prep required today.</p>
    `;
  }

  const exCard = document.getElementById("todayExerciseCard");
  const ex = EXERCISE[dayName];
  exCard.innerHTML = `
    <div class="kicker">Training</div>
    <h3>${ex.title} <span class="exercise-type" style="margin-left:6px;">${ex.type}</span></h3>
    <p class="muted">${ex.duration}</p>
    <ul>${ex.details.map((d) => `<li>${d}</li>`).join("")}</ul>
    ${ex.note ? `<p class="muted">${ex.note}</p>` : ""}
  `;

  document.getElementById("todayGoalCard").innerHTML = goalCardHtml();
}

function mealRowHtml(key, meal) {
  if (!meal) return "";
  const labels = { breakfast: "Breakfast", snackAm: "AM Snack", lunch: "Lunch", snackPm: "PM Snack", dinner: "Dinner" };
  const bulk = meal.bulk ? `<span class="bulk-flag">BULK</span>` : "";
  return `
    <div class="meal-row">
      <div class="meal-label">${labels[key]}</div>
      <div class="meal-name">${meal.name}${bulk}</div>
    </div>
  `;
}

function goalCardHtml() {
  const t = getTracker();
  if (!t.start) {
    return `
      <div class="kicker">Goal</div>
      <h3>Lose 10 lbs</h3>
      <p class="muted">Set a starting weight on the Progress tab to start tracking.</p>
    `;
  }
  const current = latestWeight(t);
  const lost = round1(t.start - current);
  const pct = clamp(((t.start - current) / GOAL.targetLossLbs) * 100, 0, 100);
  return `
    <div class="kicker">Goal</div>
    <h3>${lost >= 0 ? lost : 0} of 10 lbs down</h3>
    <div class="progress-bar-track"><div class="progress-bar-fill" style="width:${pct}%"></div></div>
    <p class="muted">${current} lbs current · ${round1(t.start - GOAL.targetLossLbs)} lbs goal</p>
  `;
}

/* ---------------------------- MEAL PLAN ---------------------------- */

function renderMealPlan() {
  const week = WEEKS[state.selectedWeek];
  document.getElementById("weekTitle").textContent = week.title;
  const grid = document.getElementById("mealsGrid");
  grid.innerHTML = WEEKDAYS.map((day) => {
    const d = week.days[day];
    return `
      <div class="day-card">
        <h3>${day}</h3>
        ${["breakfast", "snackAm", "lunch", "snackPm", "dinner"].map((k) => mealCardRow(k, d[k])).join("")}
      </div>
    `;
  }).join("");

  grid.querySelectorAll(".recipe-link").forEach((btn) => {
    btn.addEventListener("click", () => goToRecipe(btn.dataset.recipe));
  });
}

function mealCardRow(key, meal) {
  if (!meal) return "";
  const labels = { breakfast: "Breakfast", snackAm: "AM Snack", lunch: "Lunch", snackPm: "PM Snack", dinner: "Dinner" };
  const bulk = meal.bulk ? `<span class="bulk-flag">BULK</span>` : "";
  const link = meal.recipeId ? `<br/><button class="recipe-link" data-recipe="${meal.recipeId}">View recipe →</button>` : "";
  const bulkNote = meal.bulkNote ? `<div class="muted" style="font-size:0.78rem;margin-top:2px;">${meal.bulkNote}</div>` : "";
  return `
    <div class="meal-row">
      <div class="meal-label">${labels[key]}</div>
      <div class="meal-name">${meal.name}${bulk}</div>
      <div class="meal-kcal">${meal.kcal ? meal.kcal + " kcal" : ""}</div>
      ${bulkNote}${link}
    </div>
  `;
}

function goToRecipe(recipeId) {
  switchTab("recipes");
  requestAnimationFrame(() => {
    const el = document.getElementById(`recipe-${recipeId}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      el.classList.add("highlight");
      setTimeout(() => el.classList.remove("highlight"), 1500);
    }
  });
}

/* ---------------------------- EXERCISE ---------------------------- */

function renderExercise() {
  const grid = document.getElementById("exerciseGrid");
  grid.innerHTML = DAY_ORDER.map((day) => {
    const ex = EXERCISE[day];
    return `
      <div class="exercise-card ${ex.optional ? "optional" : ""}">
        <span class="exercise-type">${ex.type}</span>
        <h3>${day} · ${ex.title}</h3>
        <p class="muted">${ex.duration}</p>
        <ul>${ex.details.map((d) => `<li>${d}</li>`).join("")}</ul>
        ${ex.note ? `<p class="exercise-note">${ex.note}</p>` : ""}
      </div>
    `;
  }).join("");
}

/* ---------------------------- RECIPES ---------------------------- */

function renderRecipes() {
  const list = document.getElementById("recipesList");
  list.innerHTML = Object.entries(RECIPES).map(([id, r]) => `
    <div class="recipe-card" id="recipe-${id}">
      <h3>${r.name}</h3>
      <div class="recipe-meta">${r.servings} · ${r.seasonal}</div>
      <div class="recipe-columns">
        <div>
          <h4>Ingredients</h4>
          <ul>${r.ingredients.map((i) => `<li>${i}</li>`).join("")}</ul>
        </div>
        <div>
          <h4>Steps</h4>
          <ol>${r.steps.map((s) => `<li>${s}</li>`).join("")}</ol>
        </div>
      </div>
      <div class="recipe-tip">💡 ${r.cholesterolTip}</div>
    </div>
  `).join("");
}

/* ---------------------------- HEART-HEALTHY TIPS ---------------------------- */

function renderTips() {
  document.getElementById("tipsGrid").innerHTML = CHOLESTEROL_TIPS.map((t) => `
    <div class="tip"><strong>${t.title}</strong><span>${t.body}</span></div>
  `).join("");
}

/* ---------------------------- GROCERY LIST ---------------------------- */

const CATEGORIES = [
  { name: "Produce", keywords: ["zucchini", "corn", "pepper", "tomato", "onion", "garlic", "lemon", "avocado", "spinach", "carrot", "celery", "cucumber", "peach", "berries", "blueberr", "banana", "apple", "orange", "watermelon", "cabbage", "lime", "basil", "parsley", "cilantro", "green bean", "sweet potato", "mushroom", "portobello", "eggplant", "kale"] },
  { name: "Meat & Seafood", keywords: ["turkey", "chicken", "salmon", "shrimp", "cod", "tuna"] },
  { name: "Eggs & Dairy", keywords: ["egg", "yogurt", "cheese", "feta", "mozzarella", "cottage cheese", "milk", "butter"] },
  { name: "Grains & Bread", keywords: ["oat", "quinoa", "farro", "rice", "pasta", "tortilla", "bread", "toast"] },
  { name: "Pantry & Pulses", keywords: ["olive oil", "vinegar", "broth", "beans", "chickpea", "lentil", "hummus", "chili powder", "cumin", "paprika", "honey", "almond butter", "peanut butter", "walnut", "almond", "flaxseed", "chia", "popcorn", "seasoning", "herbs", "oregano", "thyme", "dill"] },
];

function categorize(item) {
  const lower = item.toLowerCase();
  for (const cat of CATEGORIES) {
    if (cat.keywords.some((kw) => lower.includes(kw))) return cat.name;
  }
  return "Other";
}

function buildGroceryList(weekKey) {
  const week = WEEKS[weekKey];
  const seenRecipes = new Set();
  const items = new Map();
  const addItem = (text) => {
    const key = text.trim().toLowerCase();
    if (!items.has(key)) items.set(key, text.trim());
  };

  Object.values(week.days).forEach((day) => {
    ["breakfast", "snackAm", "lunch", "snackPm"].forEach((mk) => {
      if (day[mk] && day[mk].ingredients) day[mk].ingredients.forEach(addItem);
    });
    const dinner = day.dinner;
    if (dinner && dinner.recipeId) {
      if (!seenRecipes.has(dinner.recipeId)) {
        seenRecipes.add(dinner.recipeId);
        RECIPES[dinner.recipeId].ingredients.forEach(addItem);
      }
    }
  });

  const grouped = {};
  items.forEach((label) => {
    const cat = categorize(label);
    grouped[cat] = grouped[cat] || [];
    grouped[cat].push(label);
  });
  return grouped;
}

function slug(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function getCheckedMap(weekKey) {
  return JSON.parse(localStorage.getItem(`wl_grocery_checked_${weekKey}`) || "{}");
}

function setChecked(weekKey, itemKey, checked) {
  const map = getCheckedMap(weekKey);
  if (checked) map[itemKey] = true;
  else delete map[itemKey];
  localStorage.setItem(`wl_grocery_checked_${weekKey}`, JSON.stringify(map));
}

function renderGroceryList() {
  const weekKey = state.selectedWeek;
  const grouped = buildGroceryList(weekKey);
  const checkedMap = getCheckedMap(weekKey);
  const container = document.getElementById("groceryList");

  container.innerHTML = Object.entries(grouped).map(([cat, items]) => `
    <div class="grocery-group">
      <h4>${cat}</h4>
      ${items.map((item) => {
        const key = slug(item);
        const checked = !!checkedMap[key];
        return `
          <div class="grocery-item ${checked ? "checked" : ""}" data-key="${key}">
            <input type="checkbox" id="g-${weekKey}-${key}" ${checked ? "checked" : ""} />
            <label for="g-${weekKey}-${key}">${item}</label>
          </div>
        `;
      }).join("")}
    </div>
  `).join("");

  container.querySelectorAll(".grocery-item input").forEach((cb) => {
    cb.addEventListener("change", (e) => {
      const row = e.target.closest(".grocery-item");
      row.classList.toggle("checked", e.target.checked);
      setChecked(weekKey, row.dataset.key, e.target.checked);
    });
  });
}

function initGroceryClear() {
  document.getElementById("clearChecked").addEventListener("click", () => {
    localStorage.removeItem(`wl_grocery_checked_${state.selectedWeek}`);
    renderGroceryList();
  });
}

/* ---------------------------- PROGRESS TRACKER ---------------------------- */

function getTracker() {
  return JSON.parse(localStorage.getItem("wl_tracker") || '{"start":null,"entries":[]}');
}

function saveTracker(t) {
  localStorage.setItem("wl_tracker", JSON.stringify(t));
}

function latestWeight(t) {
  if (t.entries.length === 0) return t.start;
  const sorted = [...t.entries].sort((a, b) => new Date(a.date) - new Date(b.date));
  return sorted[sorted.length - 1].weight;
}

function round1(n) {
  return Math.round(n * 10) / 10;
}

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

function initProgress() {
  const t = getTracker();
  if (t.start) showProgressBody(t);

  document.getElementById("setStartBtn").addEventListener("click", () => {
    const val = parseFloat(document.getElementById("startWeight").value);
    if (!val || val <= 0) return;
    const nt = { start: val, entries: [] };
    saveTracker(nt);
    showProgressBody(nt);
    renderDashboard();
  });

  document.getElementById("logForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const date = document.getElementById("logDate").value;
    const weight = parseFloat(document.getElementById("logWeight").value);
    if (!date || !weight) return;
    const nt = getTracker();
    nt.entries.push({ date, weight });
    saveTracker(nt);
    document.getElementById("logForm").reset();
    showProgressBody(nt);
    renderDashboard();
  });

  document.getElementById("resetTracker").addEventListener("click", () => {
    if (!confirm("Reset all weight tracking data?")) return;
    localStorage.removeItem("wl_tracker");
    document.getElementById("progressBody").style.display = "none";
    document.getElementById("progressSetup").style.display = "flex";
    document.getElementById("startWeight").value = "";
    renderDashboard();
  });
}

function showProgressBody(t) {
  document.getElementById("progressSetup").style.display = "none";
  document.getElementById("progressBody").style.display = "flex";

  const current = latestWeight(t);
  const target = round1(t.start - GOAL.targetLossLbs);
  const pct = clamp(((t.start - current) / GOAL.targetLossLbs) * 100, 0, 100);

  document.getElementById("goalCurrent").textContent = current;
  document.getElementById("goalTarget").textContent = target;
  document.getElementById("progressFill").style.width = pct + "%";
  document.getElementById("progressPct").textContent =
    pct >= 100 ? "Goal reached! 🎉" : `${round1(pct)}% of the way to −10 lbs`;

  const sorted = [...t.entries].sort((a, b) => new Date(a.date) - new Date(b.date));
  const tbody = document.querySelector("#logTable tbody");
  tbody.innerHTML = sorted.map((entry, i) => {
    const prev = i === 0 ? t.start : sorted[i - 1].weight;
    const diff = round1(entry.weight - prev);
    const diffStr = diff === 0 ? "–" : (diff > 0 ? `+${diff}` : `${diff}`);
    return `
      <tr>
        <td>${entry.date}</td>
        <td>${entry.weight} lbs</td>
        <td>${diffStr}</td>
        <td><button data-idx="${i}">Remove</button></td>
      </tr>
    `;
  }).join("");

  tbody.querySelectorAll("button[data-idx]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const idx = parseInt(btn.dataset.idx, 10);
      const nt = getTracker();
      const sortedEntries = [...nt.entries].sort((a, b) => new Date(a.date) - new Date(b.date));
      const target = sortedEntries[idx];
      nt.entries = nt.entries.filter((e) => !(e.date === target.date && e.weight === target.weight));
      saveTracker(nt);
      showProgressBody(nt);
      renderDashboard();
    });
  });

  drawChart(t.start, sorted);
}

function drawChart(start, sorted) {
  const canvas = document.getElementById("progressChart");
  const ctx = canvas.getContext("2d");
  const w = canvas.width, h = canvas.height, pad = 24;
  ctx.clearRect(0, 0, w, h);

  const points = [{ label: "Start", weight: start }, ...sorted.map((e) => ({ label: e.date, weight: e.weight }))];
  const weights = points.map((p) => p.weight);
  const min = Math.min(...weights) - 1;
  const max = Math.max(...weights) + 1;

  const x = (i) => pad + (i * (w - 2 * pad)) / Math.max(points.length - 1, 1);
  const y = (val) => h - pad - ((val - min) / (max - min || 1)) * (h - 2 * pad);

  const styles = getComputedStyle(document.documentElement);
  ctx.strokeStyle = styles.getPropertyValue("--accent").trim() || "#3f7d4a";
  ctx.lineWidth = 2;
  ctx.beginPath();
  points.forEach((p, i) => {
    const px = x(i), py = y(p.weight);
    if (i === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  });
  ctx.stroke();

  ctx.fillStyle = ctx.strokeStyle;
  points.forEach((p, i) => {
    ctx.beginPath();
    ctx.arc(x(i), y(p.weight), 3.5, 0, Math.PI * 2);
    ctx.fill();
  });
}

/* ---------------------------- INIT ---------------------------- */

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("logDate").valueAsDate = new Date();
  initTabs();
  initWeekSwitch();
  renderExercise();
  renderRecipes();
  renderTips();
  initGroceryClear();
  initProgress();
  renderDashboard();
});
