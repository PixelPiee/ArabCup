document.addEventListener("DOMContentLoaded", async () => {
  const store = window.rematchStore;
  const translations = window.translations;

  // Initialize Data Store
  const apiConnected = await store.init();

  // Application State
  let currentLang = localStorage.getItem("rematch_lang") || "ar";
  let activeTab = "home";
  let matchFilter = "all";
  let isAdminAuthorized = sessionStorage.getItem("rematch_admin") === "true";
  let editingMatchId = null;

  // DOM Elements
  const htmlElement = document.documentElement;
  const btnLangToggle = document.getElementById("btn-lang-toggle");
  const btnAdminStatus = document.getElementById("btn-admin-status");
  const activeTourneyDropdown = document.getElementById("active-tournament-dropdown");
  
  // Navigation elements
  const tabButtons = document.querySelectorAll(".nav-tab");
  const tabPanels = document.querySelectorAll(".tab-panel");

  // Home view elements
  const statActiveTourney = document.getElementById("stat-active-tourney");
  const statTotalTourneys = document.getElementById("stat-total-tourneys");
  const statTotalMatches = document.getElementById("stat-total-matches");
  const listUpcomingDashboard = document.getElementById("dashboard-upcoming-list");
  const listResultsDashboard = document.getElementById("dashboard-results-list");

  // Matches view elements
  const listMatchesFull = document.getElementById("matches-full-list");
  const matchFilterButtons = document.querySelectorAll("#match-type-filters .filter-pill");

  // Standings view elements
  const tableStandingsBody = document.getElementById("standings-table-body");
  const containerStandingsPointsInfo = document.getElementById("standings-points-info");

  // Bracket view elements
  const containerBracket = document.getElementById("bracket-container");

  // Admin view elements
  const cardAdminLogin = document.getElementById("admin-login-card");
  const dashboardAdminControls = document.getElementById("admin-controls-dashboard");
  const inputAdminPasscode = document.getElementById("admin-passcode-input");
  const btnAdminLogin = document.getElementById("btn-admin-login");
  const btnAdminLogout = document.getElementById("btn-admin-logout");
  const errorAdminLogin = document.getElementById("admin-login-error");
  const btnResetData = document.getElementById("btn-reset-data");
  
  const formNewTournament = document.getElementById("form-new-tournament");
  const listAdminTournaments = document.getElementById("admin-tournaments-list");
  const listAdminMatches = document.getElementById("admin-matches-list");
  const btnTriggerAddMatch = document.getElementById("btn-trigger-add-match");

  // Backend configuration form
  const formBackendSettings = document.getElementById("form-backend-settings");
  const inputBackendUrl = document.getElementById("backend-url-input");

  // Modal elements
  const modalMatch = document.getElementById("match-modal");
  const formMatchEditor = document.getElementById("form-match-editor");
  const modalMatchTitle = document.getElementById("modal-match-title");
  const btnCloseModal = document.getElementById("btn-close-modal");
  const btnCancelModal = document.getElementById("btn-cancel-modal");
  
  const matchFormId = document.getElementById("edit-match-id");
  const matchFormTeamA = document.getElementById("match-form-team-a");
  const matchFormTeamB = document.getElementById("match-form-team-b");
  const matchFormScoreA = document.getElementById("match-form-score-a");
  const matchFormScoreB = document.getElementById("match-form-score-b");
  const matchFormDate = document.getElementById("match-form-date");
  const matchFormType = document.getElementById("match-form-type");
  const matchFormStage = document.getElementById("match-form-stage");
  const matchFormStatus = document.getElementById("match-form-status");

  // Toast notifications
  const toastContainer = document.getElementById("toast-notification");
  const toastMessage = document.getElementById("toast-message");

  // Trigger connection feedback on load
  if (store.backendUrl) {
    if (apiConnected) {
      showToast(getTranslation("backendConnected"));
    } else {
      showToast(getTranslation("backendFallback"), true);
    }
  }

  // ==========================================
  // Helper Functions
  // ==========================================
  
  function getTranslation(key) {
    return translations[currentLang][key] || key;
  }

  function showToast(message, isError = false) {
    toastMessage.textContent = message;
    toastContainer.style.borderColor = isError ? "var(--danger)" : "var(--success)";
    toastContainer.style.borderLeftWidth = currentLang === 'ar' ? '1px' : '4px';
    toastContainer.style.borderRightWidth = currentLang === 'ar' ? '4px' : '1px';
    toastContainer.classList.add("show");
    
    setTimeout(() => {
      toastContainer.classList.remove("show");
    }, 3000);
  }

  function formatDate(dateString) {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    
    const options = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    };
    
    return date.toLocaleDateString(currentLang === "ar" ? "ar-EG" : "en-US", options);
  }

  function populateTeamSelectors() {
    const teams = store.teams;
    let options = `<option value="TBD">${getTranslation("tbd")}</option>`;
    
    Object.keys(teams).forEach(teamKey => {
      const team = teams[teamKey];
      const name = currentLang === "ar" ? team.nameAr : team.nameEn;
      options += `<option value="${teamKey}">${name}</option>`;
    });

    matchFormTeamA.innerHTML = options;
    matchFormTeamB.innerHTML = options;
  }

  // ==========================================
  // Localization System
  // ==========================================

  function updateLocalization() {
    htmlElement.setAttribute("lang", currentLang);
    htmlElement.setAttribute("dir", currentLang === "ar" ? "rtl" : "ltr");
    
    document.body.dir = currentLang === "ar" ? "rtl" : "ltr";
    
    btnLangToggle.textContent = currentLang === "ar" ? "EN" : "عربي";

    document.querySelectorAll("[data-i18n]").forEach(elem => {
      const key = elem.getAttribute("data-i18n");
      const translation = getTranslation(key);
      if (translation) {
        elem.textContent = translation;
      }
    });

    document.querySelectorAll("[data-i18n-placeholder]").forEach(elem => {
      const key = elem.getAttribute("data-i18n-placeholder");
      const translation = getTranslation(key);
      if (translation) {
        elem.setAttribute("placeholder", translation);
      }
    });
    
    inputBackendUrl.value = store.backendUrl || "";
    populateTeamSelectors();
  }

  function toggleLanguage() {
    currentLang = currentLang === "ar" ? "en" : "ar";
    localStorage.setItem("rematch_lang", currentLang);
    
    updateLocalization();
    renderAll();
  }

  // ==========================================
  // Admin Authorization Controls
  // ==========================================

  function updateAdminUIState() {
    if (isAdminAuthorized) {
      btnAdminStatus.classList.add("is-admin");
      cardAdminLogin.style.display = "none";
      dashboardAdminControls.style.display = "block";
    } else {
      btnAdminStatus.classList.remove("is-admin");
      cardAdminLogin.style.display = "block";
      dashboardAdminControls.style.display = "none";
    }
  }

  function handleAdminLogin() {
    const passcode = inputAdminPasscode.value.trim();
    if (passcode === "1234") {
      isAdminAuthorized = true;
      sessionStorage.setItem("rematch_admin", "true");
      inputAdminPasscode.value = "";
      errorAdminLogin.style.display = "none";
      updateAdminUIState();
      renderAdmin();
      showToast(currentLang === "ar" ? "تم الدخول بنجاح كمسؤول" : "Successfully logged in as administrator");
    } else {
      errorAdminLogin.style.display = "block";
      showToast(getTranslation("invalidPasscode"), true);
    }
  }

  function handleAdminLogout() {
    isAdminAuthorized = false;
    sessionStorage.removeItem("rematch_admin");
    updateAdminUIState();
    showToast(currentLang === "ar" ? "تم الخروج من وضع المسؤول" : "Exited Administrator Mode");
  }

  // ==========================================
  // Auto Progression for Knockout Brackets
  // ==========================================
  
  async function applyKnockoutProgression(match) {
    if (match.type !== "Tournament Match" || match.stage === "Group Stage") return;
    if (match.status !== "Finished" || !match.winner || match.winner === "Draw") return;

    const tMatches = store.matches.filter(m => m.tournamentId === match.tournamentId && m.type === "Tournament Match");
    
    const qfMatches = tMatches.filter(m => m.stage === "Quarter-Finals").sort((a,b) => new Date(a.date) - new Date(b.date));
    const sfMatches = tMatches.filter(m => m.stage === "Semi-Finals").sort((a,b) => new Date(a.date) - new Date(b.date));
    const finalMatches = tMatches.filter(m => m.stage === "Final");

    const updateTargetSlot = async (targetMatch, isTeamA, valueName) => {
      if (!targetMatch) return;
      if (isTeamA) {
        targetMatch.teamA = valueName;
      } else {
        targetMatch.teamB = valueName;
      }
      await store.updateMatch(targetMatch);
    };

    const qfIndex = qfMatches.findIndex(m => m.id === match.id);
    if (qfIndex !== -1) {
      if (qfIndex === 0) await updateTargetSlot(sfMatches[0], true, match.winner);
      if (qfIndex === 1) await updateTargetSlot(sfMatches[0], false, match.winner);
      if (qfIndex === 2) await updateTargetSlot(sfMatches[1], true, match.winner);
      if (qfIndex === 3) await updateTargetSlot(sfMatches[1], false, match.winner);
      return;
    }

    const sfIndex = sfMatches.findIndex(m => m.id === match.id);
    if (sfIndex !== -1) {
      if (sfIndex === 0) await updateTargetSlot(finalMatches[0], true, match.winner);
      if (sfIndex === 1) await updateTargetSlot(finalMatches[0], false, match.winner);
      return;
    }
  }

  // ==========================================
  // Render System
  // ==========================================

  function renderAll() {
    renderActiveTournamentSelector();
    renderStats();
    
    if (activeTab === "home") renderHome();
    else if (activeTab === "matches") renderMatches();
    else if (activeTab === "standings") renderStandings();
    else if (activeTab === "bracket") renderBracket();
    else if (activeTab === "admin") renderAdmin();
  }

  function renderActiveTournamentSelector() {
    const list = store.tournaments;
    let options = "";
    list.forEach(t => {
      const name = currentLang === "ar" ? t.nameAr : t.nameEn;
      const selected = t.id === store.activeTournamentId ? "selected" : "";
      options += `<option value="${t.id}" ${selected}>${name}</option>`;
    });
    activeTourneyDropdown.innerHTML = options;
  }

  function renderStats() {
    const active = store.getActiveTournament();
    if (active) {
      statActiveTourney.textContent = currentLang === "ar" ? active.nameAr : active.nameEn;
    } else {
      statActiveTourney.textContent = "-";
    }
    statTotalTourneys.textContent = store.tournaments.length;
    statTotalMatches.textContent = store.matches.filter(m => m.tournamentId === store.activeTournamentId).length;
  }

  function renderMatchCard(match) {
    const teamAObj = store.teams[match.teamA] || { nameEn: match.teamA, nameAr: match.teamA, flag: "" };
    const teamBObj = store.teams[match.teamB] || { nameEn: match.teamB, nameAr: match.teamB, flag: "" };

    const nameA = currentLang === "ar" ? teamAObj.nameAr : teamAObj.nameEn;
    const nameB = currentLang === "ar" ? teamBObj.nameAr : teamBObj.nameEn;

    const flagA = teamAObj.flag || `<div style="font-size:24px;">🏳️</div>`;
    const flagB = teamBObj.flag || `<div style="font-size:24px;">🏳️</div>`;

    const scoreA = match.scoreA !== null ? match.scoreA : "-";
    const scoreB = match.scoreB !== null ? match.scoreB : "-";
    
    const isFinished = match.status === "Finished";
    const isLive = match.status === "Live";
    
    let statusClass = "status-upcoming";
    let statusTextKey = "upcoming";
    
    if (isFinished) {
      statusClass = "status-finished";
      statusTextKey = "finished";
    } else if (isLive) {
      statusClass = "status-live";
      statusTextKey = "live";
    }

    const typeTag = match.type === "Friendly" ? `<div class="friendly-type-tag">${getTranslation("friendlyLabel")}</div>` : "";
    const stageTag = `<div class="match-stage-tag">${getTranslation(match.stage)}</div>`;

    let winnerA = "";
    let winnerB = "";
    if (isFinished && match.winner) {
      if (match.winner === match.teamA) {
        winnerA = `<div class="team-winner-badge">🏆 <span data-i18n="winner">${getTranslation("winner")}</span></div>`;
      } else if (match.winner === match.teamB) {
        winnerB = `<div class="team-winner-badge">🏆 <span data-i18n="winner">${getTranslation("winner")}</span></div>`;
      }
    }

    let cardClasses = "match-card";
    if (match.type === "Friendly") cardClasses += " is-friendly";
    if (isLive) cardClasses += " is-live";

    return `
      <div class="${cardClasses}">
        ${typeTag}
        ${stageTag}
        
        <div class="match-team team-a">
          <div class="team-flag">${flagA}</div>
          <div class="team-name">${nameA}</div>
          ${winnerA}
        </div>
        
        <div class="match-center">
          <div class="match-score-box">
            <div class="score-num">${scoreA}</div>
            <div class="vs-badge">${getTranslation("vs")}</div>
            <div class="score-num">${scoreB}</div>
          </div>
          <div class="match-time">${formatDate(match.date)}</div>
          <div class="match-status-badge ${statusClass}">${getTranslation(statusTextKey)}</div>
        </div>
        
        <div class="match-team team-b">
          <div class="team-flag">${flagB}</div>
          <div class="team-name">${nameB}</div>
          ${winnerB}
        </div>
      </div>
    `;
  }

  function renderHome() {
    const activeId = store.activeTournamentId;
    const matches = store.getMatches(activeId);

    const upcoming = matches.filter(m => m.status !== "Finished").slice(0, 3);
    const results = matches.filter(m => m.status === "Finished").reverse().slice(0, 3);

    if (upcoming.length === 0) {
      listUpcomingDashboard.innerHTML = `<p class="text-center" style="color:var(--text-muted); padding:20px;">${getTranslation("noMatches")}</p>`;
    } else {
      listUpcomingDashboard.innerHTML = upcoming.map(m => renderMatchCard(m)).join("");
    }

    if (results.length === 0) {
      listResultsDashboard.innerHTML = `<p class="text-center" style="color:var(--text-muted); padding:20px;">${getTranslation("noMatches")}</p>`;
    } else {
      listResultsDashboard.innerHTML = results.map(m => renderMatchCard(m)).join("");
    }
  }

  function renderMatches() {
    const activeId = store.activeTournamentId;
    const matches = store.getMatches(activeId, matchFilter);

    if (matches.length === 0) {
      listMatchesFull.innerHTML = `<p class="text-center" style="color:var(--text-muted); padding:40px;">${getTranslation("noMatches")}</p>`;
    } else {
      listMatchesFull.innerHTML = matches.map(m => renderMatchCard(m)).join("");
    }
  }

  function renderStandings() {
    const active = store.getActiveTournament();
    if (!active) {
      tableStandingsBody.innerHTML = "";
      return;
    }

    containerStandingsPointsInfo.innerHTML = `
      <span>${getTranslation("pointsSystem")}: </span>
      <span><strong>${active.ptsWin}</strong> ${getTranslation("ptsPerWin")}</span> &bull; 
      <span><strong>${active.ptsDraw}</strong> ${getTranslation("ptsPerDraw")}</span> &bull; 
      <span><strong>${active.ptsLoss}</strong> ${getTranslation("ptsPerLoss")}</span>
    `;

    const standings = store.calculateStandings(active.id);

    if (standings.length === 0) {
      tableStandingsBody.innerHTML = `
        <tr>
          <td colspan="10" class="text-center" style="color:var(--text-muted); padding:40px;">
            ${getTranslation("noMatches")}
          </td>
        </tr>
      `;
      return;
    }

    let rows = "";
    standings.forEach((teamEntry, idx) => {
      const teamData = store.teams[teamEntry.name] || { nameEn: teamEntry.name, nameAr: teamEntry.name, flag: "" };
      const teamName = currentLang === "ar" ? teamData.nameAr : teamData.nameEn;
      const flagSvg = teamData.flag || `🏳️`;

      rows += `
        <tr>
          <td><strong>${idx + 1}</strong></td>
          <td>
            <div class="table-team-cell">
              <div class="team-flag">${flagSvg}</div>
              <span>${teamName}</span>
            </div>
          </td>
          <td style="text-align: center;">${teamEntry.played}</td>
          <td style="text-align: center; color: var(--success);">${teamEntry.won}</td>
          <td style="text-align: center; color: var(--warning);">${teamEntry.drawn}</td>
          <td style="text-align: center; color: var(--danger);">${teamEntry.lost}</td>
          <td style="text-align: center;">${teamEntry.goalsFor}</td>
          <td style="text-align: center;">${teamEntry.goalsAgainst}</td>
          <td style="text-align: center; font-weight:600;">${teamEntry.goalDiff > 0 ? '+' : ''}${teamEntry.goalDiff}</td>
          <td style="text-align: center;" class="td-highlight">${teamEntry.points}</td>
        </tr>
      `;
    });

    tableStandingsBody.innerHTML = rows;
  }

  function renderBracket() {
    const activeId = store.activeTournamentId;
    const tMatches = store.matches.filter(m => m.tournamentId === activeId && m.type === "Tournament Match");

    const qfs = tMatches.filter(m => m.stage === "Quarter-Finals").sort((a,b) => new Date(a.date) - new Date(b.date));
    const sfs = tMatches.filter(m => m.stage === "Semi-Finals").sort((a,b) => new Date(a.date) - new Date(b.date));
    const finals = tMatches.filter(m => m.stage === "Final");

    const getMatchDetails = (matchArr, index, stageName) => {
      if (matchArr[index]) return matchArr[index];
      return {
        id: `placeholder-${stageName}-${index}`,
        teamA: "TBD",
        teamB: "TBD",
        scoreA: null,
        scoreB: null,
        status: "Upcoming",
        winner: null
      };
    };

    const renderBracketNode = (match) => {
      const tA = match.teamA;
      const tB = match.teamB;

      const teamAObj = store.teams[tA] || { nameEn: tA, nameAr: tA, flag: "" };
      const teamBObj = store.teams[tB] || { nameEn: tB, nameAr: tB, flag: "" };

      const nameA = tA === "TBD" ? getTranslation("tbd") : (currentLang === "ar" ? teamAObj.nameAr : teamAObj.nameEn);
      const nameB = tB === "TBD" ? getTranslation("tbd") : (currentLang === "ar" ? teamBObj.nameAr : teamBObj.nameEn);

      const flagA = tA === "TBD" ? "🏳️" : teamAObj.flag;
      const flagB = tB === "TBD" ? "🏳️" : teamBObj.flag;

      const scoreA = match.scoreA !== null ? match.scoreA : "";
      const scoreB = match.scoreB !== null ? match.scoreB : "";

      const hasWinner = match.status === "Finished" && match.winner;
      const isWinnerA = hasWinner && match.winner === tA;
      const isWinnerB = hasWinner && match.winner === tB;

      return `
        <div class="bracket-matchup ${hasWinner ? 'has-winner' : ''}">
          <div class="bracket-team-row ${isWinnerA ? 'is-winner' : (hasWinner ? 'is-loser' : '')}">
            <div class="bracket-team-name">
              <div class="team-flag" style="display:inline-block; width:20px; height:13px; margin-right:6px; vertical-align:middle;">${flagA}</div>
              <span>${nameA}</span>
            </div>
            <div class="bracket-team-score">${scoreA}</div>
          </div>
          <div class="bracket-team-row ${isWinnerB ? 'is-winner' : (hasWinner ? 'is-loser' : '')}">
            <div class="bracket-team-name">
              <div class="team-flag" style="display:inline-block; width:20px; height:13px; margin-right:6px; vertical-align:middle;">${flagB}</div>
              <span>${nameB}</span>
            </div>
            <div class="bracket-team-score">${scoreB}</div>
          </div>
        </div>
      `;
    };

    let championName = getTranslation("tbd");
    let championFlag = "🏆";
    const finalMatch = finals[0];
    if (finalMatch && finalMatch.status === "Finished" && finalMatch.winner) {
      const champ = finalMatch.winner;
      const champObj = store.teams[champ];
      if (champObj) {
        championName = currentLang === "ar" ? champObj.nameAr : champObj.nameEn;
        championFlag = champObj.flag;
      } else {
        championName = champ;
      }
    }

    const html = `
      <div class="bracket-round">
        <div class="bracket-round-title" data-i18n="quarterFinals">${getTranslation("quarterFinals")}</div>
        ${renderBracketNode(getMatchDetails(qfs, 0, "qf"))}
        ${renderBracketNode(getMatchDetails(qfs, 1, "qf"))}
        ${renderBracketNode(getMatchDetails(qfs, 2, "qf"))}
        ${renderBracketNode(getMatchDetails(qfs, 3, "qf"))}
      </div>

      <div class="bracket-round">
        <div class="bracket-round-title" data-i18n="semiFinals">${getTranslation("semiFinals")}</div>
        ${renderBracketNode(getMatchDetails(sfs, 0, "sf"))}
        ${renderBracketNode(getMatchDetails(sfs, 1, "sf"))}
      </div>

      <div class="bracket-round">
        <div class="bracket-round-title" data-i18n="final">${getTranslation("final")}</div>
        ${renderBracketNode(getMatchDetails(finals, 0, "final"))}
      </div>

      <div class="champion-podium">
        <div class="trophy-glow">🏆</div>
        <div class="champion-card">
          <div style="font-size: 11px; font-weight:700; color:var(--warning); text-transform:uppercase;" data-i18n="champion">${getTranslation("champion")}</div>
          <div class="team-flag" style="width:60px; height:40px; margin: 10px auto 4px;">${championFlag}</div>
          <div class="champion-name">${championName}</div>
        </div>
      </div>
    `;

    containerBracket.innerHTML = html;
  }

  function renderAdmin() {
    if (!isAdminAuthorized) return;

    const tourneys = store.tournaments;
    let tourneysHtml = "";
    tourneys.forEach(t => {
      const name = currentLang === "ar" ? t.nameAr : t.nameEn;
      const isDeleteDisabled = store.tournaments.length <= 1 ? "disabled" : "";

      tourneysHtml += `
        <div class="admin-list-item">
          <div class="item-details">
            <span class="item-title">${name}</span>
            <span class="item-subtitle">${t.ptsWin}/${t.ptsDraw}/${t.ptsLoss} Pts System</span>
          </div>
          <button class="btn btn-danger btn-small" onclick="window.rematchAdminActions.deleteTourney('${t.id}')" ${isDeleteDisabled}>🗑️</button>
        </div>
      `;
    });
    listAdminTournaments.innerHTML = tourneysHtml;

    const matches = store.getMatches(store.activeTournamentId);
    let matchesHtml = "";
    if (matches.length === 0) {
      matchesHtml = `<p class="text-center" style="color:var(--text-muted); padding:20px;">No matches found</p>`;
    } else {
      matches.forEach(m => {
        const teamAObj = store.teams[m.teamA] || { nameEn: m.teamA, nameAr: m.teamA };
        const teamBObj = store.teams[m.teamB] || { nameEn: m.teamB, nameAr: m.teamB };
        
        const nameA = currentLang === "ar" ? teamAObj.nameAr : teamAObj.nameEn;
        const nameB = currentLang === "ar" ? teamBObj.nameAr : teamBObj.nameEn;

        const scoreText = m.status === "Finished" ? `(${m.scoreA} - ${m.scoreB})` : `(VS)`;
        const stageLabel = getTranslation(m.stage);
        const typeLabel = m.type === "Friendly" ? `[${getTranslation("friendlyLabel")}] ` : "";

        matchesHtml += `
          <div class="admin-list-item">
            <div class="item-details">
              <span class="item-title">${typeLabel}${nameA} ${scoreText} ${nameB}</span>
              <span class="item-subtitle">${stageLabel} &bull; ${formatDate(m.date)}</span>
            </div>
            <div class="item-actions">
              <button class="btn btn-secondary btn-small" onclick="window.rematchAdminActions.openEditMatchModal('${m.id}')">✏️</button>
              <button class="btn btn-danger btn-small" onclick="window.rematchAdminActions.deleteMatch('${m.id}')">🗑️</button>
            </div>
          </div>
        `;
      });
    }
    listAdminMatches.innerHTML = matchesHtml;
  }

  // ==========================================
  // Global Actions for Dynamic Elements
  // ==========================================

  window.rematchAdminActions = {
    deleteTourney: async (id) => {
      if (confirm(currentLang === "ar" ? "هل أنت متأكد من حذف هذه البطولة وجميع مبارياتها؟" : "Are you sure you want to delete this tournament and all its matches?")) {
        await store.deleteTournament(id);
        renderAll();
        showToast(currentLang === "ar" ? "تم حذف البطولة بنجاح" : "Tournament deleted successfully");
      }
    },
    deleteMatch: async (id) => {
      if (confirm(currentLang === "ar" ? "هل أنت متأكد من حذف هذه المباراة؟" : "Are you sure you want to delete this match?")) {
        await store.deleteMatch(id);
        renderAll();
        showToast(currentLang === "ar" ? "تم حذف المباراة بنجاح" : "Match deleted successfully");
      }
    },
    openEditMatchModal: (id) => {
      const match = store.matches.find(m => m.id === id);
      if (!match) return;

      editingMatchId = id;
      modalMatchTitle.textContent = getTranslation("editMatch");
      
      matchFormId.value = match.id;
      matchFormTeamA.value = match.teamA;
      matchFormTeamB.value = match.teamB;
      matchFormScoreA.value = match.scoreA !== null ? match.scoreA : "";
      matchFormScoreB.value = match.scoreB !== null ? match.scoreB : "";
      
      if (match.date) {
        const d = new Date(match.date);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        const hours = String(d.getHours()).padStart(2, '0');
        const minutes = String(d.getMinutes()).padStart(2, '0');
        matchFormDate.value = `${year}-${month}-${day}T${hours}:${minutes}`;
      } else {
        matchFormDate.value = "";
      }

      matchFormType.value = match.type;
      matchFormStage.value = match.stage;
      matchFormStatus.value = match.status;

      modalMatch.classList.add("active");
    }
  };

  // ==========================================
  // Event Bindings
  // ==========================================

  tabButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const tab = btn.getAttribute("data-tab");
      
      tabButtons.forEach(b => b.classList.remove("active"));
      tabPanels.forEach(p => p.classList.remove("active"));
      
      btn.classList.add("active");
      document.getElementById(`panel-${tab}`).classList.add("active");
      
      activeTab = tab;
      renderAll();
    });
  });

  btnLangToggle.addEventListener("click", toggleLanguage);

  btnAdminStatus.addEventListener("click", () => {
    document.getElementById("tab-btn-admin").click();
  });

  btnAdminLogin.addEventListener("click", handleAdminLogin);
  inputAdminPasscode.addEventListener("keypress", (e) => {
    if (e.key === "Enter") handleAdminLogin();
  });

  btnAdminLogout.addEventListener("click", handleAdminLogout);

  btnResetData.addEventListener("click", async () => {
    if (confirm(currentLang === "ar" ? "هل تريد بالتأكيد مسح التعديلات والعودة للبيانات الافتراضية؟" : "Reset all edits to default mock data?")) {
      await store.resetToDefaults();
      renderAll();
      showToast(getTranslation("resetSuccess"));
    }
  });

  activeTourneyDropdown.addEventListener("change", async (e) => {
    await store.setActiveTournament(e.target.value);
    renderAll();
  });

  matchFilterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      matchFilterButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      matchFilter = btn.getAttribute("data-filter");
      renderMatches();
    });
  });

  // Backend settings URL form submit handler
  formBackendSettings.addEventListener("submit", async (e) => {
    e.preventDefault();
    const url = inputBackendUrl.value.trim();
    const connected = await store.setBackendUrl(url);
    if (url) {
      if (connected) {
        showToast(getTranslation("backendSaveSuccess"));
      } else {
        showToast(getTranslation("backendFallback"), true);
      }
    } else {
      showToast(currentLang === "ar" ? "تمت إزالة رابط خادم البيانات" : "Backend URL cleared");
    }
    renderAll();
  });

  formNewTournament.addEventListener("submit", async (e) => {
    e.preventDefault();
    const id = "tourney-" + Date.now();
    const nameEn = document.getElementById("tourney-name-en").value.trim();
    const nameAr = document.getElementById("tourney-name-ar").value.trim();
    const ptsWin = parseInt(document.getElementById("tourney-pts-win").value) || 0;
    const ptsDraw = parseInt(document.getElementById("tourney-pts-draw").value) || 0;
    const ptsLoss = parseInt(document.getElementById("tourney-pts-loss")?.value || 0);

    const newTourney = { id, nameEn, nameAr, ptsWin, ptsDraw, ptsLoss };
    await store.addTournament(newTourney);
    await store.setActiveTournament(id);

    formNewTournament.reset();
    
    renderAll();
    showToast(currentLang === "ar" ? "تم إنشاء البطولة بنجاح" : "Tournament created successfully");
  });

  btnTriggerAddMatch.addEventListener("click", () => {
    editingMatchId = null;
    formMatchEditor.reset();
    matchFormId.value = "";
    
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    matchFormDate.value = `${year}-${month}-${day}T${hours}:${minutes}`;

    modalMatchTitle.textContent = getTranslation("addNewMatch");
    modalMatch.classList.add("active");
  });

  btnCloseModal.addEventListener("click", () => modalMatch.classList.remove("active"));
  btnCancelModal.addEventListener("click", () => modalMatch.classList.remove("active"));
  
  window.addEventListener("click", (e) => {
    if (e.target === modalMatch) {
      modalMatch.classList.remove("active");
    }
  });

  formMatchEditor.addEventListener("submit", async (e) => {
    e.preventDefault();

    const teamA = matchFormTeamA.value;
    const teamB = matchFormTeamB.value;
    
    if (teamA === teamB && teamA !== "TBD") {
      showToast(currentLang === "ar" ? "يجب اختيار فريقين مختلفين" : "Teams must be different", true);
      return;
    }

    const sA = matchFormScoreA.value;
    const sB = matchFormScoreB.value;
    const scoreA = sA !== "" ? parseInt(sA) : null;
    const scoreB = sB !== "" ? parseInt(sB) : null;
    const status = matchFormStatus.value;
    const type = matchFormType.value;
    const stage = matchFormStage.value;
    const date = matchFormDate.value;

    let winner = null;
    if (status === "Finished" && scoreA !== null && scoreB !== null) {
      if (scoreA > scoreB) winner = teamA;
      else if (scoreB > scoreA) winner = teamB;
      else winner = "Draw";
    }

    if (editingMatchId) {
      const updatedMatch = {
        id: editingMatchId,
        tournamentId: store.activeTournamentId,
        teamA, teamB, scoreA, scoreB, date, type, stage, status, winner
      };
      await store.updateMatch(updatedMatch);
      await applyKnockoutProgression(updatedMatch);
      showToast(currentLang === "ar" ? "تم تحديث المباراة بنجاح" : "Match updated successfully");
    } else {
      const newMatch = {
        id: "match-" + Date.now(),
        tournamentId: store.activeTournamentId,
        teamA, teamB, scoreA, scoreB, date, type, stage, status, winner
      };
      await store.addMatch(newMatch);
      await applyKnockoutProgression(newMatch);
      showToast(currentLang === "ar" ? "تمت إضافة المباراة بنجاح" : "Match added successfully");
    }

    modalMatch.classList.remove("active");
    renderAll();
  });

  matchFormStatus.addEventListener("change", (e) => {
    if (e.target.value === "Finished") {
      matchFormScoreA.setAttribute("required", "");
      matchFormScoreB.setAttribute("required", "");
      if (matchFormScoreA.value === "") matchFormScoreA.value = "0";
      if (matchFormScoreB.value === "") matchFormScoreB.value = "0";
    } else {
      matchFormScoreA.removeAttribute("required");
      matchFormScoreB.removeAttribute("required");
    }
  });

  // ==========================================
  // Initialization
  // ==========================================
  
  updateLocalization();
  updateAdminUIState();
  renderAll();
});
