<<<<<<< HEAD
# ArabCup
=======
# Rematch – Arab Cup Tournament Web App

## Overview
This repository contains a **dual‑language (English / Arabic)** tournament manager called **Rematch**. It now runs with a **Node/Express backend** (hosted on **Render**) and a **static frontend** (hosted on **Netlify**).

---

## 1. Repository Structure
```
ArabCup/
├─ backend/          # Node.js API (Render)
│   ├─ package.json
│   ├─ server.js
│   └─ data.json      # Persistent JSON store (auto‑created on first run)
├─ js/                # Front‑end source
│   ├─ app.js
│   ├─ data.js
│   └─ translations.js
├─ index.html         # Main page (Netlify entry point)
├─ README.md          # <‑ THIS FILE
└─ ...                # assets, CSS, etc.
```

---

## 2. Deploying the **Frontend** to Netlify
1. **Create a GitHub repository** (if you haven’t already) and push the entire `ArabCup` folder.
   ```bash
   cd C:/Users/Dev Bhuyan/Downloads/ArabCup
   git init
   git add .
   git commit -m "Initial commit – frontend + backend"
   git remote add origin <YOUR_GITHUB_URL>
   git branch -M main
   git push -u origin main
   ```
2. **Log in to Netlify** and click **"New site from Git"**.
3. Choose **GitHub**, select the repository you just pushed.
4. **Build settings** (the app is static, no build step required):
   - **Build command:** `echo "No build needed"`
   - **Publish directory:** `./` (root of the repo – `index.html` lives here)
5. Click **Deploy site**. Netlify will serve `index.html` and all assets.
6. After the first deploy, open the site and go to the **Admin Panel** → **Backend Settings**. Set the **Backend API URL** to the Render URL you will obtain in the next section (e.g., `https://rematch-backend.onrender.com`). Save.

---

## 3. Deploying the **Backend** to Render
1. Create a **Render** account and click **"New Web Service"** → **"Create a New Service"** → **"Web Service"**.
2. Connect the same GitHub repository used for Netlify.
3. **Environment**:
   - **Runtime:** `Node`
   - **Build command:** `npm install` (Render will run this in the `backend` folder).
   - **Start command:** `node server.js`
4. **Root directory:** set to `backend` (Render will `cd` into this folder before running commands).
5. **Environment variables** (optional but recommended):
   - `PORT` – Leave blank; Render injects its own port.
   - `DATA_FILE` – Not required; the server uses a fixed `data.json` inside the folder.
6. Click **Create Web Service**. Render will build and start the API. When the service is live, copy the generated URL (e.g., `https://rematch-backend.onrender.com`).
7. **Data persistence:** Render’s free tier uses an ephemeral file system. The server automatically creates `data.json` with default data on first start. After a restart, the file is re‑created, so existing tournament data will be reset – this is acceptable for a demo. For production, mount a persistent volume or use a cloud DB.

---

## 4. Local Development & Verification
1. **Backend** – from a terminal:
   ```bash
   cd backend
   npm install          # installs express & cors
   node server.js        # runs on http://localhost:5000
   ```
2. **Frontend** – open `index.html` in a browser (or run a simple static server, e.g., `npx -y serve .`). The admin panel lets you set the **Backend API URL**. Use `http://localhost:5000` to test locally.
3. Verify CRUD operations:
   - Add a tournament or match via the admin UI.
   - Refresh the page – data should persist (stored in `backend/data.json`).
   - Stop the backend, restart, and ensure the defaults are re‑loaded if `data.json` is missing.

---

## 5. Next Steps / Improvements
- Hook the backend to a real database (PostgreSQL, MongoDB) for permanent storage.
- Add CI/CD pipelines (GitHub Actions) to automatically trigger Netlify and Render deployments on push.
- Secure the backend API (authentication for admin actions).
- Provide a dark‑mode theme and polish the UI to meet the premium aesthetic guidelines.

---

*This guide assumes you already have a GitHub account and basic familiarity with the command line.*
>>>>>>> master
