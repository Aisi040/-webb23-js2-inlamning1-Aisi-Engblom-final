// Definiera variabler
const usernameInput = document.getElementById('username');
const startGameButton = document.getElementById('start-game');
const gameBoard = document.getElementById('game-board');
const choiceButtons = document.querySelectorAll('.choice');
const resultParagraph = document.getElementById('result');
const currentScoreParagraph = document.getElementById('current-score');
const highscoreList = document.getElementById('highscore-list');
let currentScore = 0;

startGameButton.addEventListener('click', function() {
    if (usernameInput.value.trim() === '') {
        alert('Var god ange ett namn!');
        return;
    }
    gameBoard.removeAttribute('hidden');
    fetchHighscores();  // Hämta highscores när spelet startas
});

choiceButtons.forEach(button => {
    button.addEventListener('click', async function(event) {
        const playerChoice = event.currentTarget.getAttribute('data-choice');
        const computerChoice = ['sten', 'sax', 'påse'][Math.floor(Math.random() * 3)];

        const winner = determineWinner(playerChoice, computerChoice);

        if (winner === 'player') {
            currentScore++;
            resultParagraph.textContent = `Du valde ${playerChoice} och datorn valde ${computerChoice}. Du vinner!`;
        } else if (winner === 'computer') {
            resultParagraph.textContent = `Du valde ${playerChoice} och datorn valde ${computerChoice}. Datorn vinner. Spelet startar om.`;
            await sendScoreToBackend(usernameInput.value, currentScore);
            currentScore = 0;
        } else {
            resultParagraph.textContent = 'Det är oavgjort!';
        }

        currentScoreParagraph.textContent = `Poäng: ${currentScore}`;
    });
});

function determineWinner(playerChoice, computerChoice) {
    if (playerChoice === computerChoice) return 'draw';
    if ((playerChoice === 'sten' && computerChoice === 'sax') ||
        (playerChoice === 'sax' && computerChoice === 'påse') ||
        (playerChoice === 'påse' && computerChoice === 'sten')) {
        return 'player';
    }
    return 'computer';
}

async function sendScoreToBackend(name, score) {
    try {
        const response = await fetch('http://localhost:3000/highscore', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, score })
        });
        if (response.ok) {
            fetchHighscores();  // Uppdatera highscore-listan efter att en ny poäng har skickats
        } else {
            console.error('Failed to send score:', await response.text());
        }
    } catch (error) {
        console.error('Error sending score:', error);
    }
}

async function fetchHighscores() {
    try {
        const response = await fetch('http://localhost:3000/highscores');
        const data = await response.json();

        displayHighscores(data);
    } catch (error) {
        console.error("Error fetching highscores:", error);
    }
}

function displayHighscores(highscores) {
    highscoreList.innerHTML = ''; // Töm listan

    for (const score of highscores) {
        const listItem = document.createElement('li');
        listItem.textContent = `${score.name}: ${score.score}`;
        highscoreList.appendChild(listItem);
    }
}
