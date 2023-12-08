const express = require('express');

const {createTodo, getAllTodos} = require('../controller/todoController')
const router = express.Router();


router.post('/', createTodo);
router.get('/', getAllTodos);
// router.patch('/', todoController.updateTodo);
// router.delete('/', todoController.deleteTodo);

module.exports = router;