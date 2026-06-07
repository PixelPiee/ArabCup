const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;
const DB_FILE = path.join(__dirname, 'data.json');

app.use(cors());
app.use(express.json());

// Default Seed Data
const defaultTeams = {
  "Yemen": { nameEn: "Yemen", nameAr: "اليمن" },
  "Palestine": { nameEn: "Palestine", nameAr: "فلسطين" },
  "Egypt": { nameEn: "Egypt", nameAr: "مصر" },
  "Saudi Arabia": { nameEn: "Saudi Arabia", nameAr: "السعودية" },
  "Morocco": { nameEn: "Morocco", nameAr: "المغرب" },
  "Algeria": { nameEn: "Algeria", nameAr: "الجزائر" },
  "Tunisia": { nameEn: "Tunisia", nameAr: "تونس" },
  "Iraq": { nameEn: "Iraq", nameAr: "العراق" },
  "Qatar": { nameEn: "Qatar", nameAr: "قطر" },
  "UAE": { nameEn: "UAE", nameAr: "الإمارات" },
  "Jordan": { nameEn: "Jordan", nameAr: "الأردن" },
  "Syria": { nameEn: "Syria", nameAr: "سوريا" }
};

const defaultTournaments = [
  { id: "arab-cup-2026", nameEn: "Arab Cup 2026", nameAr: "كأس العرب 2026", ptsWin: 3, ptsDraw: 1, ptsLoss: 0 },
  { id: "rematch-championship", nameEn: "Rematch Championship", nameAr: "بطولة ريماتش الودية", ptsWin: 2, ptsDraw: 1, ptsLoss: 0 }
];

const defaultMatches = [
  { id: "ac-match-1", tournamentId: "arab-cup-2026", teamA: "Palestine", teamB: "Yemen", scoreA: 2, scoreB: 5, date: "2026-04-03T22:00:00", type: "Tournament Match", stage: "Group Stage", status: "Finished", winner: "Yemen" },
  { id: "ac-match-2", tournamentId: "arab-cup-2026", teamA: "Palestine", teamB: "Egypt", scoreA: null, scoreB: null, date: "2026-06-03T22:00:00", type: "Tournament Match", stage: "Group Stage", status: "Upcoming", winner: null },
  { id: "ac-match-3", tournamentId: "arab-cup-2026", teamA: "Yemen", teamB: "Egypt", scoreA: 1, scoreB: 1, date: "2026-06-08T18:00:00", type: "Tournament Match", stage: "Group Stage", status: "Finished", winner: "Draw" },
  { id: "ac-match-4", tournamentId: "arab-cup-2026", teamA: "Saudi Arabia", teamB: "Morocco", scoreA: 3, scoreB: 2, date: "2026-06-10T20:30:00", type: "Tournament Match", stage: "Group Stage", status: "Finished", winner: "Saudi Arabia" },
  { id: "ac-match-5", tournamentId: "arab-cup-2026", teamA: "Algeria", teamB: "Tunisia", scoreA: 0, scoreB: 0, date: "2026-06-11T21:00:00", type: "Tournament Match", stage: "Group Stage", status: "Finished", winner: "Draw" },
  
  { id: "ac-qf-1", tournamentId: "arab-cup-2026", teamA: "Yemen", teamB: "Morocco", scoreA: 3, scoreB: 1, date: "2026-06-15T18:00:00", type: "Tournament Match", stage: "Quarter-Finals", status: "Finished", winner: "Yemen" },
  { id: "ac-qf-2", tournamentId: "arab-cup-2026", teamA: "Saudi Arabia", teamB: "Egypt", scoreA: 2, scoreB: 0, date: "2026-06-15T21:00:00", type: "Tournament Match", stage: "Quarter-Finals", status: "Finished", winner: "Saudi Arabia" },
  { id: "ac-qf-3", tournamentId: "arab-cup-2026", teamA: "Algeria", teamB: "Qatar", scoreA: 1, scoreB: 2, date: "2026-06-16T18:00:00", type: "Tournament Match", stage: "Quarter-Finals", status: "Finished", winner: "Qatar" },
  { id: "ac-qf-4", tournamentId: "arab-cup-2026", teamA: "Jordan", teamB: "Tunisia", scoreA: 0, scoreB: 1, date: "2026-06-16T21:00:00", type: "Tournament Match", stage: "Quarter-Finals", status: "Finished", winner: "Tunisia" },
  
  { id: "ac-sf-1", tournamentId: "arab-cup-2026", teamA: "Yemen", teamB: "Saudi Arabia", scoreA: 2, scoreB: 1, date: "2026-06-20T20:00:00", type: "Tournament Match", stage: "Semi-Finals", status: "Finished", winner: "Yemen" },
  { id: "ac-sf-2", tournamentId: "arab-cup-2026", teamA: "Qatar", teamB: "Tunisia", scoreA: null, scoreB: null, date: "2026-06-21T20:00:00", type: "Tournament Match", stage: "Semi-Finals", status: "Upcoming", winner: null },
  { id: "ac-final", tournamentId: "arab-cup-2026", teamA: "Yemen", teamB: "TBD", scoreA: null, scoreB: null, date: "2026-06-28T21:00:00", type: "Tournament Match", stage: "Final", status: "Upcoming", winner: null },

  { id: "rc-match-1", tournamentId: "rematch-championship", teamA: "Qatar", teamB: "UAE", scoreA: 2, scoreB: 0, date: "2026-07-01T19:00:00", type: "Tournament Match", stage: "Group Stage", status: "Finished", winner: "Qatar" },
  { id: "rc-match-2", tournamentId: "rematch-championship", teamA: "Jordan", teamB: "Syria", scoreA: 1, scoreB: 2, date: "2026-07-02T19:00:00", type: "Tournament Match", stage: "Group Stage", status: "Finished", winner: "Syria" },
  
  { id: "fr-match-1", tournamentId: "arab-cup-2026", teamA: "Saudi Arabia", teamB: "UAE", scoreA: 2, scoreB: 2, date: "2026-05-15T18:00:00", type: "Friendly", stage: "Group Stage", status: "Finished", winner: "Draw" },
  { id: "fr-match-2", tournamentId: "arab-cup-2026", teamA: "Egypt", teamB: "Jordan", scoreA: null, scoreB: null, date: "2026-06-12T17:00:00", type: "Friendly", stage: "Group Stage", status: "Upcoming", winner: null }
];

