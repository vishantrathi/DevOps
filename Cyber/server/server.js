const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(express.static('public'));

app.post('/api/add-article', (req, res) => {
  const newArticle = req.body;
  const filePath = path.join(__dirname, '../data/articles.json');

  fs.readFile(filePath, 'utf8', (err, data) => {
    let articles = data ? JSON.parse(data) : [];
    articles.push(newArticle);
    fs.writeFile(filePath, JSON.stringify(articles, null, 2), () => {
      res.send({ status: 'success' });
    });
  });
});

app.get('/api/articles', (req, res) => {
  const filePath = path.join(__dirname, '../data/articles.json');
  fs.readFile(filePath, 'utf8', (err, data) => {
    res.json(JSON.parse(data || '[]'));
  });
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
