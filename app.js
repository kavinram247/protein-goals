/* ============================================================
   KAVIN'S LOG
   Cloud-synced diet tracker (Supabase + localStorage cache)
============================================================ */

const TARGET_PROTEIN = 180;

const PLAN = [
  {
    id: 'pre-gym', time: '5:30 AM', name: 'Pre-gym',
    items: [
      { id: 'banana_pg', name: 'Banana', protein: 1 },
      { id: 'coffee_pg', name: 'Black coffee', protein: 0 },
      { id: 'date_pg',   name: 'Date',  protein: 0 },
    ],
  },
  {
    id: 'post-workout', time: '8:00 AM', name: 'Post-workout',
    items: [
      { id: 'whey',      name: 'Whey scoop, water', protein: 27 },
      { id: 'banana_pw', name: 'Banana',            protein: 1 },
    ],
  },
  {
    id: 'breakfast', time: '9:30 AM', name: 'Breakfast',
    items: [
      { id: 'dosa_idli', name: 'Three dosa, or four idli', protein: 6, rotate: 'breakfast' },
      { id: 'eggs_bf',   name: 'Three eggs, two egg whites', protein: 25 },
      { id: 'chutney',   name: 'Peanut chutney', protein: 0, rotate: 'chutney' },
      { id: 'ghee_bf',   name: 'Teaspoon of ghee', protein: 0 },
      { id: 'milk_bf',   name: 'Glass of milk, soaked raisins', protein: 8 },
      { id: 'figs',      name: 'Two soaked figs from yesterday', protein: 1 },
    ],
  },
  {
    id: 'mid-morning', time: '12:00 PM', name: 'Mid-morning',
    items: [
      { id: 'buttermilk', name: 'Glass of buttermilk', protein: 3 },
      { id: 'nuts_mm',    name: 'Ten almonds, two walnuts, two cashews', protein: 5 },
    ],
  },
  {
    id: 'lunch', time: '1:30 PM', name: 'Lunch',
    items: [
      { id: 'chicken', name: 'Two hundred grams chicken curry', protein: 50 },
      { id: 'rice_l',  name: 'Two cups rice', protein: 8 },
      { id: 'rasam',   name: 'Rasam', protein: 4, rotate: 'lunch' },
      { id: 'veg_l',   name: 'Sautéed vegetables, ghee, lemon', protein: 2 },
      { id: 'curd',    name: 'Curd, with a tablespoon of flaxseeds', protein: 9 },
    ],
  },
  {
    id: 'evening', time: '4:30 PM', name: 'Evening snack',
    items: [
      { id: 'eggs_ev',   name: 'Two boiled eggs', protein: 12 },
      { id: 'peanuts',   name: 'Thirty grams roasted peanuts', protein: 7 },
      { id: 'pumpkin',   name: 'A small handful of pumpkin seeds', protein: 3 },
      { id: 'date_ev',   name: 'Date', protein: 0 },
      { id: 'chocolate', name: 'Square of dark chocolate', protein: 1 },
    ],
  },
  {
    id: 'dinner', time: '8:00 PM', name: 'Dinner',
    items: [
      { id: 'eggs_d', name: 'Three boiled eggs', protein: 18 },
      { id: 'rice_d', name: 'Cup of rice, or two chapati', protein: 5 },
      { id: 'greens', name: 'Greens, palak or keerai, with pepper, mustard, turmeric', protein: 4 },
      { id: 'ghee_d', name: 'Teaspoon of ghee', protein: 0 },
    ],
  },
  {
    id: 'bedtime', time: '10:30 PM', name: 'Bedtime',
    items: [
      { id: 'milk_bed', name: 'Warm milk, turmeric, a teaspoon of ashwagandha', protein: 8 },
      { id: 'walnuts',  name: 'Two soaked walnuts', protein: 2 },
      { id: 'figs_soak', name: 'Soak two figs for tomorrow', protein: 0 },
    ],
  },
];

const ROTATIONS = {
  breakfast: { 2: 'Ragi dosa today, for bones', 5: 'Ragi dosa today, for bones' },
  lunch:     { 1: 'Drumstick sambar today',     4: 'Murungai keerai poriyal today' },
  chutney:   { 3: 'Til chutney today, for calcium', 6: 'Til chutney today, for calcium' },
};

const ROTATION_NOTES = {
  breakfast: { 2: 'ragi today', 5: 'ragi today' },
  lunch:     { 1: 'drumstick sambar', 4: 'with keerai' },
  chutney:   { 3: 'til today', 6: 'til today' },
};

