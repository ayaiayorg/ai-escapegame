/* =========================================================================
   AI BUSINESS ESCAPE ROOM – Spiellogik
   AI Playground Day at SWICA
   -------------------------------------------------------------------------
   ANPASSEN LEICHT GEMACHT:
   - Alle Aufgaben, Lösungen, Hinweise, Punkte und Texte stehen im
     Bereich "SPIEL-KONFIGURATION" (weiter unten). Nur dort müsst ihr etwas
     ändern, um Inhalte anzupassen.
   ========================================================================= */

/* =========================================================================
   1) SPIEL-KONFIGURATION  (hier alles bearbeitbar)
   ========================================================================= */

// Punkte-Einstellungen
const CONFIG = {
    pointsPerBlock: 5,      // Punkte pro gelöstem Block
    pointsFinalCode: 10,    // Punkte für den finalen Code
    bonusPoints: 5,         // Bonus für schnellstes Team (nur im Admin vergebbar)
    maxPoints: 35,          // Maximal erreichbare Punktzahl
    adminPassword: 'abi-admin',                 // Passwort für den Adminbereich
    recentWindowMs: 2 * 60 * 60 * 1000,         // 2 Stunden für die Rangliste
    storageKey: 'swica_escape_runs'             // localStorage-Schlüssel
};

