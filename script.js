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
// LEADERBOARD ABI-KOMMENTARE
// ============================================================

const LEADERBOARD_COMMENTS = [
    "Abi hat gerechnet. Und diesmal sogar richtig.",
    "Die Kaffeemaschine ist beeindruckt.",
    "Diese Teams haben das digitale Labyrinth überlebt.",
    "Hier sind die mutigsten Entkommenen. Respekt!",
    "Eine Rangliste, sauber sortiert. Wie meine Schaltkreise."
];

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
        solution: "Wachmacher",
        altSolutions: [],
        hints: [
            "Abi sagt: Die Zahlen sind Ablenkung. Worum dreht sich das GANZE Dokument eigentlich?",
            "Abi sagt: Ich bin nicht Kaffee, aber ein Kaffee könnte ich sein."
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
        content: "<p>Die Tür vor euch hat kein erkennbares Bedienelement. Stattdessen zeigt ein Display folgendes Gedicht:</p><p style=\"text-align:center; font-size:1.1rem; padding:1.2rem; background:#f3e5f5; border-radius:10px; border:2px solid #9c27b0; margin:1rem 0; line-height:1.9;\"><em>Ich bin nicht Ursache und nicht das Ziel,<br>nur Vermittler zwischen Wollen und Erlaubnis.<br>Meine Gestalt ist Argument, nicht Aussage \u2013<br>bedeutungslos allein, doch wahr im Gegenstück.<br>Wo Geometrie auf Erwartung trifft, entsteht Berechtigung,<br>und eine kleine Rotation kippt Zustand in Zustand.<br>Ich trage keine Botschaft, nur die Bedingung ihrer Annahme;<br>Struktur, die erst im fremden Hohlraum Sinn gewinnt.<br>Mein wahrer Name beugt sich um ein einzig Zeichen,<br>das eure Maschinen nicht ertragen und in zwei zerlegen.<br>Was bin ich?</em></p><p>Daneben blinkt eine Systemmeldung:</p><p style=\"padding:0.8rem; background:#fff3e0; border-radius:8px; border-left:4px solid #ff9800;\">Eingabe nur ohne Sonderzeichen. Umlaute müssen aufgelöst werden (ue statt \u00fc, ae statt \u00e4). Grossbuchstaben.</p><p>Abi ergänzt: <em>\u00ABDieses Gedicht knackt ihr nur gemeinsam: Eine KI ordnet die Begriffe, doch den letzten Sprung macht nur ein menschlicher Kopf.\u00BB</em></p>",
        solution: "SCHLÜSSEL",
        altSolutions: ["SCHLUESSEL"],
        hints: [
            "Abi sagt: Denkt an ein Gegenstück, das allein bedeutungslos ist \u2013 erst im passenden Hohlraum erzeugt seine Form Berechtigung und eine Zustandsänderung.",
            "Abi sagt: 9 Buchstaben mit Umlaut, hier 10 ohne. Das \u00abgebeugte Zeichen\u00bb ist ein \u00fc, das die Maschine in zwei zerlegt: \u00fc wird ue."
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
        solution: "80",
        altSolutions: [],
        hints: [
            "Abi sagt: wow, das sieht wirklich chaotisch aus. Aber keine Sorge, es ist einfacher als es scheint.",
            "Abi sagt: Wie viel ergibt das Ganze?."
        ],
        pointsPerStation: 25,
        hintCost: 5
    },
    {
        id: 5,
        title: "Bonus-Challenge",
        icon: "\uD83C\uDF81",
        story: "Geschafft! Doch Abi kramt grinsend ein zerknittertes Blatt hervor: \u00ABEinen hab ich noch. Sieht aus wie sinnloser Bürokram. Ist es auch. Fast.\u00BB",
        task: "Findet das versteckte Lösungswort. Achtung: Der Inhalt ist reine Tarnung \u2013 die Lösung steckt nicht in dem, was dasteht, sondern in der Art, wie es dasteht.",
        content: "<div style=\"text-align:center; margin-bottom:1rem;\"><div style=\"font-size:3.4rem; line-height:1;\">\uD83C\uDF81\uD83C\uDF7A\uD83D\uDCCB</div><h2 style=\"color:#7C4DFF; margin:0.4rem 0 0;\">Bonus-Challenge</h2></div><p>Abi überreicht euch feierlich die <strong>\u00ABInterne Hausordnung \u2013 Nachtrag 47b\u00BB</strong>. Sie wirkt vollkommen überflüssig. Genau das ist der Trick.</p><div style=\"padding:1.2rem; background:#fffde7; border:2px dashed #FBC02D; border-radius:12px; line-height:1.85;\"><p style=\"margin:0 0 .7rem; font-weight:700;\">\uD83D\uDCCB Hausordnung &ndash; Nachtrag 47b <span style=\"font-weight:400; font-size:.85rem;\">(rechtlich völlig unverbindlich)</span></p><p style=\"margin:.25rem 0;\"><strong>§9</strong> Stromausfall ist kein Grund zur Panik, sondern eine spontane Achtsamkeitsübung im Dunkeln.</p><p style=\"margin:.25rem 0;\"><strong>§3</strong> Büroklammern gelten ab 14:30 Uhr als offizielle Ersatzwährung der Teeküche.</p><p style=\"margin:.25rem 0;\"><strong>§5</strong> Konferenzen ohne Kekse sind laut Betriebsrat zu 73% juristisch anfechtbar.</p><p style=\"margin:.25rem 0;\"><strong>§5</strong> Kantinen-Pudding darf keinesfalls als ballistisches Wurfgeschoss zweckentfremdet werden.</p><p style=\"margin:.25rem 0;\"><strong>§4</strong> Halbtagskräfte dürfen den Aufzug ausschliesslich bis zur Hälfte benutzen.</p><p style=\"margin:.25rem 0;\"><strong>§3</strong> Klimaanlagen verhandeln ihre Temperatur grundsätzlich gegen den erklärten Willen aller 42 Mitarbeitenden.</p><p style=\"margin:.25rem 0;\"><strong>§3</strong> Spesenabrechnungen über Glühwein werden im Dezember besonders wohlwollend geprüft.</p><p style=\"margin:.25rem 0;\"><strong>§7</strong> Aktenordner, die niemand öffnet, erlangen nach exakt 3 Jahren ein eigenes Bewusstsein.</p></div><p style=\"margin-top:1rem; padding:.85rem; background:#f3e5f5; border-left:4px solid #9c27b0; border-radius:8px;\"><em>Zusatzhinweis von Abi: \u00ABDie Paragraphen sind ordentlich nummeriert. Nur leider nicht in der Reihenfolge, die ihr erwartet. Und bevor ihr fragt: Die Anfangsbuchstaben ergeben diesmal wirklich nichts. Ehrenwort eines Roboters.\u00BB</em></p>",
        solution: "FREIBIER",
        altSolutions: [],
        hints: [
            "Lösung: ja, das ist wirklich schwer. Aber genau deshalb gibt es hier den Bonus.",
            "Schritt für Schritt: (1) Ignoriert den Inhalt komplett \u2013 er ist reine Tarnung. (2) Jeder Paragraph beginnt mit \u00AB§\u00BB und einer Zahl; diese Zahl ist KEINE Nummerierung, sondern eine Buchstaben-Position. (3) Nehmt aus jedem Paragraphen das erste echte Wort und zählt darin bis zur §-Zahl: §9 Stromausfall = F, §3 Büroklammern = R, §5 Konferenzen = E, §5 Kantinen = I, §4 Halbtagskräfte = B, §3 Klimaanlagen = I, §3 Spesenabrechnungen = E, §7 Aktenordner = R. (4) Von oben nach unten gelesen ergibt das F-R-E-I-B-I-E-R = FREIBIER.",
            "Warum es schwer ist: Man muss drei Ebenen durchschauen \u2013 (1) den albernen Inhalt als bloße Tarnung erkennen, (2) bemerken, dass die §-Zahlen unregelmäßig sind (9, 3, 5, 5, 4, 3, 3, 7) und daher eine versteckte Funktion haben, (3) den gedanklichen Sprung machen, dass die Zahl eine Buchstabenposition im jeweils ersten Wort ist. Eine KI löst das nicht über reines Inhaltsverständnis, weil die Lösung rein strukturell codiert ist und kein semantischer Zusammenhang weiterhilft.",
            "Falsche Fährten: • Die Anfangsbuchstaben (S, B, K, K, H, K, S, A) ergeben bewusst Unsinn. • Sortiert man die Paragraphen nach §-Zahl aufsteigend, kommt R-I-E-B-E-I-R-F heraus \u2013 eine Sackgasse. • Die vielen absurden Zahlen, Uhrzeiten und Prozente (14:30, 73%, 42, 3 Jahre) verleiten zu einer Zahlen-Lösung. • Der Zusatzhinweis behauptet frech, die Nummerierung sei \u00abnicht in der erwarteten Reihenfolge\u00bb \u2013 das stimmt sogar, lenkt aber vom eigentlichen Mechanismus ab."
        ],
        pointsPerStation: 25,
        hintCost: 5
    }
];

