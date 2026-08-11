(function () {
  "use strict";

  var STORAGE_KEY = "intervalRun.config.v1";

  var screens = {
    setup: document.getElementById("screen-setup"),
    run: document.getElementById("screen-run"),
    done: document.getElementById("screen-done"),
  };

  function showScreen(name) {
    Object.keys(screens).forEach(function (key) {
      screens[key].classList.toggle("active", key === name);
    });
  }

  // ---------- Setup state ----------

  var warmupInput = document.getElementById("warmupMin");
  var cooldownInput = document.getElementById("cooldownMin");
  var blocksList = document.getElementById("blocksList");
  var addBlockBtn = document.getElementById("addBlockBtn");
  var summaryBody = document.getElementById("summaryBody");
  var startBtn = document.getElementById("startBtn");

  var blockIdCounter = 0;

  function defaultConfig() {
    return {
      warmupMin: 5,
      cooldownMin: 5,
      blocks: [{ id: ++blockIdCounter, everyMin: 3, forMin: 1, rounds: 6 }],
    };
  }

  var config = loadConfig() || defaultConfig();
  if (config.blocks && config.blocks.length) {
    blockIdCounter = Math.max.apply(
      null,
      config.blocks.map(function (b) {
        return b.id;
      })
    );
  }

  function loadConfig() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      var parsed = JSON.parse(raw);
      if (!parsed || !Array.isArray(parsed.blocks)) return null;
      return parsed;
    } catch (e) {
      return null;
    }
  }

  function saveConfig() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
    } catch (e) {
      /* ignore */
    }
  }

  function renderBlocks() {
    blocksList.innerHTML = "";
    config.blocks.forEach(function (block, index) {
      blocksList.appendChild(renderBlockRow(block, index));
    });
    if (config.blocks.length === 0) {
      var empty = document.createElement("p");
      empty.className = "muted small-text";
      empty.textContent = "No intervals yet — add one, or just do a straight warm up + cool down run.";
      blocksList.appendChild(empty);
    }
  }

  function renderBlockRow(block, index) {
    var row = document.createElement("div");
    row.className = "block-row";

    var top = document.createElement("div");
    top.className = "block-row-top";
    var label = document.createElement("span");
    label.className = "block-label";
    label.textContent = "Interval " + (index + 1);
    top.appendChild(label);

    if (config.blocks.length > 1) {
      var removeBtn = document.createElement("button");
      removeBtn.type = "button";
      removeBtn.className = "block-remove";
      removeBtn.setAttribute("aria-label", "Remove interval " + (index + 1));
      removeBtn.textContent = "✕";
      removeBtn.addEventListener("click", function () {
        config.blocks = config.blocks.filter(function (b) {
          return b.id !== block.id;
        });
        renderBlocks();
        renderSummary();
        saveConfig();
      });
      top.appendChild(removeBtn);
    }
    row.appendChild(top);

    var fields = document.createElement("div");
    fields.className = "block-fields";

    fields.appendChild(
      makeNumberField("Every (min)", block.everyMin, 0.5, function (val) {
        block.everyMin = val;
        renderBlockSentence(row, block);
        renderSummary();
        saveConfig();
      })
    );
    fields.appendChild(
      makeNumberField("For (min)", block.forMin, 0.5, function (val) {
        block.forMin = val;
        renderBlockSentence(row, block);
        renderSummary();
        saveConfig();
      })
    );
    fields.appendChild(
      makeNumberField("Rounds", block.rounds, 1, function (val) {
        block.rounds = Math.max(1, Math.round(val));
        renderBlockSentence(row, block);
        renderSummary();
        saveConfig();
      })
    );

    row.appendChild(fields);

    var sentence = document.createElement("p");
    sentence.className = "block-sentence";
    row.appendChild(sentence);
    renderBlockSentence(row, block);

    return row;
  }

  function renderBlockSentence(row, block) {
    var sentence = row.querySelector(".block-sentence");
    var rest = Math.max(0, block.everyMin - block.forMin);
    var text =
      "Every " +
      formatMin(block.everyMin) +
      ", work for " +
      formatMin(block.forMin) +
      (rest > 0 ? " (rest " + formatMin(rest) + ")" : " (no rest — back to back)") +
      ", x " +
      block.rounds +
      " rounds";
    sentence.textContent = text;
  }

  function formatMin(m) {
    return m === 1 ? "1 min" : m + " min";
  }

  function makeNumberField(labelText, value, step, onChange) {
    var field = document.createElement("label");
    field.className = "field";
    var span = document.createElement("span");
    span.textContent = labelText;
    var input = document.createElement("input");
    input.type = "number";
    input.min = step >= 1 ? "1" : "0.5";
    input.step = String(step);
    input.inputMode = "decimal";
    input.value = String(value);
    field.appendChild(span);
    field.appendChild(input);

    input.addEventListener("input", function () {
      var val = parseFloat(input.value);
      if (isNaN(val) || val < 0) return;
      onChange(val);
    });

    return field;
  }

  addBlockBtn.addEventListener("click", function () {
    config.blocks.push({ id: ++blockIdCounter, everyMin: 3, forMin: 1, rounds: 6 });
    renderBlocks();
    renderSummary();
    saveConfig();
  });

  warmupInput.addEventListener("input", function () {
    var val = parseFloat(warmupInput.value);
    config.warmupMin = isNaN(val) || val < 0 ? 0 : val;
    renderSummary();
    saveConfig();
  });
  cooldownInput.addEventListener("input", function () {
    var val = parseFloat(cooldownInput.value);
    config.cooldownMin = isNaN(val) || val < 0 ? 0 : val;
    renderSummary();
    saveConfig();
  });

  function renderSummary() {
    var timeline = buildTimeline(config);
    var totalSec = timeline.reduce(function (sum, p) {
      return sum + p.duration;
    }, 0);

    var rows = [];
    if (config.warmupMin > 0) {
      rows.push(["Warm up", formatMin(config.warmupMin)]);
    }
    config.blocks.forEach(function (block, i) {
      var rest = Math.max(0, block.everyMin - block.forMin);
      rows.push([
        "Interval " + (i + 1),
        block.rounds + " x (" + formatMin(block.forMin) + (rest > 0 ? " work / " + formatMin(rest) + " rest" : " work") + ")",
      ]);
    });
    if (config.cooldownMin > 0) {
      rows.push(["Cool down", formatMin(config.cooldownMin)]);
    }

    summaryBody.innerHTML = "";
    rows.forEach(function (r) {
      var div = document.createElement("div");
      div.className = "summary-row";
      div.innerHTML = "<span>" + r[0] + "</span><span>" + r[1] + "</span>";
      summaryBody.appendChild(div);
    });
    var totalDiv = document.createElement("div");
    totalDiv.className = "summary-row total";
    totalDiv.innerHTML = "<span>Total time</span><span>" + formatClock(totalSec, true) + "</span>";
    summaryBody.appendChild(totalDiv);

    startBtn.disabled = totalSec <= 0;
  }

  // ---------- Timeline construction ----------

  function buildTimeline(cfg) {
    var timeline = [];
    if (cfg.warmupMin > 0) {
      timeline.push({ type: "warmup", label: "Warm Up", duration: Math.round(cfg.warmupMin * 60) });
    }
    cfg.blocks.forEach(function (block, blockIndex) {
      var rest = Math.max(0, block.everyMin - block.forMin);
      for (var r = 1; r <= block.rounds; r++) {
        timeline.push({
          type: "work",
          label: "Work",
          duration: Math.round(block.forMin * 60),
          blockIndex: blockIndex,
          round: r,
          totalRounds: block.rounds,
        });
        var isLastRoundOfLastBlock = blockIndex === cfg.blocks.length - 1 && r === block.rounds;
        if (rest > 0 && !isLastRoundOfLastBlock) {
          timeline.push({
            type: "rest",
            label: "Rest",
            duration: Math.round(rest * 60),
            blockIndex: blockIndex,
            round: r,
            totalRounds: block.rounds,
          });
        }
      }
    });
    if (cfg.cooldownMin > 0) {
      timeline.push({ type: "cooldown", label: "Cool Down", duration: Math.round(cfg.cooldownMin * 60) });
    }
    return timeline.filter(function (p) {
      return p.duration > 0;
    });
  }

  function formatClock(totalSeconds, longForm) {
    totalSeconds = Math.max(0, Math.round(totalSeconds));
    var h = Math.floor(totalSeconds / 3600);
    var m = Math.floor((totalSeconds % 3600) / 60);
    var s = totalSeconds % 60;
    if (longForm) {
      if (h > 0) return h + "h " + m + "m";
      if (m > 0) return m + "m " + (s > 0 ? s + "s" : "");
      return s + "s";
    }
    if (h > 0) {
      return h + ":" + pad(m) + ":" + pad(s);
    }
    return m + ":" + pad(s);
  }

  function pad(n) {
    return n < 10 ? "0" + n : String(n);
  }

  // ---------- Run screen ----------

  var phasePill = document.getElementById("phasePill");
  var runClock = document.getElementById("runClock");
  var runMeta = document.getElementById("runMeta");
  var nextUp = document.getElementById("nextUp");
  var runBody = document.querySelector(".run-body");
  var elapsedTimeEl = document.getElementById("elapsedTime");
  var overallProgressFill = document.getElementById("overallProgressFill");
  var pauseBtn = document.getElementById("pauseBtn");
  var skipBtn = document.getElementById("skipBtn");
  var stopBtn = document.getElementById("stopBtn");

  var runState = null;
  var tickHandle = null;
  var wakeLock = null;

  function startWorkout() {
    var timeline = buildTimeline(config);
    if (timeline.length === 0) return;

    runState = {
      timeline: timeline,
      index: 0,
      remaining: timeline[0].duration,
      totalDuration: timeline.reduce(function (s, p) { return s + p.duration; }, 0),
      elapsed: 0,
      paused: false,
      startedAt: Date.now(),
    };

    requestWakeLock();
    showScreen("run");
    updatePhaseUI();
    pauseBtn.textContent = "Pause";
    playCue("start");
    startTicking();
  }

  function startTicking() {
    stopTicking();
    var last = Date.now();
    tickHandle = setInterval(function () {
      if (!runState || runState.paused) {
        last = Date.now();
        return;
      }
      var now = Date.now();
      var delta = (now - last) / 1000;
      last = now;
      tick(delta);
    }, 200);
  }

  function stopTicking() {
    if (tickHandle) {
      clearInterval(tickHandle);
      tickHandle = null;
    }
  }

  function tick(delta) {
    if (!runState) return;
    runState.remaining -= delta;
    runState.elapsed += delta;

    if (runState.remaining <= 0) {
      advancePhase();
      return;
    }

    updateClock();
  }

  function advancePhase() {
    var finishedPhase = runState.timeline[runState.index];
    runState.index += 1;

    if (runState.index >= runState.timeline.length) {
      finishWorkout();
      return;
    }

    var nextPhase = runState.timeline[runState.index];
    runState.remaining = nextPhase.duration;
    updatePhaseUI();

    if (nextPhase.type !== finishedPhase.type) {
      playCue("transition");
    } else {
      playCue("tick");
    }
  }

  function skipPhase() {
    if (!runState) return;
    advancePhase();
  }

  function updatePhaseUI() {
    var phase = runState.timeline[runState.index];

    phasePill.textContent = phase.label;
    phasePill.className = "phase-pill phase-" + phase.type;
    runBody.className = "run-body bg-" + phase.type;

    if (phase.type === "work" || phase.type === "rest") {
      var metaParts = [];
      if (config.blocks.length > 1) {
        metaParts.push("Set " + (phase.blockIndex + 1));
      }
      metaParts.push("Round " + phase.round + " of " + phase.totalRounds);
      runMeta.textContent = metaParts.join(" · ");
    } else {
      runMeta.textContent = "";
    }

    var next = runState.timeline[runState.index + 1];
    nextUp.textContent = next ? "Next: " + next.label : "Last one — finish strong";

    updateClock();
  }

  function updateClock() {
    runClock.textContent = formatClock(Math.ceil(runState.remaining));
    elapsedTimeEl.textContent = formatClock(runState.elapsed);
    var pct = runState.totalDuration > 0 ? Math.min(100, (runState.elapsed / runState.totalDuration) * 100) : 0;
    overallProgressFill.style.width = pct + "%";
  }

  function togglePause() {
    if (!runState) return;
    runState.paused = !runState.paused;
    pauseBtn.textContent = runState.paused ? "Resume" : "Pause";
    if (runState.paused) {
      releaseWakeLock();
    } else {
      requestWakeLock();
    }
  }

  function stopWorkout() {
    if (!runState) return;
    var confirmStop = window.confirm("End this run early?");
    if (!confirmStop) return;
    cleanupRun();
    showScreen("setup");
  }

  function cleanupRun() {
    stopTicking();
    releaseWakeLock();
    runState = null;
  }

  function finishWorkout() {
    var summaryElapsed = runState.elapsed;
    var timeline = runState.timeline;
    cleanupRun();
    playCue("done");
    renderDoneScreen(summaryElapsed, timeline);
    showScreen("done");
  }

  pauseBtn.addEventListener("click", togglePause);
  skipBtn.addEventListener("click", skipPhase);
  stopBtn.addEventListener("click", stopWorkout);

  // ---------- Done screen ----------

  var doneSubtitle = document.getElementById("doneSubtitle");
  var doneStats = document.getElementById("doneStats");
  var newRunBtn = document.getElementById("newRunBtn");

  function renderDoneScreen(elapsedSec, timeline) {
    doneSubtitle.textContent = "Total time: " + formatClock(elapsedSec, true);

    var workPhases = timeline.filter(function (p) { return p.type === "work"; });
    var restPhases = timeline.filter(function (p) { return p.type === "rest"; });
    var warmupPhase = timeline.find(function (p) { return p.type === "warmup"; });
    var cooldownPhase = timeline.find(function (p) { return p.type === "cooldown"; });

    var workTotal = workPhases.reduce(function (s, p) { return s + p.duration; }, 0);
    var restTotal = restPhases.reduce(function (s, p) { return s + p.duration; }, 0);

    var rows = [];
    if (warmupPhase) rows.push(["Warm up", formatClock(warmupPhase.duration, true)]);
    if (workPhases.length) rows.push(["Work intervals", workPhases.length + " rounds · " + formatClock(workTotal, true)]);
    if (restPhases.length) rows.push(["Rest", formatClock(restTotal, true)]);
    if (cooldownPhase) rows.push(["Cool down", formatClock(cooldownPhase.duration, true)]);

    doneStats.innerHTML = "";
    rows.forEach(function (r) {
      var div = document.createElement("div");
      div.className = "summary-row";
      div.innerHTML = "<span>" + r[0] + "</span><span>" + r[1] + "</span>";
      doneStats.appendChild(div);
    });
  }

  newRunBtn.addEventListener("click", function () {
    showScreen("setup");
  });

  startBtn.addEventListener("click", startWorkout);

  // ---------- Audio / haptic cues ----------

  var audioCtx = null;

  function getAudioContext() {
    if (!audioCtx) {
      var Ctx = window.AudioContext || window.webkitAudioContext;
      if (Ctx) audioCtx = new Ctx();
    }
    return audioCtx;
  }

  function beep(freq, durationMs, delayMs) {
    var ctx = getAudioContext();
    if (!ctx) return;
    if (ctx.state === "suspended") ctx.resume();
    var startTime = ctx.currentTime + (delayMs || 0) / 1000;
    var osc = ctx.createOscillator();
    var gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0.0001, startTime);
    gain.gain.exponentialRampToValueAtTime(0.35, startTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, startTime + durationMs / 1000);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(startTime);
    osc.stop(startTime + durationMs / 1000 + 0.05);
  }

  function playCue(kind) {
    try {
      if (kind === "start") {
        beep(880, 180, 0);
        if (navigator.vibrate) navigator.vibrate(120);
      } else if (kind === "transition") {
        beep(660, 150, 0);
        beep(880, 150, 180);
        if (navigator.vibrate) navigator.vibrate([100, 60, 100]);
      } else if (kind === "tick") {
        beep(660, 120, 0);
        if (navigator.vibrate) navigator.vibrate(80);
      } else if (kind === "done") {
        beep(880, 160, 0);
        beep(988, 160, 200);
        beep(1175, 240, 400);
        if (navigator.vibrate) navigator.vibrate([120, 80, 120, 80, 200]);
      }
    } catch (e) {
      /* ignore audio errors (e.g. autoplay restrictions) */
    }
  }

  // ---------- Wake Lock ----------

  function requestWakeLock() {
    if (!("wakeLock" in navigator)) return;
    navigator.wakeLock
      .request("screen")
      .then(function (lock) {
        wakeLock = lock;
      })
      .catch(function () {
        /* ignore — not critical */
      });
  }

  function releaseWakeLock() {
    if (wakeLock) {
      wakeLock.release().catch(function () {});
      wakeLock = null;
    }
  }

  document.addEventListener("visibilitychange", function () {
    if (document.visibilityState === "visible" && runState && !runState.paused) {
      requestWakeLock();
    }
  });

  // ---------- Init ----------

  warmupInput.value = String(config.warmupMin);
  cooldownInput.value = String(config.cooldownMin);
  renderBlocks();
  renderSummary();
  showScreen("setup");
})();