// Die 4 Blöcke des Escape Rooms
const BLOCKS = [
    /* --------------------------- BLOCK 1 --------------------------- */
    {
        id: 1,
        title: 'Die geheimnisvolle E-Mail',
        icon: '📧',
        duration: '10 Minuten',
        story: 'Abi zeigt eine lange, unübersichtliche E-Mail. Darin stecken viele Informationen – aber nur einige sind wirklich relevant.',
        task: [
            'Fasst die E-Mail mit AI zusammen.',
            'Filtert die wichtigsten Aufgaben heraus.',
            'Erkennt die Prioritäten.',
            'Schreibt einen professionellen Antwortentwurf.',
            'Findet die drei wichtigsten Stichworte und leitet daraus den Code ab.'
        ],
        riddle: {
            type: 'text',
            label: 'E-Mail',
            content:
`Betreff: Mehrere offene Punkte – bitte dringend prüfen

Hallo zusammen

Ich habe verschiedene Rückmeldungen aus dem Bereich erhalten und fasse sie hier kurz zusammen, auch wenn es etwas unübersichtlich geworden ist. Erstens gibt es mehrere offene Rechnungen, bei denen noch unklar ist, ob alle Beträge korrekt erfasst wurden. Zweitens wurde erwähnt, dass gewisse Excel-Auswertungen manuell nachbearbeitet werden müssen, weil doppelte Einträge enthalten sind. Drittens gibt es Rückfragen zu einer internen E-Mail-Vorlage, die aktuell zu lang und nicht klar genug formuliert ist.

Zusätzlich wurde im letzten Meeting festgehalten, dass repetitive Aufgaben stärker automatisiert werden sollen. Besonders wichtig sind aktuell drei Themen: Rechnungskontrolle, Excel-Bereinigung und E-Mail-Kommunikation. Bitte priorisiert diese Punkte und schlagt vor, wie AI oder Copilot unterstützen könnten.

Freundliche Grüsse
Business Coordination`
        },
        answerType: 'text',                 // Freitext, exakter Vergleich
        acceptedAnswers: ['REX'],           // akzeptierte Lösungen
        blockHint: 'REX',                   // Hinweis für den finalen Code
        answerLabel: 'Der Block-Code (3 Buchstaben)',
        answerPlaceholder: 'z. B. XYZ',
        hints: [
            'Abi sagt: Nicht jede Information in der E-Mail ist gleich wichtig. Suche die drei zentralen Arbeitsthemen.',
            'Abi sagt: Achte auf Rechnung, Excel und E-Mail. Daraus entsteht der erste Hinweis.',
            'Abi sagt: Für den Code wird Excel als X abgekürzt.'
        ],
        successMsg: 'Abi sagt: Sehr gut. Ihr habt das E-Mail-Chaos gezähmt. Outlook wäre stolz.'
    },

    /* --------------------------- BLOCK 2 --------------------------- */
    {
        id: 2,
        title: 'Rechnungsdaten ins Excel bringen',
        icon: '🧾',
        duration: '10–15 Minuten',
        story: 'Abi findet mehrere fiktive Rechnungsnotizen. Die Daten sind nicht sauber strukturiert. Erstellt daraus eine Excel-Tabelle und berechnet die Summe.',
        task: [
            'Erkennt Rechnungsnummern, Lieferanten, Daten und Beträge.',
            'Baut eine strukturierte Tabelle (Lieferant, Rechnungsnummer, Datum, Betrag, Status).',
            'Findet die doppelt erfasste Rechnung.',
            'Berechnet die Summe der gültigen Rechnungsbeträge (ohne Duplikat).'
        ],
        riddle: {
            type: 'text',
            label: 'Rechnungsnotizen',
            content:
`Rechnung A: Lieferant OfficePro AG, Rechnungsnummer OP-2041, Datum 03.04.2026, Betrag CHF 430.00, Status offen.
Rechnung B: Lieferant DataClean GmbH, Rechnungsnummer DC-1188, Datum 07.04.2026, Betrag CHF 820.00, Status geprüft.
Rechnung C: Lieferant PrintPlus AG, Rechnungsnummer PP-5510, Datum 08.04.2026, Betrag CHF 275.00, Status offen.
Rechnung D: Lieferant OfficePro AG, Rechnungsnummer OP-2041, Datum 03.04.2026, Betrag CHF 430.00, Status doppelt erfasst.
Rechnung E: Lieferant AI Services AG, Rechnungsnummer AI-9001, Datum 10.04.2026, Betrag CHF 475.00, Status geprüft.`
        },
        answerType: 'text',
        acceptedAnswers: ['2000', '2000.00', 'chf 2000', '2000 chf'],
        blockHint: '2000',
        answerLabel: 'Summe der gültigen Rechnungen (CHF)',
        answerPlaceholder: 'z. B. 1234',
        hints: [
            'Abi sagt: Eine Rechnung taucht doppelt auf. Doppelt hält hier nicht besser.',
            'Abi sagt: Entferne die doppelte OP-2041.',
            'Abi sagt: Addiere nur die gültigen Rechnungsbeträge.'
        ],
        successMsg: 'Abi sagt: Stark. Ihr habt die Rechnungen sortiert, ohne dass Excel geweint hat.'
    },

    /* --------------------------- BLOCK 3 --------------------------- */
    {
        id: 3,
        title: 'Excel-Challenge mit Copilot',
        icon: '📊',
        duration: '15 Minuten',
        story: 'Abi öffnet eine chaotische Excel-Tabelle mit Abteilungen, Kosten, Status und Kommentaren. Welche Abteilung hat den auffälligsten Kostenanstieg?',
        task: [
            'Bereinigt die Daten und beachtet doppelte Zeilen.',
            'Vergleicht die Kosten von März und April.',
            'Erkennt die grösste auffällige Differenz.',
            'Nennt die richtige Abteilung.'
        ],
        riddle: {
            type: 'table',
            label: 'Excel-Auszug',
            headers: ['Abteilung', 'Kosten März', 'Kosten April', 'Status', 'Kommentar'],
            rows: [
                ['HR', '1200', '1300', 'normal', 'leichte Erhöhung wegen Schulung'],
                ['IT', '2500', '4700', 'auffällig', 'mehrere neue Tools und Lizenzen'],
                ['Marketing', '1800', '1900', 'normal', 'Kampagnenkosten stabil'],
                ['Finanzen', '1600', '1650', 'normal', 'kaum Veränderung'],
                ['Kundenservice', '2200', '2600', 'prüfen', 'höhere Supportlast'],
                ['IT', '2500', '4700', 'doppelt', 'doppelte Zeile zur Kontrolle']
            ]
        },
        answerType: 'text',
        acceptedAnswers: ['IT', 'it-abteilung', 'die it'],
        blockHint: 'IT',
        answerLabel: 'Auffälligste Abteilung',
        answerPlaceholder: 'z. B. Abteilung',
        hints: [
            'Abi sagt: Schau auf den Unterschied zwischen März und April.',
            'Abi sagt: Eine Zeile ist doppelt. Nicht zweimal zählen.',
            'Abi sagt: Die grösste auffällige Differenz liegt bei einer technischen Abteilung.'
        ],
        successMsg: 'Abi sagt: Korrekt. Die IT hat gewonnen. Ob sie das wollte, ist eine andere Frage.'
    },

    /* --------------------------- BLOCK 4 --------------------------- */
    {
        id: 4,
        title: 'Arbeitsalltag optimieren',
        icon: '⚙️',
        duration: '10–15 Minuten',
        story: 'Abi präsentiert ein typisches Arbeitsproblem: Ein Team verliert jede Woche Zeit durch manuelle Nachbearbeitung, unklare E-Mails und wiederkehrende Excel-Auswertungen.',
        task: [
            'Analysiert das Problem mit AI.',
            'Formuliert einen kurzen Verbesserungsvorschlag als Workflow.',
            'Der Vorschlag muss mindestens 4 dieser Ideen sinnvoll enthalten: E-Mail-Inhalte zusammenfassen, Rechnungsdaten strukturiert in Excel übertragen, Duplikate/Auffälligkeiten prüfen, Zusammenfassung oder Antwortmail generieren.',
            'Tipp: Ihr könnt auch direkt das Lösungswort eingeben, wenn ihr es kennt.'
        ],
        riddle: {
            type: 'text',
            label: 'Problembeschreibung',
            content:
`Ein Team erhält jede Woche mehrere E-Mails mit Rechnungsinformationen. Die Informationen sind uneinheitlich formuliert. Danach werden Beträge manuell in Excel übertragen. Anschliessend prüft eine Person, ob Daten fehlen oder doppelt vorkommen. Am Ende wird eine Zusammenfassung per E-Mail an die verantwortliche Person geschickt. Dieser Prozess ist langsam, fehleranfällig und wiederholt sich jede Woche.`
        },
        answerType: 'keywords',                 // Freitext + Schlüsselbegriff-Prüfung
        keywords: ['zusammenfassen', 'excel', 'duplikate', 'e-mail', 'rechnungsdaten', 'auffälligkeiten', 'automatisieren', 'workflow'],
        minKeywords: 4,                          // mindestens so viele Begriffe
        acceptedAnswers: ['FLOW'],               // direktes Lösungswort wird auch akzeptiert
        blockHint: 'FLOW',
        answerLabel: 'Euer Verbesserungsvorschlag (oder Lösungswort)',
        answerPlaceholder: 'Beschreibt euren Workflow …',
        hints: [
            'Abi sagt: Denkt an einen Ablauf vom Eingang der E-Mail bis zur fertigen Antwort.',
            'Abi sagt: AI kann helfen beim Zusammenfassen, Strukturieren, Prüfen und Formulieren.',
            'Abi sagt: Gesucht ist ein Vorschlag, der den Prozess als Workflow denkt.'
        ],
        successMsg: 'Abi sagt: Sehr gut. Ihr habt aus Chaos einen Workflow gemacht. Das klingt fast nach Magie, ist aber Copilot.'
    }
];

// Finaler Code
const FINAL_CODE = {
    // Alle akzeptierten Schreibweisen (Normalisierung entfernt Leer-/Sonderzeichen)
    acceptedVariants: ['REX-2000-IT-FLOW', 'REX 2000 IT FLOW', 'REX2000ITFLOW'],
    successMsg: 'Abi sagt: Gratulation! Ihr habt den AI Business Escape Room gemeistert. Die Daten sind strukturiert, die E-Mails formuliert und Excel ist nur leicht traumatisiert.',
    errorMsgs: [
        'Abi sagt: Fast. Aber diese Tür öffnet höchstens den Pausenraum.',
        'Abi sagt: Die Kaffeemaschine hat den Code abgelehnt.',
        'Abi sagt: Kreativ, aber leider nicht korrekt.',
        'Abi sagt: Ich sehe, was ihr versucht habt. Leider sieht die Tür das anders.',
        'Abi sagt: Dieser Code hat starke PowerPoint-Energie, aber keine Escape-Room-Wirkung.'
    ]
};

