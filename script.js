const words = [
    { word: "pride", reason: "LGBTQ+ term censored in some regions." },
    { word: "tanks", reason: "Censored in China due to Tiananmen Square discussions." },
    { word: "fanny", reason: "Innocent in the U.S., offensive in the UK." },
    { word: "virus", reason: "Restricted in pandemic discussions." },
    { word: "press", reason: "Suppressed in media freedom debates." },
    { word: "power", reason: "Censored in discussions about government control." }
];

let selectedWord = words[Math.floor(Math.random() * words.length)];
let attempts = 0;
let maxAttempts = 5;
let hintDisplayed = false;

document.addEventListener("DOMContentLoaded", function() {
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
    title.innerText = "Censored Wordle";
    
    let grid = document.createElement("div");
    grid.id = "grid";
    grid.style.display = "grid";
    grid.style.gridTemplateColumns = "repeat(5, 1fr)";
    grid.style.gap = "5px";
    grid.style.marginBottom = "20px";
    
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
    
    let input = document.createElement("input");
    input.id = "guessInput";
    input.type = "text";
    input.maxLength = 5;
    input.style.width = "100%";
    input.style.padding = "10px";
    input.style.fontSize = "18px";
    input.style.textAlign = "center";
    
    let button = document.createElement("button");
    button.id = "submitGuess";
    button.innerText = "Submit";
    button.style.padding = "10px 20px";
    button.style.fontSize = "18px";
    button.style.marginTop = "10px";
    button.style.backgroundColor = "#007BFF";
    button.style.color = "white";
    button.style.border = "none";
    button.style.borderRadius = "5px";
    button.style.cursor = "pointer";
    button.addEventListener("click", handleGuess);
    
    let message = document.createElement("p");
    message.id = "message";
    message.style.fontSize = "16px";
    
    let hint = document.createElement("p");
    hint.id = "hint";
    hint.style.fontSize = "16px";
    hint.style.color = "red";
    
    container.appendChild(title);
    container.appendChild(grid);
    container.appendChild(input);
    container.appendChild(button);
    container.appendChild(message);
    container.appendChild(hint);
    document.body.appendChild(container);
});

function handleGuess() {
    let guess = document.getElementById("guessInput").value.toLowerCase();
    if (guess.length !== 5) return;
    let gridCells = document.getElementById("grid").children;
    let rowStart = attempts * 5;
    
    for (let i = 0; i < 5; i++) {
        gridCells[rowStart + i].innerText = guess[i].toUpperCase();
        if (guess[i] === selectedWord.word[i]) {
            gridCells[rowStart + i].style.backgroundColor = "#6aaa64";
        } else if (selectedWord.word.includes(guess[i])) {
            gridCells[rowStart + i].style.backgroundColor = "#c9b458";
        } else {
            gridCells[rowStart + i].style.backgroundColor = "#787c7e";
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
