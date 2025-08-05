const express = require('express');
const mongoose = require('mongoose');
const Article = require('./models/Article');

const app = express();

app.set('view engine', 'pug');
app.set('views', './views');

mongoose.connect('mongodb://localhost:27017/blog')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error(err));

app.get('/', async (req, res) => {
  const article = await Article.findOne(); // Берём первую статью
  res.render('index', { article });
});

app.use(express.urlencoded({ extended: true }));
app.post('/comment', async (req, res) => {
  const { articleId, text } = req.body;
  
  await Article.updateOne(
    { _id: articleId },
    { 
      $push: { 
        comments: { 
          text,
          visible: true,
          createdAt: new Date() 
        } 
      } 
    }
  );
  
  res.redirect('/');
});

app.listen(3000, () => console.log('Server started on http://localhost:3000'));