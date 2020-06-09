const router = require('express').Router();
const usersRouter = require('./users');
const articlesRouter = require('./articles');
const signinRouter = require('./signin');
const signupRouter = require('./signup');
const { auth } = require('../middlewares/auth');

router.use('/signin', signinRouter);
router.use('/signup', signupRouter);

router.use(auth);

router.use('/users', usersRouter);
router.use('/articles', articlesRouter);

module.exports = router;
