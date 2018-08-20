var express = require('express');
var router = express.Router();
var userController = require('../controllers/userController');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/register', userController.register);

router.post('/signin', userController.signIn);

router.post('/signin/facebook', userController.signInFB);

module.exports = router;