// Kurze Abi-Kommentare für verschiedene Situationen
const ABI_MESSAGES = {
    start: 'Hallo, ich bin Abi. Wählt einen Block – ihr könnt frei entscheiden, wo ihr startet!',
    openBlock: 'Lest genau. Der Teufel steckt oft im Detail (und manchmal in Excel).',
    wrong: 'Abi sagt: Noch nicht ganz. Probiert es nochmal oder nutzt einen Hinweis.',
    allSolved: 'Abi sagt: Alle Blöcke gelöst! Die letzte Tür ist jetzt offen.',
    hint: 'Abi sagt: Ein Hinweis kostet keine Punkte, wird aber gezählt.'
};

/* =========================================================================
   2) SPIELZUSTAND (State)
   ========================================================================= */

let state = null;        // aktueller Team-Spielstand
let timerInterval = null;

// Frisches State-Objekt erzeugen
function createFreshState(teamName) {
    return {
        id: 'team_' + Date.now() + '_' + Math.random().toString(36).slice(2, 8), // eindeutige ID
        teamName: teamName,
        startTime: Date.now(),
        endTime: null,
        lastActiveTime: Date.now(),
        hintsUsed: 0,
        hintsShownPerBlock: {},   // { blockId: anzahl }
        solvedBlocks: [],         // [1,2,...]
        finalSolved: false,
        bonus: 0,
        status: 'In Bearbeitung',
        points: 0
    };
}

/* =========================================================================
   3) KLEINE HELFER
   ========================================================================= */

const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => Array.from(document.querySelectorAll(sel));

// Bildschirm wechseln
function showScreen(id) {
    $$('.screen').forEach(s => s.classList.remove('active'));
    $('#' + id).classList.add('active');
    // Abi nur im Spiel anzeigen
    $('#abi-container').classList.toggle('hidden', id !== 'screen-game');
    window.scrollTo(0, 0);
}

// Abi sprechen lassen
function abiSay(text) {
    $('#abi-text').textContent = text;
}

// Kurzer Toast
function toast(msg) {
    const t = $('#toast');
    t.textContent = msg;
    t.classList.remove('hidden');
    clearTimeout(t._timer);
    t._timer = setTimeout(() => t.classList.add('hidden'), 2600);
}

// Zeit in mm:ss oder hh:mm:ss formatieren
function formatTime(ms) {
    if (ms == null || ms < 0) ms = 0;
    const totalSec = Math.floor(ms / 1000);
    const h = Math.floor(totalSec / 3600);
    const m = Math.floor((totalSec % 3600) / 60);
    const s = totalSec % 60;
    const pad = (n) => String(n).padStart(2, '0');
    return h > 0 ? `${pad(h)}:${pad(m)}:${pad(s)}` : `${pad(m)}:${pad(s)}`;
}

// Antwort normalisieren (Gross/Klein, Leer- und Sonderzeichen egal)
function normalize(str) {
    return String(str).toLowerCase().replace(/[\s\-_.]/g, '').trim();
}

// Gesamtpunkte aus dem State berechnen
function computePoints(s) {
    return s.solvedBlocks.length * CONFIG.pointsPerBlock
        + (s.finalSolved ? CONFIG.pointsFinalCode : 0)
        + (s.bonus || 0);
}

/* =========================================================================
   4) SPIELSTART
   ========================================================================= */

function startGame() {
    const name = $('#team-name-input').value.trim();
    if (!name) {
        toast('Bitte gebt einen Teamnamen ein.');
        $('#team-name-input').focus();
        return;
    }
    state = createFreshState(name);
    saveTeamRun();           // Lauf sofort speichern (erscheint in Rangliste)
    startTimer();
    loadBlocks();
    updateHud();
    showScreen('screen-game');
    abiSay(ABI_MESSAGES.start);
}

// Timer starten (zählt hoch)
function startTimer() {
    stopTimer();
    timerInterval = setInterval(() => {
        if (!state) return;
        const elapsed = (state.endTime || Date.now()) - state.startTime;
        $('#hud-timer').textContent = formatTime(elapsed);
    }, 1000);
}
function stopTimer() {
    if (timerInterval) { clearInterval(timerInterval); timerInterval = null; }
}

/* =========================================================================
   5) BLÖCKE ALS KARTEN RENDERN
   ========================================================================= */

function loadBlocks() {
    const grid = $('#blocks-grid');
    grid.innerHTML = '';

    BLOCKS.forEach(block => {
        const solved = state.solvedBlocks.includes(block.id);
        const card = document.createElement('div');
        card.className = 'block-card' + (solved ? ' solved' : '');

        card.innerHTML = `
            ${solved ? '<div class="solved-check">✓</div>' : ''}
            <div class="block-card-top">
                <span class="block-icon">${block.icon}</span>
                <div>
                    <h3>Block ${block.id}: ${block.title}</h3>
                    <div class="block-duration">⏱️ ${block.duration}</div>
                </div>
            </div>
            <div class="block-badges">
                <span class="badge badge-points">${CONFIG.pointsPerBlock} Punkte</span>
                <span class="badge ${solved ? 'badge-solved' : 'badge-open'}">
                    ${solved ? '✓ Gelöst' : 'Offen'}
                </span>
            </div>
            <button class="btn ${solved ? 'btn-ghost' : 'btn-primary'}" data-open="${block.id}">
                ${solved ? 'Nochmal ansehen' : 'Block starten'}
            </button>
        `;
        grid.appendChild(card);
    });

    // Klick-Handler für "Block starten"
    $$('#blocks-grid [data-open]').forEach(btn => {
        btn.addEventListener('click', () => openBlock(parseInt(btn.dataset.open, 10)));
    });

    updateFinalCard();
    updateProgress();
}

