var express = require('express');
var router = express.Router();
var todoController = require('../controllers/todoController');
var authorization = require('../middlewares/authorization');

router.post('/', authorization, todoController.createTask);

router.get('/', authorization, todoController.showTasks);

router.put('/:id', authorization, todoController.updateTask);

router.delete('/:id', authorization, todoController.deleteTask);

module.exports = router;