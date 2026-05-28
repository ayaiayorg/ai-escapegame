/* ============================================================
   AI ESCAPE ROOM - GAME LOGIC
   
   KONFIGURATION:
   - Alle Rätsel im Array STATIONS
   - Abi-Kommentare in ABI_COMMENTS
   - Fehlermeldungen in ERROR_MESSAGES
   - Fun-Tasks in FUN_TASKS
   - Alles einfach anpassbar!
   ============================================================ */

// ============================================================
// ABI KOMMENTARE - Hier anpassen
// ============================================================

const ABI_COMMENTS = {
    greeting: "Wenn ihr Fragen habt, fragt mich ruhig. Aber denkt daran: Ich bin eine KI, kein Orakel. Manchmal antworte ich mit einem Hinweis, manchmal mit einem Witz, und manchmal... gar nicht. Viel Glück! \uD83E\uDD16",
    correct: [
        "Sehr gut! Diese Tür hat sich geöffnet, ohne dass jemand ein Ticket schreiben musste.",
        "Korrekt! Meine Schaltkreise freuen sich. Das passiert selten.",
        "Richtig! Ihr seid besser als mein letztes Software-Update.",
        "Perfekt! Ich würde klatschen, aber ich habe keine Hände."
    ],
    wrong: [
        "Fast richtig. Aber nur fast. Meine digitalen Augenbrauen sind skeptisch.",
        "Die KI ist verwirrt und braucht kurz einen Kaffee.",
        "Dieser Code öffnet leider nur die Tür zum Druckerraum. Und glaubt mir, da wollt ihr nicht hin.",
        "Die Antwort wurde von der Kaffeemaschine abgelehnt. Sie ist streng, aber gerecht.",
        "Sehr kreativ und gewagt. Leider falsch. Aber hey, ich mag euren Stil!",
        "Ich habe noch nie eine so schlechte Antwort gesehen."
    ],
    hint: [
        "Hinweis aktiviert. Viel Spass im Arbon!",
        "Ich helfe ja gerne, aber das kostet euch 5 Punkte. Wirtschaftlichkeit!",
        "Ein Hinweis, frisch aus meiner ausserirdischenDatenbank. Bitte schön."
    ],
    stationComplete: [
        "Station geschafft! Weiter so, bevor mein Akku leer wird.",
        "Geschafft! Ich bin fast stolz. Fast.",
        "Nächste Station freigeschaltet. Ihr seid noch nicht draussen!",
        "Sehr gut. Das Labyrinth wird nervös."
    ],
    ending: "Gratulation! Ihr seid aus dem digitalen Labyrinth entkommen. Die AI ist beeindruckt. Die Kaffeemaschine auch."
};

// ============================================================
// LUSTIGE FEHLERMELDUNGEN
// ============================================================

const ERROR_MESSAGES = [
    "Die KI ist verwirrt und braucht kurz einen Kaffee. \u2615",
    "Fast richtig. Aber nur fast. Abi runzelt die digitalen Augenbrauen. \uD83E\uDD28",
    "Dieser Code öffnet leider nur die Tür zum Druckerraum. \uD83D\uDDA8\uFE0F",
    "Die Antwort wurde von der Kaffeemaschine abgelehnt. \u274C",
    "Mutig. Kreativ. Leider falsch. \uD83D\uDE05",
    "Abi sagt: Ich habe schon schlechtere Antworten gesehen. Aber nicht viele. \uD83E\uDD16"
];

// ============================================================
// FUN TASKS nach jeder Station
// ============================================================

const FUN_TASKS = [
    "Feiert euren Erfolg mit einem dramatischen Teamnamen-Intro! Stellt euch vor, ihr wärt in einer Gameshow. \uD83C\uDFA4",
    "Erfindet in 20 Sekunden einen schlechten AI-Werbeslogan. Je schlechter, desto besser! \uD83D\uDCE2",
    "Bestimmt eine Person im Team zum offiziellen Chief Prompt Officer (CPO). Krone ist optional. \uD83D\uDC51",
    "Ruft euren finalen Code so dramatisch, als wäre es das Staffelfinale einer Serie! \uD83C\uDFAC"
];

