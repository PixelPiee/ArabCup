const defaultTeams = {
  "Yemen": {
    nameEn: "Yemen",
    nameAr: "اليمن",
    flag: `<svg viewBox="0 0 9 6" xmlns="http://www.w3.org/2000/svg"><rect width="9" height="2" fill="#CE1126"/><rect y="2" width="9" height="2" fill="#FFFFFF"/><rect y="4" width="9" height="2" fill="#000000"/></svg>`
  },
  "Palestine": {
    nameEn: "Palestine",
    nameAr: "فلسطين",
    flag: `<svg viewBox="0 0 12 6" xmlns="http://www.w3.org/2000/svg"><rect width="12" height="2" fill="#000000"/><rect y="2" width="12" height="2" fill="#FFFFFF"/><rect y="4" width="12" height="2" fill="#007A3D"/><polygon points="0,0 4,3 0,6" fill="#E4312B"/></svg>`
  },
  "Egypt": {
    nameEn: "Egypt",
    nameAr: "مصر",
    flag: `<svg viewBox="0 0 9 6" xmlns="http://www.w3.org/2000/svg"><rect width="9" height="2" fill="#C8102E"/><rect y="2" width="9" height="2" fill="#FFFFFF"/><rect y="4" width="9" height="2" fill="#000000"/><polygon points="4.5,2.5 4.3,2.8 4.5,3.1 4.7,2.8" fill="#C09300"/><circle cx="4.5" cy="2.8" r="0.15" fill="#C09300"/></svg>`
  },
  "Saudi Arabia": {
    nameEn: "Saudi Arabia",
    nameAr: "السعودية",
    flag: `<svg viewBox="0 0 3 2" xmlns="http://www.w3.org/2000/svg"><rect width="3" height="2" fill="#006C35"/><line x1="0.6" y1="1.4" x2="2.4" y2="1.4" stroke="#FFFFFF" stroke-width="0.1"/><path d="M 0.8 1.1 Q 1.5 0.7 2.2 1.1" stroke="#FFFFFF" stroke-width="0.04" fill="none"/><text x="1.5" y="0.8" font-size="0.25" fill="#FFFFFF" text-anchor="middle" font-family="sans-serif">لا إله إلا الله</text></svg>`
  },
  "Morocco": {
    nameEn: "Morocco",
    nameAr: "المغرب",
    flag: `<svg viewBox="0 0 3 2" xmlns="http://www.w3.org/2000/svg"><rect width="3" height="2" fill="#C1272D"/><polygon points="1.5,0.6 1.6,0.9 1.9,0.9 1.65,1.1 1.75,1.4 1.5,1.2 1.25,1.4 1.35,1.1 1.1,0.9 1.4,0.9" stroke="#006233" stroke-width="0.06" fill="none"/></svg>`
  },
  "Algeria": {
    nameEn: "Algeria",
    nameAr: "الجزائر",
    flag: `<svg viewBox="0 0 3 2" xmlns="http://www.w3.org/2000/svg"><rect width="1.5" height="2" fill="#006233"/><rect x="1.5" width="1.5" height="2" fill="#FFFFFF"/><path d="M1.7,0.7 A0.3,0.3 0 1,0 1.7,1.3 A0.22,0.22 0 1,1 1.74,1.23" fill="#D21034"/><polygon points="1.75,0.9 1.7,1.05 1.85,0.95 1.65,0.95 1.8,1.05" fill="#D21034"/></svg>`
  },
  "Tunisia": {
    nameEn: "Tunisia",
    nameAr: "تونس",
    flag: `<svg viewBox="0 0 3 2" xmlns="http://www.w3.org/2000/svg"><rect width="3" height="2" fill="#E01A22"/><circle cx="1.5" cy="1.0" r="0.5" fill="#FFFFFF"/><path d="M1.6,0.75 A0.25,0.25 0 1,0 1.6,1.25 A0.2,0.2 0 1,1 1.63,1.2" fill="#E01A22"/><polygon points="1.62,0.9 1.58,1.05 1.72,0.95 1.52,0.95 1.68,1.05" fill="#E01A22"/></svg>`
  },
  "Iraq": {
    nameEn: "Iraq",
    nameAr: "العراق",
    flag: `<svg viewBox="0 0 9 6" xmlns="http://www.w3.org/2000/svg"><rect width="9" height="2" fill="#DA121A"/><rect y="2" width="9" height="2" fill="#FFFFFF"/><rect y="4" width="9" height="2" fill="#000000"/><text x="4.5" y="3.3" font-size="0.45" fill="#007A3D" text-anchor="middle" font-family="sans-serif" font-weight="bold">الله أكبر</text></svg>`
  },
  "Qatar": {
    nameEn: "Qatar",
    nameAr: "قطر",
    flag: `<svg viewBox="0 0 22 9" xmlns="http://www.w3.org/2000/svg"><rect width="22" height="9" fill="#8D1B3D"/><polygon points="0,0 6,0 8,0.5 6,1 8,1.5 6,2 8,2.5 6,3 8,3.5 6,4 8,4.5 6,5 8,5.5 6,6 8,6.5 6,7 8,7.5 6,8 8,8.5 6,9 0,9" fill="#FFFFFF"/></svg>`
  },
  "UAE": {
    nameEn: "UAE",
    nameAr: "الإمارات",
    flag: `<svg viewBox="0 0 12 6" xmlns="http://www.w3.org/2000/svg"><rect x="3" width="9" height="2" fill="#00732F"/><rect x="3" y="2" width="9" height="2" fill="#FFFFFF"/><rect x="3" y="4" width="9" height="2" fill="#000000"/><rect width="3" height="6" fill="#FF0000"/></svg>`
  },
  "Jordan": {
    nameEn: "Jordan",
    nameAr: "الأردن",
    flag: `<svg viewBox="0 0 12 6" xmlns="http://www.w3.org/2000/svg"><rect width="12" height="2" fill="#000000"/><rect y="2" width="12" height="2" fill="#FFFFFF"/><rect y="4" width="12" height="2" fill="#007A3D"/><polygon points="0,0 6,3 0,6" fill="#E4312B"/><polygon points="2,3 2.2,3.3 1.9,3.1 1.7,3.3 1.8,3.0 1.5,2.8 1.9,2.8 2,2.5 2.1,2.8 2.5,2.8" fill="#FFFFFF"/></svg>`
  },
  "Syria": {
    nameEn: "Syria",
    nameAr: "سوريا",
    flag: `<svg viewBox="0 0 9 6" xmlns="http://www.w3.org/2000/svg"><rect width="9" height="2" fill="#E31B23"/><rect y="2" width="9" height="2" fill="#FFFFFF"/><rect y="4" width="9" height="2" fill="#000000"/><polygon points="3,3 3.15,3.35 2.85,3.15 2.55,3.35 2.7,3 2.4,2.8 2.8,2.8 3,2.5 3.2,2.8 3.6,2.8" fill="#007A3D"/><polygon points="6,3 6.15,3.35 5.85,3.15 5.55,3.35 5.7,3 5.4,2.8 5.8,2.8 6,2.5 6.2,2.8 6.6,2.8" fill="#007A3D"/></svg>`
  }
};

