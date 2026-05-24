/* ============================================================
   KAVIN'S LOG — multi-user cloud-synced diet tracker
   Users: kavin@gym.com | charu@gym.com
============================================================ */

/* ================================================================
   KAVIN'S PLAN — Phase III Bulking, 7AM gym, 30min commute
================================================================ */
const KAVIN_CONFIG = {
  name: 'Kavin',
  targetProtein: 180,
  phase: 'Phase III — Bulking',
  gymToggle: false,

  rotations: {
    breakfast: { 2: 'Ragi dosa today, for bones', 5: 'Ragi dosa today, for bones' },
    lunch:     { 1: 'Drumstick sambar today',     4: 'Murungai keerai poriyal today' },
    chutney:   { 3: 'Til chutney today, calcium', 6: 'Til chutney today, calcium' },
  },
  rotationNotes: {
    breakfast: { 2: 'ragi today', 5: 'ragi today' },
    lunch:     { 1: 'drumstick sambar', 4: 'with keerai' },
    chutney:   { 3: 'til today', 6: 'til today' },
  },

  plan: [
    {
      id: 'k_pregym', time: '5:30 AM', name: 'Pre-gym',
      items: [
        { id: 'k_banana_pg', name: 'Banana', protein: 1 },
        { id: 'k_coffee_pg', name: 'Black coffee', protein: 0 },
        { id: 'k_date_pg',   name: 'Date',  protein: 0 },
      ],
    },
    {
      id: 'k_post', time: '8:00 AM', name: 'Post-workout',
      items: [
        { id: 'k_whey',      name: 'Whey scoop + water', protein: 27 },
        { id: 'k_banana_pw', name: 'Banana',             protein: 1 },
      ],
    },
    {
      id: 'k_breakfast', time: '9:30 AM', name: 'Breakfast',
      items: [
        { id: 'k_dosa',    name: 'Three dosa or four idli', protein: 6, rotate: 'breakfast' },
        { id: 'k_eggs_bf', name: 'Three eggs + two egg whites', protein: 25 },
        { id: 'k_chutney', name: 'Peanut chutney', protein: 0, rotate: 'chutney' },
        { id: 'k_ghee_bf', name: 'Teaspoon of ghee', protein: 0 },
        { id: 'k_milk_bf', name: 'Glass of milk + soaked raisins', protein: 8 },
        { id: 'k_figs',    name: 'Two soaked figs from yesterday', protein: 1 },
      ],
    },
    {
      id: 'k_midmorn', time: '12:00 PM', name: 'Mid-morning',
      items: [
        { id: 'k_buttermilk', name: 'Glass of buttermilk', protein: 3 },
        { id: 'k_nuts_mm',    name: 'Ten almonds + two walnuts + two cashews', protein: 5 },
      ],
    },
    {
      id: 'k_lunch', time: '1:30 PM', name: 'Lunch',
      items: [
        { id: 'k_chicken', name: 'Two hundred grams chicken curry', protein: 50 },
        { id: 'k_rice_l',  name: 'Two cups rice', protein: 8 },
        { id: 'k_rasam',   name: 'Rasam', protein: 4, rotate: 'lunch' },
        { id: 'k_veg_l',   name: 'Sautéed vegetables + ghee + lemon', protein: 2 },
        { id: 'k_curd',    name: 'Curd + one tablespoon flaxseeds', protein: 9 },
      ],
    },
    {
      id: 'k_evening', time: '4:30 PM', name: 'Evening snack',
      items: [
        { id: 'k_eggs_ev',   name: 'Two boiled eggs', protein: 12 },
        { id: 'k_peanuts',   name: 'Thirty grams roasted peanuts', protein: 7 },
        { id: 'k_pumpkin',   name: 'Small handful pumpkin seeds', protein: 3 },
        { id: 'k_date_ev',   name: 'Date', protein: 0 },
        { id: 'k_choc',      name: 'Square of dark chocolate', protein: 1 },
      ],
    },
    {
      id: 'k_dinner', time: '8:00 PM', name: 'Dinner',
      items: [
        { id: 'k_eggs_d', name: 'Three boiled eggs', protein: 18 },
        { id: 'k_rice_d', name: 'Cup of rice or two chapati', protein: 5 },
        { id: 'k_greens', name: 'Greens (palak / keerai) with pepper + mustard + turmeric', protein: 4 },
        { id: 'k_ghee_d', name: 'Teaspoon of ghee', protein: 0 },
      ],
    },
    {
      id: 'k_bedtime', time: '10:30 PM', name: 'Bedtime',
      items: [
        { id: 'k_milk_bed',  name: 'Warm milk + turmeric + teaspoon ashwagandha', protein: 8 },
        { id: 'k_walnuts',   name: 'Two soaked walnuts', protein: 2 },
        { id: 'k_figs_soak', name: 'Soak two figs for tomorrow', protein: 0 },
      ],
    },
  ],
};

