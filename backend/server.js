const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises; // Använda promises-version av fs
const path = require('path');

const app = express();
const PORT = 3000;
const HIGHSCORE_FILE = path.join(__dirname, 'highscore.json');

// Middleware
app.use(bodyParser.json());

app.get('/highscores', async (req, res) => {
    try {
        let data = await fs.readFile(HIGHSCORE_FILE, 'utf8');
        res.json(JSON.parse(data));
    } catch (err) {
        console.error('Error reading highscore file:', err);
        res.status(500).send('Server error');
    }
});

app.post('/highscores', async (req, res) => {
    try {
        const { name, score } = req.body;
        let data = await fs.readFile(HIGHSCORE_FILE, 'utf8');
        const highscores = JSON.parse(data);
        
        highscores.push({ name, score });
        highscores.sort((a, b) => b.score - a.score);
        while (highscores.length > 5) highscores.pop();

        await fs.writeFile(HIGHSCORE_FILE, JSON.stringify(highscores, null, 2));
        res.send('Highscore updated!');
    } catch (err) {
        console.error('Error handling highscore data:', err);
        res.status(500).send('Server error');
    }
});

app.listen(PORT, async () => {
    try {
        // Ensure highscore.json exists
        try {
            await fs.access(HIGHSCORE_FILE);
        } catch {
            await fs.writeFile(HIGHSCORE_FILE, JSON.stringify([]));
        }
        console.log(`Server is running on http://localhost:${PORT}`);
    } catch (err) {
        console.error('Error initializing server:', err);
    }
});