const defaultTournaments = [
  {
    id: "arab-cup-2026",
    nameEn: "Arab Cup 2026",
    nameAr: "كأس العرب 2026",
    ptsWin: 3,
    ptsDraw: 1,
    ptsLoss: 0
  },
  {
    id: "rematch-championship",
    nameEn: "Rematch Championship",
    nameAr: "بطولة ريماتش الودية",
    ptsWin: 2,
    ptsDraw: 1,
    ptsLoss: 0
  }
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

class RematchDataStore {
  constructor() {
    this.teams = defaultTeams;
    this.tournaments = defaultTournaments;
    this.matches = defaultMatches;
    this.activeTournamentId = "arab-cup-2026";
    this.backendUrl = localStorage.getItem("rematch_backend_url") || "";
    this.isApiActive = false;
  }

  async init() {
    // Try to load from API backend if URL is set
    if (this.backendUrl) {
      try {
        const response = await fetch(`${this.backendUrl}/api/data`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
        });
        if (response.ok) {
          const data = await response.json();
          this.tournaments = data.tournaments;
          this.matches = data.matches;
          this.isApiActive = true;
          this.activeTournamentId = localStorage.getItem("rematch_active_id") || (this.tournaments[0] ? this.tournaments[0].id : "");
          this.saveLocalBackup(); // Cache locally
          return true;
        }
      } catch (e) {
        console.warn("Backend API unreachable. Falling back to local cache.", e);
      }
    }
    
    // Offline / Fallback load
    this.isApiActive = false;
    this.loadFromLocalBackup();
    return false;
  }

  loadFromLocalBackup() {
    try {
      const storedTournaments = localStorage.getItem("rematch_tournaments");
      const storedMatches = localStorage.getItem("rematch_matches");
      const storedActiveId = localStorage.getItem("rematch_active_id");

      this.tournaments = storedTournaments ? JSON.parse(storedTournaments) : defaultTournaments;
      this.matches = storedMatches ? JSON.parse(storedMatches) : defaultMatches;
      this.activeTournamentId = storedActiveId || (this.tournaments[0] ? this.tournaments[0].id : "");
    } catch (e) {
      this.tournaments = defaultTournaments;
      this.matches = defaultMatches;
      this.activeTournamentId = "arab-cup-2026";
    }
  }

  saveLocalBackup() {
    try {
      localStorage.setItem("rematch_tournaments", JSON.stringify(this.tournaments));
      localStorage.setItem("rematch_matches", JSON.stringify(this.matches));
      localStorage.setItem("rematch_active_id", this.activeTournamentId);
    } catch (e) {
      console.error("Local storage backup save failed.", e);
    }
  }

 export async function getTeams() {
  if (isApiActive) {
    try {
      const resp = await fetch(`${apiBaseUrl}/api/data`);
      const db = await resp.json();
      return db.teams || {};
    } catch (e) {
      console.warn('API fetch failed, falling back to localStorage', e);
      return JSON.parse(localStorage.getItem('rematchData')).teams || {};
    }
  } else {
    return JSON.parse(localStorage.getItem('rematchData')).teams || {};
  }
}

export async function addTeam(team) {
  if (isApiActive) {
    const resp = await fetch(`${apiBaseUrl}/api/teams`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(team),
    });
    if (!resp.ok) throw new Error('Failed to add team');
  } else {
    const data = JSON.parse(localStorage.getItem('rematchData'));
    data.teams[team.id] = { nameEn: team.nameEn, nameAr: team.nameAr, flagUrl: team.flagUrl };
    localStorage.setItem('rematchData', JSON.stringify(data));
  }
}

