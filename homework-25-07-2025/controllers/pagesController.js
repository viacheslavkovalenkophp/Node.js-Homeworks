const Page = require('../models/Page');

exports.getHomePage = async (req, res) => {
  try {
    const lang = req.query.lang || 'ua'; 
    const page = await Page.findOne().sort({ _id: 1 });
    
    if (!page) {
      return res.status(404).send('Page not found');
    }

    res.render('index', {
      title: page.caption[lang],
      content: page.text[lang],
      image: page.image,
      currentLang: lang, 
      pageLang: lang    
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

exports.getSecondPage = async (req, res) => {
  try {
    const lang = req.query.lang || 'ua';
    const page = await Page.findOne().sort({ _id: 1 }).skip(1);
    
    if (!page) {
      return res.status(404).send('Страница не найдена');
    }

    res.render('page', {
      caption: page.caption[lang],
      text: page.text[lang],
      image: page.image
    });
    
  } catch (err) {
    console.error(err);
    res.status(500).send('Ошибка сервера');
  }
};