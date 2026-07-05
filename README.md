# Digital NOC — Live Preview

A clickable demo of the Digital NOC Management System's UI and workflow —
login, admin editing, hospital/police approvals, and family requests — all
running on sample data held in memory. There's no backend or database here,
so nothing you do gets saved anywhere but your browser tab, and it resets on
refresh. That also means it's the easiest possible thing to put on a live URL:
no environment variables, no database, no server.

## Demo logins
| Role | Email | Password |
|---|---|---|
| Admin | admin@digitalnoc.gov | password123 |
| Hospital | cmo@cityhospital.com | password123 |
| Police | vijay@police.gov | password123 |
| Family/User | amit@verma.com | password123 |

(Or just tap "Fill demo credentials" on the login screen.)

## Get a live link (free, ~1 minute)

**Option A — Vercel (recommended)**
1. Push this folder to a new GitHub repo:
   ```bash
   git init && git add . && git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/noc-preview.git
   git push -u origin main
   ```
2. Go to [vercel.com](https://vercel.com) → sign in with GitHub → **Add New
   Project** → import the repo. It auto-detects Vite. No environment
   variables needed. Click **Deploy**.
3. You'll get a URL like `noc-preview.vercel.app` in under a minute.

**Option B — Netlify Drop (no GitHub needed, fastest)**
1. Run locally:
   ```bash
   npm install
   npm run build
   ```
2. Go to [app.netlify.com/drop](https://app.netlify.com/drop) and drag the
   generated `dist` folder into the browser window. It deploys instantly and
   gives you a live URL.

## Run locally first (optional)
```bash
npm install
npm run dev
```
Opens on http://localhost:5173

## This is a preview, not the real app

This is the UI/workflow only — for the actual system with a real database,
real authentication, and persisted data, you'll want the full project
(separate frontend + backend + MongoDB) from earlier, not this one.
