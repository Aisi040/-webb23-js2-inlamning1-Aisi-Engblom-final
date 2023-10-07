const express = require('express');
const fs = require('fs');
const cors = require('cors');  // <-- Lägg till detta här
const app = express();
const PORT = 3000;

app.use(cors());  // <-- Lägg till detta här, innan andra middleware

// Middleware för att hantera JSON-data
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Sten, Sax, Påse backend!');
});

// Hämta highscore-listan
app.get('/highscore', (req, res) => {
    const highscores = JSON.parse(fs.readFileSync('highscore.json', 'utf8'));
    res.json(highscores);
});

// Uppdatera highscore-listan
app.post('/highscore', (req, res) => {
    const newScore = req.body;
    let highscores = JSON.parse(fs.readFileSync('highscore.json', 'utf8'));

    // Lägg till den nya poängen och sortera listan
    highscores.push(newScore);
    highscores = highscores.sort((a, b) => b.score - a.score).slice(0, 5);

    fs.writeFileSync('highscore.json', JSON.stringify(highscores, null, 2));
    res.json({ message: 'Highscore updated!' });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