/* ================================================================
   CHARU'S PLAN — Weight Loss + PCOD, Veg + Eggs, No Whey
   Two gym-time variants: morning (6:30 AM) & evening (7:30 PM)
================================================================ */

const CHARU_ROTATIONS = {
  breakfast: {
    1: 'Veggie omelette + ragi dosa',
    4: 'Veggie omelette + ragi dosa',
    2: 'Oats besan chilla with paneer',
    5: 'Oats besan chilla with paneer',
    3: 'Scrambled eggs on multigrain toast',
    6: 'Scrambled eggs on multigrain toast',
    0: 'Egg uthappam with lots of veggies',
  },
  lunch: {
    1: 'Soya chunks curry today',
    2: 'Sprouted moong today',
    3: 'Soya chunks curry today',
    4: 'Rajma today',
    5: 'Soya chunks curry today',
    6: 'Chana curry today',
    0: 'Sprouts + paneer today',
  },
};

const CHARU_ROTATION_NOTES = {
  breakfast: {
    1: 'ragi dosa', 4: 'ragi dosa',
    2: 'with paneer', 5: 'with paneer',
    3: 'toast day', 6: 'toast day',
    0: 'uthappam',
  },
  lunch: {
    1: 'soya today', 2: 'sprouts today', 3: 'soya today',
    4: 'rajma today', 5: 'soya today', 6: 'chana today', 0: 'sprouts + paneer',
  },
};