const ITEM_INDEX = {};
PLAN.forEach((m) => m.items.forEach((it) => { ITEM_INDEX[it.id] = { meal: m.name, name: it.name }; }));

/* ------------------------ supabase ------------------------ */

const supabase = window.supabase.createClient(window.SUPABASE_URL, window.SUPABASE_ANON_KEY, {
  auth: { persistSession: true, autoRefreshToken: true, storage: window.localStorage, storageKey: 'pg:auth' },
});

let userId = null;

/* ------------------------ helpers ------------------------ */

const todayKey = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};

const keyFromDate = (d) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

const dateFromKey = (k) => {
  const [y, m, d] = k.split('-').map(Number);
  return new Date(y, m - 1, d);
};

const computeProtein = (checked) => {
  if (!checked) return 0;
  let total = 0;
  for (const id in checked) {
    if (checked[id] && ITEM_INDEX[id]) {
      const item = PLAN.flatMap((m) => m.items).find((it) => it.id === id);
      if (item) total += item.protein;
    }
  }
  return total;
};

/* ------------------------ local cache ------------------------ */

const cacheKey = (day) => `pg:day:${day}`;

const loadDay = (day) => {
  const raw = localStorage.getItem(cacheKey(day));
  return raw ? JSON.parse(raw) : { checked: {} };
};

const saveLocal = (day, data) => {
  localStorage.setItem(cacheKey(day), JSON.stringify(data));
};

const allLocalDays = () =>
  Object.keys(localStorage)
    .filter((k) => k.startsWith('pg:day:'))
    .map((k) => k.slice('pg:day:'.length));

/* ------------------------ state ------------------------ */

const state = {
  date: todayKey(),
  checked: {},
  history: {}, // { 'YYYY-MM-DD': { checked, protein } }
};

/* ------------------------ sync ------------------------ */

const setSyncState = (kind) => {
  const el = document.getElementById('sync-state');
  el.className = `sync-state show ${kind}`;
  const labels = { syncing: 'syncing', synced: 'synced', error: 'offline · saved locally' };
  el.textContent = labels[kind] || '';
  if (kind === 'synced') setTimeout(() => el.classList.remove('show'), 1500);
};

const fetchAllDays = async () => {
  setSyncState('syncing');
  const { data, error } = await supabase
    .from('days')
    .select('day, checked, protein')
    .order('day', { ascending: false })
    .limit(180);
  if (error) {
    console.error(error);
    setSyncState('error');
    // Fall back to local cache
    state.history = {};
    allLocalDays().forEach((d) => {
      const obj = loadDay(d);
      state.history[d] = { checked: obj.checked, protein: computeProtein(obj.checked) };
    });
  } else {
    state.history = {};
    data.forEach((row) => {
      state.history[row.day] = { checked: row.checked || {}, protein: row.protein || 0 };
      saveLocal(row.day, { checked: row.checked || {} });
    });
    setSyncState('synced');
  }
  state.checked = state.history[state.date]?.checked || loadDay(state.date).checked || {};
};

let saveTimer = null;
const queueSave = () => {
  // Optimistic local save immediately
  saveLocal(state.date, { checked: state.checked });
  const protein = computeProtein(state.checked);
  state.history[state.date] = { checked: { ...state.checked }, protein };
  setSyncState('syncing');
  clearTimeout(saveTimer);
  saveTimer = setTimeout(async () => {
    if (!userId) return;
    const { error } = await supabase
      .from('days')
      .upsert(
        { user_id: userId, day: state.date, checked: state.checked, protein },
        { onConflict: 'user_id,day' },
      );
    if (error) {
      console.error(error);
      setSyncState('error');
    } else {
      setSyncState('synced');
    }
  }, 400);
};

const resetToday = async () => {
  if (!confirm('Reset today?')) return;
  state.checked = {};
  saveLocal(state.date, { checked: {} });
  state.history[state.date] = { checked: {}, protein: 0 };
  if (userId) {
    setSyncState('syncing');
    const { error } = await supabase
      .from('days')
      .upsert(
        { user_id: userId, day: state.date, checked: {}, protein: 0 },
        { onConflict: 'user_id,day' },
      );
    setSyncState(error ? 'error' : 'synced');
  }
  renderProgress(); renderLog(); renderMasthead();
};

/* ------------------------ derived ------------------------ */

