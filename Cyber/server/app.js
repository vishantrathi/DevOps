const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../'))); // Serve frontend files

const articlesFile = path.join(__dirname, '../data/articles.json');

// Ensure articles.json file exists
if (!fs.existsSync(articlesFile)) {
  fs.writeFileSync(articlesFile, '[]');
}

// API to add an article
app.post('/api/add-article', (req, res) => {
  const newArticle = req.body;

  fs.readFile(articlesFile, 'utf8', (err, data) => {
    if (err) return res.status(500).send('Error reading file');

    const articles = JSON.parse(data);
    articles.push(newArticle);

    fs.writeFile(articlesFile, JSON.stringify(articles, null, 2), err => {
      if (err) return res.status(500).send('Error writing file');
      res.status(200).send({ status: 'success' });
    });
  });
});

// API to get articles
app.get('/api/articles', (req, res) => {
  fs.readFile(articlesFile, 'utf8', (err, data) => {
    if (err) return res.status(500).send('Error reading file');
    res.status(200).json(JSON.parse(data));
  });
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
