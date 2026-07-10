/* =========================================================
   AI Business Escape Room – Spiellogik
   AI Playground Day at SWICA
   ---------------------------------------------------------
   HINWEIS FÜR DIE ANPASSUNG:
   Alle Aufgaben, Lösungen, Hinweise, Punkte und Texte findet
   ihr im Abschnitt "SPIELDATEN" weiter unten. Dort könnt ihr
   alles bequem bearbeiten, ohne die Logik zu berühren.
   ========================================================= */

"use strict";

/* =========================================================
   SPIELDATEN – hier alles einfach anpassbar
   ========================================================= */

const CONFIG = {
  adminPassword: "abi-admin",       // Passwort für den Adminbereich
  pointsPerBlock: 5,                // Punkte pro gelöstem Block
  pointsFinalCode: 10,              // Punkte für den finalen Code
  bonusPoints: 5,                   // Bonus für schnellstes Team (manuell)
  maxPoints: 35,                    // Maximal erreichbare Punktzahl
  recentWindowMs: 2 * 60 * 60 * 1000, // 2 Stunden Sichtbarkeitsfenster
  storageKey: "swicaEscapeRuns",    // localStorage-Schlüssel
};

/* Finaler Code – akzeptierte Varianten (klein geschrieben, ohne Sonderformat) */
const FINAL_CODE = {
  clue: "REX-2000-IT-FLOW",
  accepted: ["rex-2000-it-flow", "rex 2000 it flow", "rex2000itflow"],
  successText:
    "Abi sagt: Gratulation! Ihr habt den AI Business Escape Room gemeistert. " +
    "Die Daten sind strukturiert, die E-Mails formuliert und Excel ist nur leicht traumatisiert.",
  errorTexts: [
    "Abi sagt: Fast. Aber diese Tür öffnet höchstens den Pausenraum.",
    "Abi sagt: Die Kaffeemaschine hat den Code abgelehnt.",
    "Abi sagt: Kreativ, aber leider nicht korrekt.",
    "Abi sagt: Ich sehe, was ihr versucht habt. Leider sieht die Tür das anders.",
    "Abi sagt: Dieser Code hat starke PowerPoint-Energie, aber keine Escape-Room-Wirkung.",
  ],
};