const proteinFor = (meal) =>
  meal.items.reduce((s, it) => s + (state.checked[it.id] ? it.protein : 0), 0);

const maxProteinFor = (meal) =>
  meal.items.reduce((s, it) => s + it.protein, 0);

const totalProtein = () => PLAN.reduce((s, m) => s + proteinFor(m), 0);

const mealDone = (meal) => meal.items.every((it) => state.checked[it.id]);

const mealsDone = () => PLAN.filter(mealDone).length;

const streak = () => {
  const today = todayKey();
  let count = 0;
  const cursor = new Date();
  while (true) {
    const k = keyFromDate(cursor);
    const p = state.history[k]?.protein || 0;
    const win = p >= TARGET_PROTEIN * 0.8;
    if (k === today) {
      if (win) count += 1;
      cursor.setDate(cursor.getDate() - 1);
      continue;
    }
    if (win) {
      count += 1;
      cursor.setDate(cursor.getDate() - 1);
    } else {
      break;
    }
  }
  return count;
};

const longestStreak = () => {
  const days = Object.keys(state.history).sort();
  if (days.length === 0) return 0;
  let best = 0, run = 0;
  let prev = null;
  days.forEach((k) => {
    const p = state.history[k]?.protein || 0;
    if (p >= TARGET_PROTEIN * 0.8) {
      if (prev) {
        const diff = (dateFromKey(k) - dateFromKey(prev)) / (1000 * 60 * 60 * 24);
        if (diff === 1) run += 1;
        else run = 1;
      } else {
        run = 1;
      }
      best = Math.max(best, run);
      prev = k;
    } else {
      run = 0;
      prev = k;
    }
  });
  return best;
};

const avgProtein30 = () => {
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - 30);
  const vals = Object.entries(state.history)
    .filter(([k]) => dateFromKey(k) >= cutoff)
    .map(([, v]) => v.protein || 0);
  if (vals.length === 0) return 0;
  return Math.round(vals.reduce((s, v) => s + v, 0) / vals.length);
};

const daysHitTarget = () =>
  Object.values(state.history).filter((d) => (d.protein || 0) >= TARGET_PROTEIN).length;

/* ------------------------ render: app ------------------------ */