// Finale Karte je nach Fortschritt aktualisieren
function updateFinalCard() {
    const allSolved = state.solvedBlocks.length === BLOCKS.length;
    const card = $('#final-card');
    const btn = $('#btn-open-final');
    const status = $('#final-card-status');
    const lock = card.querySelector('.final-lock');

    if (state.finalSolved) {
        card.classList.remove('locked'); card.classList.add('unlocked');
        lock.textContent = '✅';
        status.textContent = 'Finaler Code gelöst! Ihr habt den Escape Room gemeistert.';
        btn.disabled = false;
        btn.textContent = 'Endergebnis anzeigen';
    } else if (allSolved) {
        card.classList.remove('locked'); card.classList.add('unlocked');
        lock.textContent = '🔓';
        status.textContent = 'Alle Blöcke gelöst! Gebt jetzt den finalen Code ein.';
        btn.disabled = false;
        btn.textContent = 'Finalen Code eingeben';
    } else {
        card.classList.add('locked'); card.classList.remove('unlocked');
        lock.textContent = '🔒';
        status.textContent = `Noch ${BLOCKS.length - state.solvedBlocks.length} Block(e) lösen, um den finalen Code freizuschalten.`;
        btn.disabled = true;
        btn.textContent = 'Finalen Code eingeben';
    }
}

// Fortschrittsbalken aktualisieren
function updateProgress() {
    const pct = Math.round((state.solvedBlocks.length / BLOCKS.length) * 100);
    $('#progress-fill').style.width = pct + '%';
    $('#progress-label').textContent = pct + ' % gelöst';
}

/* =========================================================================
   6) BLOCK ÖFFNEN (Detail-Overlay)
   ========================================================================= */

let currentBlockId = null;

function openBlock(blockId) {
    const block = BLOCKS.find(b => b.id === blockId);
    if (!block) return;
    currentBlockId = blockId;
    markActive();

    $('#block-detail-icon').textContent = block.icon;
    $('#block-detail-title').textContent = `Block ${block.id}: ${block.title}`;
    $('#block-detail-meta').textContent = `⏱️ ${block.duration} · ${CONFIG.pointsPerBlock} Punkte`;
    $('#block-detail-story').textContent = block.story;

    // Aufgabe als Liste
    $('#block-detail-task').innerHTML = '<ul>' + block.task.map(t => `<li>${t}</li>`).join('') + '</ul>';

    // Rätseltext (Text oder Tabelle)
    $('#block-detail-riddle').innerHTML = renderRiddle(block.riddle);

    // Hinweise zurücksetzen und bereits gezeigte wieder anzeigen
    renderShownHints(block);

    // Antwortfeld je nach Typ
    const solved = state.solvedBlocks.includes(block.id);
    setupAnswerArea(block, solved);

    $('#answer-feedback').textContent = '';
    $('#answer-feedback').className = 'answer-feedback';

    $('#block-overlay').classList.remove('hidden');
    abiSay(ABI_MESSAGES.openBlock);
}

// Rätsel als HTML rendern
function renderRiddle(riddle) {
    if (riddle.type === 'table') {
        const head = '<tr>' + riddle.headers.map(h => `<th>${h}</th>`).join('') + '</tr>';
        const body = riddle.rows.map(r => '<tr>' + r.map(c => `<td>${c}</td>`).join('') + '</tr>').join('');
        return `<span class="riddle-label">${riddle.label}</span>
                <table class="riddle-table"><thead>${head}</thead><tbody>${body}</tbody></table>`;
    }
    return `<span class="riddle-label">${riddle.label}</span>${escapeHtml(riddle.content)}`;
}

// Einfache HTML-Escape-Funktion (Sicherheit bei Textausgabe)
function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

// Antwortbereich aufbauen (Text vs. Keyword/Freitext)
function setupAnswerArea(block, solved) {
    const input = $('#answer-input');
    const btnText = $('#btn-check-answer');
    const textarea = $('#answer-textarea');
    const btnArea = $('#btn-check-textarea');

    $('#answer-label').textContent = block.answerLabel || 'Eure Lösung';
    input.value = '';
    textarea.value = '';

    if (block.answerType === 'keywords') {
        // Grosses Textfeld für Freitext-Vorschlag
        input.parentElement.classList.add('hidden');   // versteckt die Zeile mit input+button
        textarea.classList.remove('hidden');
        btnArea.classList.remove('hidden');
        textarea.placeholder = block.answerPlaceholder || 'Euren Vorschlag hier eingeben …';
    } else {
        input.parentElement.classList.remove('hidden');
        textarea.classList.add('hidden');
        btnArea.classList.add('hidden');
        input.placeholder = block.answerPlaceholder || 'Antwort eingeben …';
    }

    if (solved) {
        input.disabled = true; textarea.disabled = true;
        btnText.disabled = true; btnArea.disabled = true;
    } else {
        input.disabled = false; textarea.disabled = false;
        btnText.disabled = false; btnArea.disabled = false;
    }
}

/* =========================================================================
   7) HINWEISE
   ========================================================================= */

function showHint(blockId) {
    const block = BLOCKS.find(b => b.id === blockId);
    if (!block) return;

    const shown = state.hintsShownPerBlock[blockId] || 0;
    if (shown >= block.hints.length) {
        toast('Alle Hinweise für diesen Block sind bereits sichtbar.');
        return;
    }

    // nächsten Hinweis freischalten und zählen
    state.hintsShownPerBlock[blockId] = shown + 1;
    state.hintsUsed += 1;
    updateTeamRun();
    updateHud();

    renderShownHints(block);
    abiSay(block.hints[shown]);
}

// Bereits gezeigte Hinweise darstellen
function renderShownHints(block) {
    const shown = state.hintsShownPerBlock[block.id] || 0;
    const list = $('#hint-list');
    list.innerHTML = '';
    for (let i = 0; i < shown; i++) {
        const li = document.createElement('li');
        li.textContent = block.hints[i];
        list.appendChild(li);
    }
    $('#hint-counter').textContent = `${shown} / ${block.hints.length} Hinweisen genutzt`;
    const btn = $('#btn-show-hint');
    btn.disabled = shown >= block.hints.length;
}