// ============================================================
// STATIONEN - Rätsel, Lösungen, Hinweise
// ============================================================

const STATIONS = [
    {
        id: 1,
        title: "Die geheimnisvolle E-Mail",
        icon: "\uD83D\uDCE7",
        story: "Abi projiziert eine flackernde E-Mail auf den Bildschirm. Der Absender ist unbekannt. Der Betreff lautet: \u00ABNicht alles, was klar wirkt, führt zum Ausgang.\u00BB",
        task: "Lest die E-Mail genau. Irgendwo darin verbirgt sich ein Hinweis auf das Lösungswort. Nutzt AI, um den Text zu analysieren.",
        content: "<p>In alten Systemen ist Ordnung selten dort, wo man sie zuerst vermutet; oft liegt ein Schleier darüber, und nur wer genau hinsieht, erkennt im scheinbaren Chaos das entscheidende Element, denn Nebel verschleiert meist nur das Offensichtliche.</p><p>Wer beginnt zu suchen, folgt oft den lautesten Spuren, doch diese führen selten ans Ziel, weil sie Erwartungen bedienen statt sie zu prüfen; Hinter klaren Mustern verbirgt sich selten die wahre Struktur.</p><p>Ein Ansatz kann überzeugend wirken und dennoch falsch sein, weil er unbemerkt Regeln übernimmt, die nie Teil der Aufgabe waren; wirklich kritisch wird es erst, wenn Fremde Logik unreflektiert übernommen wird.</p><p>Viele übersehen, dass nicht alles gleich gewichtet werden darf, denn Unterschiede tragen Bedeutung, auch wenn sie subtil sind, und oft erkennt man die Verbindung erst spät, wenn die richtigen Fäden zusammengeführt werden.</p><p>Inhalte scheinen wichtiger als Form, doch genau das ist häufig ein Irrtum, da Lösungen sich strukturell zeigen und nicht semantisch; wer nur am Rand sucht, verpasst, dass Ränder selten die Antwort tragen.</p><p>Wiederholungen wirken wie Signale, doch sie täuschen oft mehr, als sie helfen, weil sie Aufmerksamkeit binden ohne Richtung zu geben; solche Effekte gleichen eher widerhallenden Echos als echten Hinweisen.</p><p>Ein klarer Gedanke vermittelt Sicherheit, doch Sicherheit ist kein Beweis, und wer sich zu früh festlegt, wird blind für Alternativen; genau hier ist Vorsicht entscheidend.</p><p>Struktur entsteht nicht aus Menge, sondern aus Auswahl, und wer alles gleich behandelt, verliert den Blick für Relevanz; oft zeigt sich erst spät, warum gerade Enden entscheidend sein können.</p><p>Lineares Lesen führt selten zum Ziel, weil es Brüche ignoriert, und genau in solchen Übergängen liegt oft der Schlüssel; wer quer denkt, erkennt schneller, wie wichtig Quer verlaufende Muster sind.</p><p>Komplexität wirkt beeindruckend, doch sie ist selten notwendig, und in vielen Fällen genügt eine kleine Anpassung, um Klarheit zu schaffen, denn sobald sich etwas Verschiebt, verändert sich die Perspektive.</p><p>Ein Ergebnis kann vollständig erscheinen und dennoch falsch sein, weil der letzte Schritt fehlt, und genau dieser wird oft übersehen; deshalb sollte der Fokus nie zu früh verloren gehen.</p><p>Wer seine Annahmen nicht hinterfragt, bewegt sich im Kreis, auch wenn Fortschritt scheinbar sichtbar ist, und nur durch aktive Kontrolle lässt sich erkennen, wann es nötig ist zu Prüfen.</p><p>Am Ende wirkt alles offensichtlich, doch dieser Eindruck entsteht erst nach dem entscheidenden Perspektivwechsel; denn manchmal zeigt sich die Lösung erst durch Umkehr.</p>",
        solution: "AUSSERIRDISCH",
        altSolutions: ["AUSSERIRDISCH"],
        hints: [
            "Abi flüstert: Der Inhalt ist Ablenkung. Die Struktur verrät das Geheimnis &ndash; schaut euch an, wie der Text aufgebaut ist.",
            "Abi sagt: 13 Absätze, 13 Buchstaben. Was verraten die Anfangsbuchstaben, wenn man sie rückwärts liest?"
        ],
        pointsPerStation: 25,
        hintCost: 5
    },
    {
        id: 2,
        title: "Das chaotische Dokument",
        icon: "\uD83D\uDCC4",
        story: "Ein Drucker spuckt plötzlich 27 Seiten Datenmüll aus. Abi behauptet, das sei \u00ABvöllig normal\u00BB. Zwischen Meetings, Zahlen und Kaffeespuren steckt der nächste Code.",
        task: "Analysiert das Dokument mit Hilfe von AI. Findet das versteckte Muster und das Lösungswort.",
        content: "<p><strong>INTERNES MEMO &ndash; Facility Management</strong></p><p>Datum: Montag, 08:13 Uhr<br>Betreff: Anomalien im Gebäudesystem</p><p>Sensor 3A meldet erhöhten Wasserverbrauch in der Küche (Etage 2). Ursache unklar. Die Filteranlage wurde um 07:58 aktiviert, Temperatur auf 94&deg;C eingestellt. Verbrauchsmuster: 6x zwischen 08:00 und 08:30, dann Pause, dann erneut 4x zwischen 09:00 und 09:15.</p><p>Parallel dazu: Meetingraum A doppelt gebucht (Konflikt HR/Marketing). Meetingraum B leer, aber Heizung auf 27&deg;C. IT meldet Druckerstau in Etage 3 (Papiersensor defekt, Ticket #4471).</p><p>Auffällig: Die Mitarbeiterbefragung Q2 zeigt, dass 89% der Befragten eine bestimmte Ressource als \u00ABunverzichtbar für Produktivität\u00BB bewerten. Diese Ressource ist weder digitaler noch elektrischer Natur. Sie wurde im Budget unter \u00ABBetriebsmittel, Kategorie Getränke, Unterkategorie Heissgetränke, Sorte: Arabica/Robusta\u00BB erfasst.</p><p>Wartungsprotokoll Gerät KM-7 (Küche E2): Letzte Entkalkung vor 14 Tagen. Bohnenbehälter zu 23% gefüllt. Täglicher Output: durchschnittlich 47 Einheiten. Fehlermeldung letzte Woche: \u00ABBrühgruppe blockiert\u00BB.</p><p>Randnotiz des Facility Managers: <em>\u00ABWenn dieses Gerät ausfällt, kann ich gleich den ganzen Standort schliessen.\u00BB</em></p><p>Zusatzinfo: Budgetposition 2024-GM-0891 wurde um 12% erhöht. Lieferant: Tschibo Business Solutions. Vertragslaufzeit: 36 Monate.</p><p><strong>Aufgabe an alle: Bitte Anomalien bis Freitag melden. Priorisierung nach Relevanz für den Betriebsablauf.</strong></p>",
        solution: "KAFFEE",
        altSolutions: [],
        hints: [
            "Abi sagt: Die Zahlen sind Ablenkung. Worum dreht sich das GANZE Dokument eigentlich?",
            "Abi sagt: Gerät KM-7, Brühgruppe, Bohnen, 94 Grad, Arabica... Was wird hier hergestellt?"
        ],
        pointsPerStation: 25,
        hintCost: 5
    },
    {
        id: 3,
        title: "Die Prompt-Challenge",
        icon: "\uD83D\uDD11",
        story: "Vor euch steht eine digitale Tür. Sie öffnet sich nicht mit Kraft, sondern mit Logik. Abi setzt eine winzige Brille auf und murmelt etwas von \u00ABSemantik\u00BB.",
        task: "Löst das Rätsel. Gebt das Lösungswort ein (ohne Umlaute, Grossbuchstaben).",
        content: "<p>Die Tür vor euch hat kein Schloss im klassischen Sinn. Stattdessen zeigt ein Display folgende Nachricht:</p><p style=\"text-align:center; font-size:1.1rem; padding:1.2rem; background:#f3e5f5; border-radius:10px; border:2px solid #9c27b0; margin:1rem 0;\"><em>\u00ABIch habe Zähne, aber ich beisse nicht.<br>Ich habe einen Bart, aber kein Gesicht.<br>Ich drehe mich, doch ich bin kein Rad.<br>Ohne mich bleibt geschlossen, was Zugang hat.<br>Mein Name trägt im Deutschen ein \u00fc,<br>doch hier schreibt man mich ohne \u2013 gebt euch Müh.<br>Was bin ich?\u00BB</em></p><p>Zusätzlich steht auf einem Zettel daneben:</p><p style=\"padding:0.8rem; background:#fff3e0; border-radius:8px; border-left:4px solid #ff9800;\">Systemmeldung: Die Tür akzeptiert nur Eingaben ohne Sonderzeichen. Umlaute müssen aufgelöst werden (ü statt \u00fc, ä statt \u00e4). Genau 10 Zeichen erwartet.</p><p>Abi ergänzt: <em>\u00ABFragt eine KI, wenn ihr bei Rätseln nicht weiterkommt. Aber formuliert eure Frage präzise \u2013 sonst bekommt ihr 17 verschiedene Antworten.\u00BB</em></p>",
        solution: "SCHLÜSSEL",
        altSolutions: ["SCHLUESSEL"],
        hints: [
            "Abi sagt: Das Rätsel beschreibt ein physisches Objekt. Zähne + Bart + dreht sich + öffnet etwas...",
            "Abi sagt: 10 Buchstaben, beginnt mit S, endet mit L. Das Ü ersetzt ein \u00fc."
        ],
        pointsPerStation: 25,
        hintCost: 5
    },
    {
        id: 4,
        title: "Die Daten-Challenge",
        icon: "\uD83D\uDCCA",
        story: "Abi öffnet ein Dashboard, das aussieht, als hätte jemand Excel, Kaffeesatz und Zukunftsvisionen gleichzeitig benutzt. In diesem Datenchaos versteckt sich der finale Code.",
        task: "Analysiert die Datentabelle. Der vierstellige Code ergibt sich aus einer logischen Operation auf den Daten. Nutzt AI!",
        content: "<table><tr><th>ID</th><th>Projekt</th><th>Status</th><th>Wert</th><th>Prio</th><th>Jahr</th></tr><tr><td>A1</td><td>Chatbot Relaunch</td><td>Aktiv</td><td>12</td><td>Mittel</td><td>2028</td></tr><tr><td>B7</td><td>Legacy Migration</td><td>Pausiert</td><td>45</td><td>Niedrig</td><td>2031</td></tr><tr><td>C3</td><td>AI Vision</td><td>Aktiv</td><td>20</td><td>Hoch</td><td>2035</td></tr><tr><td>D9</td><td>Dashboard v3</td><td>Abgeschlossen</td><td>8</td><td>Mittel</td><td>2026</td></tr><tr><td>E2</td><td>Kundenportal</td><td>Aktiv</td><td>33</td><td>Niedrig</td><td>2029</td></tr><tr><td>F5</td><td>AI Assistent</td><td>Aktiv</td><td>15</td><td>Hoch</td><td>2035</td></tr><tr><td>G8</td><td>Datenbank Refresh</td><td>Pausiert</td><td>27</td><td>Mittel</td><td>2030</td></tr><tr><td>H4</td><td>Smart Automation</td><td>Aktiv</td><td>0</td><td>Hoch</td><td>2035</td></tr><tr><td>I6</td><td>Reporting Tool</td><td>Abgeschlossen</td><td>19</td><td>Niedrig</td><td>2027</td></tr></table><p style=\"margin-top:1rem; padding:1rem; background:#e8eaf6; border-radius:10px; border:2px solid #3f51b5;\"><strong>Entschlüsselungsprotokoll:</strong> Filtere alle Projekte mit Status \u00ABAktiv\u00BB UND Priorität \u00ABHoch\u00BB. Die Jahreszahl, die bei allen gefilterten Einträgen identisch ist, ergibt den finalen Code.</p>",
        solution: "2035",
        altSolutions: [],
        hints: [
            "Abi sagt: Filtert zuerst nach Status=Aktiv, dann nach Prio=Hoch. Was bleibt übrig?",
            "Abi sagt: Drei Projekte erfüllen beide Kriterien. Schaut euch deren gemeinsame Jahreszahl an."
        ],
        pointsPerStation: 25,
        hintCost: 5
    }
];