/** Maximal erreichbare Punktzahl (Summe aller Stationen) */
var MAX_POINTS = STATIONS.reduce(function(sum, s) { return sum + s.pointsPerStation; }, 0);

// ============================================================
// LEADERBOARD - localStorage Verwaltung
// ============================================================

/* Konstanten */
var LEADERBOARD_KEY = "aiEscapeRoomLeaderboard";
var TWO_HOURS_MS = 2 * 60 * 60 * 1000;

/** Eindeutige ID erzeugen (crypto.randomUUID falls verfügbar) */
function generateRunId() {
    if (window.crypto && typeof window.crypto.randomUUID === "function") {
        return window.crypto.randomUUID();
    }
    return "run-" + Date.now() + "-" + Math.floor(Math.random() * 1000000);
}

/** Leaderboard sicher aus localStorage laden (leeres Array bei Fehler) */
function loadLeaderboard() {
    try {
        var raw = localStorage.getItem(LEADERBOARD_KEY);
        if (!raw) return [];
        var data = JSON.parse(raw);
        return Array.isArray(data) ? data : [];
    } catch (e) {
        // Beschädigte Daten -> leeres Array, Spiel läuft weiter
        return [];
    }
}

/** Leaderboard in localStorage speichern (Fehler werden ignoriert) */
function persistLeaderboard(teams) {
    try {
        localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(teams));
    } catch (e) {
        // localStorage nicht verfügbar/voll -> Spiel läuft trotzdem weiter
    }
}

