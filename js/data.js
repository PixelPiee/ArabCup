/* ============================================================
   data.js — RematchDataStore
   Full implementation: teams, tournaments, matches, squad CRUD
   ============================================================ */

// ---------------------------------------------------------------
// Default Data
// ---------------------------------------------------------------
const defaultTeams = {
  "Yemen": {
    nameEn: "Yemen", nameAr: "اليمن",
    flag: `<svg viewBox="0 0 9 6" xmlns="http://www.w3.org/2000/svg"><rect width="9" height="2" fill="#CE1126"/><rect y="2" width="9" height="2" fill="#FFFFFF"/><rect y="4" width="9" height="2" fill="#000000"/></svg>`,
    squad: []
  },
  "Palestine": {
    nameEn: "Palestine", nameAr: "فلسطين",
    flag: `<svg viewBox="0 0 12 6" xmlns="http://www.w3.org/2000/svg"><rect width="12" height="2" fill="#000000"/><rect y="2" width="12" height="2" fill="#FFFFFF"/><rect y="4" width="12" height="2" fill="#007A3D"/><polygon points="0,0 4,3 0,6" fill="#E4312B"/></svg>`,
    squad: []
  },
  "Egypt": {
    nameEn: "Egypt", nameAr: "مصر",
    flag: `<svg viewBox="0 0 9 6" xmlns="http://www.w3.org/2000/svg"><rect width="9" height="2" fill="#C8102E"/><rect y="2" width="9" height="2" fill="#FFFFFF"/><rect y="4" width="9" height="2" fill="#000000"/><polygon points="4.5,2.5 4.3,2.8 4.5,3.1 4.7,2.8" fill="#C09300"/><circle cx="4.5" cy="2.8" r="0.15" fill="#C09300"/></svg>`,
    squad: []
  },
  "Saudi Arabia": {
    nameEn: "Saudi Arabia", nameAr: "السعودية",
    flag: `<svg viewBox="0 0 3 2" xmlns="http://www.w3.org/2000/svg"><rect width="3" height="2" fill="#006C35"/><line x1="0.6" y1="1.4" x2="2.4" y2="1.4" stroke="#FFFFFF" stroke-width="0.1"/><path d="M 0.8 1.1 Q 1.5 0.7 2.2 1.1" stroke="#FFFFFF" stroke-width="0.04" fill="none"/></svg>`,
    squad: []
  },
  "Morocco": {
    nameEn: "Morocco", nameAr: "المغرب",
    flag: `<svg viewBox="0 0 3 2" xmlns="http://www.w3.org/2000/svg"><rect width="3" height="2" fill="#C1272D"/><polygon points="1.5,0.6 1.6,0.9 1.9,0.9 1.65,1.1 1.75,1.4 1.5,1.2 1.25,1.4 1.35,1.1 1.1,0.9 1.4,0.9" stroke="#006233" stroke-width="0.06" fill="none"/></svg>`,
    squad: []
  },
  "Algeria": {
    nameEn: "Algeria", nameAr: "الجزائر",
    flag: `<svg viewBox="0 0 3 2" xmlns="http://www.w3.org/2000/svg"><rect width="1.5" height="2" fill="#006233"/><rect x="1.5" width="1.5" height="2" fill="#FFFFFF"/><path d="M1.7,0.7 A0.3,0.3 0 1,0 1.7,1.3 A0.22,0.22 0 1,1 1.74,1.23" fill="#D21034"/><polygon points="1.75,0.9 1.7,1.05 1.85,0.95 1.65,0.95 1.8,1.05" fill="#D21034"/></svg>`,
    squad: []
  },
  "Tunisia": {
    nameEn: "Tunisia", nameAr: "تونس",
    flag: `<svg viewBox="0 0 3 2" xmlns="http://www.w3.org/2000/svg"><rect width="3" height="2" fill="#E01A22"/><circle cx="1.5" cy="1.0" r="0.5" fill="#FFFFFF"/><path d="M1.6,0.75 A0.25,0.25 0 1,0 1.6,1.25 A0.2,0.2 0 1,1 1.63,1.2" fill="#E01A22"/><polygon points="1.62,0.9 1.58,1.05 1.72,0.95 1.52,0.95 1.68,1.05" fill="#E01A22"/></svg>`,
    squad: []
  },
  "Iraq": {
    nameEn: "Iraq", nameAr: "العراق",
    flag: `<svg viewBox="0 0 9 6" xmlns="http://www.w3.org/2000/svg"><rect width="9" height="2" fill="#DA121A"/><rect y="2" width="9" height="2" fill="#FFFFFF"/><rect y="4" width="9" height="2" fill="#000000"/></svg>`,
    squad: []
  },
  "Qatar": {
    nameEn: "Qatar", nameAr: "قطر",
    flag: `<svg viewBox="0 0 22 9" xmlns="http://www.w3.org/2000/svg"><rect width="22" height="9" fill="#8D1B3D"/><polygon points="0,0 6,0 8,0.5 6,1 8,1.5 6,2 8,2.5 6,3 8,3.5 6,4 8,4.5 6,5 8,5.5 6,6 8,6.5 6,7 8,7.5 6,8 8,8.5 6,9 0,9" fill="#FFFFFF"/></svg>`,
    squad: []
  },
  "UAE": {
    nameEn: "UAE", nameAr: "الإمارات",
    flag: `<svg viewBox="0 0 12 6" xmlns="http://www.w3.org/2000/svg"><rect x="3" width="9" height="2" fill="#00732F"/><rect x="3" y="2" width="9" height="2" fill="#FFFFFF"/><rect x="3" y="4" width="9" height="2" fill="#000000"/><rect width="3" height="6" fill="#FF0000"/></svg>`,
    squad: []
  },
  "Jordan": {
    nameEn: "Jordan", nameAr: "الأردن",
    flag: `<svg viewBox="0 0 12 6" xmlns="http://www.w3.org/2000/svg"><rect width="12" height="2" fill="#000000"/><rect y="2" width="12" height="2" fill="#FFFFFF"/><rect y="4" width="12" height="2" fill="#007A3D"/><polygon points="0,0 6,3 0,6" fill="#E4312B"/><polygon points="2,3 2.2,3.3 1.9,3.1 1.7,3.3 1.8,3.0 1.5,2.8 1.9,2.8 2,2.5 2.1,2.8 2.5,2.8" fill="#FFFFFF"/></svg>`,
    squad: []
  },
  "Syria": {
    nameEn: "Syria", nameAr: "سوريا",
    flag: `<svg viewBox="0 0 9 6" xmlns="http://www.w3.org/2000/svg"><rect width="9" height="2" fill="#E31B23"/><rect y="2" width="9" height="2" fill="#FFFFFF"/><rect y="4" width="9" height="2" fill="#000000"/><polygon points="3,3 3.15,3.35 2.85,3.15 2.55,3.35 2.7,3 2.4,2.8 2.8,2.8 3,2.5 3.2,2.8 3.6,2.8" fill="#007A3D"/><polygon points="6,3 6.15,3.35 5.85,3.15 5.55,3.35 5.7,3 5.4,2.8 5.8,2.8 6,2.5 6.2,2.8 6.6,2.8" fill="#007A3D"/></svg>`,
    squad: []
  }
};

