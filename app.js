// Words + reasons list
const censoredWords = [
  { word: "pride", reason: "LGBTQ+ term censored in some regions." },
  { word: "booby", reason: "Can mean a silly person or a bird (booby bird), but is censored as a reference to boobs" },
  { word: "crash", reason: "An accident or system failure, but could be censored in sensitive contexts" },
  { word: "blast", reason: "An explosion (or a fun party), but some systems flag it due to violent associations" },
  { word: "sniff", reason: "Means smelling something, but can be wrongly flagged because of its associations with crying, illness, or drugs in certain moderation systems." },
  { word: "grime", reason: "Dirt or filth, flagged in Roblox because words related to anything dirty are over-censored to keep the environment clean" },
];

const selected = censoredWords[Math.floor(Math.random() * censoredWords.length)];
const SecretWord = selected.word;

let keys = {
  q: "", w: "", e: "", r: "", t: "", y: "", u: "", i: "", o: "", p: "", break: "",
  a: "", s: "", d: "", f: "", g: "", h: "", j: "", k: "", l: "", break2: "",
  enter: "", z: "", x: "", c: "", v: "", b: "", n: "", m: "", "⌫": ""
};

let guesses = [];
let currentGuess = [];

const NumberOfGuesses = 6;
const Correct = 'correct';
const Found = 'found';
const Wrong = 'wrong';

function initialize() {
  const guessGrid = document.getElementById("guessGrid");
  for (let i = 0; i < NumberOfGuesses; i++) {
    for (let j = 0; j < SecretWord.length; j++) {
      guessGrid.innerHTML += `<div id="${i}${j}" class="key-guess"></div>`;
    }
    guessGrid.innerHTML += '<br/>';
  }

  const keyboard = document.getElementById("keyboard");
  Object.keys(keys).forEach((key) => {
    if (key.includes('break')) {
      keyboard.innerHTML += '<br/>';
    } else {
      keyboard.innerHTML += `<button id="${key}" class="key" onclick="keyClick('${key}')">${key}</button>`;
    }
  });
}

initialize();

document.addEventListener("keydown", (event) => {
  const key = event.key.toLowerCase();
  if (key === "enter") keyClick("enter");
  else if (key === "backspace") keyClick("⌫");
  else if (/^[a-z]$/.test(key)) keyClick(key);
});

function keyClick(key) {
  if (key === '⌫') backspace();
  else if (key === 'enter') enter();
  else if (currentGuess.length < SecretWord.length && guesses.length < NumberOfGuesses) {
    currentGuess.push({ key, result: '' });
    updateCurrentGuess();
  }
}

function backspace() {
  if (currentGuess.length > 0) {
    currentGuess.pop();
    updateCurrentGuess();
  }
}

function enter() {
  if (currentGuess.length < SecretWord.length || guesses.length >= NumberOfGuesses) return;

  currentGuess.forEach((k, i) => {
    if (SecretWord[i] === k.key) k.result = Correct;
    else if (SecretWord.includes(k.key)) k.result = Found;
    else k.result = Wrong;
    if (keys[k.key] !== Correct) keys[k.key] = k.result;
  });

  updateCurrentGuess(true);
  guesses.push(currentGuess);

  const isWin = currentGuess.map(k => k.key).join('') === SecretWord;
  // only popup on win or final guess
  if (isWin || guesses.length >= NumberOfGuesses) {
    setTimeout(() => {
      showPopup(`
        <div class="message-title">
          <span class="icon">${isWin ? '🎉' : '❌'}</span>
          ${isWin ? 'Correct!' : 'Game Over!'} The word was <strong>${SecretWord.toUpperCase()}</strong>.
        </div>
        <div class="message-body">Reason: ${selected.reason}</div>
        <button class="play-again" onclick="playAgain()">Play Again</button>
      `);
    }, 100);
  }


  currentGuess = [];
}

function updateKeyboard() {
  Object.keys(keys).forEach(key => {
    if (keys[key]) {
      const el = document.getElementById(key);
      el.className = `key ${keys[key]}`;
    }
  });
}

function updateCurrentGuess(guessed = false) {
  const row = guesses.length;
  for (let i = 0; i < SecretWord.length; i++) {
    const cell = document.getElementById(`${row}${i}`);
    cell.textContent = currentGuess[i] ? currentGuess[i].key : '';
    if (guessed) cell.classList.add(currentGuess[i].result);
  }
  if (guessed) updateKeyboard();
}

// --- Popup and animation logic ---

function showPopup(html) {
  const popup = document.getElementById("popup");
  const msg = document.getElementById("popup-message");
  msg.innerHTML = html;
  popup.classList.remove("hidden");
  popup.classList.add("fade-in");

  setTimeout(() => popup.classList.remove("fade-in"), 300);

  // Auto-close after 5 seconds
  setTimeout(() => closePopup(), 5000);
}

function closePopup() {
  const popup = document.getElementById("popup");
  popup.classList.add("fade-out");
  setTimeout(() => {
    popup.classList.add("hidden");
    popup.classList.remove("fade-out");
  }, 300);
}

function playAgain() {
  closePopup();
  window.location.reload();
}