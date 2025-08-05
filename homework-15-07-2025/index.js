const mongoose = require('mongoose');
const { BlogPost } = require('./models/element');

async function main() {
  await mongoose.connect('mongodb://localhost:27017/storage');
  console.log('Connected to MongoDB');

  const post = new BlogPost({
    title: "Пример заголовка более 10 символов",
    content: "Текст статьи...",
    tags: ["tag1", "tag2"],
    published: true
  });

  await post.save();
  console.log('Document saved!');
  await mongoose.disconnect();
}

main().catch(err => console.error('Error:', err));