const defaultTournaments = [
  { id: "arab-cup-2026", nameEn: "Arab Cup 2026", nameAr: "كأس العرب 2026", ptsWin: 3, ptsDraw: 1, ptsLoss: 0 },
  { id: "rematch-championship", nameEn: "Rematch Championship", nameAr: "بطولة ريماتش الودية", ptsWin: 2, ptsDraw: 1, ptsLoss: 0 }
];

const defaultMatches = [
  { id: "ac-match-1", tournamentId: "arab-cup-2026", teamA: "Palestine", teamB: "Yemen", scoreA: 2, scoreB: 5, date: "2026-04-03T22:00:00", type: "Tournament Match", stage: "Group Stage", status: "Finished", winner: "Yemen" },
  { id: "ac-match-2", tournamentId: "arab-cup-2026", teamA: "Palestine", teamB: "Egypt", scoreA: null, scoreB: null, date: "2026-06-15T22:00:00", type: "Tournament Match", stage: "Group Stage", status: "Upcoming", winner: null },
  { id: "ac-match-3", tournamentId: "arab-cup-2026", teamA: "Yemen", teamB: "Egypt", scoreA: 1, scoreB: 1, date: "2026-06-08T18:00:00", type: "Tournament Match", stage: "Group Stage", status: "Finished", winner: "Draw" },
  { id: "ac-match-4", tournamentId: "arab-cup-2026", teamA: "Saudi Arabia", teamB: "Morocco", scoreA: 3, scoreB: 2, date: "2026-06-10T20:30:00", type: "Tournament Match", stage: "Group Stage", status: "Finished", winner: "Saudi Arabia" },
  { id: "ac-match-5", tournamentId: "arab-cup-2026", teamA: "Algeria", teamB: "Tunisia", scoreA: 0, scoreB: 0, date: "2026-06-11T21:00:00", type: "Tournament Match", stage: "Group Stage", status: "Finished", winner: "Draw" },
  { id: "ac-match-6", tournamentId: "arab-cup-2026", teamA: "Yemen", teamB: "Saudi Arabia", scoreA: null, scoreB: null, date: "2026-06-20T20:00:00", type: "Tournament Match", stage: "Quarter-Finals", status: "Upcoming", winner: null },
  { id: "ac-match-7", tournamentId: "arab-cup-2026", teamA: "Egypt", teamB: "Morocco", scoreA: null, scoreB: null, date: "2026-06-21T20:00:00", type: "Tournament Match", stage: "Quarter-Finals", status: "Upcoming", winner: null },
  { id: "rc-match-1", tournamentId: "rematch-championship", teamA: "Iraq", teamB: "Qatar", scoreA: 2, scoreB: 1, date: "2026-05-20T19:00:00", type: "Friendly", stage: "Group Stage", status: "Finished", winner: "Iraq" }
];

