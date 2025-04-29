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
    'q': '', 'w': '', 'e': '', 'r': '', 't': '', 'y': '', 'u': '', 'i': '', 'o': '', 'p': '', 'break': '',
    'a': '', 's': '', 'd': '', 'f': '', 'g': '', 'h': '', 'j': '', 'k': '', 'l': '', 'break2': '',
    'enter': '', 'z': '', 'x': '', 'c': '', 'v': '', 'b': '', 'n': '', 'm': '', '⌫': ''
  };
  
  let guesses = [];
  let currentGuess = [];
  
  const NumberOfGuesses = 6;
  const Correct = 'correct';
  const Found = 'found';
  const Wrong = 'wrong';
  
  function initialize() {
    let guessGrid = document.getElementById("guessGrid");
    for (let i = 0; i < NumberOfGuesses; i++) {
      for (let j = 0; j < SecretWord.length; j++) {
        guessGrid.innerHTML += `<div id="${i}${j}" class="key-guess"></div>`
      }
      guessGrid.innerHTML += '<br/>'
    }
  
    let keyboard = document.getElementById("keyboard");
    Object.keys(keys).forEach((key) => {
      if (key.includes('break')) {
        keyboard.innerHTML += '<br/>';
      } else {
        keyboard.innerHTML += `<button id="${key}" class="key" onclick="keyClick('${key}')">` + key + '</button>';
      }
    });
  }
  
  initialize();

  document.addEventListener("keydown", function(event) {
    const key = event.key.toLowerCase();
  
    if (key === "enter") {
      keyClick("enter");
    } else if (key === "backspace") {
      keyClick("⌫");
    } else if (/^[a-z]$/.test(key)) {
      keyClick(key);
    }
  });
  
  
  function keyClick(key) {
    switch (key) {
      case '⌫':
        backspace();
        break;
      case 'enter':
        enter();
        break;
      default:
        if (currentGuess.length < SecretWord.length && guesses.length < NumberOfGuesses) {
          currentGuess.push({ key: key, result: '' });
          updateCurrentGuess();
        }
    }
  }
  
  function backspace() {
    if (currentGuess.length > 0) {
      currentGuess.pop();
    }
    updateCurrentGuess();
  }
  
  function enter() {
    if (currentGuess.length < SecretWord.length || guesses.length >= NumberOfGuesses) {
      return;
    }
  
    currentGuess.forEach((keyGuess, index) => {
      if (SecretWord.charAt(index) === keyGuess.key) {
        keyGuess.result = Correct;
      } else if (SecretWord.includes(keyGuess.key)) {
        keyGuess.result = Found;
      } else {
        keyGuess.result = Wrong;
      }
  
      if (keys[keyGuess.key] !== Correct) {
        keys[keyGuess.key] = keyGuess.result;
      }
    });
  
    updateCurrentGuess(true);
    guesses.push(currentGuess);
    
    if (currentGuess.map(k => k.key).join('') === SecretWord) {
      setTimeout(() => {
        alert(`🎉 Correct! The word "${SecretWord.toUpperCase()}" was censored because: ${selected.reason}`);
      }, 100);
    } else if (guesses.length >= NumberOfGuesses) {
      setTimeout(() => {
        alert(`❌ Game Over! The word was "${SecretWord.toUpperCase()}". Reason: ${selected.reason}`);
      }, 100);
    }
  
    currentGuess = [];
  }
  
  function updateKeyboard() {
    for (const key in keys) {
      if (keys[key] !== '') {
        let keyElement = document.getElementById(`${key}`);
        keyElement.className = '';
        keyElement.classList.add(keys[key]);
        keyElement.classList.add('key');
      }
    }
  }
  
  function updateCurrentGuess(guessed = false) {
    let index = guesses.length;
    for (let i = 0; i < SecretWord.length; i++) {
      let guessGrid = document.getElementById(`${index}${i}`);
      if (currentGuess[i]) {
        guessGrid.innerHTML = currentGuess[i].key;
      } else {
        guessGrid.innerHTML = '';
      }
      if (guessed) {
        guessGrid.classList.add(currentGuess[i].result);
      }
    }
    if (guessed) {
      updateKeyboard();
    }
  }
  