/** Neuen Team-Run anlegen und speichern */
function saveTeamRun(run) {
    var teams = loadLeaderboard();
    teams.push(run);
    persistLeaderboard(teams);
}

/** Bestehenden Team-Run anhand der ID aktualisieren */
function updateTeamRun(runId, updates) {
    if (!runId) return;
    var teams = loadLeaderboard();
    for (var i = 0; i < teams.length; i++) {
        if (teams[i].id === runId) {
            for (var key in updates) {
                if (updates.hasOwnProperty(key)) {
                    teams[i][key] = updates[key];
                }
            }
            break;
        }
    }
    persistLeaderboard(teams);
}

/** Teams der letzten 2 Stunden (basierend auf lastActiveTime oder endTime) */
function getRecentTeams() {
    var now = Date.now();
    return loadLeaderboard().filter(function(t) {
        var ref = t.endTime || t.lastActiveTime || t.startTime || 0;
        return (now - ref) <= TWO_HOURS_MS;
    });
}

/** Alte Team-Runs (älter als 2 Stunden) löschen. Gibt Anzahl entfernter Einträge zurück. */
function cleanOldTeamRuns() {
    var now = Date.now();
    var teams = loadLeaderboard();
    var kept = teams.filter(function(t) {
        var ref = t.endTime || t.lastActiveTime || t.startTime || 0;
        return (now - ref) <= TWO_HOURS_MS;
    });
    var removed = teams.length - kept.length;
    if (removed > 0) persistLeaderboard(kept);
    return removed;
}

/** Teams sortieren: Punkte desc, Zeit asc, Hinweise asc */
function sortLeaderboard(teams) {
    return teams.slice().sort(function(a, b) {
        if (b.points !== a.points) return b.points - a.points;
        if (a.elapsedSeconds !== b.elapsedSeconds) return a.elapsedSeconds - b.elapsedSeconds;
        return a.hintsUsed - b.hintsUsed;
    });
}

/** Abschlusszeit als HH:MM formatieren */
function formatClockTime(timestamp) {
    if (!timestamp) return "\u2013";
    var d = new Date(timestamp);
    return String(d.getHours()).padStart(2, "0") + ":" + String(d.getMinutes()).padStart(2, "0");
}

