const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { createArticle, deleteArticle, getSaveArticles } = require('../../controllers/articles');

const { regexLink } = require('../../regex');

router.get('/', getSaveArticles);
router.post('/', celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required().min(2).max(30),
    title: Joi.string().required().min(2).max(30),
    text: Joi.string().required(),
    date: Joi.string().required(),
    source: Joi.string().required(),
    link: Joi.string().required().regex((regexLink)),
    image: Joi.string().required().regex((regexLink)),
  }),
}), createArticle);
router.delete('/:articleId', celebrate({
  params: Joi.object().keys({
    articleId: Joi.string().alphanum().regex(/^[0-9a-fA-F]{24}$/),
  }),
}), deleteArticle);

module.exports = router;
