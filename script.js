let players = [];
let originalWord = "";
let impostorIndex = -1;
let words = [
  { word: "alma", hint: "gyümölcs" },
  { word: "asztal", hint: "bútor" },
  { word: "kutya", hint: "állat" },
  { word: "autó", hint: "közlekedés" },
  { word: "tenger", hint: "vízhez kapcsolódó" },
  { word: "iskola", hint: "tanulás helye" },
  { word: "ház", hint: "lakhely" },
  { word: "telefon", hint: "kommunikációs eszköz" }
];

function addName() {
  const input = document.getElementById("nameInput");
  const name = input.value.trim();
  if (name) {
    players.push({ name: name, word: "" });
    input.value = "";
    updateNameList();
  }
}

function updateNameList() {
  const list = document.getElementById("nameList");
  list.innerHTML = "";
  players.forEach(p => {
    const div = document.createElement("div");
    div.textContent = p.name;
    list.appendChild(div);
  });
}

function startGame() {
  if (players.length < 3) {
    alert("Legalább 3 játékos szükséges!");
    return;
  }

  document.getElementById("gameSection").classList.remove("hidden");
  document.getElementById("startBtn").disabled = true;

  // Szó kiválasztása
  const selected = words[Math.floor(Math.random() * words.length)];
  originalWord = selected.word;

  // Imposztor kiválasztása
  impostorIndex = Math.floor(Math.random() * players.length);

  // Szavak kiosztása
  players.forEach((p, i) => {
    if (i === impostorIndex) {
      p.word = selected.hint + " (te vagy az imposztor)";
    } else {
      p.word = selected.word;
    }
  });

  displayPlayerButtons();
}

function displayPlayerButtons() {
  const area = document.getElementById("playersArea");
  area.innerHTML = "";

  players.forEach((p, index) => {
    const btn = document.createElement("button");
    btn.textContent = p.name;
    btn.classList.add("word-button");
    btn.onclick = function () {
      if (!btn.classList.contains("revealed")) {
        btn.textContent = `${p.name}: ${p.word}`;
        btn.classList.add("revealed");
        btn.disabled = true;

        // Ha mindenki megnézte, mutassuk a gombot
        const allRevealed = [...area.children].every(b => b.classList.contains("revealed"));
        if (allRevealed) {
          document.getElementById("revealBtn").classList.remove("hidden");
        }
      }
    };
    area.appendChild(btn);
  });
}

function revealImpostor() {
  const result = document.getElementById("result");
  result.textContent = `Az imposztor: ${players[impostorIndex].name}`;
}