/** Komplettes Leaderboard zurücksetzen */
function resetLeaderboard() {
    try {
        localStorage.removeItem(LEADERBOARD_KEY);
    } catch (e) {
        // ignorieren
    }
}

// ============================================================
// GAME STATE
// ============================================================

let gameState = {
    teamName: "",
    runId: null,
    currentStation: 0,
    points: 0,
    hintsUsed: 0,
    hintsPerStation: STATIONS.map(function() { return 0; }),
    solvedStations: STATIONS.map(function() { return false; }),
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
    gameState.runId = generateRunId();
    gameState.currentStation = 0;
    gameState.points = 0;
    gameState.hintsUsed = 0;
    gameState.hintsPerStation = STATIONS.map(function() { return 0; });
    gameState.solvedStations = STATIONS.map(function() { return false; });
    gameState.startTime = Date.now();
    gameState.elapsedSeconds = 0;

    // Neuen Team-Run im Leaderboard anlegen
    saveTeamRun({
        id: gameState.runId,
        teamName: teamName,
        points: 0,
        hintsUsed: 0,
        elapsedSeconds: 0,
        solvedCount: 0,
        totalStations: STATIONS.length,
        startTime: gameState.startTime,
        lastActiveTime: gameState.startTime,
        endTime: null,
        status: "in-progress"
    });

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
    // Bereits gelöste Station nicht erneut werten (verhindert Doppel-Punkte)
    if (gameState.solvedStations[stationIndex]) return;

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
        syncCurrentRun();
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
    syncCurrentRun();
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

/** Aktuellen Team-Stand im Leaderboard speichern */
function syncCurrentRun() {
    if (!gameState.runId) return;
    var solved = gameState.solvedStations.filter(function(s) { return s; }).length;
    updateTeamRun(gameState.runId, {
        points: gameState.points,
        hintsUsed: gameState.hintsUsed,
        elapsedSeconds: gameState.elapsedSeconds,
        solvedCount: solved,
        lastActiveTime: Date.now()
    });
}

/** End-Screen */
function showEndScreen() {
    clearInterval(gameState.timerInterval);

    var endTime = Date.now();

    // Team-Run als abgeschlossen markieren
    updateTeamRun(gameState.runId, {
        points: gameState.points,
        hintsUsed: gameState.hintsUsed,
        elapsedSeconds: gameState.elapsedSeconds,
        solvedCount: STATIONS.length,
        lastActiveTime: endTime,
        endTime: endTime,
        status: "completed"
    });

    // Platzierung im aktuellen Leaderboard ermitteln
    var ranked = sortLeaderboard(getRecentTeams().filter(function(t) {
        return t.status === "completed";
    }));
    var rank = 0;
    for (var i = 0; i < ranked.length; i++) {
        if (ranked[i].id === gameState.runId) {
            rank = i + 1;
            break;
        }
    }

    document.getElementById("end-team-name").textContent = gameState.teamName;
    document.getElementById("end-points").textContent = gameState.points + " / " + MAX_POINTS;
    document.getElementById("end-time").textContent = formatTime(gameState.elapsedSeconds);
    document.getElementById("end-hints").textContent = gameState.hintsUsed;
    document.getElementById("end-rank").textContent = rank > 0 ? ("Platz " + rank + " / " + ranked.length) : "\u2013";

    showScreen("end-screen");
}

/** Ergebnis kopieren */
function copyResult() {
    var text = "AI Escape Room - Ergebnis\n";
    text += "========================\n";
    text += "Team: " + gameState.teamName + "\n";
    text += "Punkte: " + gameState.points + " / " + MAX_POINTS + "\n";
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
        runId: null,
        currentStation: 0,
        points: 0,
        hintsUsed: 0,
        hintsPerStation: STATIONS.map(function() { return 0; }),
        solvedStations: STATIONS.map(function() { return false; }),
        startTime: null,
        timerInterval: null,
        elapsedSeconds: 0
    };
    
    document.getElementById("team-name-input").value = "";
    closeAdmin();
    showScreen("start-screen");
}

// ============================================================
// LEADERBOARD ANSICHT
// ============================================================

/** Leaderboard-Screen anzeigen */
function showLeaderboard() {
    renderLeaderboard();
    showScreen("leaderboard-screen");
}