export async function deleteTeam(teamId) {
  if (isApiActive) {
    const resp = await fetch(`${apiBaseUrl}/api/teams/${teamId}`, { method: 'DELETE' });
    if (!resp.ok) throw new Error('Failed to delete team');
  } else {
    const data = JSON.parse(localStorage.getItem('rematchData'));
    delete data.teams[teamId];
    localStorage.setItem('rematchData', JSON.stringify(data));
  }
}

  async setBackendUrl(url) {
    // Strip trailing slashes
    this.backendUrl = url ? url.replace(/\/+$/, "") : "";
    localStorage.setItem("rematch_backend_url", this.backendUrl);
    return await this.init();
  }

  async resetToDefaults() {
    if (this.isApiActive) {
      try {
        const res = await fetch(`${this.backendUrl}/api/reset`, { method: 'POST' });
        if (res.ok) {
          await this.init();
          return;
        }
      } catch (e) {
        console.error("API reset call failed, falling back to local reset.", e);
      }
    }
    
    this.tournaments = JSON.parse(JSON.stringify(defaultTournaments));
    this.matches = JSON.parse(JSON.stringify(defaultMatches));
    this.activeTournamentId = "arab-cup-2026";
    this.saveLocalBackup();
  }

  getActiveTournament() {
    return this.tournaments.find(t => t.id === this.activeTournamentId) || this.tournaments[0];
  }

  async setActiveTournament(id) {
    this.activeTournamentId = id;
    localStorage.setItem("rematch_active_id", id);
  }

  async addTournament(tournament) {
    this.tournaments.push(tournament);
    this.saveLocalBackup();

    if (this.isApiActive) {
      try {
        await fetch(`${this.backendUrl}/api/tournaments`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(tournament)
        });
      } catch (e) {
        console.error("API add tournament failed", e);
      }
    }
  }

  async deleteTournament(id) {
    this.tournaments = this.tournaments.filter(t => t.id !== id);
    this.matches = this.matches.filter(m => m.tournamentId !== id);
    if (this.activeTournamentId === id) {
      this.activeTournamentId = this.tournaments[0] ? this.tournaments[0].id : "";
    }
    this.saveLocalBackup();

    if (this.isApiActive) {
      try {
        await fetch(`${this.backendUrl}/api/tournaments/${id}`, { method: 'DELETE' });
      } catch (e) {
        console.error("API delete tournament failed", e);
      }
    }
  }

  getMatches(tournamentId, typeFilter = "all") {
    let list = this.matches.filter(m => m.tournamentId === tournamentId);
    if (typeFilter === "matches") {
      list = list.filter(m => m.type === "Tournament Match");
    } else if (typeFilter === "friendlies") {
      list = list.filter(m => m.type === "Friendly");
    }
    return list.sort((a, b) => new Date(a.date) - new Date(b.date));
  }

  async addMatch(match) {
    this.matches.push(match);
    this.saveLocalBackup();

    if (this.isApiActive) {
      try {
        await fetch(`${this.backendUrl}/api/matches`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(match)
        });
      } catch (e) {
        console.error("API add match failed", e);
      }
    }
  }

  async updateMatch(updatedMatch) {
    const idx = this.matches.findIndex(m => m.id === updatedMatch.id);
    if (idx !== -1) {
      this.matches[idx] = updatedMatch;
      this.saveLocalBackup();
    }

    if (this.isApiActive) {
      try {
        await fetch(`${this.backendUrl}/api/matches/${updatedMatch.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedMatch)
        });
      } catch (e) {
        console.error("API update match failed", e);
      }
    }
  }

  async deleteMatch(id) {
    this.matches = this.matches.filter(m => m.id !== id);
    this.saveLocalBackup();

    if (this.isApiActive) {
      try {
        await fetch(`${this.backendUrl}/api/matches/${id}`, { method: 'DELETE' });
      } catch (e) {
        console.error("API delete match failed", e);
      }
    }
  }

  calculateStandings(tournamentId) {
    const tournament = this.tournaments.find(t => t.id === tournamentId);
    if (!tournament) return [];

    const ptsWin = tournament.ptsWin ?? 3;
    const ptsDraw = tournament.ptsDraw ?? 1;
    const ptsLoss = tournament.ptsLoss ?? 0;

    const tMatches = this.matches.filter(m => 
      m.tournamentId === tournamentId && 
      m.type === "Tournament Match" && 
      m.stage === "Group Stage" &&
      m.status === "Finished"
    );

    const standings = {};

    const initializeTeam = (name) => {
      if (!standings[name]) {
        standings[name] = {
          name: name,
          played: 0,
          won: 0,
          drawn: 0,
          lost: 0,
          goalsFor: 0,
          goalsAgainst: 0,
          goalDiff: 0,
          points: 0
        };
      }
    };

    this.matches.filter(m => m.tournamentId === tournamentId).forEach(m => {
      if (m.teamA && m.teamA !== "TBD") initializeTeam(m.teamA);
      if (m.teamB && m.teamB !== "TBD") initializeTeam(m.teamB);
    });

    tMatches.forEach(m => {
      const teamA = m.teamA;
      const teamB = m.teamB;
      const sA = m.scoreA;
      const sB = m.scoreB;

      if (sA === null || sB === null) return;

      initializeTeam(teamA);
      initializeTeam(teamB);

      standings[teamA].played += 1;
      standings[teamB].played += 1;
      standings[teamA].goalsFor += sA;
      standings[teamA].goalsAgainst += sB;
      standings[teamB].goalsFor += sB;
      standings[teamB].goalsAgainst += sA;

      if (sA > sB) {
        standings[teamA].won += 1;
        standings[teamA].points += ptsWin;
        standings[teamB].lost += 1;
        standings[teamB].points += ptsLoss;
      } else if (sA < sB) {
        standings[teamB].won += 1;
        standings[teamB].points += ptsWin;
        standings[teamA].lost += 1;
        standings[teamA].points += ptsLoss;
      } else {
        standings[teamA].drawn += 1;
        standings[teamA].points += ptsDraw;
        standings[teamB].drawn += 1;
        standings[teamB].points += ptsDraw;
      }
    });

    Object.values(standings).forEach(t => {
      t.goalDiff = t.goalsFor - t.goalsAgainst;
    });

    return Object.values(standings).sort((a, b) => {
      if (b.points !== a.points) return b.points - a.points;
      if (b.goalDiff !== a.goalDiff) return b.goalDiff - a.goalDiff;
      if (b.goalsFor !== a.goalsFor) return b.goalsFor - a.goalsFor;
      return a.name.localeCompare(b.name);
    });
  }
}

window.rematchStore = new RematchDataStore();