// ============================================================
// GAME STATE
// ============================================================

let gameState = {
    teamName: "",
    currentStation: 0,
    points: 0,
    hintsUsed: 0,
    hintsPerStation: [0, 0, 0, 0],
    solvedStations: [false, false, false, false],
    startTime: null,
    timerInterval: null,
    elapsedSeconds: 0
};

// ============================================================
// GAME FUNCTIONS
// ============================================================

/** Spiel starten */
function startGame() {
    const nameInput = document.getElementById("team-name-input");
    const teamName = nameInput.value.trim();
    
    if (!teamName) {
        nameInput.style.borderColor = "#FF5252";
        nameInput.placeholder = "Bitte einen Teamnamen eingeben!";
        return;
    }
    
    gameState.teamName = teamName;
    gameState.currentStation = 0;
    gameState.points = 0;
    gameState.hintsUsed = 0;
    gameState.hintsPerStation = [0, 0, 0, 0];
    gameState.solvedStations = [false, false, false, false];
    gameState.startTime = Date.now();
    gameState.elapsedSeconds = 0;
    
    document.getElementById("team-name-display").textContent = teamName;
    document.getElementById("points-display").textContent = "0";
    document.getElementById("hints-display").textContent = "0";
    document.getElementById("timer-display").textContent = "00:00";
    
    gameState.timerInterval = setInterval(updateTimer, 1000);
    
    renderStation(0);
    updateProgress();
    showScreen("game-screen");
    showAbi(ABI_COMMENTS.greeting);
}