/* =========================================================================
   8) ANTWORT PRÜFEN
   ========================================================================= */

function checkAnswer(blockId) {
    const block = BLOCKS.find(b => b.id === blockId);
    if (!block) return;
    if (state.solvedBlocks.includes(blockId)) return;

    let correct = false;

    if (block.answerType === 'keywords') {
        const text = $('#answer-textarea').value;
        correct = checkKeywords(block, text);
    } else {
        const answer = $('#answer-input').value;
        correct = block.acceptedAnswers.some(a => normalize(a) === normalize(answer));
    }

    const feedback = $('#answer-feedback');
    if (correct) {
        feedback.textContent = block.successMsg;
        feedback.className = 'answer-feedback ok';
        completeBlock(blockId);
    } else {
        feedback.textContent = ABI_MESSAGES.wrong;
        feedback.className = 'answer-feedback err';
        abiSay(ABI_MESSAGES.wrong);
    }
}

// Schlüsselbegriffe zählen (Block 4) – oder direktes Lösungswort akzeptieren
function checkKeywords(block, text) {
    const norm = String(text).toLowerCase();
    // direktes Lösungswort?
    if (block.acceptedAnswers && block.acceptedAnswers.some(a => normalize(a) === normalize(text))) {
        return true;
    }
    let count = 0;
    block.keywords.forEach(kw => {
        if (norm.includes(kw.toLowerCase())) count++;
    });
    return count >= (block.minKeywords || 4);
}

/* =========================================================================
   9) BLOCK ABSCHLIESSEN
   ========================================================================= */

function completeBlock(blockId) {
    if (!state.solvedBlocks.includes(blockId)) {
        state.solvedBlocks.push(blockId);
    }
    state.points = computePoints(state);
    updateTeamRun();
    updateHud();
    loadBlocks();

    // Antwortfelder sperren
    $('#answer-input').disabled = true;
    $('#answer-textarea').disabled = true;
    $('#btn-check-answer').disabled = true;
    $('#btn-check-textarea').disabled = true;

    const block = BLOCKS.find(b => b.id === blockId);
    abiSay(block.successMsg);
    toast(`+${CONFIG.pointsPerBlock} Punkte! Hinweis: ${block.blockHint}`);

    // Alle gelöst? -> finalen Code freischalten
    if (state.solvedBlocks.length === BLOCKS.length) {
        unlockFinalCode();
    }
}

/* =========================================================================
   10) FINALER CODE
   ========================================================================= */

function unlockFinalCode() {
    updateFinalCard();
    abiSay(ABI_MESSAGES.allSolved);
    toast('Alle Blöcke gelöst – der finale Code ist frei!');
}

// Overlay mit gesammelten Hinweisen öffnen
function openFinalOverlay() {
    if (state.finalSolved) { showEndScreen(); return; }
    if (state.solvedBlocks.length < BLOCKS.length) {
        toast('Zuerst alle 4 Blöcke lösen.');
        return;
    }
    const wrap = $('#collected-hints');
    wrap.innerHTML = BLOCKS.map(b => `
        <div class="hint-chip">
            <span class="chip-block">Block ${b.id}</span>
            <span class="chip-value">${b.blockHint}</span>
        </div>
    `).join('');

    $('#final-code-input').value = '';
    $('#final-feedback').textContent = '';
    $('#final-feedback').className = 'answer-feedback';
    $('#final-overlay').classList.remove('hidden');
}

function checkFinalCode() {
    const input = $('#final-code-input').value;
    const ok = FINAL_CODE.acceptedVariants.some(v => normalize(v) === normalize(input));
    const feedback = $('#final-feedback');

    if (ok) {
        state.finalSolved = true;
        state.endTime = Date.now();
        state.status = 'Abgeschlossen';
        state.points = computePoints(state);
        stopTimer();
        updateTeamRun();
        updateHud();
        updateFinalCard();

        feedback.textContent = FINAL_CODE.successMsg;
        feedback.className = 'answer-feedback ok';
        abiSay(FINAL_CODE.successMsg);

        setTimeout(() => {
            $('#final-overlay').classList.add('hidden');
            showEndScreen();
        }, 1500);
    } else {
        const msg = FINAL_CODE.errorMsgs[Math.floor(Math.random() * FINAL_CODE.errorMsgs.length)];
        feedback.textContent = msg;
        feedback.className = 'answer-feedback err';
        abiSay(msg);
    }
}

/* =========================================================================
   11) HUD AKTUALISIEREN
   ========================================================================= */

function updateHud() {
    if (!state) return;
    state.points = computePoints(state);
    $('#hud-team').textContent = state.teamName;
    $('#hud-points').textContent = state.points;
    $('#hud-hints').textContent = state.hintsUsed;
    $('#hud-solved').textContent = `${state.solvedBlocks.length} / ${BLOCKS.length}`;
    updateProgress();
}

/* =========================================================================
   12) LOCALSTORAGE / TEAM-LÄUFE
   ========================================================================= */

// Alle gespeicherten Läufe laden (robust bei leerem Storage)
function getAllRuns() {
    try {
        const raw = localStorage.getItem(CONFIG.storageKey);
        const arr = raw ? JSON.parse(raw) : [];
        return Array.isArray(arr) ? arr : [];
    } catch (e) {
        console.warn('Konnte Läufe nicht laden:', e);
        return [];
    }
}

// Alle Läufe speichern
function setAllRuns(runs) {
    try {
        localStorage.setItem(CONFIG.storageKey, JSON.stringify(runs));
    } catch (e) {
        console.warn('Konnte Läufe nicht speichern:', e);
    }
}

// Aktuellen Lauf neu anlegen
function saveTeamRun() {
    if (!state) return;
    const runs = getAllRuns();
    state.lastActiveTime = Date.now();
    state.points = computePoints(state);
    runs.push(serializeState(state));
    setAllRuns(runs);
}