const CHARU_MORNING_PLAN = [
  {
    id: 'cm_wake', time: '6:00 AM', name: 'Wake up',
    items: [
      { id: 'cm_chia',    name: 'Warm water + lemon + soaked chia seeds (from last night)', protein: 1 },
      { id: 'cm_nuts',    name: 'Five soaked almonds + two walnuts', protein: 3 },
      { id: 'cm_hibiscus', name: 'Hibiscus tea (unsweetened)', protein: 0 },
    ],
  },
  {
    id: 'cm_pregym', time: '6:15 AM', name: 'Pre-gym',
    items: [
      { id: 'cm_banana', name: 'Small banana', protein: 1 },
      { id: 'cm_coffee', name: 'Black coffee, no sugar', protein: 0 },
    ],
  },
  {
    id: 'cm_breakfast', time: '8:00 AM', name: 'Breakfast',
    items: [
      { id: 'cm_eggs',   name: 'Two whole eggs + two egg whites omelette with spinach, mushroom, onion', protein: 19, rotate: 'breakfast' },
      { id: 'cm_dosa',   name: 'One ragi dosa or one oats besan chilla', protein: 4, rotate: 'breakfast' },
      { id: 'cm_paneer', name: 'Sixty grams paneer bhurji', protein: 11 },
      { id: 'cm_flax',   name: 'One tablespoon ground flaxseed (in batter or chutney)', protein: 1 },
      { id: 'cm_ghee',   name: 'Teaspoon of ghee', protein: 0 },
    ],
  },
  {
    id: 'cm_midmorn', time: '11:30 AM', name: 'Mid-morning',
    items: [
      { id: 'cm_yogurt',  name: 'Three quarters cup Greek yogurt or thick curd, unsweetened', protein: 11 },
      { id: 'cm_pumpkin', name: 'Twenty grams pumpkin seeds', protein: 6 },
      { id: 'cm_almonds', name: 'Five almonds', protein: 3 },
      { id: 'cm_fruit',   name: 'One fruit — pomegranate, guava, or berries (low GI only)', protein: 0 },
    ],
  },
  {
    id: 'cm_lunch', time: '1:30 PM', name: 'Lunch',
    items: [
      { id: 'cm_rice',  name: 'Three quarters cup brown rice or quinoa', protein: 5, rotate: 'lunch' },
      { id: 'cm_soya',  name: 'Soya chunks curry (forty grams dry)', protein: 20, rotate: 'lunch' },
      { id: 'cm_sabzi', name: 'Mixed sabzi — palak, bhindi, or cauliflower', protein: 2 },
      { id: 'cm_curd',  name: 'Small bowl curd', protein: 8 },
      { id: 'cm_salad', name: 'Big salad with cucumber, carrot, tomato, lemon', protein: 0 },
    ],
  },
  {
    id: 'cm_snack', time: '4:30 PM', name: 'Evening snack',
    items: [
      { id: 'cm_cintea', name: 'Cinnamon ginger tea (unsweetened)', protein: 0 },
      { id: 'cm_chana',  name: 'Thirty grams roasted sprouted chana', protein: 5 },
      { id: 'cm_egg_s',  name: 'One boiled egg', protein: 6 },
    ],
  },
  {
    id: 'cm_dinner', time: '8:00 PM', name: 'Dinner',
    items: [
      { id: 'cm_tikka',  name: 'Hundred grams tofu tikka or paneer tikka, grilled', protein: 12 },
      { id: 'cm_roti',   name: 'One ragi roti or multigrain roti', protein: 3 },
      { id: 'cm_sabzi2', name: 'Sabzi — bhindi, lauki, or mushroom', protein: 2 },
      { id: 'cm_salad2', name: 'Salad', protein: 0 },
    ],
  },
  {
    id: 'cm_bed', time: '10:30 PM', name: 'Bedtime',
    items: [
      { id: 'cm_cinmilk',  name: 'Warm cinnamon milk or plain warm water', protein: 3 },
      { id: 'cm_ashwa',    name: 'Teaspoon of ashwagandha', protein: 0 },
      { id: 'cm_chiasoak', name: 'Soak chia seeds overnight for tomorrow', protein: 0 },
    ],
  },
];

const CHARU_EVENING_PLAN = [
  {
    id: 'ce_wake', time: '7:30 AM', name: 'Wake up',
    items: [
      { id: 'ce_chia',     name: 'Warm water + lemon + soaked chia seeds', protein: 1 },
      { id: 'ce_nuts',     name: 'Five soaked almonds + two walnuts', protein: 3 },
      { id: 'ce_hibiscus', name: 'Hibiscus tea (unsweetened)', protein: 0 },
    ],
  },
  {
    id: 'ce_breakfast', time: '8:30 AM', name: 'Breakfast',
    items: [
      { id: 'ce_eggs',  name: 'Two whole eggs + two egg whites omelette with veggies', protein: 19, rotate: 'breakfast' },
      { id: 'ce_dosa',  name: 'One ragi dosa or oats chilla', protein: 4, rotate: 'breakfast' },
      { id: 'ce_flax',  name: 'One tablespoon ground flaxseed in batter', protein: 1 },
      { id: 'ce_ghee',  name: 'Teaspoon of ghee', protein: 0 },
    ],
  },
  {
    id: 'ce_lunch', time: '12:00 PM', name: 'Lunch',
    items: [
      { id: 'ce_rice',  name: 'Three quarters cup brown rice or quinoa', protein: 5, rotate: 'lunch' },
      { id: 'ce_soya',  name: 'Soya chunks curry (forty grams dry)', protein: 20, rotate: 'lunch' },
      { id: 'ce_sabzi', name: 'Mixed sabzi', protein: 2 },
      { id: 'ce_curd',  name: 'Curd + salad', protein: 8 },
    ],
  },
  {
    id: 'ce_pregym', time: '4:00 PM', name: 'Pre-gym snack',
    items: [
      { id: 'ce_yogurt',  name: 'One cup Greek yogurt, unsweetened', protein: 15 },
      { id: 'ce_pumpkin', name: 'Twenty grams pumpkin seeds', protein: 6 },
      { id: 'ce_banana',  name: 'Banana', protein: 1 },
    ],
  },
  {
    id: 'ce_gym', time: '7:30 PM', name: 'GYM',
    items: [
      { id: 'ce_water', name: 'Stay hydrated — 500ml water during workout', protein: 0 },
    ],
  },
  {
    id: 'ce_dinner', time: '9:15 PM', name: 'Post-workout dinner',
    items: [
      { id: 'ce_eggs2',  name: 'Two boiled eggs', protein: 12 },
      { id: 'ce_roti',   name: 'One ragi roti', protein: 3 },
      { id: 'ce_paneer', name: 'Eighty grams paneer or tofu, sautéed', protein: 13 },
      { id: 'ce_salad',  name: 'Small salad', protein: 0 },
    ],
  },
  {
    id: 'ce_bed', time: '11:00 PM', name: 'Bedtime',
    items: [
      { id: 'ce_cintea',   name: 'Cinnamon ginger tea, unsweetened', protein: 0 },
      { id: 'ce_ashwa',    name: 'Teaspoon of ashwagandha', protein: 0 },
      { id: 'ce_chiasoak', name: 'Soak chia seeds overnight for tomorrow', protein: 0 },
    ],
  },
];