/** Timer aktualisieren */
function updateTimer() {
    gameState.elapsedSeconds++;
    document.getElementById("timer-display").textContent = formatTime(gameState.elapsedSeconds);
}

/** Sekunden zu mm:ss */
function formatTime(totalSeconds) {
    var m = Math.floor(totalSeconds / 60);
    var s = totalSeconds % 60;
    return String(m).padStart(2, "0") + ":" + String(s).padStart(2, "0");
}

/** Screen wechseln */
function showScreen(screenId) {
    document.querySelectorAll(".screen").forEach(function(s) { s.classList.remove("active"); });
    document.getElementById(screenId).classList.add("active");
    
    // Abi sichtbar im Game
    var abiContainer = document.getElementById("abi-container");
    if (screenId === "game-screen") {
        abiContainer.classList.remove("hidden");
    } else {
        abiContainer.classList.add("hidden");
    }
}

/** Abi Sprechblase anzeigen (verschwindet nach 5 Sekunden) */
var abiTimeout = null;

function showAbi(text) {
    var abiText = document.getElementById("abi-text");
    var bubble = document.getElementById("abi-speech");
    abiText.textContent = text;
    bubble.style.display = "block";
    bubble.style.animation = "none";
    setTimeout(function() { bubble.style.animation = "bubble-pop 0.4s ease"; }, 10);
    
    if (abiTimeout) clearTimeout(abiTimeout);
    abiTimeout = setTimeout(function() {
        bubble.style.display = "none";
    }, 5000);
}