// Aktuellen Lauf aktualisieren
function updateTeamRun() {
    if (!state) return;
    const runs = getAllRuns();
    state.lastActiveTime = Date.now();
    state.points = computePoints(state);
    const idx = runs.findIndex(r => r.id === state.id);
    if (idx >= 0) {
        runs[idx] = serializeState(state);
    } else {
        runs.push(serializeState(state));
    }
    setAllRuns(runs);
}

// State in ein speicherbares Objekt umwandeln
function serializeState(s) {
    return {
        id: s.id,
        teamName: s.teamName,
        startTime: s.startTime,
        endTime: s.endTime,
        lastActiveTime: s.lastActiveTime,
        hintsUsed: s.hintsUsed,
        solvedBlocks: s.solvedBlocks.slice(),
        finalSolved: s.finalSolved,
        bonus: s.bonus || 0,
        status: s.status,
        points: computePoints(s)
    };
}

// Teams der letzten 2 Stunden holen
function getRecentTeams() {
    const now = Date.now();
    return getAllRuns().filter(r => {
        const ref = r.endTime || r.lastActiveTime || r.startTime || 0;
        return (now - ref) <= CONFIG.recentWindowMs;
    });
}

// Alte Läufe (älter als 2 Std.) entfernen
function cleanOldTeamRuns() {
    const now = Date.now();
    const kept = getAllRuns().filter(r => {
        const ref = r.endTime || r.lastActiveTime || r.startTime || 0;
        return (now - ref) <= CONFIG.recentWindowMs;
    });
    setAllRuns(kept);
    return kept.length;
}

// Berechnete Zeitdauer eines Laufs
function runDuration(r) {
    const end = r.endTime || r.lastActiveTime || Date.now();
    return Math.max(0, end - (r.startTime || end));
}

/* =========================================================================
   13) LEADERBOARD
   ========================================================================= */

// Sortierlogik: Punkte desc, Zeit asc, Hinweise asc
function sortLeaderboard(runs) {
    return runs.slice().sort((a, b) => {
        if (b.points !== a.points) return b.points - a.points;
        const da = runDuration(a), db = runDuration(b);
        if (da !== db) return da - db;
        return (a.hintsUsed || 0) - (b.hintsUsed || 0);
    });
}

function renderLeaderboard() {
    const runs = sortLeaderboard(getRecentTeams());
    const body = $('#leaderboard-body');
    const empty = $('#leaderboard-empty');
    body.innerHTML = '';

    if (runs.length === 0) {
        empty.classList.remove('hidden');
        return;
    }
    empty.classList.add('hidden');

    const medals = ['🥇', '🥈', '🥉'];
    runs.forEach((r, i) => {
        const tr = document.createElement('tr');
        if (i < 3) tr.classList.add('rank-' + (i + 1));
        const rankLabel = i < 3 ? medals[i] : (i + 1);
        const statusClass = r.status === 'Abgeschlossen' ? 'status-done' : 'status-progress';
        // Aktuelles Team hervorheben
        const isMe = state && r.id === state.id;
        tr.innerHTML = `
            <td class="rank-cell">${rankLabel}</td>
            <td>${escapeHtml(r.teamName)}${isMe ? ' <strong>(ihr)</strong>' : ''}</td>
            <td><strong>${r.points}</strong></td>
            <td>${formatTime(runDuration(r))}</td>
            <td>${r.hintsUsed || 0}</td>
            <td>${(r.solvedBlocks || []).length} / ${BLOCKS.length}</td>
            <td><span class="status-pill ${statusClass}">${r.status}</span></td>
        `;
        body.appendChild(tr);
    });
}

// Platzierung des aktuellen Teams ermitteln
function getMyRank() {
    if (!state) return null;
    const runs = sortLeaderboard(getRecentTeams());
    const idx = runs.findIndex(r => r.id === state.id);
    return idx >= 0 ? idx + 1 : null;
}

// Rangliste zurücksetzen (alles löschen)
function resetLeaderboard() {
    setAllRuns([]);
}

/* =========================================================================
   14) ENDSCREEN
   ========================================================================= */

function showEndScreen() {
    const duration = runDuration(serializeState(state));
    const rank = getMyRank();
    $('#end-abi-text').textContent = FINAL_CODE.successMsg;

    const items = [
        ['Team', state.teamName],
        ['Punkte', `${state.points} / ${CONFIG.maxPoints}`],
        ['Benötigte Zeit', formatTime(duration)],
        ['Genutzte Hinweise', state.hintsUsed],
        ['Gelöste Blöcke', `${state.solvedBlocks.length} / ${BLOCKS.length}`],
        ['Platzierung', rank ? `#${rank}` : '–']
    ];
    $('#end-result-grid').innerHTML = items.map(([label, val]) => `
        <div class="result-item">
            <div class="r-label">${label}</div>
            <div class="r-value">${escapeHtml(String(val))}</div>
        </div>
    `).join('');

    showScreen('screen-end');
}

// Ergebnis als Text in die Zwischenablage kopieren
function copyResult() {
    const duration = runDuration(serializeState(state));
    const rank = getMyRank();
    const text =
`AI Business Escape Room – Ergebnis
Team: ${state.teamName}
Punkte: ${state.points} / ${CONFIG.maxPoints}
Zeit: ${formatTime(duration)}
Hinweise: ${state.hintsUsed}
Gelöste Blöcke: ${state.solvedBlocks.length} / ${BLOCKS.length}
Platzierung: ${rank ? '#' + rank : '–'}`;

    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(
            () => toast('Ergebnis kopiert!'),
            () => fallbackCopy(text)
        );
    } else {
        fallbackCopy(text);
    }
}
function fallbackCopy(text) {
    const ta = document.createElement('textarea');
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy'); toast('Ergebnis kopiert!'); }
    catch (e) { toast('Kopieren nicht möglich.'); }
    document.body.removeChild(ta);
}

/* =========================================================================
   15) NEUES TEAM
   ========================================================================= */

