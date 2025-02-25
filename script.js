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