/** Abi Hover: Sprechblase nur solange Maus drauf ist */
document.addEventListener("DOMContentLoaded", function() {
    var abiChar = document.querySelector(".abi-character");
    if (abiChar) {
        abiChar.style.cursor = "pointer";
        abiChar.addEventListener("mouseenter", function() {
            var bubble = document.getElementById("abi-speech");
            if (abiTimeout) clearTimeout(abiTimeout);
            bubble.style.display = "block";
            bubble.style.animation = "none";
            setTimeout(function() { bubble.style.animation = "bubble-pop 0.4s ease"; }, 10);
        });
        abiChar.addEventListener("mouseleave", function() {
            var bubble = document.getElementById("abi-speech");
            bubble.style.display = "none";
        });
    }
});

/** Zufälliges Element aus Array */
function randomFrom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

/** Abi Gesichtsausdruck bei falscher Antwort */
var ABI_EXPRESSIONS = ["abi-sad", "abi-laugh", "abi-confused", "abi-eyeroll", "abi-shake", "abi-skeptical"];
var abiExprTimeout = null;

function showAbiExpression(forceExpr) {
    var head = document.querySelector("#abi-container .abi-head");
    if (!head) return;
    // Vorherige Expression entfernen
    ABI_EXPRESSIONS.forEach(function(cls) { head.classList.remove(cls); });
    if (abiExprTimeout) clearTimeout(abiExprTimeout);
    // Expression setzen (erzwungen oder zufällig)
    var expr = forceExpr || randomFrom(ABI_EXPRESSIONS);
    head.classList.add(expr);
    abiExprTimeout = setTimeout(function() {
        head.classList.remove(expr);
    }, 2500);
}

