const router = require('express').Router();
const usersRouter = require('./users');
const articlesRouter = require('./articles');
const signinRouter = require('./signin');
const signupRouter = require('./signup');
const { auth } = require('../middlewares/auth');
const NotFoundError = require('../errors/not-found-err');

router.use('/signin', signinRouter);
router.use('/signup', signupRouter);

router.use(auth);

router.use('/users', usersRouter);
router.use('/articles', articlesRouter);
router.use('/', (req, res, next) => {
  next(new NotFoundError('Запрашиваемый ресурс не найден'));
});

module.exports = router;
