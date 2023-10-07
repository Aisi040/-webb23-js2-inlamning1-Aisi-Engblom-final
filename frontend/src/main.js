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
        
        // Skicka poäng till backend och starta om spelet
        if (playerName) {
            await sendHighscore(playerName, playerScore);
        }

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

async function fetchHighscores() {
    try {
        const response = await fetch('http://localhost:3000/highscore');
        const highscores = await response.json();
        const highscoreList = document.getElementById('highscoreList');
        highscoreList.innerHTML = '';
        highscores.forEach(entry => {
            const listItem = document.createElement('li');
            listItem.textContent = `${entry.name}: ${entry.score}`;
            highscoreList.appendChild(listItem);
        });
    } catch (error) {
        console.error("Error fetching highscores:", error);
    }
}

async function sendHighscore(name, score) {
    try {
        const response = await fetch('http://localhost:3000/highscore', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, score })
        });
        const data = await response.json();
        console.log(data.message);
        fetchHighscores();  // Uppdatera highscore-listan
    } catch (error) {
        console.error("Error sending highscore:", error);
    }
}

// Kalla på funktionen när sidan laddas
fetchHighscores();