function newTeam() {
    stopTimer();
    state = null;
    currentBlockId = null;
    $('#team-name-input').value = '';
    $('#hud-timer').textContent = '00:00';
    showScreen('screen-start');
    $('#abi-container').classList.add('hidden');
}

/* =========================================================================
   16) ADMINBEREICH
   ========================================================================= */

let adminUnlocked = false;

function openAdminPanel() {
    $('#admin-overlay').classList.remove('hidden');
    if (adminUnlocked) {
        $('#admin-login').classList.add('hidden');
        $('#admin-panel').classList.remove('hidden');
        renderAdminSolutions();
        renderAdminTeams();
    } else {
        $('#admin-login').classList.remove('hidden');
        $('#admin-panel').classList.add('hidden');
        $('#admin-pw').value = '';
        $('#admin-login-msg').textContent = '';
    }
}

function adminLogin() {
    const pw = $('#admin-pw').value;
    if (pw === CONFIG.adminPassword) {
        adminUnlocked = true;
        $('#admin-login').classList.add('hidden');
        $('#admin-panel').classList.remove('hidden');
        renderAdminSolutions();
        renderAdminTeams();
    } else {
        $('#admin-login-msg').textContent = 'Falsches Passwort.';
        $('#admin-login-msg').className = 'answer-feedback err';
    }
}

// Lösungen + Hinweise anzeigen
function renderAdminSolutions() {
    const wrap = $('#admin-tab-solutions');
    let html = BLOCKS.map(b => {
        const sol = b.answerType === 'keywords'
            ? `Freitext mit min. ${b.minKeywords} Begriffen aus: ${b.keywords.join(', ')} · oder direkt „${b.acceptedAnswers.join('/')}“`
            : b.acceptedAnswers.join(' / ');
        return `
        <div class="admin-solution-block">
            <h4>${b.icon} Block ${b.id}: ${b.title}</h4>
            <div>Lösung: <span class="sol">${escapeHtml(sol)}</span></div>
            <div>Block-Hinweis (Final-Code): <span class="sol">${b.blockHint}</span></div>
            <ul>${b.hints.map(h => `<li>${escapeHtml(h)}</li>`).join('')}</ul>
        </div>`;
    }).join('');

    html += `
        <div class="admin-solution-block">
            <h4>🚪 Finaler Code</h4>
            <div>Lösung: <span class="sol">${FINAL_CODE.acceptedVariants[0]}</span></div>
            <div>Akzeptierte Varianten: ${FINAL_CODE.acceptedVariants.map(escapeHtml).join(' · ')}</div>
        </div>`;

    wrap.innerHTML = html;
}

// Teams anzeigen (mit Verwaltungsaktionen)
function renderAdminTeams() {
    const showOld = $('#admin-show-old').checked;
    const runs = sortLeaderboard(showOld ? getAllRuns() : getRecentTeams());
    const wrap = $('#admin-teams-list');

    if (runs.length === 0) {
        wrap.innerHTML = '<p class="admin-hint">Keine Teams vorhanden.</p>';
        return;
    }

    wrap.innerHTML = runs.map(r => {
        const blockToggles = BLOCKS.map(b => {
            const on = (r.solvedBlocks || []).includes(b.id);
            return `<button class="mini-toggle ${on ? 'on' : ''}" data-toggle-block="${r.id}:${b.id}">B${b.id} ${on ? '✓' : ''}</button>`;
        }).join('');

        return `
        <div class="admin-team-row">
            <div class="at-head">
                <span class="at-name">${escapeHtml(r.teamName)}</span>
                <span class="at-meta">${r.points} Pkt · ${formatTime(runDuration(r))} · ${r.hintsUsed || 0} Hinweise · ${r.status}${r.bonus ? ' · Bonus ' + r.bonus : ''}</span>
            </div>
            <div class="admin-block-toggles">${blockToggles}</div>
            <div class="admin-team-actions">
                <button class="btn btn-yellow btn-sm" data-bonus="${r.id}">+${CONFIG.bonusPoints} Bonus</button>
                <button class="btn btn-ghost btn-sm" data-complete="${r.id}">Als abgeschlossen markieren</button>
                <button class="btn btn-danger btn-sm" data-remove="${r.id}">Entfernen</button>
            </div>
        </div>`;
    }).join('');

    // Handler verbinden
    $$('#admin-teams-list [data-bonus]').forEach(btn =>
        btn.addEventListener('click', () => addBonusPoints(btn.dataset.bonus, CONFIG.bonusPoints)));
    $$('#admin-teams-list [data-complete]').forEach(btn =>
        btn.addEventListener('click', () => adminMarkComplete(btn.dataset.complete)));
    $$('#admin-teams-list [data-remove]').forEach(btn =>
        btn.addEventListener('click', () => adminRemoveTeam(btn.dataset.remove)));
    $$('#admin-teams-list [data-toggle-block]').forEach(btn =>
        btn.addEventListener('click', () => {
            const [teamId, blockId] = btn.dataset.toggleBlock.split(':');
            adminToggleBlock(teamId, parseInt(blockId, 10));
        }));
}

// Bonuspunkte vergeben
function addBonusPoints(teamId, points) {
    const runs = getAllRuns();
    const idx = runs.findIndex(r => r.id === teamId);
    if (idx < 0) return;
    runs[idx].bonus = (runs[idx].bonus || 0) + points;
    runs[idx].points = recomputeRunPoints(runs[idx]);
    setAllRuns(runs);
    syncCurrentStateFromRun(runs[idx]);
    renderAdminTeams();
    toast(`Bonus vergeben: +${points} Punkte`);
}

// Team manuell als abgeschlossen markieren
function adminMarkComplete(teamId) {
    const runs = getAllRuns();
    const idx = runs.findIndex(r => r.id === teamId);
    if (idx < 0) return;
    runs[idx].status = 'Abgeschlossen';
    runs[idx].finalSolved = true;
    if (!runs[idx].endTime) runs[idx].endTime = Date.now();
    runs[idx].points = recomputeRunPoints(runs[idx]);
    setAllRuns(runs);
    syncCurrentStateFromRun(runs[idx]);
    renderAdminTeams();
    toast('Team als abgeschlossen markiert.');
}