// ---------------------------------------------------------------
// RematchDataStore Class
// ---------------------------------------------------------------
class RematchDataStore {
  constructor() {
    this.teams = {};
    this.tournaments = [];
    this.matches = [];
    this.activeTournamentId = null;
    this.backendUrl = "";
    this.isApiActive = false;
  }

  // -------------------------------------------------------
  // Init
  // -------------------------------------------------------
  async init() {
    this.backendUrl = localStorage.getItem("rematch_backend_url") || "";
    this.activeTournamentId = localStorage.getItem("rematch_active_tourney") || "arab-cup-2026";

    if (this.backendUrl) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 60000);
        const resp = await fetch(`${this.backendUrl}/api/teams`, { signal: controller.signal });
        clearTimeout(timeoutId);

        if (resp.ok) {
          this.isApiActive = true;
          await this._loadFromApi();
          return true;
        }
      } catch (e) {
        console.warn("Backend unavailable, falling back to local:", e.message);
      }
    }

    this.isApiActive = false;
    this._loadFromLocalOrDefaults();
    return false;
  }

  async _loadFromApi() {
    try {
      const [teamsResp, tourneysResp, matchesResp] = await Promise.all([
        fetch(`${this.backendUrl}/api/teams`, { cache: 'no-store' }),
        fetch(`${this.backendUrl}/api/tournaments`, { cache: 'no-store' }),
        fetch(`${this.backendUrl}/api/matches`, { cache: 'no-store' })
      ]);
      const teamsArr = await teamsResp.json();
      // Convert array back to object keyed by id
      this.teams = {};
      teamsArr.forEach(t => { this.teams[t.id || t.nameEn] = t; });
      this.tournaments = tourneysResp.ok ? await tourneysResp.json() : defaultTournaments;
      this.matches = matchesResp.ok ? await matchesResp.json() : defaultMatches;
    } catch (e) {
      console.error("Failed to load from API:", e);
      this._loadFromLocalOrDefaults();
    }
  }

  _loadFromLocalOrDefaults() {
    try {
      const raw = localStorage.getItem("rematch_data");
      if (raw) {
        const saved = JSON.parse(raw);
        this.teams = saved.teams || JSON.parse(JSON.stringify(defaultTeams));
        this.tournaments = saved.tournaments || JSON.parse(JSON.stringify(defaultTournaments));
        this.matches = saved.matches || JSON.parse(JSON.stringify(defaultMatches));
        return;
      }
    } catch (e) { /* ignore */ }
    this.teams = JSON.parse(JSON.stringify(defaultTeams));
    this.tournaments = JSON.parse(JSON.stringify(defaultTournaments));
    this.matches = JSON.parse(JSON.stringify(defaultMatches));
  }

  saveLocalBackup() {
    try {
      localStorage.setItem("rematch_data", JSON.stringify({
        teams: this.teams,
        tournaments: this.tournaments,
        matches: this.matches
      }));
    } catch (e) {
      // Likely QuotaExceededError — flag images too large
      console.error("localStorage save failed:", e);
      // Try saving without squad flag images as fallback
      try {
        const lightTeams = {};
        Object.keys(this.teams).forEach(k => {
          lightTeams[k] = { ...this.teams[k], flag: this.teams[k].flag && this.teams[k].flag.startsWith("<svg") ? this.teams[k].flag : "" };
        });
        localStorage.setItem("rematch_data", JSON.stringify({
          teams: lightTeams,
          tournaments: this.tournaments,
          matches: this.matches
        }));
        console.warn("Saved without large flag images due to storage quota.");
      } catch (e2) {
        console.error("All localStorage save attempts failed:", e2);
      }
    }
  }

  // -------------------------------------------------------
  // Active Tournament
  // -------------------------------------------------------
  getActiveTournament() {
    return this.tournaments.find(t => t.id === this.activeTournamentId) || this.tournaments[0] || null;
  }

  async setActiveTournament(id) {
    this.activeTournamentId = id;
    localStorage.setItem("rematch_active_tourney", id);
  }

  // -------------------------------------------------------
  // Matches
  // -------------------------------------------------------
  getMatches(tournamentId, filter = "all") {
    let list = this.matches.filter(m => m.tournamentId === tournamentId);
    if (filter === "matches") list = list.filter(m => m.type === "Tournament Match");
    if (filter === "friendlies") list = list.filter(m => m.type === "Friendly");
    return list.sort((a, b) => new Date(a.date) - new Date(b.date));
  }

  async addMatch(match) {
    this.matches.push(match);
    this.saveLocalBackup();
    if (this.isApiActive) {
      try {
        await fetch(`${this.backendUrl}/api/matches`, {
          method: "POST", headers: { "Content-Type": "application/json" },
          body: JSON.stringify(match)
        });
      } catch (e) { console.error("API addMatch failed:", e); }
    }
  }

  async updateMatch(match) {
    const idx = this.matches.findIndex(m => m.id === match.id);
    if (idx !== -1) this.matches[idx] = match;
    this.saveLocalBackup();
    if (this.isApiActive) {
      try {
        await fetch(`${this.backendUrl}/api/matches/${match.id}`, {
          method: "PUT", headers: { "Content-Type": "application/json" },
          body: JSON.stringify(match)
        });
      } catch (e) { console.error("API updateMatch failed:", e); }
    }
  }

  async deleteMatch(id) {
    this.matches = this.matches.filter(m => m.id !== id);
    this.saveLocalBackup();
    if (this.isApiActive) {
      try {
        await fetch(`${this.backendUrl}/api/matches/${id}`, { method: "DELETE" });
      } catch (e) { console.error("API deleteMatch failed:", e); }
    }
  }

  // -------------------------------------------------------
  // Tournaments
  // -------------------------------------------------------
  async addTournament(tournament) {
    this.tournaments.push(tournament);
    this.saveLocalBackup();
    if (this.isApiActive) {
      try {
        await fetch(`${this.backendUrl}/api/tournaments`, {
          method: "POST", headers: { "Content-Type": "application/json" },
          body: JSON.stringify(tournament)
        });
      } catch (e) { console.error("API addTournament failed:", e); }
    }
  }

  async deleteTournament(id) {
    this.tournaments = this.tournaments.filter(t => t.id !== id);
    this.matches = this.matches.filter(m => m.tournamentId !== id);
    if (this.activeTournamentId === id) {
      this.activeTournamentId = this.tournaments[0]?.id || null;
      localStorage.setItem("rematch_active_tourney", this.activeTournamentId || "");
    }
    this.saveLocalBackup();
    if (this.isApiActive) {
      try {
        await fetch(`${this.backendUrl}/api/tournaments/${id}`, { method: "DELETE" });
      } catch (e) { console.error("API deleteTournament failed:", e); }
    }
  }

  // -------------------------------------------------------
  // Teams CRUD
  // -------------------------------------------------------
  async addTeam(teamId, teamData) {
    this.teams[teamId] = { nameEn: teamData.nameEn, nameAr: teamData.nameAr, flag: teamData.flag || "", squad: [] };
    this.saveLocalBackup();
    if (this.isApiActive) {
      try {
        await fetch(`${this.backendUrl}/api/teams`, {
          method: "POST", headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: teamId, ...this.teams[teamId] })
        });
      } catch (e) { console.error("API addTeam failed:", e); }
    }
  }

  async updateTeam(teamId, updates) {
    if (!this.teams[teamId]) return;
    Object.assign(this.teams[teamId], updates);
    this.saveLocalBackup();
    if (this.isApiActive) {
      try {
        await fetch(`${this.backendUrl}/api/teams/${encodeURIComponent(teamId)}`, {
          method: "PUT", headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updates)
        });
      } catch (e) { console.error("API updateTeam failed:", e); }
    }
  }

  async deleteTeam(teamId) {
    delete this.teams[teamId];
    // Replace references in matches with TBD
    this.matches.forEach(m => {
      if (m.teamA === teamId) m.teamA = "TBD";
      if (m.teamB === teamId) m.teamB = "TBD";
    });
    this.saveLocalBackup();
    if (this.isApiActive) {
      try {
        await fetch(`${this.backendUrl}/api/teams/${encodeURIComponent(teamId)}`, { method: "DELETE" });
      } catch (e) { console.error("API deleteTeam failed:", e); }
    }
  }

  // -------------------------------------------------------
  // Squad / Players
  // -------------------------------------------------------
  async addPlayer(teamId, player) {
    const team = this.teams[teamId];
    if (!team) return;
    const newPlayer = { id: "player-" + Date.now(), name: player.name, position: player.position };
    team.squad.push(newPlayer);
    this.saveLocalBackup();
    if (this.isApiActive) {
      try {
        await fetch(`${this.backendUrl}/api/teams/${encodeURIComponent(teamId)}/players`, {
          method: "POST", headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newPlayer)
        });
      } catch (e) { console.error("API addPlayer failed:", e); }
    }
    return newPlayer;
  }

  async updatePlayer(teamId, playerId, updates) {
    const team = this.teams[teamId];
    if (!team) return;
    const player = team.squad.find(p => p.id === playerId);
    if (!player) return;
    Object.assign(player, updates);
    this.saveLocalBackup();
    if (this.isApiActive) {
      try {
        await fetch(`${this.backendUrl}/api/teams/${encodeURIComponent(teamId)}/players/${encodeURIComponent(playerId)}`, {
          method: "PUT", headers: { "Content-Type": "application/json" },
          body: JSON.stringify(player)
        });
      } catch (e) { console.error("API updatePlayer failed:", e); }
    }
  }

  async deletePlayer(teamId, playerId) {
    const team = this.teams[teamId];
    if (!team) return;
    team.squad = team.squad.filter(p => p.id !== playerId);
    this.saveLocalBackup();
    if (this.isApiActive) {
      try {
        await fetch(`${this.backendUrl}/api/teams/${encodeURIComponent(teamId)}/players/${encodeURIComponent(playerId)}`, { method: "DELETE" });
      } catch (e) { console.error("API deletePlayer failed:", e); }
    }
  }

  // -------------------------------------------------------
  // Standings Calculator
  // -------------------------------------------------------
  calculateStandings(tournamentId) {
    const tournament = this.tournaments.find(t => t.id === tournamentId);
    if (!tournament) return [];

    // Initialize table for all teams (ensure they appear even with no matches)
    const table = {};
    Object.keys(this.teams).forEach(teamId => {
      table[teamId] = {
        name: teamId,
        played: 0,
        won: 0,
        drawn: 0,
        lost: 0,
        goalsFor: 0,
        goalsAgainst: 0,
        goalDiff: 0,
        points: 0
      };
    });

    // Consider all finished matches for this tournament (any stage)
    const finishedMatches = this.matches.filter(
      m => m.tournamentId === tournamentId && m.status === "Finished"
    );

    finishedMatches.forEach(m => {
      if (m.teamA === "TBD" || m.teamB === "TBD") return;
      const a = table[m.teamA];
      const b = table[m.teamB];
      if (!a || !b) return;
      a.played++;
      b.played++;
      a.goalsFor += m.scoreA || 0;
      a.goalsAgainst += m.scoreB || 0;
      b.goalsFor += m.scoreB || 0;
      b.goalsAgainst += m.scoreA || 0;

      if (m.winner === m.teamA) {
        a.won++; a.points += tournament.ptsWin;
        b.lost++; b.points += tournament.ptsLoss;
      } else if (m.winner === m.teamB) {
        b.won++; b.points += tournament.ptsWin;
        a.lost++; a.points += tournament.ptsLoss;
      } else {
        a.drawn++; a.points += tournament.ptsDraw;
        b.drawn++; b.points += tournament.ptsDraw;
      }
    });

    // Compute goal difference and sort standings
    return Object.values(table)
      .map(e => ({ ...e, goalDiff: e.goalsFor - e.goalsAgainst }))
      .sort((a, b) => b.points - a.points || b.goalDiff - a.goalDiff || b.goalsFor - a.goalsFor);
  }

  // -------------------------------------------------------
  // Backend URL Management
  // -------------------------------------------------------
  async setBackendUrl(url) {
    this.backendUrl = url.trim();
    localStorage.setItem("rematch_backend_url", this.backendUrl);
    if (!this.backendUrl) { this.isApiActive = false; return false; }
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 60000);
      const resp = await fetch(`${this.backendUrl}/api/teams`, { signal: controller.signal });
      clearTimeout(timeoutId);
      if (resp.ok) {
        this.isApiActive = true;
        await this._loadFromApi();
        return true;
      }
    } catch (e) { /* offline */ }
    this.isApiActive = false;
    return false;
  }

  // -------------------------------------------------------
  // Reset to Defaults
  // -------------------------------------------------------
  async resetToDefaults() {
    this.teams = JSON.parse(JSON.stringify(defaultTeams));
    this.tournaments = JSON.parse(JSON.stringify(defaultTournaments));
    this.matches = JSON.parse(JSON.stringify(defaultMatches));
    this.activeTournamentId = "arab-cup-2026";
    localStorage.setItem("rematch_active_tourney", "arab-cup-2026");
    this.saveLocalBackup();
  }
}

window.rematchStore = new RematchDataStore();
