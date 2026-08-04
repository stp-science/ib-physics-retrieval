(() => {
  "use strict";

  const { topicMeta, questions } = window.IB_PHYSICS_DATA;
  const PROGRESS_KEY = "stp-ib-physics-progress-v1";
  const THEME_KEY = "stp-ib-physics-theme";
  const DAILY_KEY = "stp-ib-physics-daily-v1";
  const BOX_WEIGHTS = [7, 3.7, 2.1, 1.15, 0.58, 0.28];

  const state = {
    selectedTopics: new Set(topicMeta.map((topic) => topic.name)),
    courseLevel: "SL",
    questionCount: 10,
    selectionMode: "random",
    status: "ready",
    quiz: [],
    currentIndex: 0,
    revealed: false,
    marks: {},
    sessionBaselines: {},
    progress: loadJson(PROGRESS_KEY, {}),
  };

  const elements = {
    topicList: document.querySelector("#topic-list"),
    selectionNote: document.querySelector("#selection-note"),
    selectToggle: document.querySelector("#select-toggle"),
    questionCount: document.querySelector("#question-count"),
    selectionMode: document.querySelector("#selection-mode"),
    startButton: document.querySelector("#start-button"),
    anotherButton: document.querySelector("#another-button"),
    quizCard: document.querySelector("#quiz-card"),
    themeToggle: document.querySelector("#theme-toggle"),
    courseLevel: document.querySelector("#course-level"),
    levelNote: document.querySelector("#level-note"),
  };

  function loadJson(key, fallback) {
    try {
      const value = JSON.parse(localStorage.getItem(key));
      return value && typeof value === "object" ? value : fallback;
    } catch {
      return fallback;
    }
  }

  function saveJson(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // The quiz still works if storage is unavailable.
    }
  }

  function hashString(value) {
    let hash = 2166136261;
    for (let index = 0; index < value.length; index += 1) {
      hash ^= value.charCodeAt(index);
      hash = Math.imul(hash, 16777619);
    }
    return hash >>> 0;
  }

  function seededRandom(seed) {
    let value = seed >>> 0;
    return () => {
      value += 0x6d2b79f5;
      let result = value;
      result = Math.imul(result ^ (result >>> 15), result | 1);
      result ^= result + Math.imul(result ^ (result >>> 7), result | 61);
      return ((result ^ (result >>> 14)) >>> 0) / 4294967296;
    };
  }

  function localDateKey() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  function questionWeight(question) {
    const record = state.progress[question.id];
    if (!record) return 2.5;
    const box = Math.max(0, Math.min(5, Number(record.box) || 0));
    let weight = BOX_WEIGHTS[box];
    if (record.lastSeen === localDateKey()) weight *= 0.55;
    return weight;
  }

  function weightedSample(pool, count, random) {
    const available = [...pool];
    const result = [];
    while (available.length && result.length < count) {
      const weights = available.map(questionWeight);
      const total = weights.reduce((sum, weight) => sum + weight, 0);
      let target = random() * total;
      let chosenIndex = available.length - 1;
      for (let index = 0; index < available.length; index += 1) {
        target -= weights[index];
        if (target <= 0) {
          chosenIndex = index;
          break;
        }
      }
      result.push(available.splice(chosenIndex, 1)[0]);
    }
    return result;
  }

  function selectedPool() {
    return questions.filter((question) =>
      state.selectedTopics.has(question.topic) &&
      (state.courseLevel === "HL" || question.level === "SL")
    );
  }

  function dailyCacheKey() {
    return [
      localDateKey(),
      state.courseLevel,
      [...state.selectedTopics].sort().join("|"),
      state.questionCount,
    ].join("::");
  }

  function createQuiz(forceFresh = false, overridePool = null) {
    const pool = overridePool || selectedPool();
    if (!pool.length) return;

    const count = Math.min(state.questionCount, pool.length);
    const dateKey = dailyCacheKey();
    const dailyCache = loadJson(DAILY_KEY, {});
    let quiz = null;

    if (state.selectionMode === "daily" && !forceFresh && !overridePool) {
      const cachedIds = dailyCache[dateKey];
      if (Array.isArray(cachedIds) && cachedIds.length === count) {
        const byId = new Map(pool.map((question) => [question.id, question]));
        const cachedQuestions = cachedIds.map((id) => byId.get(id)).filter(Boolean);
        if (cachedQuestions.length === count) quiz = cachedQuestions;
      }
    }

    if (!quiz) {
      const seedValue =
        state.selectionMode === "daily" && !forceFresh
          ? hashString(dateKey)
          : Math.floor(Math.random() * 4294967295);
      quiz = weightedSample(pool, count, seededRandom(seedValue));
      if (state.selectionMode === "daily" && !forceFresh && !overridePool) {
        saveJson(DAILY_KEY, { [dateKey]: quiz.map((question) => question.id) });
      }
    }

    state.quiz = quiz;
    state.currentIndex = 0;
    state.revealed = false;
    state.marks = {};
    state.sessionBaselines = Object.fromEntries(
      quiz.map((question) => [
        question.id,
        state.progress[question.id]
          ? { ...state.progress[question.id] }
          : { box: 1, attempts: 0, streak: 0 },
      ]),
    );
    state.status = "quiz";
    renderQuiz();
  }

  function recordMark(question, rating) {
    state.marks[state.currentIndex] = rating;
    const baseline = state.sessionBaselines[question.id] || {
      box: 1,
      attempts: 0,
      streak: 0,
    };
    const next =
      rating === "secure"
        ? {
            box: Math.min(5, (Number(baseline.box) || 1) + 1),
            attempts: (Number(baseline.attempts) || 0) + 1,
            streak: (Number(baseline.streak) || 0) + 1,
            lastResult: "secure",
            lastSeen: localDateKey(),
          }
        : {
            box: 0,
            attempts: (Number(baseline.attempts) || 0) + 1,
            streak: 0,
            lastResult: "review",
            lastSeen: localDateKey(),
          };
    state.progress[question.id] = next;
    saveJson(PROGRESS_KEY, state.progress);
    renderQuiz();
  }

  function moveQuestion(direction) {
    const nextIndex = state.currentIndex + direction;
    if (nextIndex < 0 || nextIndex >= state.quiz.length) return;
    state.currentIndex = nextIndex;
    state.revealed = Boolean(state.marks[state.currentIndex]);
    renderQuiz();
    requestAnimationFrame(() => document.querySelector("#question-heading")?.focus());
  }

  function nextOrFinish() {
    if (state.currentIndex === state.quiz.length - 1) {
      state.status = "summary";
      renderQuiz();
      requestAnimationFrame(() => document.querySelector("#summary-heading")?.focus());
      return;
    }
    moveQuestion(1);
  }

  function topicColour(topicName) {
    return topicMeta.find((topic) => topic.name === topicName)?.colour || "#00a9d6";
  }

  function renderTopics() {
    elements.topicList.innerHTML = "";
    let previousTheme = "";
    topicMeta.forEach((topic) => {
      if (topic.theme !== previousTheme) {
        const heading = document.createElement("p");
        heading.className = "topic-group-heading";
        heading.textContent = topic.theme;
        elements.topicList.append(heading);
        previousTheme = topic.theme;
      }
      const available = topic.minimumLevel === "SL" || state.courseLevel === "HL";
      const count = questions.filter((question) => question.topic === topic.name && (state.courseLevel === "HL" || question.level === "SL")).length;
      const label = document.createElement("label");
      label.className = `topic-option${available ? "" : " topic-disabled"}`;
      label.style.setProperty("--topic", topic.colour);
      label.innerHTML = `
        <input type="checkbox" value="${topic.name}" ${state.selectedTopics.has(topic.name) ? "checked" : ""} ${available ? "" : "disabled"}>
        <span class="topic-icon" aria-hidden="true">${topic.icon}</span>
        <span class="topic-name">${topic.name}</span>
        <span class="question-total">${count} Qs</span>
      `;
      label.querySelector("input").addEventListener("change", (event) => {
        if (event.target.checked) state.selectedTopics.add(topic.name);
        else state.selectedTopics.delete(topic.name);
        updateControls();
      });
      elements.topicList.append(label);
    });
    updateControls();
  }

  function updateControls() {
    const selectedCount = state.selectedTopics.size;
    elements.selectToggle.textContent =
      selectedCount === topicMeta.length ? "Clear all" : "Select all";
    const availableSelected = [...state.selectedTopics].filter(name => topicMeta.find(t => t.name === name)?.minimumLevel === "SL" || state.courseLevel === "HL").length;
    elements.selectionNote.textContent =
      selectedCount === 0
        ? "Select at least one topic to begin"
        : `${availableSelected} subtopic${availableSelected === 1 ? "" : "s"} selected for ${state.courseLevel}`;
    elements.startButton.disabled = availableSelected === 0;
    elements.anotherButton.disabled = availableSelected === 0;

    elements.topicList.querySelectorAll("input").forEach((input) => {
      input.checked = state.selectedTopics.has(input.value);
    });
  }

  function renderReady() {
    elements.quizCard.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon" aria-hidden="true">⚛</div>
        <h3>Ready when you are</h3>
        <p>Choose an SL or HL course level, select one or more IB Physics subtopics, and start a retrieval quiz.</p>
        <div class="shortcut-row" aria-label="Keyboard shortcuts">
          <span><kbd>Space</kbd> reveal</span>
          <span><kbd>←</kbd><kbd>→</kbd> move</span>
        </div>
      </div>
    `;
  }

  function renderActiveQuiz() {
    const question = state.quiz[state.currentIndex];
    const mark = state.marks[state.currentIndex];
    const selectedLabel =
      state.selectedTopics.size === 1 ? question.topic : "Mixed-topic quiz";
    elements.quizCard.innerHTML = `
      <div class="quiz-content">
        <div class="quiz-meta">
          <span>Question ${state.currentIndex + 1} of ${state.quiz.length}</span>
          <span>${selectedLabel}</span>
        </div>
        <div class="progress-track" aria-hidden="true">
          <span style="width: ${((state.currentIndex + 1) / state.quiz.length) * 100}%"></span>
        </div>
        <span class="topic-tag" style="--topic: ${topicColour(question.topic)}">${question.topic}</span>
        <h3 id="question-heading" tabindex="-1">${question.question}</h3>
        ${
          !state.revealed
            ? '<button class="reveal-button" id="reveal-button" type="button">Reveal answer</button>'
            : `
              <div class="answer-box">
                <strong>Model answer</strong>
                <p>${question.answer}</p>
              </div>
              <div class="self-check">
                <button class="secure ${mark === "secure" ? "active" : ""}" id="secure-button" type="button">
                  <span aria-hidden="true">✓</span> I knew this
                </button>
                <button class="review ${mark === "review" ? "active" : ""}" id="review-button" type="button">
                  <span aria-hidden="true">↻</span> Revisit this
                </button>
              </div>
            `
        }
        <div class="quiz-navigation">
          <button id="previous-button" type="button" ${state.currentIndex === 0 ? "disabled" : ""}>← Previous</button>
          <button id="next-button" type="button" class="${state.currentIndex === state.quiz.length - 1 ? "finish-button" : ""}">
            ${state.currentIndex === state.quiz.length - 1 ? "Finish quiz" : "Next →"}
          </button>
        </div>
      </div>
    `;

    document.querySelector("#reveal-button")?.addEventListener("click", () => {
      state.revealed = true;
      renderQuiz();
    });
    document.querySelector("#secure-button")?.addEventListener("click", () =>
      recordMark(question, "secure"),
    );
    document.querySelector("#review-button")?.addEventListener("click", () =>
      recordMark(question, "review"),
    );
    document.querySelector("#previous-button")?.addEventListener("click", () => moveQuestion(-1));
    document.querySelector("#next-button")?.addEventListener("click", nextOrFinish);
  }

  function renderSummary() {
    const secureCount = Object.values(state.marks).filter((mark) => mark === "secure").length;
    const reviewQuestions = state.quiz.filter((_, index) => state.marks[index] === "review");
    elements.quizCard.innerHTML = `
      <div class="summary-state">
        <div class="score-ring">
          <strong>${secureCount}</strong>
          <span>of ${state.quiz.length}</span>
        </div>
        <h3 id="summary-heading" tabindex="-1">Quiz complete</h3>
        <p>
          ${
            reviewQuestions.length
              ? `You marked ${reviewQuestions.length} question${reviewQuestions.length === 1 ? "" : "s"} for more practice.`
              : secureCount === state.quiz.length
                ? "You marked every question as secure. Return later for another retrieval attempt."
                : "Any unmarked questions will stay in normal rotation for future quizzes."
          }
        </p>
        ${
          reviewQuestions.length
            ? `<div class="review-list">
                ${reviewQuestions
                  .map(
                    (question) => `
                      <article>
                        <strong>${question.question}</strong>
                        <span>${question.answer}</span>
                      </article>
                    `,
                  )
                  .join("")}
              </div>`
            : ""
        }
        <div class="summary-actions">
          <button class="secondary-button" id="review-quiz-button" type="button" ${reviewQuestions.length ? "" : "disabled"}>
            Quiz review questions
          </button>
          <button class="primary-button" id="new-quiz-button" type="button">New mixed quiz</button>
        </div>
      </div>
    `;

    document.querySelector("#review-quiz-button")?.addEventListener("click", () => {
      if (reviewQuestions.length) createQuiz(true, reviewQuestions);
    });
    document.querySelector("#new-quiz-button")?.addEventListener("click", () => createQuiz(true));
  }

  function renderQuiz() {
    if (state.status === "ready") renderReady();
    else if (state.status === "quiz") renderActiveQuiz();
    else renderSummary();
  }

  function applyTheme(theme) {
    document.documentElement.dataset.theme = theme;
    const dark = theme === "dark";
    elements.themeToggle.innerHTML = `<span aria-hidden="true">${dark ? "☀" : "☾"}</span>`;
    elements.themeToggle.setAttribute("aria-label", dark ? "Use light theme" : "Use dark theme");
    document.querySelector('meta[name="theme-color"]').setAttribute(
      "content",
      dark ? "#0f202a" : "#07284f",
    );
  }

  elements.selectToggle.addEventListener("click", () => {
    if (state.selectedTopics.size === topicMeta.length) state.selectedTopics.clear();
    else state.selectedTopics = new Set(topicMeta.map((topic) => topic.name));
    updateControls();
  });

  elements.questionCount.addEventListener("change", (event) => {
    state.questionCount = Number(event.target.value);
  });

  elements.selectionMode.addEventListener("change", (event) => {
    state.selectionMode = event.target.value;
  });
  elements.courseLevel.addEventListener("change", (event) => {
    state.courseLevel = event.target.value;
    elements.levelNote.textContent = state.courseLevel === "SL"
      ? "SL questions and common SL content only."
      : "All SL questions plus additional-HL and HL-only content.";
    renderTopics();
    renderReady();
  });

  elements.startButton.addEventListener("click", () => createQuiz(false));
  elements.anotherButton.addEventListener("click", () => createQuiz(true));

  elements.themeToggle.addEventListener("click", () => {
    const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    applyTheme(nextTheme);
    try {
      localStorage.setItem(THEME_KEY, nextTheme);
    } catch {
      // Theme remains active for the current visit.
    }
  });

  document.addEventListener("keydown", (event) => {
    if (state.status !== "quiz") return;
    const tag = document.activeElement?.tagName;
    if (tag === "SELECT" || tag === "INPUT") return;
    if (event.code === "Space" && !state.revealed) {
      event.preventDefault();
      state.revealed = true;
      renderQuiz();
    } else if (event.key === "ArrowLeft") {
      moveQuestion(-1);
    } else if (event.key === "ArrowRight") {
      nextOrFinish();
    }
  });

  const storedTheme = (() => {
    try {
      return localStorage.getItem(THEME_KEY);
    } catch {
      return null;
    }
  })();
  const preferredTheme =
    storedTheme ||
    (window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light");

  applyTheme(preferredTheme);
  renderTopics();
  renderQuiz();
})();