const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const MONTH_SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const renderMasthead = () => {
  const d = new Date();
  document.getElementById('dateline').textContent =
    `${DAY_NAMES[d.getDay()]} · ${MONTH_NAMES[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
  const s = streak();
  document.getElementById('day-meta').textContent = s > 0 ? `Day ${s + (state.history[todayKey()]?.protein >= TARGET_PROTEIN * 0.8 ? 0 : 1)}` : 'Day 1';
};

const renderRotation = () => {
  const day = new Date().getDay();
  const items = [];
  if (ROTATIONS.breakfast[day]) items.push(ROTATIONS.breakfast[day]);
  if (ROTATIONS.lunch[day])     items.push(ROTATIONS.lunch[day]);
  if (ROTATIONS.chutney[day])   items.push(ROTATIONS.chutney[day]);

  const sec = document.getElementById('rotation');
  const list = document.getElementById('rot-list');
  if (items.length === 0) {
    sec.classList.add('hidden');
    return;
  }
  sec.classList.remove('hidden');
  list.innerHTML = items.map((t) => `<li>${t}</li>`).join('');
};

const renderProgress = () => {
  const cur = totalProtein();
  const pct = Math.min(100, Math.round((cur / TARGET_PROTEIN) * 100));
  document.getElementById('protein-current').textContent = cur;
  document.getElementById('protein-target').textContent = TARGET_PROTEIN;
  document.getElementById('pct').textContent = pct + '%';
  document.getElementById('meals-done-label').textContent = `${mealsDone()} of ${PLAN.length} meals`;
  document.getElementById('streak-count').textContent = streak();
  document.getElementById('bar-fill').style.right = (100 - pct) + '%';
  document.querySelector('.protein-block').classList.toggle('hit', cur >= TARGET_PROTEIN);
};

const renderLog = () => {
  const day = new Date().getDay();
  const wrap = document.getElementById('log');
  wrap.innerHTML = PLAN.map((meal) => {
    const cur = proteinFor(meal);
    const max = maxProteinFor(meal);
    return `
      <article class="meal ${mealDone(meal) ? 'done' : ''}" data-meal="${meal.id}">
        <header class="meal-head">
          <h2 class="meal-name">${meal.name}</h2>
          <div>
            <div class="meal-time">${meal.time}</div>
            <div class="meal-protein">${cur} / ${max}g</div>
          </div>
        </header>
        <ul class="items">
          ${meal.items.map((it) => {
            const checked = !!state.checked[it.id];
            const note = it.rotate && ROTATION_NOTES[it.rotate]?.[day];
            return `
              <li class="item ${checked ? 'checked' : ''}" data-item="${it.id}">
                <span class="item-mark"></span>
                <span class="item-name">${it.name}${note ? ` <span class="item-note">${note}</span>` : ''}</span>
                <span class="item-protein">${it.protein > 0 ? it.protein + 'g' : ''}</span>
              </li>
            `;
          }).join('')}
        </ul>
      </article>
    `;
  }).join('');

  wrap.querySelectorAll('[data-item]').forEach((el) => {
    el.addEventListener('click', () => {
      const id = el.getAttribute('data-item');
      state.checked[id] = !state.checked[id];
      queueSave();
      renderProgress();
      renderLog();
      renderMasthead();
    });
  });
};

/* ------------------------ render: history ------------------------ */

const renderHistory = () => {
  // Stats
  document.getElementById('hist-best').textContent = longestStreak();
  document.getElementById('hist-avg').textContent = avgProtein30() + 'g';
  document.getElementById('hist-hit').textContent = daysHitTarget();

  // Heatmap — last 90 days, grid of 15 columns × 6 rows
  const heatmap = document.getElementById('heatmap');
  const cells = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  for (let i = 89; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const k = keyFromDate(d);
    const p = state.history[k]?.protein || 0;
    const level =
      p === 0 ? 0 :
      p < TARGET_PROTEIN * 0.4 ? 1 :
      p < TARGET_PROTEIN * 0.7 ? 2 :
      p < TARGET_PROTEIN * 0.9 ? 3 : 4;
    const isToday = k === keyFromDate(today);
    const label = `${MONTH_SHORT[d.getMonth()]} ${d.getDate()} — ${p}g`;
    cells.push(`
      <div class="cell ${isToday ? 'today' : ''}" data-level="${level}">
        <div class="cell-tip">${label}</div>
      </div>
    `);
  }
  heatmap.innerHTML = cells.join('');

  // Chart — last 30 days
  renderChart();

  // Insights
  renderInsights();
};

const renderChart = () => {
  const svg = document.getElementById('chart');
  const W = 600, H = 160, pad = { t: 16, r: 12, b: 24, l: 8 };
  const innerW = W - pad.l - pad.r;
  const innerH = H - pad.t - pad.b;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const points = [];
  for (let i = 29; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const k = keyFromDate(d);
    points.push({ k, d, p: state.history[k]?.protein || 0 });
  }
  const maxY = Math.max(TARGET_PROTEIN * 1.1, ...points.map((p) => p.p));
  const x = (i) => pad.l + (i / (points.length - 1)) * innerW;
  const y = (v) => pad.t + innerH - (v / maxY) * innerH;
  const targetY = y(TARGET_PROTEIN);

  const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${x(i)} ${y(p.p)}`).join(' ');
  const areaPath = `${linePath} L ${x(points.length - 1)} ${pad.t + innerH} L ${x(0)} ${pad.t + innerH} Z`;

  svg.innerHTML = `
    <path class="area" d="${areaPath}" />
    <path class="line" d="${linePath}" />
    ${points.map((p, i) => `<circle class="dot" cx="${x(i)}" cy="${y(p.p)}" r="${p.p > 0 ? 1.6 : 0}" />`).join('')}
    <line class="target-line" x1="${pad.l}" x2="${pad.l + innerW}" y1="${targetY}" y2="${targetY}" />
    <text class="target-label" x="${pad.l + innerW}" y="${targetY - 4}" text-anchor="end">${TARGET_PROTEIN}g target</text>
    <text class="axis" x="${pad.l}" y="${H - 6}" text-anchor="start">${MONTH_SHORT[points[0].d.getMonth()]} ${points[0].d.getDate()}</text>
    <text class="axis" x="${pad.l + innerW}" y="${H - 6}" text-anchor="end">today</text>
  `;
};