const CHARU_BASE = {
  name: 'Charu',
  targetProtein: 110,
  phase: 'Weight Loss · PCOD',
  gymToggle: true,
  rotations: CHARU_ROTATIONS,
  rotationNotes: CHARU_ROTATION_NOTES,
};

/* ================================================================
   USER CONFIGS
================================================================ */
const USER_CONFIGS = {
  'kavin@gym.com': KAVIN_CONFIG,
  'charu@gym.com': CHARU_BASE,
};

/* active config resolved after login */
let cfg = null;  // the full config in use
let userId = null;
let charuGymTime = 'morning';

function resolveConfig(email) {
  if (email === 'charu@gym.com') {
    charuGymTime = localStorage.getItem('pg:charuGym') || 'morning';
    return {
      ...CHARU_BASE,
      plan: charuGymTime === 'morning' ? CHARU_MORNING_PLAN : CHARU_EVENING_PLAN,
    };
  }
  return USER_CONFIGS[email];
}

/* build item index for the active plan */
let ITEM_INDEX = {};
function buildItemIndex() {
  ITEM_INDEX = {};
  cfg.plan.forEach((m) => m.items.forEach((it) => {
    ITEM_INDEX[it.id] = { meal: m.name, name: it.name, protein: it.protein };
  }));
}

/* ================================================================
   SUPABASE
================================================================ */
if (!window.supabase || typeof window.supabase.createClient !== 'function') {
  window.__showBootError && window.__showBootError('Supabase library missing. Check CDN in index.html.');
  throw new Error('Supabase library missing');
}
if (!window.SUPABASE_URL || !window.SUPABASE_ANON_KEY) {
  window.__showBootError && window.__showBootError('config.js not loaded or keys missing.');
  throw new Error('Config missing');
}

const sb = window.supabase.createClient(window.SUPABASE_URL, window.SUPABASE_ANON_KEY, {
  auth: { persistSession: true, autoRefreshToken: true, storage: window.localStorage, storageKey: 'pg:auth' },
});

/* ================================================================
   LOCAL CACHE + STATE
================================================================ */
const todayKey = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};

const keyFromDate = (d) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

const cacheKey = (day) => `pg:day:${day}`;

const loadDayLocal = (day) => {
  const raw = localStorage.getItem(cacheKey(day));
  return raw ? JSON.parse(raw) : { checked: {} };
};

const saveLocal = (day, data) => localStorage.setItem(cacheKey(day), JSON.stringify(data));

