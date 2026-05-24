# Kavin's Log

A daily protein and diet tracker. Cloud-synced (Supabase), no build step,
deploys as a static site on Vercel.

## What it tracks

- A daily meal plan (~180g protein, 1 scoop whey, no fish, South Indian)
- 8 meals, each with checkable items
- A protein counter that fills as you go
- Weekly food rotations (ragi dosa Tue/Fri, drumstick sambar Mon, etc.)
- A 90-day heatmap, 30-day chart, longest streak, most-skipped meals

## Stack

- **Frontend:** plain HTML, CSS, JS — no framework, no build
- **Database + auth:** Supabase (Postgres with RLS, email login)
- **Hosting:** Vercel (static site)
- **Fonts:** Fraunces, Inter, JetBrains Mono via Google Fonts

## Local development

Just open `index.html` in a browser. There's no build step.

If you want a local server (recommended, so `localStorage` and CORS behave):

```bash
python3 -m http.server 5173
# then visit http://localhost:5173
```

## Deployment to Vercel

1. Push this repo to GitHub
2. In Vercel: New Project → Import → pick this repo
3. Framework preset: **Other** (it's a static site)
4. Build command: *(leave blank)*
5. Output directory: *(leave blank, default `./`)*
6. Deploy

That's it. No environment variables needed — the Supabase URL and anon
key live in `config.js` and are safe to expose because row-level
security on the `days` table only lets each user read their own rows.

## Schema (already applied)

```sql
create table days (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  day date not null,
  checked jsonb not null default '{}',
  protein int not null default 0,
  updated_at timestamptz default now(),
  unique (user_id, day)
);

-- RLS so each user only ever sees their own rows
alter table days enable row level security;
create policy days_select_own on days for select using (auth.uid() = user_id);
create policy days_insert_own on days for insert with check (auth.uid() = user_id);
create policy days_update_own on days for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy days_delete_own on days for delete using (auth.uid() = user_id);
```

## Files

| File | Role |
|---|---|
| `index.html` | Page structure (login + app + history modal) |
| `styles.css` | All styling (editorial training-journal aesthetic) |
| `app.js` | Plan data, auth, sync, render logic |
| `config.js` | Supabase URL + anon key (safe to commit) |