const renderInsights = () => {
  const wrap = document.getElementById('insights');
  const dayCount = Object.keys(state.history).length;

  if (dayCount === 0) {
    wrap.innerHTML = `<div class="hist-empty">No history yet. Come back tomorrow.</div>`;
    document.getElementById('insights-kicker').classList.add('hidden');
    return;
  }
  document.getElementById('insights-kicker').classList.remove('hidden');

  // Count how often each item is missed (in days where the day was logged at all)
  const missCount = {};
  const totalDays = Object.values(state.history).filter((d) => Object.values(d.checked || {}).some(Boolean)).length;
  Object.values(state.history).forEach((day) => {
    if (!Object.values(day.checked || {}).some(Boolean)) return;
    PLAN.forEach((m) => m.items.forEach((it) => {
      if (!day.checked[it.id]) missCount[it.id] = (missCount[it.id] || 0) + 1;
    }));
  });
  const sorted = Object.entries(missCount).sort((a, b) => b[1] - a[1]);
  const insights = [];

  if (sorted.length > 0 && totalDays > 0) {
    const [topId, topCount] = sorted[0];
    const item = ITEM_INDEX[topId];
    if (item && topCount > 0) {
      const pct = Math.round((topCount / totalDays) * 100);
      insights.push({
        num: `${pct}%`,
        body: `of days you skip <em>${item.name.toLowerCase()}</em> from ${item.meal.toLowerCase()}. Worth a fix.`,
      });
    }
  }

  // Best day
  const best = Object.entries(state.history).reduce(
    (acc, [k, v]) => ((v.protein || 0) > acc.p ? { k, p: v.protein } : acc),
    { k: null, p: 0 },
  );
  if (best.k) {
    const d = dateFromKey(best.k);
    insights.push({
      num: `${best.p}g`,
      body: `your best day — <em>${DAY_NAMES[d.getDay()]}, ${MONTH_SHORT[d.getMonth()]} ${d.getDate()}</em>.`,
    });
  }

  // Win rate
  const wins = Object.values(state.history).filter((d) => (d.protein || 0) >= TARGET_PROTEIN * 0.8).length;
  insights.push({
    num: `${Math.round((wins / dayCount) * 100)}%`,
    body: `of logged days, you hit at least 80% of your target. <em>${wins} of ${dayCount}.</em>`,
  });

  wrap.innerHTML = insights.map((i) => `
    <div class="insight">
      <div class="insight-num">${i.num}</div>
      <div class="insight-body">${i.body}</div>
    </div>
  `).join('');
};

/* ------------------------ events ------------------------ */

document.getElementById('reset-day').addEventListener('click', resetToday);

document.getElementById('show-history').addEventListener('click', () => {
  renderHistory();
  document.getElementById('history-modal').classList.remove('hidden');
});

document.getElementById('close-history').addEventListener('click', () => {
  document.getElementById('history-modal').classList.add('hidden');
});

document.getElementById('history-modal').addEventListener('click', (e) => {
  if (e.target.id === 'history-modal') {
    document.getElementById('history-modal').classList.add('hidden');
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    document.getElementById('history-modal').classList.add('hidden');
  }
});

document.getElementById('signout').addEventListener('click', async () => {
  await supabase.auth.signOut();
  userId = null;
  showLogin();
});

document.getElementById('login-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;
  const btn = document.getElementById('login-submit');
  const err = document.getElementById('login-error');
  err.classList.add('hidden');
  btn.disabled = true;
  btn.textContent = 'Signing in';
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  btn.disabled = false;
  btn.textContent = 'Enter';
  if (error) {
    err.textContent = error.message;
    err.classList.remove('hidden');
    return;
  }
  userId = data.user.id;
  await bootApp();
});

/* ------------------------ boot ------------------------ */

const showLogin = () => {
  document.getElementById('login-screen').classList.remove('hidden');
  document.getElementById('app-screen').classList.add('hidden');
};

const showApp = () => {
  document.getElementById('login-screen').classList.add('hidden');
  document.getElementById('app-screen').classList.remove('hidden');
};

const bootApp = async () => {
  showApp();
  await fetchAllDays();
  renderMasthead();
  renderRotation();
  renderProgress();
  renderLog();
};

(async function init() {
  const { data } = await supabase.auth.getSession();
  if (data.session) {
    userId = data.session.user.id;
    await bootApp();
  } else {
    showLogin();
  }
})();

// Midnight rollover
setInterval(async () => {
  const k = todayKey();
  if (k !== state.date) {
    state.date = k;
    state.checked = state.history[k]?.checked || loadDay(k).checked || {};
    renderMasthead();
    renderRotation();
    renderProgress();
    renderLog();
  }
}, 60_000);