/** Station rendern */
function renderStation(index) {
    var station = STATIONS[index];
    var container = document.getElementById("station-container");
    var isSolved = gameState.solvedStations[index];
    
    var html = '<div class="station-card ' + (isSolved ? 'solved' : '') + '">';
    html += '<div class="station-header">';
    html += '<span class="station-icon">' + station.icon + '</span>';
    html += '<h2 class="station-title">Station ' + station.id + ': ' + station.title + '</h2>';
    html += '</div>';
    html += '<div class="station-story">' + station.story + '</div>';
    html += '<p class="station-task">\uD83C\uDFAF ' + station.task + '</p>';
    html += '<div class="station-content">' + station.content + '</div>';
    html += '<div class="feedback" id="feedback-' + index + '"></div>';
    
    if (!isSolved) {
        html += '<div class="answer-area">';
        html += '<input type="text" class="answer-input" id="answer-input-' + index + '" placeholder="Lösungswort eingeben..." onkeydown="handleKey(event,' + index + ')">';
        html += '<button class="btn btn-submit" onclick="submitAnswer(' + index + ')">Prüfen \u2714\uFE0F</button>';
        html += '</div>';
        html += '<div class="hint-area">';
        html += '<button class="btn btn-hint" onclick="showHint(' + index + ')">\uD83D\uDCA1 Hinweis</button>';
        html += '<span class="hint-cost">(-' + station.hintCost + ' Punkte)</span>';
        html += '</div>';
    } else {
        html += '<div class="feedback success">\u2705 Diese Station wurde bereits gelöst!</div>';
    }
    
    html += '</div>';
    container.innerHTML = html;
    
    // Focus auf Input
    if (!isSolved) {
        setTimeout(function() {
            var inp = document.getElementById("answer-input-" + index);
            if (inp) inp.focus();
        }, 100);
    }
}

/** Enter-Taste */
function handleKey(event, idx) {
    if (event.key === "Enter") submitAnswer(idx);
}

