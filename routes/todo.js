const Router = require('express').Router
const {createTodo, deleteTodo, editTodo, getTodos} = require('../controllers/todo')

const router = Router()

router.get('/api/todos', getTodos)
router.post('/api/todo', createTodo)
router.patch('/api/todo/:id', editTodo)
router.delete('/api/todo/:id', deleteTodo)

module.exports = router
