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
      "Abi zeigt eine sehr lange, absichtlich chaotische E-Mail voller Nebenschauplätze. " +
      "Zwischen Kaffeekasse, Parkplätzen und Sommerfest verstecken sich nur DREI wirklich " +
      "dringende Arbeitsthemen – und ihre Reihenfolge ist entscheidend.",
    task:
      "Nutzt AI, um die E-Mail zu entschlüsseln:\n" +
      "1. Filtert aus dem Rauschen die genau DREI Themen mit einer echten Dringlichkeitsstufe (Stufe 1–3) heraus. Alle anderen Punkte sind Ablenkung.\n" +
      "2. Ordnet diese drei Themen nach ihrer Stufe (Stufe 1 zuerst, dann 2, dann 3).\n" +
      "3. Ersetzt jedes Thema durch seinen Code-Buchstaben laut Legende.\n" +
      "4. Setzt die drei Buchstaben in dieser Reihenfolge zusammen – das ist der Block-Hinweis.\n\n" +
      "LEGENDE:  Rechnung → R   |   E-Mail → E   |   Excel → X\n" +
      "(Achtung: Excel wird NICHT mit E, sondern mit X codiert.)",
    answerLabel: "Block-Hinweis (3 Buchstaben)",
    puzzleHtml:
      "<strong>Betreff: AW: FWD: diverse Punkte – teils dringend, teils nicht, bitte selbst sortieren</strong>\n\n" +
      "Hallo zusammen\n\n" +
      "kurz vorweg, das ist etwas länger geworden. Die Kaffeekasse ist übrigens wieder leer, bitte denkt " +
      "an euren Beitrag. Ausserdem sind zwei Parkplätze in der Tiefgarage ab nächster Woche gesperrt, und " +
      "das Sommerfest-Datum steht noch nicht fest – Rückmeldungen dazu sind nett, aber nicht eilig.\n\n" +
      "Nun zum Inhaltlichen, durcheinander wie immer:\n" +
      "– Der Meetingraum B12 muss irgendwann neu möbliert werden (kein Termindruck).\n" +
      "– Die Rechnungskontrolle ist kritisch: mehrere Beträge sind womöglich falsch erfasst. " +
      "Das hat DRINGLICHKEITSSTUFE 1 und muss bis morgen früh erledigt sein.\n" +
      "– Jemand fragte nach neuen Druckerpatronen (unwichtig, bitte später).\n" +
      "– Die interne E-Mail-Kommunikation bzw. unsere Vorlage ist zu lang und unklar. " +
      "Das ist STUFE 2 und sollte bis Ende Woche stehen.\n" +
      "– Die Excel-Bereinigung (doppelte Einträge entfernen) ist wichtig, aber hat Zeit bis nächste Woche: " +
      "DRINGLICHKEITSSTUFE 3.\n" +
      "– Und ja, der Drucker im 2. Stock klemmt wieder. Nicht eilig.\n\n" +
      "Bitte priorisiert die wirklich dringenden Punkte und lasst den Rest weg. Wer es schafft, die drei " +
      "dringenden Themen in der richtigen Reihenfolge zu codieren, hat den ersten Schlüssel.\n\n" +
      "Freundliche Grüsse\nBusiness Coordination",
    checkType: "exact",
    accepted: ["rex"],
    hints: [
      "Abi sagt: Ignoriert alles ohne Dringlichkeitsstufe – Kaffeekasse, Parkplatz, Sommerfest, Drucker und Möbel sind reines Rauschen.",
      "Abi sagt: Nur drei Punkte tragen eine Stufe: Rechnungskontrolle (1), E-Mail-Kommunikation (2), Excel-Bereinigung (3). Genau diese Reihenfolge zählt.",
      "Abi sagt: Codiert nach Legende und denkt daran: Excel ist das X, nicht das E. Stufe 1→2→3 ergibt drei Buchstaben.",
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
      "Abi kippt einen ganzen Stapl unsortierter Rechnungsnotizen aus: verschiedene Währungen, " +
      "Duplikate, stornierte und noch nicht freigegebene Belege. Nur ein Teil davon zählt wirklich.",
    task:
      "Nutzt AI oder Copilot und wendet ALLE Regeln an, sonst stimmt die Summe nicht:\n" +
      "1. Zählt NUR Rechnungen in CHF. Fremdwährungen (EUR usw.) werden komplett ignoriert.\n" +
      "2. Zählt NUR den Status \"offen\" oder \"geprüft\". \"storniert\", \"Entwurf\" und \"doppelt erfasst\" fallen weg.\n" +
      "3. Entfernt Duplikate: gleiche Rechnungsnummer = nur EINMAL zählen.\n" +
      "4. Bildet die Summe der übrig gebliebenen gültigen Beträge.",
    answerLabel: "Summe der gültigen Beträge (CHF)",
    puzzleHtml:
      "Rechnung A: OfficePro AG, Nr. OP-2041, 03.04.2026, CHF 430.00, Status offen.\n" +
      "Rechnung B: DataClean GmbH, Nr. DC-1188, 07.04.2026, CHF 820.00, Status geprüft.\n" +
      "Rechnung C: PrintPlus AG, Nr. PP-5510, 08.04.2026, CHF 275.00, Status offen.\n" +
      "Rechnung D: OfficePro AG, Nr. OP-2041, 03.04.2026, CHF 430.00, Status doppelt erfasst.\n" +
      "Rechnung E: AI Services AG, Nr. AI-9001, 10.04.2026, CHF 475.00, Status geprüft.\n" +
      "Rechnung F: CloudNet AG, Nr. CN-3300, 11.04.2026, CHF 600.00, Status storniert.\n" +
      "Rechnung G: EuroPrint SARL, Nr. EP-7788, 12.04.2026, EUR 900.00, Status geprüft.\n" +
      "Rechnung H: MailFlow AG, Nr. MF-1200, 12.04.2026, CHF 350.00, Status Entwurf.\n" +
      "Rechnung I: DataClean GmbH, Nr. DC-1188, 07.04.2026, CHF 820.00, Status geprüft (Zweitkopie).",
    checkType: "exact",
    accepted: ["2000", "2000.00", "chf 2000", "2'000"],
    hints: [
      "Abi sagt: Werft zuerst alles raus, was nicht CHF ist – die EUR-Rechnung zählt nicht. Und storniert bzw. Entwurf sind keine gültigen Belege.",
      "Abi sagt: OP-2041 und DC-1188 tauchen je zweimal auf. Gleiche Rechnungsnummer heisst: nur einmal zählen.",
      "Abi sagt: Übrig bleiben genau vier gültige Beträge. Addiert nur diese – rund, sauber, ohne Rappen.",
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
      "Abi öffnet eine grosse, unaufgeräumte Excel-Tabelle. Manche Abteilungen steigen prozentual " +
      "stark, sind aber sauber begründet. Eine Zeile ist doppelt. Gesucht ist der EINE verdächtige Fall.",
    task:
      "Nutzt Copilot oder AI und findet die auffälligste Abteilung nach dieser strengen Definition:\n" +
      "• Berechnet je Abteilung die Kostensteigerung von März auf April (absolut UND prozentual).\n" +
      "• Duplikate (identische Zeile) zählen nur EINMAL – nicht doppelt gewichten.\n" +
      "• AUFFÄLLIG ist NUR eine Steigerung, die WEDER geplant/budgetiert NOCH durch einen bekannten Grund erklärt ist.\n" +
      "• Eine hohe Prozentzahl allein reicht nicht, wenn der Anstieg begründet ist. Nennt die eine übrig bleibende Abteilung.",
    answerLabel: "Verdächtige Abteilung",
    puzzleHtml:
      "<table>" +
      "<tr><th>Abteilung</th><th>März</th><th>April</th><th>Status</th><th>Kommentar</th></tr>" +
      "<tr><td>HR</td><td>1200</td><td>1300</td><td>normal</td><td>+8% wegen geplanter Schulung, budgetiert</td></tr>" +
      "<tr><td>Innovation</td><td>500</td><td>1500</td><td>geplant</td><td>+200% einmalige Anschubfinanzierung, im Budget freigegeben</td></tr>" +
      "<tr><td>Logistik</td><td>3000</td><td>5000</td><td>erklärt</td><td>+2000 CHF durch bekannte Treibstoff-Preiserhöhung, dokumentiert</td></tr>" +
      "<tr><td>IT</td><td>2500</td><td>4700</td><td>prüfen</td><td>+2200 CHF, mehrere neue Tools, keine Freigabe dokumentiert, unklar</td></tr>" +
      "<tr><td>Marketing</td><td>1800</td><td>1900</td><td>normal</td><td>Kampagnenkosten stabil</td></tr>" +
      "<tr><td>Finanzen</td><td>1600</td><td>1650</td><td>normal</td><td>kaum Veränderung</td></tr>" +
      "<tr><td>Kundenservice</td><td>2200</td><td>2600</td><td>normal</td><td>saisonale Supportlast, jährlich erwartet</td></tr>" +
      "<tr><td>IT</td><td>2500</td><td>4700</td><td>doppelt</td><td>identische Kontrollzeile, versehentlich zweimal erfasst</td></tr>" +
      "</table>",
    checkType: "exact",
    accepted: ["it", "it-abteilung", "abteilung it"],
    hints: [
      "Abi sagt: Lasst euch von der Prozentzahl nicht täuschen. Innovation steigt +200%, ist aber ausdrücklich geplant und budgetiert – also nicht verdächtig.",
      "Abi sagt: Logistik steigt um 2000 CHF, hat aber einen dokumentierten, bekannten Grund. Eine Zeile ist zudem ein exaktes Duplikat – nicht doppelt zählen.",
      "Abi sagt: Übrig bleibt eine technische Abteilung mit dem grössten UNERKLÄRTEN Anstieg und ohne dokumentierte Freigabe.",
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
      "Zwei Wege führen zum Ziel – beide sind knifflig:\n\n" +
      "WEG A (Freitext): Entwickelt mit AI einen konkreten Verbesserungsvorschlag, der den ganzen Ablauf " +
      "beschreibt. Der Vorschlag muss mindestens 5 der geforderten Fachbegriffe sinnvoll enthalten " +
      "(z. B. zusammenfassen, Excel, Duplikate, E-Mail, Rechnungsdaten, Auffälligkeiten, automatisieren, Workflow, strukturieren).\n\n" +
      "WEG B (Geheimcode): Im Soll-Prozess unten ist ein 4-Buchstaben-Codewort versteckt. Lest die " +
      "ANFANGSBUCHSTABEN der vier nummerierten Prozessschritte von oben nach unten. Gebt dieses Wort ein.",
    answerLabel: "Vorschlag (5+ Begriffe) ODER verstecktes Codewort",
    puzzleHtml:
      "<strong>Ist-Zustand:</strong> Ein Team erhält jede Woche mehrere E-Mails mit Rechnungsinformationen. " +
      "Die Angaben sind uneinheitlich. Beträge werden manuell in Excel übertragen, jemand prüft von Hand auf " +
      "fehlende oder doppelte Daten, am Ende geht eine Zusammenfassung per E-Mail raus. Langsam, fehleranfällig, " +
      "jede Woche aufs Neue.\n\n" +
      "<strong>Soll-Prozess (4 Schritte – achtet auf die Anfangsbuchstaben):</strong>\n" +
      "1. Filtern der eingehenden E-Mails und Inhalte automatisch zusammenfassen.\n" +
      "2. Laden der Rechnungsdaten strukturiert nach Excel.\n" +
      "3. Ordnen und Prüfen auf Auffälligkeiten und Duplikate.\n" +
      "4. Weiterleiten der fertigen Zusammenfassung als Antwortmail.",
    checkType: "keywords",
    accepted: ["flow"], // verstecktes Codewort (Akrostichon F-L-O-W) ebenfalls akzeptiert
    keywords: ["zusammenfassen", "excel", "duplikate", "e-mail", "email", "rechnungsdaten", "auffälligkeiten", "automatisieren", "workflow", "strukturieren"],
    minKeywords: 5,
    hints: [
      "Abi sagt: Für den Freitext reichen ein paar Stichworte nicht – ich zähle mindestens 5 echte Fachbegriffe im Zusammenhang.",
      "Abi sagt: Es gibt eine Abkürzung. Schaut euch den nummerierten Soll-Prozess an und lest nur den jeweils ersten Buchstaben.",
      "Abi sagt: Filtern, Laden, Ordnen, Weiterleiten – erste Buchstaben von oben nach unten ergeben ein Wort mit vier Buchstaben.",
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