/** Antwort prüfen */
function submitAnswer(stationIndex) {
    var station = STATIONS[stationIndex];
    var input = document.getElementById("answer-input-" + stationIndex);
    var feedback = document.getElementById("feedback-" + stationIndex);
    var answer = input.value.trim().toUpperCase();
    
    if (!answer) {
        feedback.className = "feedback error";
        feedback.textContent = "Bitte gebt eine Antwort ein!";
        return;
    }
    
    // Lösung prüfen (Haupt + Alternativen)
    var isCorrect = (answer === station.solution.toUpperCase());
    if (!isCorrect && station.altSolutions) {
        for (var i = 0; i < station.altSolutions.length; i++) {
            if (answer === station.altSolutions[i].toUpperCase()) {
                isCorrect = true;
                break;
            }
        }
    }
    
    if (isCorrect) {
        // RICHTIG!
        gameState.solvedStations[stationIndex] = true;
        gameState.points += station.pointsPerStation;
        
        feedback.className = "feedback success success-anim";
        feedback.textContent = "\uD83C\uDF89 Korrekt! +" + station.pointsPerStation + " Punkte!";
        input.disabled = true;
        
        updateProgress();
        updatePointsDisplay();
        showAbi(randomFrom(ABI_COMMENTS.correct));
        
        // Alle gelöst?
        if (gameState.solvedStations.every(function(s) { return s; })) {
            setTimeout(showEndScreen, 2000);
        } else {
            setTimeout(function() {
                var next = findNextUnsolved();
                if (next !== -1) {
                    gameState.currentStation = next;
                    renderStation(next);
                    updateProgress();
                    showAbi(randomFrom(ABI_COMMENTS.stationComplete));
                }
            }, 1500);
        }
    } else {
        // FALSCH
        feedback.className = "feedback error";
        feedback.textContent = randomFrom(ERROR_MESSAGES);
        input.value = "";
        input.focus();
        var wrongMsg = randomFrom(ABI_COMMENTS.wrong);
        showAbi(wrongMsg);
        if (wrongMsg.indexOf("skeptisch") !== -1) {
            showAbiExpression("abi-skeptical");
        } else {
            showAbiExpression();
        }
    }
}

/** Fun Popup anzeigen */
function showFunPopup(stationIndex) {
    var popup = document.getElementById("fun-popup");
    var text = document.getElementById("fun-popup-text");
    text.textContent = FUN_TASKS[stationIndex];
    popup.classList.remove("hidden");
}

/** Fun Popup schliessen */
function closeFunPopup() {
    document.getElementById("fun-popup").classList.add("hidden");
    
    // Nächste Station oder Ende
    if (gameState.solvedStations.every(function(s) { return s; })) {
        setTimeout(showEndScreen, 500);
    } else {
        var next = findNextUnsolved();
        if (next !== -1) {
            gameState.currentStation = next;
            renderStation(next);
            updateProgress();
            showAbi(randomFrom(ABI_COMMENTS.stationComplete));
        }
    }
}

/** Nächste ungelöste Station */
function findNextUnsolved() {
    for (var i = 0; i < STATIONS.length; i++) {
        if (!gameState.solvedStations[i]) return i;
    }
    return -1;
}

/** Hinweis anzeigen */
function showHint(stationIndex) {
    var station = STATIONS[stationIndex];
    var hintIdx = gameState.hintsPerStation[stationIndex];
    var feedback = document.getElementById("feedback-" + stationIndex);
    
    if (hintIdx >= station.hints.length) {
        feedback.className = "feedback hint-msg";
        feedback.textContent = "Keine weiteren Hinweise verfügbar! \uD83E\uDD37";
        return;
    }
    
    gameState.points = Math.max(0, gameState.points - station.hintCost);
    gameState.hintsUsed++;
    gameState.hintsPerStation[stationIndex]++;
    
    feedback.className = "feedback hint-msg";
    feedback.textContent = "\uD83D\uDCA1 " + station.hints[hintIdx];
    
    updatePointsDisplay();
    showAbi(randomFrom(ABI_COMMENTS.hint));
}

