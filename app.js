// Words + reasons list
const censoredWords = [
  { word: "pride", reason: "LGBTQ+ term censored in some regions, but can also mean satisfaction" },
  { word: "booby", reason: "Can mean a silly person or a bird (booby bird), but is censored as a reference to boobs" },
  { word: "crash", reason: "An accident or system failure, but could be censored in sensitive contexts" },
  { word: "blast", reason: "An explosion (or a fun party), but some systems flag it due to violent associations" },
  { word: "sniff", reason: "Means smelling something, but can be wrongly flagged because of its associations with crying, illness, or drugs in certain moderation systems." },
  { word: "grime", reason: "Dirt or filth, flagged in Roblox because words related to anything dirty are over-censored to keep the environment clean" },
  { word: "fanny", reason: "Used as a name in the U.S., offensive and refering to genitalia in the UK." },
  { word: "rings", reason: "Flagged in China when used metaphorically for government influence." },
  { word: "alien", reason: "Used in immigration control debates." },
  { word: "candy", reason: "Flagged in some online markets due to associations with drugs." },
  { word: "pills", reason: "Can refer to healthcare medication, but also substance use and as slang for drugs" },
  { word: "black", reason: "Racial, linguistic, and historical connotations make it heavily charged." },
  { word: "slave", reason: "Ethical concerns around language use and historical trauma, but is also a Tech term (e.g., 'master/slave')" },
  { word: "right", reason: "Being correct, but is also politically and morally loaded so depending on the context it changes everything." },
  { word: "cover", reason: "A version of a song, an insurance cover or can imply secrecy, censorship, or imitation" },
  { word: "chain", reason: "Series of links, restaurant/company network, or bondage referring to historical oppresion" },
  { word: "watch", reason: "Looking/observing, a timepiece or surveillance" },
  { word: "stalk", reason: "Part of a plant or to follow someone secretly" },
  { word: "score", reason: "Points in a game, musical composition or obtain illicitly (e.g., drugs)" },
  { word: "shoot", reason: "Photo session, plant growth, or fire a weapon" },
  { word: "joint", reason: "A body part, shared thing, or cannabis" },
  { word: "punch", reason: "To hit somebody, a drink, a office-supply to make holes" },
  { word: "glass", reason: "Transparent material and can also imply drugs" },
  { word: "shoot", reason: "Photography or to fire a weapon" },
  { word: "bruin", reason: "Bear (college mascot) and has similiarity to racial slurs" },
  { word: "plump", reason: "Descriptive of fruit or texture, can also refer to body shaming or inappropriate body references" },
  { word: "bangs", reason: "Haircut style, and also refering to violent slang (e.g., gang violence)" },
  { word: "groom", reason: "Groom	Wedding role or refering to child grooming" },
  { word: "gravy", reason: "Meaning sause or slang for money/drugs" },
  { word: "molly", reason: "Personal name	and also  slang for MDMA/ecstasy" },
  { word: "nappy", reason: "Diaper (in American English) and has also been used negatively to describe tightly coiled hair texture, typically of Black people" },
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

  if (isWin) {
    showShush(3000);

    setTimeout(() => {
      showPopup(`
        <div class="message-title">
          <span class="icon">🎉</span>
          Correct! The word was &nbsp;<strong>${SecretWord.toUpperCase()}</strong>.
        </div>
        <div class="message-body">Reason: ${selected.reason}</div>
        <button class="play-again" onclick="playAgain()">Play Again</button>
      `);
    }, 1100); // 100ms buffer past the 1s animation

  // LOSS case: straight to popup on final guess
  } else if (guesses.length >= NumberOfGuesses) {
    setTimeout(() => {
      showPopup(`
        <div class="message-title">
          <span class="icon">❌</span>
          Game Over! The word was&nbsp;<strong>${SecretWord.toUpperCase()}</strong>.
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

  // Auto-close popup
  setTimeout(() => closePopup(), 25000);
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

function showShush(duration = 1000) {
  const sh = document.getElementById("shush");
  sh.classList.remove("hidden");
  // Start animation
  sh.classList.add("animate");
  // After it runs, hide again
  setTimeout(() => {
    sh.classList.remove("animate");
    sh.classList.add("hidden");
  }, duration);
}
