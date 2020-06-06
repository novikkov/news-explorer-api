const Article = require('../models/article');
const NotFoundError = require('../errors/not-found-err');
const PermissionError = require('../errors/permission-err');

module.exports.createArticle = (req, res, next) => {
  const owner = req.user._id;

  const {
    keyword,
    title,
    text,
    date,
    source,
    link,
    image,
  } = req.body;

  Article.create({
    keyword,
    title,
    text,
    date,
    source,
    link,
    image,
    owner,
  })
    .then((article) => res.send({ data: article }))
    .catch(next);
};

module.exports.deleteArticle = (req, res, next) => {
  Article.findById(req.params.articleId)
    .orFail(() => new NotFoundError('Статья не найдена'))
    .then((article) => {
      if (!article.owner.equals(req.user._id)) {
        throw new PermissionError('Нет прав на удаление статьи');
      }

      return Article.deleteOne(article)
        .then(() => res.send({ message: 'Статья успешно удалена' }));
    })
    .catch(next);
};

module.exports.getSaveArticles = (req, res, next) => {
  Article.findById(req.params.cardId)
    .orFail(() => new NotFoundError('Статьи не найдены'))
    .then((article) => {
      if (!article.owner.equals(req.user._id)) {
        throw new PermissionError('Нет прав на просмотр статей');
      }

      return Article.find(article)
        .then(() => res.send({ data: article }));
    })
    .catch(next);
};