/** Fortschritt aktualisieren */
function updateProgress() {
    var solved = gameState.solvedStations.filter(function(s) { return s; }).length;
    var percent = Math.round((solved / STATIONS.length) * 100);
    
    document.getElementById("progress-bar").style.width = percent + "%";
    document.getElementById("progress-label").textContent = percent + "%";
    document.getElementById("progress-text").textContent = "Station " + (gameState.currentStation + 1) + " / " + STATIONS.length;
}

/** Punkte aktualisieren */
function updatePointsDisplay() {
    document.getElementById("points-display").textContent = gameState.points;
    document.getElementById("hints-display").textContent = gameState.hintsUsed;
}

/** End-Screen */
function showEndScreen() {
    clearInterval(gameState.timerInterval);
    
    document.getElementById("end-team-name").textContent = gameState.teamName;
    document.getElementById("end-points").textContent = gameState.points + " / 100";
    document.getElementById("end-time").textContent = formatTime(gameState.elapsedSeconds);
    document.getElementById("end-hints").textContent = gameState.hintsUsed;
    
    showScreen("end-screen");
}

/** Ergebnis kopieren */
function copyResult() {
    var text = "AI Escape Room - Ergebnis\n";
    text += "========================\n";
    text += "Team: " + gameState.teamName + "\n";
    text += "Punkte: " + gameState.points + " / 100\n";
    text += "Zeit: " + formatTime(gameState.elapsedSeconds) + "\n";
    text += "Hinweise genutzt: " + gameState.hintsUsed + "\n";
    text += "========================\n";
    text += "AI Playground Day at SWICA";
    
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(function() {
            alert("Ergebnis in die Zwischenablage kopiert! \uD83D\uDCCB");
        });
    } else {
        // Fallback
        var ta = document.createElement("textarea");
        ta.value = text;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
        alert("Ergebnis kopiert! \uD83D\uDCCB");
    }
}

/** Spiel zurücksetzen */
function resetGame() {
    clearInterval(gameState.timerInterval);
    gameState = {
        teamName: "",
        currentStation: 0,
        points: 0,
        hintsUsed: 0,
        hintsPerStation: [0, 0, 0, 0],
        solvedStations: [false, false, false, false],
        startTime: null,
        timerInterval: null,
        elapsedSeconds: 0
    };
    
    document.getElementById("team-name-input").value = "";
    closeAdmin();
    showScreen("start-screen");
}

// ============================================================
// ADMIN / MODERATIONSMODUS
// ============================================================

/** Admin prüfen */
function checkAdmin(event) {
    if (event.key === "Enter") {
        var input = document.getElementById("admin-input");
        if (input.value.trim().toLowerCase() === "admin") {
            showAdmin();
            input.value = "";
        }
    }
}

/** Admin-Panel öffnen */
function showAdmin() {
    var panel = document.getElementById("admin-panel");
    var sol = document.getElementById("admin-solutions");
    
    var html = "";
    STATIONS.forEach(function(s) {
        html += '<div class="admin-solution-item">';
        html += '<p><strong>Station ' + s.id + ': ' + s.title + '</strong></p>';
        html += '<p>Lösung: <strong>' + s.solution + '</strong></p>';
        html += '<p>Hinweise: ' + s.hints.join(" | ") + '</p>';
        html += '</div>';
    });
    sol.innerHTML = html;
    
    document.getElementById("admin-points").textContent = gameState.points;
    document.getElementById("admin-hints").textContent = gameState.hintsUsed;
    
    panel.classList.remove("hidden");
}

/** Admin schliessen */
function closeAdmin() {
    document.getElementById("admin-panel").classList.add("hidden");
}

/** Bonuspunkte vergeben */
function addBonus(points, reason) {
    gameState.points += points;
    updatePointsDisplay();
    document.getElementById("admin-points").textContent = gameState.points;
    alert("+" + points + " Bonuspunkte für: " + reason + "!");
}

// Tastenkombination Ctrl+Shift+A
document.addEventListener("keydown", function(e) {
    if (e.ctrlKey && e.shiftKey && e.key === "A") {
        e.preventDefault();
        showAdmin();
    }
});
