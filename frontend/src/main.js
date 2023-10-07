let playerName = "";
let playerScore = 0;

document.getElementById("rock").addEventListener("click", () => playGame("rock"));
document.getElementById("scissors").addEventListener("click", () => playGame("scissors"));
document.getElementById("paper").addEventListener("click", () => playGame("paper"));

async function playGame(playerChoice) {
    const computerChoice = ["rock", "scissors", "paper"][Math.floor(Math.random() * 3)];
    const result = determineWinner(playerChoice, computerChoice);

    if (result === "win") {
        playerScore++;
        document.getElementById("score").textContent = `Din poäng: ${playerScore}`;
        document.getElementById("result").textContent = `Du valde ${playerChoice} och datorn valde ${computerChoice}. Du vinner!`;
    } else if (result === "lose") {
        document.getElementById("result").textContent = `Du valde ${playerChoice} och datorn valde ${computerChoice}. Datorn vinner!`;
        // TODO: Skicka poäng till backend och starta om spelet
        playerScore = 0;
        document.getElementById("score").textContent = `Din poäng: ${playerScore}`;
    } else {
        document.getElementById("result").textContent = `Båda valde ${playerChoice}. Det är oavgjort!`;
    }
}

function determineWinner(playerChoice, computerChoice) {
    if (playerChoice === computerChoice) return "draw";
    if (
        (playerChoice === "rock" && computerChoice === "scissors") ||
        (playerChoice === "scissors" && computerChoice === "paper") ||
        (playerChoice === "paper" && computerChoice === "rock")
    ) {
        return "win";
    } else {
        return "lose";
    }
}