/* Die vier unabhängigen Blöcke.
   - id: eindeutige Nummer
   - icon: Emoji für die Karte
   - clue: Hinweis für den finalen Code
   - checkType: "exact" (genaue Antwort) oder "keywords" (Schlüsselbegriffe)
   - accepted: akzeptierte Antworten (klein geschrieben)
   - keywords / minKeywords: nur für checkType "keywords"
   - puzzleHtml: Rätselinhalt (darf HTML/Tabelle enthalten)
*/
const BLOCKS = [
  {
    id: 1,
    icon: "📧",
    title: "Die geheimnisvolle E-Mail",
    duration: "10 Minuten",
    clue: "REX",
    useCase: "AI für E-Mail-Zusammenfassung, Priorisierung und professionelle Antwort nutzen.",
    story:
      "Abi zeigt eine lange, unübersichtliche E-Mail. Darin stecken viele Informationen, " +
      "aber nur einige sind wirklich relevant.",
    task:
      "Nutzt AI, um:\n" +
      "• die E-Mail zusammenzufassen\n" +
      "• die wichtigsten Aufgaben herauszufiltern\n" +
      "• Prioritäten zu erkennen\n" +
      "• einen professionellen Antwortentwurf zu schreiben\n" +
      "• die drei wichtigsten Stichworte zu erkennen\n\n" +
      "Bildet aus den drei Kernthemen den Block-Hinweis (Excel wird als X abgekürzt).",
    answerLabel: "Block-Hinweis",
    puzzleHtml:
      "<strong>Betreff: Mehrere offene Punkte – bitte dringend prüfen</strong>\n\n" +
      "Hallo zusammen\n\n" +
      "Ich habe verschiedene Rückmeldungen aus dem Bereich erhalten und fasse sie hier kurz zusammen, " +
      "auch wenn es etwas unübersichtlich geworden ist. Erstens gibt es mehrere offene Rechnungen, bei denen " +
      "noch unklar ist, ob alle Beträge korrekt erfasst wurden. Zweitens wurde erwähnt, dass gewisse " +
      "Excel-Auswertungen manuell nachbearbeitet werden müssen, weil doppelte Einträge enthalten sind. " +
      "Drittens gibt es Rückfragen zu einer internen E-Mail-Vorlage, die aktuell zu lang und nicht klar genug " +
      "formuliert ist.\n\n" +
      "Zusätzlich wurde im letzten Meeting festgehalten, dass repetitive Aufgaben stärker automatisiert werden " +
      "sollen. Besonders wichtig sind aktuell drei Themen: Rechnungskontrolle, Excel-Bereinigung und " +
      "E-Mail-Kommunikation. Bitte priorisiert diese Punkte und schlagt vor, wie AI oder Copilot unterstützen " +
      "könnten.\n\n" +
      "Freundliche Grüsse\nBusiness Coordination",
    checkType: "exact",
    accepted: ["rex"],
    hints: [
      "Abi sagt: Nicht jede Information in der E-Mail ist gleich wichtig. Suche die drei zentralen Arbeitsthemen.",
      "Abi sagt: Achte auf Rechnung, Excel und E-Mail. Daraus entsteht der erste Hinweis.",
      "Abi sagt: Für den Code wird Excel als X abgekürzt.",
    ],
    successText: "Abi sagt: Sehr gut. Ihr habt das E-Mail-Chaos gezähmt. Outlook wäre stolz.",
  },
  {
    id: 2,
    icon: "🧾",
    title: "Rechnungsdaten ins Excel bringen",
    duration: "10–15 Minuten",
    clue: "2000",
    useCase: "AI nutzen, um Rechnungsinformationen aus Text zu extrahieren und strukturiert in Excel zu übertragen.",
    story:
      "Abi findet mehrere fiktive Rechnungsnotizen. Die Daten sind nicht sauber strukturiert. " +
      "Erstellt daraus eine Excel-Tabelle und berechnet die Summe.",
    task:
      "Nutzt AI oder Copilot, um:\n" +
      "• Rechnungsnummern zu erkennen\n" +
      "• Lieferanten und Daten zu erfassen\n" +
      "• Beträge zu extrahieren\n" +
      "• die doppelte Rechnung zu finden\n" +
      "• die Summe der gültigen Rechnungsbeträge zu berechnen (ohne Duplikat)",
    answerLabel: "Summe der gültigen Beträge (CHF)",
    puzzleHtml:
      "Rechnung A: Lieferant OfficePro AG, Rechnungsnummer OP-2041, Datum 03.04.2026, Betrag CHF 430.00, Status offen.\n" +
      "Rechnung B: Lieferant DataClean GmbH, Rechnungsnummer DC-1188, Datum 07.04.2026, Betrag CHF 820.00, Status geprüft.\n" +
      "Rechnung C: Lieferant PrintPlus AG, Rechnungsnummer PP-5510, Datum 08.04.2026, Betrag CHF 275.00, Status offen.\n" +
      "Rechnung D: Lieferant OfficePro AG, Rechnungsnummer OP-2041, Datum 03.04.2026, Betrag CHF 430.00, Status doppelt erfasst.\n" +
      "Rechnung E: Lieferant AI Services AG, Rechnungsnummer AI-9001, Datum 10.04.2026, Betrag CHF 475.00, Status geprüft.",
    checkType: "exact",
    accepted: ["2000", "2000.00", "chf 2000", "2'000"],
    hints: [
      "Abi sagt: Eine Rechnung taucht doppelt auf. Doppelt hält hier nicht besser.",
      "Abi sagt: Entferne die doppelte OP-2041.",
      "Abi sagt: Addiere nur die gültigen Rechnungsbeträge.",
    ],
    successText: "Abi sagt: Stark. Ihr habt die Rechnungen sortiert, ohne dass Excel geweint hat.",
  },
  {
    id: 3,
    icon: "📊",
    title: "Excel-Challenge mit Copilot",
    duration: "15 Minuten",
    clue: "IT",
    useCase: "Excel-Daten analysieren, Duplikate erkennen, Auffälligkeiten finden und Erkenntnisse zusammenfassen.",
    story:
      "Abi öffnet eine chaotische Excel-Tabelle mit Abteilungen, Kosten, Status und Kommentaren. " +
      "Findet heraus, welche Abteilung den auffälligsten Kostenanstieg hat.",
    task:
      "Nutzt Copilot oder AI, um:\n" +
      "• die Daten zu bereinigen\n" +
      "• Auffälligkeiten zu erkennen\n" +
      "• Kosten zu vergleichen\n" +
      "• doppelte Einträge nicht doppelt zu zählen\n" +
      "• die richtige Abteilung zu identifizieren",
    answerLabel: "Auffälligste Abteilung",
    puzzleHtml:
      "<table>" +
      "<tr><th>Abteilung</th><th>Kosten März</th><th>Kosten April</th><th>Status</th><th>Kommentar</th></tr>" +
      "<tr><td>HR</td><td>1200</td><td>1300</td><td>normal</td><td>leichte Erhöhung wegen Schulung</td></tr>" +
      "<tr><td>IT</td><td>2500</td><td>4700</td><td>auffällig</td><td>mehrere neue Tools und Lizenzen</td></tr>" +
      "<tr><td>Marketing</td><td>1800</td><td>1900</td><td>normal</td><td>Kampagnenkosten stabil</td></tr>" +
      "<tr><td>Finanzen</td><td>1600</td><td>1650</td><td>normal</td><td>kaum Veränderung</td></tr>" +
      "<tr><td>Kundenservice</td><td>2200</td><td>2600</td><td>prüfen</td><td>höhere Supportlast</td></tr>" +
      "<tr><td>IT</td><td>2500</td><td>4700</td><td>doppelt</td><td>doppelte Zeile zur Kontrolle</td></tr>" +
      "</table>",
    checkType: "exact",
    accepted: ["it", "it-abteilung", "abteilung it"],
    hints: [
      "Abi sagt: Schau auf den Unterschied zwischen März und April.",
      "Abi sagt: Eine Zeile ist doppelt. Nicht zweimal zählen.",
      "Abi sagt: Die grösste auffällige Differenz liegt bei einer technischen Abteilung.",
    ],
    successText: "Abi sagt: Korrekt. Die IT hat gewonnen. Ob sie das wollte, ist eine andere Frage.",
  },
  {
    id: 4,
    icon: "⚙️",
    title: "Arbeitsalltag optimieren",
    duration: "10–15 Minuten",
    clue: "FLOW",
    useCase: "AI für Prozessverbesserung, Aufgabenstrukturierung und Mini-Workflow nutzen.",
    story:
      "Abi präsentiert ein typisches Arbeitsproblem: Ein Team verliert jede Woche Zeit durch manuelle " +
      "Nachbearbeitung, unklare E-Mails und wiederkehrende Excel-Auswertungen.",
    task:
      "Entwickelt mit AI einen kurzen Verbesserungsvorschlag. Er muss mindestens diese vier Elemente enthalten:\n" +
      "1. E-Mail-Inhalte automatisch zusammenfassen\n" +
      "2. Rechnungsdaten strukturiert in Excel übertragen\n" +
      "3. Auffälligkeiten oder Duplikate prüfen\n" +
      "4. Zusammenfassung oder Antwortmail generieren\n\n" +
      "Schreibt euren Vorschlag ins Feld (mind. 4 passende Schlüsselbegriffe) – oder gebt direkt \"FLOW\" ein.",
    answerLabel: "Euer Verbesserungsvorschlag",
    puzzleHtml:
      "Ein Team erhält jede Woche mehrere E-Mails mit Rechnungsinformationen. Die Informationen sind " +
      "uneinheitlich formuliert. Danach werden Beträge manuell in Excel übertragen. Anschliessend prüft eine " +
      "Person, ob Daten fehlen oder doppelt vorkommen. Am Ende wird eine Zusammenfassung per E-Mail an die " +
      "verantwortliche Person geschickt. Dieser Prozess ist langsam, fehleranfällig und wiederholt sich jede Woche.",
    checkType: "keywords",
    accepted: ["flow"], // direkte Lösung ebenfalls akzeptiert
    keywords: ["zusammenfassen", "excel", "duplikate", "e-mail", "email", "rechnungsdaten", "auffälligkeiten", "automatisieren", "workflow"],
    minKeywords: 4,
    hints: [
      "Abi sagt: Denkt an einen Ablauf vom Eingang der E-Mail bis zur fertigen Antwort.",
      "Abi sagt: AI kann helfen beim Zusammenfassen, Strukturieren, Prüfen und Formulieren.",
      "Abi sagt: Gesucht ist ein Vorschlag, der den Prozess als Workflow denkt.",
    ],
    successText:
      "Abi sagt: Sehr gut. Ihr habt aus Chaos einen Workflow gemacht. Das klingt fast nach Magie, ist aber Copilot.",
  },
];