// Einzelnen Block manuell umschalten (gelöst / offen)
function adminToggleBlock(teamId, blockId) {
    const runs = getAllRuns();
    const idx = runs.findIndex(r => r.id === teamId);
    if (idx < 0) return;
    const solved = runs[idx].solvedBlocks || [];
    if (solved.includes(blockId)) {
        runs[idx].solvedBlocks = solved.filter(b => b !== blockId);
    } else {
        solved.push(blockId);
        runs[idx].solvedBlocks = solved;
    }
    runs[idx].points = recomputeRunPoints(runs[idx]);
    setAllRuns(runs);
    syncCurrentStateFromRun(runs[idx]);
    renderAdminTeams();
}

// Team entfernen
function adminRemoveTeam(teamId) {
    let runs = getAllRuns();
    runs = runs.filter(r => r.id !== teamId);
    setAllRuns(runs);
    renderAdminTeams();
    toast('Team entfernt.');
}

// Punkte eines gespeicherten Laufs neu berechnen
function recomputeRunPoints(r) {
    return (r.solvedBlocks || []).length * CONFIG.pointsPerBlock
        + (r.finalSolved ? CONFIG.pointsFinalCode : 0)
        + (r.bonus || 0);
}

// Falls der Admin das gerade aktive Team ändert, State im Spiel angleichen
function syncCurrentStateFromRun(run) {
    if (state && state.id === run.id) {
        state.solvedBlocks = (run.solvedBlocks || []).slice();
        state.finalSolved = run.finalSolved;
        state.bonus = run.bonus || 0;
        state.status = run.status;
        state.endTime = run.endTime;
        state.points = computePoints(state);
        updateHud();
        if ($('#screen-game').classList.contains('active')) {
            loadBlocks();
        }
    }
}

/* =========================================================================
   17) EVENT-BINDINGS
   ========================================================================= */

function bindEvents() {
    // Start
    $('#btn-start').addEventListener('click', startGame);
    $('#team-name-input').addEventListener('keydown', e => { if (e.key === 'Enter') startGame(); });
    $('#btn-show-leaderboard-start').addEventListener('click', () => { renderLeaderboard(); showScreen('screen-leaderboard'); });

    // Header
    $('#btn-header-leaderboard').addEventListener('click', () => { renderLeaderboard(); showScreen('screen-leaderboard'); });

    // Block-Overlay
    $('#btn-close-block').addEventListener('click', () => $('#block-overlay').classList.add('hidden'));
    $('#btn-show-hint').addEventListener('click', () => showHint(currentBlockId));
    $('#btn-check-answer').addEventListener('click', () => checkAnswer(currentBlockId));
    $('#btn-check-textarea').addEventListener('click', () => checkAnswer(currentBlockId));
    $('#answer-input').addEventListener('keydown', e => { if (e.key === 'Enter') checkAnswer(currentBlockId); });

    // Finaler Code
    $('#btn-open-final').addEventListener('click', openFinalOverlay);
    $('#btn-close-final').addEventListener('click', () => $('#final-overlay').classList.add('hidden'));
    $('#btn-check-final').addEventListener('click', checkFinalCode);
    $('#final-code-input').addEventListener('keydown', e => { if (e.key === 'Enter') checkFinalCode(); });

    // Endscreen
    $('#btn-end-leaderboard').addEventListener('click', () => { renderLeaderboard(); showScreen('screen-leaderboard'); });
    $('#btn-copy-result').addEventListener('click', copyResult);
    $('#btn-new-team').addEventListener('click', newTeam);

    // Leaderboard
    $('#btn-refresh-leaderboard').addEventListener('click', renderLeaderboard);
    $('#btn-clean-old').addEventListener('click', () => {
        const kept = cleanOldTeamRuns();
        renderLeaderboard();
        toast(`Alte Ergebnisse gelöscht. ${kept} Team(s) verbleiben.`);
    });
    $('#btn-leaderboard-back').addEventListener('click', () => {
        showScreen(state ? 'screen-game' : 'screen-start');
    });

    // Admin
    $('#btn-admin-open').addEventListener('click', openAdminPanel);
    $('#btn-close-admin').addEventListener('click', () => $('#admin-overlay').classList.add('hidden'));
    $('#btn-admin-login').addEventListener('click', adminLogin);
    $('#admin-pw').addEventListener('keydown', e => { if (e.key === 'Enter') adminLogin(); });
    $('#admin-show-old').addEventListener('change', renderAdminTeams);
    $('#btn-admin-clean-old').addEventListener('click', () => {
        cleanOldTeamRuns(); renderAdminTeams(); toast('Alte Ergebnisse gelöscht.');
    });
    $('#btn-admin-reset').addEventListener('click', () => {
        if (confirm('Wirklich die komplette Rangliste löschen? Das kann nicht rückgängig gemacht werden.')) {
            resetLeaderboard(); renderAdminTeams(); toast('Rangliste zurückgesetzt.');
        }
    });

    // Admin-Tabs
    $$('.admin-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            $$('.admin-tab').forEach(t => t.classList.remove('active'));
            $$('.admin-tab-content').forEach(c => c.classList.remove('active'));
            tab.classList.add('active');
            $('#admin-tab-' + tab.dataset.tab).classList.add('active');
            if (tab.dataset.tab === 'teams') renderAdminTeams();
        });
    });

    // Overlays per Klick auf den Hintergrund schliessen
    $$('.overlay').forEach(ov => {
        ov.addEventListener('click', e => { if (e.target === ov) ov.classList.add('hidden'); });
    });
}

/* =========================================================================
   18) INITIALISIERUNG
   ========================================================================= */

document.addEventListener('DOMContentLoaded', () => {
    bindEvents();
    // Sicherstellen, dass die App auch bei leerem localStorage läuft
    getAllRuns();
    showScreen('screen-start');
});