/** Leaderboard rendern (sortiert, Top 3 hervorgehoben) */
function renderLeaderboard() {
    // Alte Einträge entfernen und ggf. Hinweis anzeigen
    var removed = cleanOldTeamRuns();
    var cleanupMsg = document.getElementById("lb-cleanup-msg");
    if (cleanupMsg) {
        if (removed > 0) {
            cleanupMsg.classList.remove("hidden");
        } else {
            cleanupMsg.classList.add("hidden");
        }
    }

    // Abi-Kommentar setzen
    var abiText = document.getElementById("lb-abi-text");
    if (abiText) abiText.textContent = randomFrom(LEADERBOARD_COMMENTS);

    var recent = getRecentTeams();
    var completed = sortLeaderboard(recent.filter(function(t) { return t.status === "completed"; }));
    var inProgress = recent.filter(function(t) { return t.status !== "completed"; });

    var list = document.getElementById("leaderboard-list");

    // Leer-Zustand
    if (recent.length === 0) {
        list.innerHTML = '<div class="lb-empty">Noch keine Teams in den letzten 2 Stunden gespielt. Abi wartet gespannt. \uD83E\uDD16</div>';
        return;
    }

    var medals = ["\uD83E\uDD47", "\uD83E\uDD48", "\uD83E\uDD49"];
    var html = "";

    // Abgeschlossene Teams
    if (completed.length > 0) {
        completed.forEach(function(t, idx) {
            var rank = idx + 1;
            var topClass = rank <= 3 ? " lb-top lb-top-" + rank : "";
            var rankDisplay = rank <= 3 ? medals[rank - 1] : ("#" + rank);
            html += '<div class="lb-card' + topClass + '">';
            html += '<div class="lb-rank">' + rankDisplay + '</div>';
            html += '<div class="lb-info">';
            html += '<div class="lb-name">' + escapeHtml(t.teamName) + '</div>';
            html += '<div class="lb-meta">';
            html += '<span class="lb-stat">\u2B50 ' + t.points + ' Pkt</span>';
            html += '<span class="lb-stat">\u23F1\uFE0F ' + formatTime(t.elapsedSeconds) + '</span>';
            html += '<span class="lb-stat">\uD83D\uDCA1 ' + t.hintsUsed + '</span>';
            html += '<span class="lb-stat">\uD83C\uDFC1 ' + formatClockTime(t.endTime) + '</span>';
            html += '</div>';
            html += '</div>';
            html += '<div class="lb-status lb-status-done">Abgeschlossen</div>';
            html += '</div>';
        });
    }

    // In Bearbeitung
    if (inProgress.length > 0) {
        html += '<div class="lb-section-label">In Bearbeitung</div>';
        inProgress.forEach(function(t) {
            html += '<div class="lb-card lb-card-progress">';
            html += '<div class="lb-rank">\u23F3</div>';
            html += '<div class="lb-info">';
            html += '<div class="lb-name">' + escapeHtml(t.teamName) + '</div>';
            html += '<div class="lb-meta">';
            html += '<span class="lb-stat">\u2B50 ' + t.points + ' Pkt</span>';
            html += '<span class="lb-stat">\u23F1\uFE0F ' + formatTime(t.elapsedSeconds) + '</span>';
            html += '<span class="lb-stat">\uD83D\uDCA1 ' + t.hintsUsed + '</span>';
            html += '<span class="lb-stat">\uD83D\uDCCD ' + t.solvedCount + '/' + (t.totalStations || STATIONS.length) + '</span>';
            html += '</div>';
            html += '</div>';
            html += '<div class="lb-status lb-status-progress">In Bearbeitung</div>';
            html += '</div>';
        });
    }

    list.innerHTML = html;
}

/** HTML escapen (Schutz vor kaputtem Layout bei Sonderzeichen im Teamnamen) */
function escapeHtml(str) {
    var div = document.createElement("div");
    div.textContent = str == null ? "" : String(str);
    return div.innerHTML;
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
    
    renderAdminTeams();
    panel.classList.remove("hidden");
}

/** Teams im Admin-Panel rendern (aktuell + Archiv) */
function renderAdminTeams() {
    var now = Date.now();
    var all = loadLeaderboard();
    var recent = [];
    var archive = [];
    all.forEach(function(t) {
        var ref = t.endTime || t.lastActiveTime || t.startTime || 0;
        if ((now - ref) <= TWO_HOURS_MS) {
            recent.push(t);
        } else {
            archive.push(t);
        }
    });

    document.getElementById("admin-teams").innerHTML = buildAdminTeamRows(recent, true);
    document.getElementById("admin-teams-archive").innerHTML =
        archive.length > 0 ? buildAdminTeamRows(archive, false)
                           : '<p class="admin-empty">Keine \u00e4lteren Eintr\u00e4ge.</p>';
}