/* =========================================================
   LAUFZEIT-ZUSTAND (aktuelle Spielsitzung)
   ========================================================= */

let state = null;        // aktueller Team-Run
let timerInterval = null; // Intervall für den Timer
let currentBlockId = null; // gerade geöffneter Block
let adminUnlocked = false;

/* =========================================================
   HILFSFUNKTIONEN
   ========================================================= */

// Kurzform für document.getElementById
function $(id) { return document.getElementById(id); }

// Eindeutige ID erzeugen (für Teams mit gleichem Namen)
function makeId() {
  return "t_" + Date.now().toString(36) + "_" + Math.random().toString(36).slice(2, 7);
}

// Text normalisieren (für Antwortvergleich): klein, getrimmt
function normalize(str) {
  return (str || "").toString().trim().toLowerCase();
}

// Zeit in mm:ss oder hh:mm:ss formatieren
function formatTime(ms) {
  if (!ms || ms < 0) ms = 0;
  const totalSec = Math.floor(ms / 1000);
  const h = Math.floor(totalSec / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  const s = totalSec % 60;
  const pad = (n) => String(n).padStart(2, "0");
  return h > 0 ? `${pad(h)}:${pad(m)}:${pad(s)}` : `${pad(m)}:${pad(s)}`;
}

// Alle Screens ausblenden und einen anzeigen
function showScreen(screenId) {
  document.querySelectorAll(".screen").forEach((s) => s.classList.add("hidden"));
  const el = $(screenId);
  if (el) el.classList.remove("hidden");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

/* =========================================================
   LOCALSTORAGE: Team-Runs laden/speichern (robust)
   ========================================================= */

function loadAllRuns() {
  try {
    const raw = localStorage.getItem(CONFIG.storageKey);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    // Falls localStorage beschädigt oder leer ist -> leeres Array
    console.warn("Konnte Runs nicht laden:", e);
    return [];
  }
}

function persistAllRuns(runs) {
  try {
    localStorage.setItem(CONFIG.storageKey, JSON.stringify(runs));
  } catch (e) {
    console.warn("Konnte Runs nicht speichern:", e);
  }
}

// Aktuellen Run in der Liste speichern (neu anlegen)
function saveTeamRun() {
  if (!state) return;
  const runs = loadAllRuns();
  runs.push(state);
  persistAllRuns(runs);
}

// Aktuellen Run aktualisieren (überschreiben anhand der ID)
function updateTeamRun() {
  if (!state) return;
  state.lastActiveTime = Date.now();
  const runs = loadAllRuns();
  const idx = runs.findIndex((r) => r.id === state.id);
  if (idx >= 0) runs[idx] = state;
  else runs.push(state);
  persistAllRuns(runs);
}

// Teams der letzten 2 Stunden ermitteln
function getRecentTeams(includeOld = false) {
  const runs = loadAllRuns();
  if (includeOld) return runs;
  const now = Date.now();
  return runs.filter((r) => {
    const ref = r.endTime || r.lastActiveTime || r.startTime || 0;
    return now - ref <= CONFIG.recentWindowMs;
  });
}

// Alte Runs (älter als 2 Std.) entfernen
function cleanOldTeamRuns() {
  const now = Date.now();
  const runs = loadAllRuns().filter((r) => {
    const ref = r.endTime || r.lastActiveTime || r.startTime || 0;
    return now - ref <= CONFIG.recentWindowMs;
  });
  persistAllRuns(runs);
  return runs;
}

/* =========================================================
   SPIELSTART
   ========================================================= */

function startGame() {
  const name = $("teamNameInput").value.trim();
  if (!name) {
    $("teamNameInput").focus();
    $("teamNameInput").style.borderColor = "var(--danger)";
    return;
  }

  // Neuen Team-Zustand anlegen
  state = {
    id: makeId(),
    teamName: name,
    points: 0,
    hintsUsed: 0,
    solvedBlocks: [],       // Array mit Block-IDs
    blockHints: {},         // { blockId: Anzahl genutzter Hinweise }
    startTime: Date.now(),
    endTime: null,
    lastActiveTime: Date.now(),
    finalSolved: false,
    bonusAwarded: false,
    status: "In Bearbeitung",
  };

  saveTeamRun();
  startTimer();
  $("statusBar").classList.remove("hidden");
  $("progressWrap").classList.remove("hidden");
  updateStatusBar();
  loadBlocks();
  showScreen("screenOverview");
}

/* =========================================================
   TIMER
   ========================================================= */

function startTimer() {
  stopTimer();
  timerInterval = setInterval(() => {
    if (!state) return;
    const elapsed = Date.now() - state.startTime;
    $("statTimer").textContent = formatTime(elapsed);
  }, 1000);
}

function stopTimer() {
  if (timerInterval) clearInterval(timerInterval);
  timerInterval = null;
}

/* =========================================================
   STATUSLEISTE & FORTSCHRITT
   ========================================================= */

function updateStatusBar() {
  if (!state) return;
  $("statTeam").textContent = state.teamName;
  $("statPoints").textContent = state.points + " / " + CONFIG.maxPoints;
  $("statHints").textContent = state.hintsUsed;
  $("statBlocks").textContent = state.solvedBlocks.length + " / " + BLOCKS.length;
  const elapsed = state.startTime ? Date.now() - state.startTime : 0;
  $("statTimer").textContent = formatTime(elapsed);

  // Fortschritt: gelöste Blöcke + finaler Code
  const total = BLOCKS.length + 1;
  const done = state.solvedBlocks.length + (state.finalSolved ? 1 : 0);
  $("progressBar").style.width = Math.round((done / total) * 100) + "%";
}

/* =========================================================
   BLOCKÜBERSICHT AUFBAUEN
   ========================================================= */

function loadBlocks() {
  const grid = $("blockGrid");
  grid.innerHTML = "";

  BLOCKS.forEach((block) => {
    const solved = state.solvedBlocks.includes(block.id);
    const card = document.createElement("div");
    card.className = "block-card" + (solved ? " solved" : "");
    card.innerHTML = `
      <div class="block-card-icon">${block.icon}</div>
      <span class="badge ${solved ? "badge-solved" : "badge-open"}">${solved ? "✓ Gelöst" : "Offen"}</span>
      <h3>Block ${block.id}: ${block.title}</h3>
      <div class="block-card-meta">
        <span>⏱ ${block.duration}</span>
        <span>${CONFIG.pointsPerBlock} Punkte</span>
      </div>
      <button class="btn ${solved ? "btn-ghost" : "btn-primary"}" data-block="${block.id}">
        ${solved ? "Erneut ansehen" : "Block starten"}
      </button>
    `;
    card.querySelector("button").addEventListener("click", () => openBlock(block.id));
    grid.appendChild(card);
  });

  updateFinalCard();
}

// Karte für den finalen Code aktualisieren (sperren/entsperren)
function updateFinalCard() {
  const allSolved = state.solvedBlocks.length === BLOCKS.length;
  const card = $("finalCard");
  const btn = $("btnOpenFinal");
  const statusText = $("finalCardStatus");

  if (state.finalSolved) {
    card.classList.remove("locked");
    card.classList.add("unlocked");
    statusText.textContent = "✓ Gelöst – Escape Room abgeschlossen!";
    btn.disabled = false;
    btn.textContent = "Ergebnis ansehen";
  } else if (allSolved) {
    card.classList.remove("locked");
    card.classList.add("unlocked");
    statusText.textContent = "Freigeschaltet! Kombiniert eure vier Hinweise.";
    btn.disabled = false;
    btn.textContent = "Finalen Code öffnen";
  } else {
    card.classList.add("locked");
    card.classList.remove("unlocked");
    statusText.textContent = `Gesperrt – ${state.solvedBlocks.length} / ${BLOCKS.length} Blöcke gelöst.`;
    btn.disabled = true;
    btn.textContent = "Finalen Code öffnen";
  }
}

/* =========================================================
   EINZELNEN BLOCK ÖFFNEN
   ========================================================= */

function openBlock(blockId) {
  const block = BLOCKS.find((b) => b.id === blockId);
  if (!block) return;
  currentBlockId = blockId;
  const solved = state.solvedBlocks.includes(blockId);

  $("blockIcon").textContent = block.icon;
  $("blockTitle").textContent = `Block ${block.id}: ${block.title}`;
  $("blockMeta").textContent = `⏱ ${block.duration} · ${CONFIG.pointsPerBlock} Punkte`;
  $("blockUseCase").textContent = "Use Case: " + block.useCase;
  $("blockStory").textContent = block.story;
  $("blockTask").textContent = block.task;
  $("blockPuzzle").innerHTML = block.puzzleHtml;
  $("answerLabel").textContent = block.answerLabel || "Eure Lösung";

  // Statusbadge
  const badge = $("blockStatusBadge");
  badge.textContent = solved ? "✓ Gelöst" : "Offen";
  badge.className = "badge " + (solved ? "badge-solved" : "badge-open");

  // Antwortfeld & Feedback zurücksetzen
  $("answerInput").value = "";
  $("answerInput").disabled = solved;
  $("btnCheckAnswer").disabled = solved;
  const fb = $("answerFeedback");
  fb.textContent = solved ? block.successText : "";
  fb.className = "feedback" + (solved ? " ok" : "");

  // Bereits genutzte Hinweise dieses Blocks anzeigen
  renderBlockHints(blockId);

  showScreen("screenBlock");
}

// Genutzte Hinweise eines Blocks rendern
function renderBlockHints(blockId) {
  const block = BLOCKS.find((b) => b.id === blockId);
  const used = state.blockHints[blockId] || 0;
  $("hintCountLabel").textContent = used;

  const list = $("hintList");
  list.innerHTML = "";
  for (let i = 0; i < used; i++) {
    const item = document.createElement("div");
    item.className = "hint-item";
    item.textContent = "💡 " + block.hints[i];
    list.appendChild(item);
  }
}

/* =========================================================
   HINWEIS ANZEIGEN
   ========================================================= */

function showHint(blockId) {
  const block = BLOCKS.find((b) => b.id === blockId);
  if (!block) return;
  const used = state.blockHints[blockId] || 0;

  if (used >= block.hints.length) {
    // Keine weiteren Hinweise verfügbar
    const fb = $("answerFeedback");
    fb.textContent = "Abi sagt: Mehr Hinweise habe ich für diesen Block nicht. Ihr schafft das!";
    fb.className = "feedback";
    return;
  }

  // Hinweiszähler erhöhen (Hinweise kosten keine Punkte, werden aber gezählt)
  state.blockHints[blockId] = used + 1;
  state.hintsUsed += 1;
  updateTeamRun();
  updateStatusBar();
  renderBlockHints(blockId);
}

/* =========================================================
   ANTWORT PRÜFEN
   ========================================================= */

function checkAnswer(blockId) {
  const block = BLOCKS.find((b) => b.id === blockId);
  if (!block) return;
  if (state.solvedBlocks.includes(blockId)) return; // schon gelöst

  const raw = $("answerInput").value;
  const answer = normalize(raw);
  const fb = $("answerFeedback");

  let correct = false;

  if (block.checkType === "keywords") {
    // Direkte Lösung ("flow") ebenfalls akzeptieren
    if (block.accepted.includes(answer.replace(/[^a-z0-9]/g, ""))) {
      correct = true;
    } else {
      // Schlüsselbegriffe zählen
      let count = 0;
      block.keywords.forEach((kw) => {
        if (answer.includes(kw.toLowerCase())) count++;
      });
      correct = count >= (block.minKeywords || 4);
    }
  } else {
    // Exakter Vergleich – Antwort wird zusätzlich von Sonderzeichen befreit
    const cleaned = answer.replace(/[\s']/g, "");
    correct = block.accepted.some((acc) => {
      const accClean = normalize(acc).replace(/[\s']/g, "");
      return answer === normalize(acc) || cleaned === accClean;
    });
  }

  if (correct) {
    completeBlock(blockId);
    fb.textContent = block.successText;
    fb.className = "feedback ok";
    $("answerInput").disabled = true;
    $("btnCheckAnswer").disabled = true;
    $("blockStatusBadge").textContent = "✓ Gelöst";
    $("blockStatusBadge").className = "badge badge-solved";
  } else {
    fb.textContent = "Abi sagt: Noch nicht ganz. Prüft eure Überlegung – oder nutzt einen Hinweis.";
    fb.className = "feedback bad";
  }
}

/* =========================================================
   BLOCK ALS GELÖST MARKIEREN
   ========================================================= */

function completeBlock(blockId) {
  if (state.solvedBlocks.includes(blockId)) return;
  state.solvedBlocks.push(blockId);
  state.points += CONFIG.pointsPerBlock;
  updateTeamRun();
  updateStatusBar();
  loadBlocks(); // Übersicht aktualisiert Karten & finale Karte
}

/* =========================================================
   FINALER CODE
   ========================================================= */

function unlockFinalCode() {
  // Nur öffnen, wenn alle Blöcke gelöst sind
  if (state.solvedBlocks.length < BLOCKS.length && !state.finalSolved) return;

  // Gesammelte Hinweise anzeigen
  const grid = $("collectedClues");
  grid.innerHTML = "";
  BLOCKS.forEach((block) => {
    const chip = document.createElement("div");
    chip.className = "clue-chip";
    chip.innerHTML = `<span class="clue-label">Block ${block.id}</span><span class="clue-value">${block.clue}</span>`;
    grid.appendChild(chip);
  });

  // Falls bereits gelöst -> direkt Endscreen
  if (state.finalSolved) {
    showEndScreen();
    return;
  }

  $("finalCodeInput").value = "";
  $("finalFeedback").textContent = "";
  $("finalFeedback").className = "feedback";
  showScreen("screenFinal");
}

function checkFinalCode() {
  const raw = $("finalCodeInput").value;
  const answer = normalize(raw);
  const fb = $("finalFeedback");

  const isCorrect = FINAL_CODE.accepted.some((acc) => normalize(acc) === answer);

  if (isCorrect) {
    state.finalSolved = true;
    state.points += CONFIG.pointsFinalCode;
    state.endTime = Date.now();
    state.status = "Abgeschlossen";
    updateTeamRun();
    updateStatusBar();
    fb.textContent = FINAL_CODE.successText;
    fb.className = "feedback ok";
    stopTimer();
    setTimeout(showEndScreen, 900);
  } else {
    // Zufällige lustige Fehlermeldung
    const msg = FINAL_CODE.errorTexts[Math.floor(Math.random() * FINAL_CODE.errorTexts.length)];
    fb.textContent = msg;
    fb.className = "feedback bad";
  }
}

/* =========================================================
   ENDSCREEN
   ========================================================= */

function showEndScreen() {
  const elapsed = (state.endTime || Date.now()) - state.startTime;
  const rank = getTeamRank(state.id);

  const grid = $("endResultGrid");
  grid.innerHTML = `
    <div class="result-item"><div class="r-label">Team</div><div class="r-value">${state.teamName}</div></div>
    <div class="result-item"><div class="r-label">Punkte</div><div class="r-value">${state.points} / ${CONFIG.maxPoints}</div></div>
    <div class="result-item"><div class="r-label">Zeit</div><div class="r-value">${formatTime(elapsed)}</div></div>
    <div class="result-item"><div class="r-label">Hinweise</div><div class="r-value">${state.hintsUsed}</div></div>
    <div class="result-item"><div class="r-label">Gelöste Blöcke</div><div class="r-value">${state.solvedBlocks.length} / ${BLOCKS.length}</div></div>
    <div class="result-item"><div class="r-label">Platzierung</div><div class="r-value">${rank ? "#" + rank : "–"}</div></div>
  `;
  showScreen("screenEnd");
}

// Ergebnis als Text kopieren
function copyResult() {
  if (!state) return;
  const elapsed = (state.endTime || Date.now()) - state.startTime;
  const text =
    `AI Business Escape Room – Ergebnis\n` +
    `Team: ${state.teamName}\n` +
    `Punkte: ${state.points} / ${CONFIG.maxPoints}\n` +
    `Zeit: ${formatTime(elapsed)}\n` +
    `Hinweise: ${state.hintsUsed}\n` +
    `Gelöste Blöcke: ${state.solvedBlocks.length} / ${BLOCKS.length}\n` +
    `Status: ${state.status}`;

  const done = () => {
    const btn = $("btnCopyResult");
    const old = btn.textContent;
    btn.textContent = "✓ Kopiert!";
    setTimeout(() => (btn.textContent = old), 1500);
  };

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(done).catch(() => fallbackCopy(text, done));
  } else {
    fallbackCopy(text, done);
  }
}

// Fallback-Kopieren falls Clipboard-API nicht verfügbar ist
function fallbackCopy(text, cb) {
  const ta = document.createElement("textarea");
  ta.value = text;
  document.body.appendChild(ta);
  ta.select();
  try { document.execCommand("copy"); } catch (e) { /* ignore */ }
  document.body.removeChild(ta);
  if (cb) cb();
}

/* =========================================================
   LEADERBOARD / RANGLISTE
   ========================================================= */

// Sortierung: Punkte desc, Zeit asc, Hinweise asc
function sortLeaderboard(teams) {
  return teams.slice().sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points;
    const ta = durationOf(a);
    const tb = durationOf(b);
    if (ta !== tb) return ta - tb;
    return (a.hintsUsed || 0) - (b.hintsUsed || 0);
  });
}

// Benötigte Zeit eines Runs (bis Ende oder bis jetzt)
function durationOf(run) {
  const end = run.endTime || run.lastActiveTime || Date.now();
  return end - (run.startTime || end);
}

// Platzierung eines Teams anhand seiner ID ermitteln
function getTeamRank(teamId) {
  const sorted = sortLeaderboard(getRecentTeams());
  const idx = sorted.findIndex((t) => t.id === teamId);
  return idx >= 0 ? idx + 1 : null;
}

function renderLeaderboard() {
  const wrap = $("leaderboardTableWrap");
  const teams = sortLeaderboard(getRecentTeams());

  if (teams.length === 0) {
    wrap.innerHTML = `<p class="empty-note">Noch keine Teams in den letzten 2 Stunden. Startet ein Spiel!</p>`;
    return;
  }

  const medals = ["🥇", "🥈", "🥉"];
  let rows = "";
  teams.forEach((t, i) => {
    const rankClass = i < 3 ? `rank-${i + 1}` : "";
    const isCurrent = state && t.id === state.id ? "current-team" : "";
    const statusClass = t.status === "Abgeschlossen" ? "done" : "progress";
    rows += `
      <tr class="${rankClass} ${isCurrent}">
        <td>${i < 3 ? medals[i] : "#" + (i + 1)}</td>
        <td>${escapeHtml(t.teamName)}</td>
        <td>${t.points} / ${CONFIG.maxPoints}</td>
        <td>${formatTime(durationOf(t))}</td>
        <td>${t.hintsUsed || 0}</td>
        <td>${(t.solvedBlocks || []).length} / ${BLOCKS.length}</td>
        <td><span class="status-pill ${statusClass}">${t.status}</span></td>
      </tr>`;
  });

  wrap.innerHTML = `
    <table class="lb-table">
      <thead>
        <tr>
          <th>Rang</th><th>Team</th><th>Punkte</th><th>Zeit</th>
          <th>Hinweise</th><th>Blöcke</th><th>Status</th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>`;
}

// Rangliste leeren (alle Runs löschen)
function resetLeaderboard() {
  persistAllRuns([]);
}

// Einfache HTML-Escape-Funktion (Schutz vor kaputtem Markup / XSS im Teamnamen)
function escapeHtml(str) {
  return (str || "").replace(/[&<>"']/g, (c) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  }[c]));
}

/* =========================================================
   ADMINBEREICH
   ========================================================= */

function openAdminPanel() {
  showScreen("screenAdmin");
  if (adminUnlocked) {
    $("adminLogin").classList.add("hidden");
    $("adminContent").classList.remove("hidden");
    renderAdmin();
  } else {
    $("adminLogin").classList.remove("hidden");
    $("adminContent").classList.add("hidden");
    $("adminPassword").value = "";
    $("adminLoginFeedback").textContent = "";
  }
}

function adminLogin() {
  const pw = $("adminPassword").value;
  if (pw === CONFIG.adminPassword) {
    adminUnlocked = true;
    $("adminLogin").classList.add("hidden");
    $("adminContent").classList.remove("hidden");
    renderAdmin();
  } else {
    const fb = $("adminLoginFeedback");
    fb.textContent = "Falsches Passwort.";
    fb.className = "feedback bad";
  }
}

function renderAdmin() {
  renderAdminTeams();
  renderAdminSolutions();
}

// Teamtabelle im Admin (mit Aktionen)
function renderAdminTeams() {
  const showOld = $("adminShowOld").checked;
  const teams = sortLeaderboard(getRecentTeams(showOld));
  const wrap = $("adminTeamsWrap");

  if (teams.length === 0) {
    wrap.innerHTML = `<p class="empty-note">Keine Teams vorhanden.</p>`;
    return;
  }

  let rows = "";
  teams.forEach((t) => {
    // Buttons zum manuellen Lösen einzelner Blöcke
    let blockBtns = "";
    BLOCKS.forEach((b) => {
      const solved = (t.solvedBlocks || []).includes(b.id);
      blockBtns += `<button class="btn btn-ghost btn-mini" data-action="solveBlock" data-team="${t.id}" data-block="${b.id}" ${solved ? "disabled" : ""}>B${b.id}${solved ? " ✓" : ""}</button>`;
    });

    rows += `
      <tr>
        <td>${escapeHtml(t.teamName)}</td>
        <td>${t.points} / ${CONFIG.maxPoints}</td>
        <td>${formatTime(durationOf(t))}</td>
        <td>${t.hintsUsed || 0}</td>
        <td>${(t.solvedBlocks || []).length} / ${BLOCKS.length}</td>
        <td>${t.status}${t.bonusAwarded ? " ⭐" : ""}</td>
        <td>
          <div class="admin-actions-cell">
            ${blockBtns}
            <button class="btn btn-secondary btn-mini" data-action="bonus" data-team="${t.id}">+${CONFIG.bonusPoints} Bonus</button>
            <button class="btn btn-primary btn-mini" data-action="complete" data-team="${t.id}">Abschliessen</button>
          </div>
        </td>
      </tr>`;
  });

  wrap.innerHTML = `
    <table class="lb-table">
      <thead>
        <tr><th>Team</th><th>Punkte</th><th>Zeit</th><th>Hinweise</th><th>Blöcke</th><th>Status</th><th>Aktionen</th></tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>`;

  // Aktions-Buttons verdrahten
  wrap.querySelectorAll("button[data-action]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const action = btn.getAttribute("data-action");
      const teamId = btn.getAttribute("data-team");
      if (action === "bonus") addBonusPoints(teamId, CONFIG.bonusPoints);
      else if (action === "complete") adminCompleteTeam(teamId);
      else if (action === "solveBlock") adminSolveBlock(teamId, parseInt(btn.getAttribute("data-block"), 10));
      renderAdmin();
    });
  });
}

// Lösungen & Hinweise im Admin anzeigen
function renderAdminSolutions() {
  const box = $("adminSolutions");
  let html = "";
  BLOCKS.forEach((b) => {
    const acc = b.checkType === "keywords"
      ? `Schlüsselbegriffe (mind. ${b.minKeywords}): ${b.keywords.join(", ")} · direkte Lösung: "${b.accepted.join('", "')}"`
      : `"${b.accepted.join('", "')}"`;
    html += `
      <div class="sol-block">
        <h4>Block ${b.id}: ${b.title}</h4>
        <p>Akzeptierte Lösung: <span class="sol-answer">${acc}</span></p>
        <p>Block-Hinweis: <span class="sol-answer">${b.clue}</span></p>
        <details><summary>Hinweise anzeigen</summary>
          <ul>${b.hints.map((h) => `<li>${h}</li>`).join("")}</ul>
        </details>
      </div>`;
  });
  html += `
    <div class="sol-block">
      <h4>🔐 Finaler Code</h4>
      <p>Lösung: <span class="sol-answer">${FINAL_CODE.clue}</span></p>
      <p>Akzeptierte Varianten: "${FINAL_CODE.accepted.join('", "')}"</p>
    </div>`;
  box.innerHTML = html;
}

// Adminfunktion: Bonuspunkte vergeben
function addBonusPoints(teamId, points) {
  const runs = loadAllRuns();
  const run = runs.find((r) => r.id === teamId);
  if (!run) return;
  if (run.bonusAwarded) return; // nur einmal
  run.bonusAwarded = true;
  run.points = (run.points || 0) + points;
  persistAllRuns(runs);
  // Falls es das aktuell spielende Team ist -> Zustand angleichen
  if (state && state.id === teamId) {
    state.bonusAwarded = true;
    state.points += points;
    updateStatusBar();
  }
}

// Adminfunktion: Team manuell als abgeschlossen markieren
function adminCompleteTeam(teamId) {
  const runs = loadAllRuns();
  const run = runs.find((r) => r.id === teamId);
  if (!run) return;
  run.status = "Abgeschlossen";
  if (!run.endTime) run.endTime = Date.now();
  persistAllRuns(runs);
  if (state && state.id === teamId) {
    state.status = "Abgeschlossen";
    state.endTime = run.endTime;
  }
}

// Adminfunktion: einzelnen Block manuell als gelöst markieren
function adminSolveBlock(teamId, blockId) {
  const runs = loadAllRuns();
  const run = runs.find((r) => r.id === teamId);
  if (!run) return;
  run.solvedBlocks = run.solvedBlocks || [];
  if (!run.solvedBlocks.includes(blockId)) {
    run.solvedBlocks.push(blockId);
    run.points = (run.points || 0) + CONFIG.pointsPerBlock;
  }
  persistAllRuns(runs);
  // aktuelles Team ggf. angleichen
  if (state && state.id === teamId) {
    if (!state.solvedBlocks.includes(blockId)) {
      state.solvedBlocks.push(blockId);
      state.points += CONFIG.pointsPerBlock;
    }
    updateStatusBar();
    loadBlocks();
  }
}

/* =========================================================
   EVENT-VERDRAHTUNG (nach dem Laden der Seite)
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  // --- Startscreen ---
  $("btnStart").addEventListener("click", startGame);
  $("teamNameInput").addEventListener("keydown", (e) => { if (e.key === "Enter") startGame(); });
  $("btnShowLeaderboardStart").addEventListener("click", () => { renderLeaderboard(); showScreen("screenLeaderboard"); });

  // --- Blockdetail ---
  $("btnBackFromBlock").addEventListener("click", () => { loadBlocks(); showScreen("screenOverview"); });
  $("btnCheckAnswer").addEventListener("click", () => checkAnswer(currentBlockId));
  $("btnHint").addEventListener("click", () => showHint(currentBlockId));
  $("answerInput").addEventListener("keydown", (e) => { if (e.key === "Enter") checkAnswer(currentBlockId); });

  // --- Finaler Code ---
  $("btnOpenFinal").addEventListener("click", unlockFinalCode);
  $("btnBackFromFinal").addEventListener("click", () => { loadBlocks(); showScreen("screenOverview"); });
  $("btnCheckFinal").addEventListener("click", checkFinalCode);
  $("finalCodeInput").addEventListener("keydown", (e) => { if (e.key === "Enter") checkFinalCode(); });

  // --- Endscreen ---
  $("btnEndLeaderboard").addEventListener("click", () => { renderLeaderboard(); showScreen("screenLeaderboard"); });
  $("btnCopyResult").addEventListener("click", copyResult);
  $("btnNewTeam").addEventListener("click", () => {
    // Neues Team, ohne Rangliste zu löschen
    stopTimer();
    state = null;
    currentBlockId = null;
    $("statusBar").classList.add("hidden");
    $("progressWrap").classList.add("hidden");
    $("teamNameInput").value = "";
    showScreen("screenStart");
  });

  // --- Leaderboard ---
  $("btnBackFromLeaderboard").addEventListener("click", () => {
    // Zurück zum passenden Screen: Übersicht falls Team aktiv, sonst Start
    showScreen(state ? "screenOverview" : "screenStart");
    if (state) { loadBlocks(); }
  });
  $("btnRefreshLeaderboard").addEventListener("click", renderLeaderboard);
  $("btnCleanOld").addEventListener("click", () => { cleanOldTeamRuns(); renderLeaderboard(); });

  // --- Admin ---
  $("btnAdmin").addEventListener("click", openAdminPanel);
  $("btnAdminLogin").addEventListener("click", adminLogin);
  $("adminPassword").addEventListener("keydown", (e) => { if (e.key === "Enter") adminLogin(); });
  $("btnBackFromAdmin").addEventListener("click", () => { showScreen(state ? "screenOverview" : "screenStart"); if (state) loadBlocks(); });
  $("adminShowOld").addEventListener("change", renderAdminTeams);
  $("btnResetLeaderboard").addEventListener("click", () => {
    if (confirm("Wirklich die gesamte Rangliste zurücksetzen? Alle Ergebnisse werden gelöscht.")) {
      resetLeaderboard(); renderAdmin();
    }
  });
  $("btnDeleteAll").addEventListener("click", () => {
    if (confirm("Wirklich ALLE Ergebnisse löschen?")) { persistAllRuns([]); renderAdmin(); }
  });
  $("btnDeleteOld").addEventListener("click", () => { cleanOldTeamRuns(); renderAdmin(); });

  // Startscreen anzeigen
  showScreen("screenStart");
});