const initialDatabase = {
  tournaments: defaultTournaments,
  matches: defaultMatches,
  teams: defaultTeams
};

// Database read/write helpers
function readDatabase() {
  try {
    if (!fs.existsSync(DB_FILE)) {
      writeDatabase(initialDatabase);
      return initialDatabase;
    }
    const raw = fs.readFileSync(DB_FILE, 'utf8');
    return JSON.parse(raw);
  } catch (e) {
    console.error("Failed to read database file, returning defaults.", e);
    return initialDatabase;
  }
}

function writeDatabase(data) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf8');
  } catch (e) {
    console.error("Failed to write to database file.", e);
  }
}

// REST APIs
app.get('/api/data', (req, res) => {
  const db = readDatabase();
  res.json(db);
});

app.post('/api/tournaments', (req, res) => {
  const { id, nameEn, nameAr, ptsWin, ptsDraw, ptsLoss } = req.body;
  if (!id || !nameEn || !nameAr) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const db = readDatabase();
  db.tournaments.push({ id, nameEn, nameAr, ptsWin, ptsDraw, ptsLoss });
  writeDatabase(db);
  res.status(201).json({ success: true });
});

app.delete('/api/tournaments/:id', (req, res) => {
  const { id } = req.params;
  const db = readDatabase();

  db.tournaments = db.tournaments.filter(t => t.id !== id);
  db.matches = db.matches.filter(m => m.tournamentId !== id);
  writeDatabase(db);

  res.json({ success: true });
});

app.post('/api/matches', (req, res) => {
  const match = req.body;
  if (!match.id || !match.tournamentId || !match.teamA || !match.teamB) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const db = readDatabase();
  db.matches.push(match);
  writeDatabase(db);

  res.status(201).json({ success: true });
});

app.put('/api/matches/:id', (req, res) => {
  const { id } = req.params;
  const updatedMatch = req.body;
  const db = readDatabase();

  const idx = db.matches.findIndex(m => m.id === id);
  if (idx !== -1) {
    db.matches[idx] = { ...db.matches[idx], ...updatedMatch };
    writeDatabase(db);
    res.json({ success: true });
  } else {
    res.status(404).json({ error: "Match not found" });
  }
});

app.delete('/api/matches/:id', (req, res) => {
  const { id } = req.params;
  const db = readDatabase();

  db.matches = db.matches.filter(m => m.id !== id);
  writeDatabase(db);

  res.json({ success: true });
});

app.post('/api/reset', (req, res) => {
  writeDatabase(initialDatabase);
  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`Rematch API server is running on port ${PORT}`);
});