const allLocalDays = () =>
  Object.keys(localStorage)
    .filter((k) => k.startsWith('pg:day:'))
    .map((k) => k.slice('pg:day:'.length));

const computeProtein = (checked) => {
  if (!checked) return 0;
  return cfg.plan.reduce((s, m) =>
    s + m.items.reduce((ss, it) => ss + (checked[it.id] ? it.protein : 0), 0), 0);
};

const state = {
  date: todayKey(),
  checked: {},
  history: {},
};

/* ================================================================
   SYNC
================================================================ */
const setSyncState = (kind) => {
  const el = document.getElementById('sync-state');
  const labels = { syncing: 'syncing', synced: 'synced', error: 'offline · saved locally' };
  el.className = `sync-state show ${kind}`;
  el.textContent = labels[kind] || '';
  if (kind === 'synced') setTimeout(() => el.classList.remove('show'), 1500);
};

const fetchAllDays = async () => {
  setSyncState('syncing');
  const { data, error } = await sb.from('days').select('day, checked, protein')
    .order('day', { ascending: false }).limit(180);
  if (error) {
    setSyncState('error');
    state.history = {};
    allLocalDays().forEach((d) => {
      const obj = loadDayLocal(d);
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
  state.checked = state.history[state.date]?.checked || loadDayLocal(state.date).checked || {};
};

let saveTimer = null;
const queueSave = () => {
  saveLocal(state.date, { checked: state.checked });
  const protein = computeProtein(state.checked);
  state.history[state.date] = { checked: { ...state.checked }, protein };
  setSyncState('syncing');
  clearTimeout(saveTimer);
  saveTimer = setTimeout(async () => {
    if (!userId) return;
    const { error } = await sb.from('days').upsert(
      { user_id: userId, day: state.date, checked: state.checked, protein },
      { onConflict: 'user_id,day' },
    );
    setSyncState(error ? 'error' : 'synced');
  }, 400);
};

/* ================================================================
   DERIVED
================================================================ */
const proteinFor = (meal) =>
  meal.items.reduce((s, it) => s + (state.checked[it.id] ? it.protein : 0), 0);

const maxProteinFor = (meal) =>
  meal.items.reduce((s, it) => s + it.protein, 0);

const totalProtein = () => cfg.plan.reduce((s, m) => s + proteinFor(m), 0);

const mealDone = (meal) => meal.items.every((it) => state.checked[it.id]);

const mealsDone = () => cfg.plan.filter(mealDone).length;

const streak = () => {
  const today = todayKey();
  let count = 0;
  const cursor = new Date();
  while (true) {
    const k = keyFromDate(cursor);
    const p = state.history[k]?.protein || 0;
    const win = p >= cfg.targetProtein * 0.8;
    if (k === today) {
      if (win) count += 1;
      cursor.setDate(cursor.getDate() - 1);
      continue;
    }
    if (win) { count += 1; cursor.setDate(cursor.getDate() - 1); }
    else break;
  }
  return count;
};

const longestStreak = () => {
  const days = Object.keys(state.history).sort();
  if (!days.length) return 0;
  let best = 0, run = 0, prev = null;
  days.forEach((k) => {
    const p = state.history[k]?.protein || 0;
    if (p >= cfg.targetProtein * 0.8) {
      if (prev) {
        const diff = (new Date(k) - new Date(prev)) / 86400000;
        run = diff === 1 ? run + 1 : 1;
      } else run = 1;
      best = Math.max(best, run);
      prev = k;
    } else { run = 0; prev = k; }
  });
  return best;
};

const avgProtein30 = () => {
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - 30);
  const vals = Object.entries(state.history)
    .filter(([k]) => new Date(k) >= cutoff)
    .map(([, v]) => v.protein || 0);
  return vals.length ? Math.round(vals.reduce((s, v) => s + v, 0) / vals.length) : 0;
};

const daysHitTarget = () =>
  Object.values(state.history).filter((d) => (d.protein || 0) >= cfg.targetProtein).length;

/* ================================================================
   RENDER
================================================================ */
const DAYS   = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const MON_S  = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

const renderMasthead = () => {
  const d = new Date();
  document.getElementById('dateline').textContent =
    `${DAYS[d.getDay()]} · ${MONTHS[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
  document.getElementById('wordmark').innerHTML =
    `<span class="amp">${cfg.name[0]}</span>${cfg.name.slice(1)}'s <em>Log</em>`;
  document.getElementById('phase-label').textContent = cfg.phase;
  const s = streak();
  document.getElementById('day-meta').textContent = s > 0 ? `Day ${s}` : 'Day 1';

  // gym toggle — only for Charu
  const tog = document.getElementById('gym-toggle');
  if (cfg.gymToggle) {
    tog.classList.remove('hidden');
    document.getElementById('gym-morning').classList.toggle('active', charuGymTime === 'morning');
    document.getElementById('gym-evening').classList.toggle('active', charuGymTime === 'evening');
  } else {
    tog.classList.add('hidden');
  }
};

const renderRotation = () => {
  const day = new Date().getDay();
  const rots = cfg.rotations || {};
  const items = [];
  Object.values(rots).forEach((map) => {
    if (map[day]) items.push(map[day]);
  });

  const sec = document.getElementById('rotation');
  const list = document.getElementById('rot-list');
  if (!items.length) { sec.classList.add('hidden'); return; }
  sec.classList.remove('hidden');
  list.innerHTML = items.map((t) => `<li>${t}</li>`).join('');
};

const renderProgress = () => {
  const cur = totalProtein();
  const pct = Math.min(100, Math.round((cur / cfg.targetProtein) * 100));
  document.getElementById('protein-current').textContent = cur;
  document.getElementById('protein-target').textContent = cfg.targetProtein;
  document.getElementById('pct').textContent = pct + '%';
  document.getElementById('meals-done-label').textContent = `${mealsDone()} of ${cfg.plan.length} meals`;
  document.getElementById('streak-count').textContent = streak();
  document.getElementById('bar-fill').style.right = (100 - pct) + '%';
  document.querySelector('.protein-block').classList.toggle('hit', cur >= cfg.targetProtein);
};

const renderLog = () => {
  const day = new Date().getDay();
  const notes = cfg.rotationNotes || {};
  const wrap = document.getElementById('log');
  wrap.innerHTML = cfg.plan.map((meal) => {
    const cur = proteinFor(meal);
    const max = maxProteinFor(meal);
    return `
      <article class="meal ${mealDone(meal) ? 'done' : ''}">
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
            let note = '';
            if (it.rotate && notes[it.rotate]?.[day]) note = notes[it.rotate][day];
            return `
              <li class="item ${checked ? 'checked' : ''}" data-item="${it.id}">
                <span class="item-mark"></span>
                <span class="item-name">${it.name}${note ? `<span class="item-note">${note}</span>` : ''}</span>
                <span class="item-protein">${it.protein > 0 ? it.protein + 'g' : ''}</span>
              </li>`;
          }).join('')}
        </ul>
      </article>`;
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

/* ---- History ---- */
const renderHistory = () => {
  document.getElementById('hist-best').textContent = longestStreak();
  document.getElementById('hist-avg').textContent = avgProtein30() + 'g';
  document.getElementById('hist-hit').textContent = daysHitTarget();
  renderHeatmap();
  renderChart();
  renderInsights();
};

const renderHeatmap = () => {
  const heatmap = document.getElementById('heatmap');
  const today = new Date(); today.setHours(0,0,0,0);
  const cells = [];
  for (let i = 89; i >= 0; i--) {
    const d = new Date(today); d.setDate(d.getDate() - i);
    const k = keyFromDate(d);
    const p = state.history[k]?.protein || 0;
    const level = p === 0 ? 0 : p < cfg.targetProtein * 0.4 ? 1 : p < cfg.targetProtein * 0.7 ? 2 : p < cfg.targetProtein * 0.9 ? 3 : 4;
    const isToday = i === 0;
    const label = `${MON_S[d.getMonth()]} ${d.getDate()} — ${p}g`;
    cells.push(`<div class="cell ${isToday ? 'today' : ''}" data-level="${level}"><div class="cell-tip">${label}</div></div>`);
  }
  heatmap.innerHTML = cells.join('');
};

const renderChart = () => {
  const svg = document.getElementById('chart');
  const W = 600, H = 160, pad = { t: 16, r: 12, b: 24, l: 8 };
  const innerW = W - pad.l - pad.r, innerH = H - pad.t - pad.b;
  const today = new Date(); today.setHours(0,0,0,0);
  const points = [];
  for (let i = 29; i >= 0; i--) {
    const d = new Date(today); d.setDate(d.getDate() - i);
    const k = keyFromDate(d);
    points.push({ k, d, p: state.history[k]?.protein || 0 });
  }
  const maxY = Math.max(cfg.targetProtein * 1.1, ...points.map((p) => p.p));
  const x = (i) => pad.l + (i / (points.length - 1)) * innerW;
  const y = (v) => pad.t + innerH - (v / maxY) * innerH;
  const ty = y(cfg.targetProtein);
  const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${x(i)} ${y(p.p)}`).join(' ');
  const areaPath = `${linePath} L ${x(points.length - 1)} ${pad.t + innerH} L ${x(0)} ${pad.t + innerH} Z`;
  svg.innerHTML = `
    <path class="area" d="${areaPath}" />
    <path class="line" d="${linePath}" />
    ${points.map((p, i) => `<circle class="dot" cx="${x(i)}" cy="${y(p.p)}" r="${p.p > 0 ? 1.6 : 0}" />`).join('')}
    <line class="target-line" x1="${pad.l}" x2="${pad.l + innerW}" y1="${ty}" y2="${ty}" />
    <text class="target-label" x="${pad.l + innerW}" y="${ty - 4}" text-anchor="end">${cfg.targetProtein}g target</text>
    <text class="axis" x="${pad.l}" y="${H - 6}" text-anchor="start">${MON_S[points[0].d.getMonth()]} ${points[0].d.getDate()}</text>
    <text class="axis" x="${pad.l + innerW}" y="${H - 6}" text-anchor="end">today</text>`;
};

const renderInsights = () => {
  const wrap = document.getElementById('insights');
  const dayCount = Object.keys(state.history).length;
  if (!dayCount) {
    wrap.innerHTML = `<div class="hist-empty">No history yet. Come back tomorrow.</div>`;
    document.getElementById('insights-kicker').classList.add('hidden');
    return;
  }
  document.getElementById('insights-kicker').classList.remove('hidden');

  const totalDays = Object.values(state.history).filter((d) => Object.values(d.checked || {}).some(Boolean)).length;
  const missCount = {};
  Object.values(state.history).forEach((day) => {
    if (!Object.values(day.checked || {}).some(Boolean)) return;
    cfg.plan.forEach((m) => m.items.forEach((it) => {
      if (!day.checked[it.id]) missCount[it.id] = (missCount[it.id] || 0) + 1;
    }));
  });
  const sorted = Object.entries(missCount).sort((a, b) => b[1] - a[1]);
  const insights = [];

  if (sorted.length && totalDays > 0) {
    const [topId, topCount] = sorted[0];
    if (ITEM_INDEX[topId] && topCount > 0) {
      const pct = Math.round((topCount / totalDays) * 100);
      insights.push({ num: `${pct}%`, body: `of days you skip <em>${ITEM_INDEX[topId].name.toLowerCase()}</em>. Worth fixing.` });
    }
  }

  const best = Object.entries(state.history).reduce(
    (acc, [k, v]) => ((v.protein || 0) > acc.p ? { k, p: v.protein } : acc), { k: null, p: 0 });
  if (best.k) {
    const d = new Date(best.k);
    insights.push({ num: `${best.p}g`, body: `best day — <em>${DAYS[d.getDay()]}, ${MON_S[d.getMonth()]} ${d.getDate()}</em>.` });
  }

  const wins = Object.values(state.history).filter((d) => (d.protein || 0) >= cfg.targetProtein * 0.8).length;
  insights.push({ num: `${Math.round((wins / dayCount) * 100)}%`, body: `of days you hit 80%+ of target. <em>${wins} of ${dayCount} days.</em>` });

  wrap.innerHTML = insights.map((i) => `
    <div class="insight">
      <div class="insight-num">${i.num}</div>
      <div class="insight-body">${i.body}</div>
    </div>`).join('');
};

/* ================================================================
   EVENTS
================================================================ */
document.getElementById('reset-day').addEventListener('click', async () => {
  if (!confirm('Reset today?')) return;
  state.checked = {};
  saveLocal(state.date, { checked: {} });
  state.history[state.date] = { checked: {}, protein: 0 };
  if (userId) {
    setSyncState('syncing');
    const { error } = await sb.from('days').upsert(
      { user_id: userId, day: state.date, checked: {}, protein: 0 },
      { onConflict: 'user_id,day' });
    setSyncState(error ? 'error' : 'synced');
  }
  renderProgress(); renderLog(); renderMasthead();
});

document.getElementById('show-history').addEventListener('click', () => {
  renderHistory();
  document.getElementById('history-modal').classList.remove('hidden');
});

document.getElementById('close-history').addEventListener('click', () => {
  document.getElementById('history-modal').classList.add('hidden');
});

document.getElementById('history-modal').addEventListener('click', (e) => {
  if (e.target.id === 'history-modal') document.getElementById('history-modal').classList.add('hidden');
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') document.getElementById('history-modal').classList.add('hidden');
});

document.getElementById('signout').addEventListener('click', async () => {
  await sb.auth.signOut();
  userId = null; cfg = null;
  showLogin();
});

// Charu's gym toggle
document.getElementById('gym-toggle').addEventListener('click', (e) => {
  const btn = e.target.closest('[data-gym]');
  if (!btn) return;
  const newTime = btn.getAttribute('data-gym');
  if (newTime === charuGymTime) return;
  charuGymTime = newTime;
  localStorage.setItem('pg:charuGym', charuGymTime);
  cfg = resolveConfig('charu@gym.com');
  buildItemIndex();
  state.checked = state.history[state.date]?.checked || {};
  renderMasthead(); renderRotation(); renderProgress(); renderLog();
});

document.getElementById('login-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value.trim().toLowerCase();
  const password = document.getElementById('password').value;
  const btn = document.getElementById('login-submit');
  const err = document.getElementById('login-error');
  err.classList.add('hidden');
  btn.disabled = true; btn.textContent = 'Signing in';
  const { data, error } = await sb.auth.signInWithPassword({ email, password });
  btn.disabled = false; btn.textContent = 'Enter';
  if (error) { err.textContent = error.message; err.classList.remove('hidden'); return; }
  if (!USER_CONFIGS[email]) {
    err.textContent = 'No plan found for this account.';
    err.classList.remove('hidden');
    await sb.auth.signOut();
    return;
  }
  userId = data.user.id;
  await bootApp(email);
});

/* ================================================================
   BOOT
================================================================ */
const showLogin = () => {
  document.getElementById('login-screen').classList.remove('hidden');
  document.getElementById('app-screen').classList.add('hidden');
};

const showApp = () => {
  document.getElementById('login-screen').classList.add('hidden');
  document.getElementById('app-screen').classList.remove('hidden');
};

const bootApp = async (email) => {
  cfg = resolveConfig(email);
  buildItemIndex();
  showApp();
  await fetchAllDays();
  renderMasthead();
  renderRotation();
  renderProgress();
  renderLog();
};

(async function init() {
  const { data } = await sb.auth.getSession();
  if (data.session) {
    const email = data.session.user.email;
    userId = data.session.user.id;
    if (USER_CONFIGS[email]) {
      await bootApp(email);
    } else {
      await sb.auth.signOut();
      showLogin();
    }
  } else {
    showLogin();
  }
})();

// midnight rollover
setInterval(async () => {
  const k = todayKey();
  if (k !== state.date) {
    state.date = k;
    state.checked = state.history[k]?.checked || loadDayLocal(k).checked || {};
    renderMasthead(); renderRotation(); renderProgress(); renderLog();
  }
}, 60_000);