/** HTML-Zeilen für Admin-Teamliste erzeugen */
function buildAdminTeamRows(teams, withActions) {
    if (teams.length === 0) {
        return '<p class="admin-empty">Keine Teams vorhanden.</p>';
    }
    var sorted = sortLeaderboard(teams);
    var html = "";
    sorted.forEach(function(t) {
        var statusLabel = t.status === "completed" ? "Abgeschlossen" : "In Bearbeitung";
        html += '<div class="admin-team-row">';
        html += '<div class="admin-team-main">';
        html += '<strong>' + escapeHtml(t.teamName) + '</strong> ';
        html += '<span class="admin-team-stats">\u2B50 ' + t.points + ' | \u23F1\uFE0F ' + formatTime(t.elapsedSeconds) + ' | \uD83D\uDCA1 ' + t.hintsUsed + ' | ' + statusLabel + '</span>';
        html += '</div>';
        if (withActions) {
            html += '<div class="admin-team-actions">';
            html += '<button class="btn btn-bonus btn-mini" onclick="adminAddBonus(\'' + t.id + '\')">+5 Bonus</button>';
            html += '<button class="btn btn-secondary btn-mini" onclick="adminRenameTeam(\'' + t.id + '\')">Umbenennen</button>';
            html += '</div>';
        }
        html += '</div>';
    });
    return html;
}

/** Admin: Bonuspunkte für ein bestimmtes Team */
function adminAddBonus(runId) {
    var teams = loadLeaderboard();
    var team = null;
    for (var i = 0; i < teams.length; i++) {
        if (teams[i].id === runId) { team = teams[i]; break; }
    }
    if (!team) return;
    updateTeamRun(runId, { points: team.points + 5 });
    // Falls es das aktuell laufende Team ist, auch live aktualisieren
    if (gameState.runId === runId) {
        gameState.points += 5;
        updatePointsDisplay();
        document.getElementById("admin-points").textContent = gameState.points;
    }
    renderAdminTeams();
}

/** Admin: Teamnamen bearbeiten */
function adminRenameTeam(runId) {
    var teams = loadLeaderboard();
    var team = null;
    for (var i = 0; i < teams.length; i++) {
        if (teams[i].id === runId) { team = teams[i]; break; }
    }
    if (!team) return;
    var newName = prompt("Neuer Teamname:", team.teamName);
    if (newName === null) return;
    newName = newName.trim();
    if (!newName) return;
    updateTeamRun(runId, { teamName: newName });
    if (gameState.runId === runId) {
        gameState.teamName = newName;
        var disp = document.getElementById("team-name-display");
        if (disp) disp.textContent = newName;
    }
    renderAdminTeams();
}

/** Admin: nur alte Ergebnisse löschen */
function adminClearOld() {
    var removed = cleanOldTeamRuns();
    renderAdminTeams();
    alert(removed > 0 ? (removed + " alte Eintr\u00e4ge gel\u00f6scht.") : "Keine alten Eintr\u00e4ge vorhanden.");
}

/** Admin: komplettes Leaderboard zurücksetzen */
function adminResetLeaderboard() {
    if (!confirm("Wirklich ALLE Ergebnisse l\u00f6schen?")) return;
    resetLeaderboard();
    renderAdminTeams();
    alert("Rangliste zur\u00fcckgesetzt.");
}

/** Admin schliessen */
function closeAdmin() {
    document.getElementById("admin-panel").classList.add("hidden");
}

/** Bonuspunkte vergeben */
function addBonus(points, reason) {
    gameState.points += points;
    updatePointsDisplay();
    syncCurrentRun();
    document.getElementById("admin-points").textContent = gameState.points;
    renderAdminTeams();
    alert("+" + points + " Bonuspunkte für: " + reason + "!");
}

// Tastenkombination Ctrl+Shift+A
document.addEventListener("keydown", function(e) {
    if (e.ctrlKey && e.shiftKey && e.key === "A") {
        e.preventDefault();
        showAdmin();
    }
});
