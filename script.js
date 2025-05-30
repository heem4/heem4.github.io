const words = [
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
    { word: "press", reason: "Suppressed in media freedom debates." },
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
    // Add more words here to reach 300
];

let selectedWord = words[Math.floor(Math.random() * words.length)];
let attempts = 0;
let maxAttempts = 5;
let hintDisplayed = false;

document.addEventListener("DOMContentLoaded", function () {
    document.body.style.fontFamily = "Arial, sans-serif";
    document.body.style.textAlign = "center";
    document.body.style.backgroundColor = "#f4f4f4";
    document.body.style.padding = "20px";

    let container = document.createElement("div");
    container.style.maxWidth = "350px";
    container.style.margin = "auto";
    container.style.padding = "20px";
    container.style.backgroundColor = "white";
    container.style.boxShadow = "0px 4px 8px rgba(0,0,0,0.2)";
    container.style.borderRadius = "10px";

    let title = document.createElement("h2");
    title.innerText = "SHUSH";

    let grid = document.createElement("div");
    grid.id = "grid";
    grid.style.display = "grid";
    grid.style.gridTemplateColumns = "repeat(5, 1fr)";
    grid.style.gap = "5px";
    grid.style.marginBottom = "20px";
    grid.style.justifyContent = "center";

    for (let i = 0; i < maxAttempts * 5; i++) {
        let cell = document.createElement("div");
        cell.className = "cell";
        cell.style.width = "50px";
        cell.style.height = "50px";
        cell.style.border = "2px solid #ccc";
        cell.style.display = "flex";
        cell.style.alignItems = "center";
        cell.style.justifyContent = "center";
        cell.style.fontSize = "24px";
        grid.appendChild(cell);
    }

    let keyboard = document.createElement("div");
    keyboard.id = "keyboard";
    keyboard.style.display = "grid";
    keyboard.style.gridTemplateColumns = "repeat(10, 1fr)";
    keyboard.style.gap = "5px";
    keyboard.style.marginTop = "20px";
    keyboard.style.justifyContent = "center";
    keyboard.style.padding = "10px";

    const keys = "QWERTYUIOPASDFGHJKLZXCVBNM".split("");
    keys.forEach(letter => {
        let key = document.createElement("div");
        key.innerText = letter;
        key.className = "key";
        key.style.padding = "10px";
        key.style.border = "2px solid #ccc";
        key.style.textAlign = "center";
        key.style.fontSize = "20px";
        key.style.cursor = "pointer";
        key.addEventListener("click", () => {
            document.getElementById("guessInput").value += letter.toLowerCase();
        });
        keyboard.appendChild(key);
    });

    let inputContainer = document.createElement("div");
    inputContainer.style.display = "flex";
    inputContainer.style.justifyContent = "center";
    inputContainer.style.marginTop = "10px";

    let input = document.createElement("input");
    input.id = "guessInput";
    input.type = "text";
    input.maxLength = 5;
    input.style.width = "120px";
    input.style.padding = "10px";
    input.style.fontSize = "18px";
    input.style.textAlign = "center";

    let button = document.createElement("button");
    button.id = "submitGuess";
    button.innerText = "Submit";
    button.style.padding = "10px 20px";
    button.style.fontSize = "18px";
    button.style.marginLeft = "10px";
    button.style.backgroundColor = "#007BFF";
    button.style.color = "white";
    button.style.border = "none";
    button.style.borderRadius = "5px";
    button.style.cursor = "pointer";
    button.addEventListener("click", handleGuess);

    inputContainer.appendChild(input);
    inputContainer.appendChild(button);

    let message = document.createElement("p");
    message.id = "message";
    message.style.fontSize = "16px";

    let hint = document.createElement("p");
    hint.id = "hint";
    hint.style.fontSize = "16px";
    hint.style.color = "red";

    container.appendChild(title);
    container.appendChild(grid);
    container.appendChild(inputContainer);
    container.appendChild(keyboard);
    container.appendChild(message);
    container.appendChild(hint);
    document.body.appendChild(container);
});

// ✅ Define `handleGuess()` function separately
function handleGuess() {
    let guess = document.getElementById("guessInput").value.toLowerCase();
    if (!guess || guess.length !== 5) return; // Ensure valid input

    let gridCells = document.getElementById("grid").children;
    let rowStart = attempts * 5;

    for (let i = 0; i < 5; i++) {
        gridCells[rowStart + i].innerText = guess[i].toUpperCase();
        if (guess[i] === selectedWord.word[i]) {
            gridCells[rowStart + i].style.backgroundColor = "#6aaa64"; // Green for correct position
        } else if (selectedWord.word.includes(guess[i])) {
            gridCells[rowStart + i].style.backgroundColor = "#c9b458"; // Yellow for correct letter, wrong position
        } else {
            gridCells[rowStart + i].style.backgroundColor = "#787c7e"; // Gray for incorrect letter
        }
        gridCells[rowStart + i].style.border = "2px solid black";
    }

    attempts++;

    if (guess === selectedWord.word) {
        document.getElementById("message").innerText = `Correct! The word '${selectedWord.word}' was flagged because: ${selectedWord.reason}`;
        document.getElementById("hint").innerText = "";
    } else {
        if (attempts === 4 && !hintDisplayed) {
            document.getElementById("hint").innerText = `Hint: This word has been censored for controversial reasons.`;
            hintDisplayed = true;
        }
        if (attempts >= maxAttempts) {
            document.getElementById("message").innerText = `Game over! The word was '${selectedWord.word}'. Reason: ${selectedWord.reason}`;
            document.getElementById("hint").innerText = "";
        }
    }
}
