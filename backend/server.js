const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;
const DB_FILE = path.join(__dirname, 'data.json');

// Middleware
app.use(cors());
app.use(express.json());

// Helper functions to read/write data
function loadData() {
  try {
    const raw = fs.readFileSync(DB_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to load data.json', e);
    return { teams: {}, tournaments: [], matches: [] };
  }
}

function saveData(data) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (e) {
    console.error('Failed to save data.json', e);
  }
}

// ---- Team CRUD Endpoints ----
app.get('/api/teams', (req, res) => {
  const data = loadData();
  res.json(Object.values(data.teams || {}));
});

app.post('/api/teams', (req, res) => {
  const { id, nameEn, nameAr, flag } = req.body;
  if (!nameEn || !nameAr) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  const data = loadData();
  const teamId = id || nameEn;
  if (!data.teams) data.teams = {};
  data.teams[teamId] = { nameEn, nameAr, flag: flag || '', squad: [] };
  saveData(data);
  res.status(201).json({ id: teamId, nameEn, nameAr, flag: flag || '', squad: [] });
});

app.put('/api/teams/:id', (req, res) => {
  const { id } = req.params;
  const { nameEn, nameAr, flag, squad } = req.body;
  const data = loadData();
  if (!data.teams || !data.teams[id]) {
    return res.status(404).json({ error: 'Team not found' });
  }
  if (nameEn !== undefined) data.teams[id].nameEn = nameEn;
  if (nameAr !== undefined) data.teams[id].nameAr = nameAr;
  if (flag !== undefined) data.teams[id].flag = flag;
  if (squad !== undefined) data.teams[id].squad = squad;
  saveData(data);
  res.json(data.teams[id]);
});

app.delete('/api/teams/:id', (req, res) => {
  const { id } = req.params;
  const data = loadData();
  if (!data.teams || !data.teams[id]) {
    return res.status(404).json({ error: 'Team not found' });
  }
  delete data.teams[id];
  // Replace team in matches
  if (data.matches) {
    data.matches.forEach(m => {
      if (m.teamA === id) m.teamA = "TBD";
      if (m.teamB === id) m.teamB = "TBD";
    });
  }
  saveData(data);
  res.status(204).send();
});

// ---- Squad (Players) Endpoints ----
app.post('/api/teams/:id/players', (req, res) => {
  const { id } = req.params;
  const { name, position } = req.body;
  if (!name || !position) {
    return res.status(400).json({ error: 'Missing player name or position' });
  }
  const data = loadData();
  const team = data.teams ? data.teams[id] : null;
  if (!team) return res.status(404).json({ error: 'Team not found' });
  if (!team.squad) team.squad = [];
  const playerId = `player-${Date.now()}`;
  const player = { id: playerId, name, position };
  team.squad.push(player);
  saveData(data);
  res.status(201).json(player);
});

app.put('/api/teams/:id/players/:playerId', (req, res) => {
  const { id, playerId } = req.params;
  const { name, position } = req.body;
  const data = loadData();
  const team = data.teams ? data.teams[id] : null;
  if (!team) return res.status(404).json({ error: 'Team not found' });
  if (!team.squad) return res.status(404).json({ error: 'Player not found' });
  const player = team.squad.find(p => p.id === playerId);
  if (!player) return res.status(404).json({ error: 'Player not found' });
  if (name !== undefined) player.name = name;
  if (position !== undefined) player.position = position;
  saveData(data);
  res.json(player);
});

app.delete('/api/teams/:id/players/:playerId', (req, res) => {
  const { id, playerId } = req.params;
  const data = loadData();
  const team = data.teams ? data.teams[id] : null;
  if (!team) return res.status(404).json({ error: 'Team not found' });
  if (!team.squad) return res.status(404).json({ error: 'Player not found' });
  team.squad = team.squad.filter(p => p.id !== playerId);
  saveData(data);
  res.status(204).send();
});

// ---- Tournaments CRUD Endpoints ----
app.get('/api/tournaments', (req, res) => {
  const data = loadData();
  res.json(data.tournaments || []);
});

app.post('/api/tournaments', (req, res) => {
  const { id, nameEn, nameAr, ptsWin, ptsDraw, ptsLoss } = req.body;
  if (!id || !nameEn || !nameAr) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  const data = loadData();
  if (!data.tournaments) data.tournaments = [];
  const newTourney = { id, nameEn, nameAr, ptsWin: Number(ptsWin), ptsDraw: Number(ptsDraw), ptsLoss: Number(ptsLoss) };
  data.tournaments.push(newTourney);
  saveData(data);
  res.status(201).json(newTourney);
});

app.delete('/api/tournaments/:id', (req, res) => {
  const { id } = req.params;
  const data = loadData();
  if (!data.tournaments) data.tournaments = [];
  data.tournaments = data.tournaments.filter(t => t.id !== id);
  if (data.matches) {
    data.matches = data.matches.filter(m => m.tournamentId !== id);
  }
  saveData(data);
  res.status(204).send();
});

// ---- Matches CRUD Endpoints ----
app.get('/api/matches', (req, res) => {
  const data = loadData();
  res.json(data.matches || []);
});

app.post('/api/matches', (req, res) => {
  const match = req.body;
  if (!match.id || !match.tournamentId || !match.teamA || !match.teamB) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  const data = loadData();
  if (!data.matches) data.matches = [];
  data.matches.push(match);
  saveData(data);
  res.status(201).json(match);
});

app.put('/api/matches/:id', (req, res) => {
  const { id } = req.params;
  const updatedMatch = req.body;
  const data = loadData();
  if (!data.matches) data.matches = [];
  const idx = data.matches.findIndex(m => m.id === id);
  if (idx === -1) {
    return res.status(404).json({ error: 'Match not found' });
  }
  data.matches[idx] = updatedMatch;
  saveData(data);
  res.json(updatedMatch);
});

app.delete('/api/matches/:id', (req, res) => {
  const { id } = req.params;
  const data = loadData();
  if (!data.matches) data.matches = [];
  data.matches = data.matches.filter(m => m.id !== id);
  saveData(data);
  res.status(204).send();
});

// Start server
app.listen(PORT, () => {
  console.log(`Rematch API server is running on port ${PORT}`);
});
