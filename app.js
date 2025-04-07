// 📝 Step 1: Words + reasons list
const censoredWords = [
    { word: "pride", reason: "LGBTQ+ term censored in some regions." },
    { word: "tanks", reason: "Censored in China due to Tiananmen Square discussions." },
    { word: "fanny", reason: "Innocent in the U.S., offensive in the UK." },
    { word: "virus", reason: "Restricted in pandemic discussions." },
    { word: "press", reason: "Suppressed in media freedom debates." },
    { word: "power", reason: "Censored in discussions about government control." },
    { word: "riots", reason: "Suppressed in protest-related discussions." },
    { word: "march", reason: "Censored in relation to demonstrations." },
    { word: "union", reason: "Restricted to prevent labor organization." },
    { word: "votes", reason: "Limited in election manipulation concerns." },
    { word: "state", reason: "Blocked when discussing government control." },
    { word: "rebel", reason: "Associated with uprising movements." },
    { word: "peace", reason: "Flagged in war zones to prevent activism." },
    { word: "crime", reason: "Controlled in media to shape narratives." },
    { word: "slave", reason: "Erased in history revisionism." },
    { word: "guard", reason: "Flagged in security-related conversations." },
    { word: "agent", reason: "Monitored due to espionage concerns." },
    { word: "flesh", reason: "Flagged in AI moderation." },
    { word: "queer", reason: "LGBTQ+ word, sometimes restricted." },
    { word: "swing", reason: "Blocked in discussions on polyamory." },
    { word: "drugs", reason: "Controlled in anti-substance abuse campaigns." },
    { word: "taxes", reason: "Blocked in protests against financial laws." },
    { word: "stock", reason: "Restricted in market manipulation concerns." },
    { word: "money", reason: "Censored in financial fraud prevention." },
    { word: "asset", reason: "Flagged in financial security." },
    { word: "trade", reason: "Censored in economic discussions." },
    { word: "loans", reason: "Flagged to prevent financial misinformation." },
    { word: "proxy", reason: "Blocked in internet censorship." },
    { word: "spied", reason: "Censored in surveillance topics." },
    { word: "login", reason: "Restricted in cybersecurity policies." },
    { word: "scams", reason: "Controlled in fraud prevention." },
    { word: "track", reason: "Flagged in privacy debates." },
    { word: "trace", reason: "Blocked in tracking prevention." },
    { word: "crash", reason: "Flagged in economic instability discussions." },
    { word: "funny", reason: "AI sometimes flags for no reason." },
    { word: "goods", reason: "Flagged in export control." },
    { word: "reset", reason: "Flagged in data security discussions." },
    { word: "email", reason: "Monitored in government censorship." },
    { word: "cloud", reason: "Flagged in surveillance concerns." },
    { word: "bible", reason: "Blocked in certain secular or authoritarian regions." },
    { word: "sinai", reason: "Restricted in some countries due to religious-political reasons." },
    { word: "rings", reason: "Flagged in China when used metaphorically for government influence." },
    { word: "alien", reason: "Used in immigration control debates." },
    { word: "tempt", reason: "Flagged in morality-based filtering." },
    { word: "birth", reason: "Related to reproductive rights." },
    { word: "pious", reason: "Monitored in religious censorship." },
    { word: "holly", reason: "Flagged due to religious connotations in some places." },
    { word: "faith", reason: "Blocked in certain government-controlled religious discussions." },
    { word: "candy", reason: "Flagged in some online markets due to associations with drugs." },
    { word: "rumor", reason: "Monitored to combat misinformation." },
    { word: "viral", reason: "Flagged during health-related censorship." },
    { word: "blade", reason: "Removed due to weapon references." },
    { word: "gunny", reason: "Flagged in anti-weapon filters." },
    { word: "shaft", reason: "Blocked due to multiple meanings." },
    { word: "pants", reason: "Blocked in conservative cultures." }
    // (You can continue adding more words!)
  ];
  
  // 🎯 Step 2: Pick a random word from the list
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
  