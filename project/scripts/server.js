const express = require('express');
const fs = require('fs');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/saveStory', (req, res) => {
    const newStory = req.body;

    fs.readFile('data/userstory.json', (err, data) => {
        let stories = [];
        if (!err) {
            try {
                stories = JSON.parse(data);
            } catch (parseErr) {
                console.error("Error parsing userstory.json:", parseErr);
                stories = [];
            }
        }
        stories.push(newStory);

        fs.writeFile('data/userstory.json', JSON.stringify(stories, null, 2), (err) => {
            if (err) {
                res.status(500).json({ message: "Failed to save story" });
            } else {
                res.status(200).json({ message: "Story saved successfully!" });
            }
        });
    });
});

app.get('/stories', (req, res) => {
    fs.readFile('data/userstory.json', (err, data) => {
        if (err) {
            if (err.code === 'ENOENT') {
                return res.status(200).json([]);
            }
            console.error("Error reading userstory.json for GET request:", err);
            return res.status(500).json({ message: "Failed to retrieve stories" });
        }
        try {
            const stories = JSON.parse(data);
            res.status(200).json(stories);
        } catch (parseErr) {
            console.error("Error parsing userstory.json for GET request:", parseErr);
            res.status(500).json({ message: "Failed to parse stories data" });
        }
    });
});

app.listen(3000, () => console.log('Server running on port 3000'));