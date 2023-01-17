const Router = require('express').Router
const {createTodo, deleteTodo, editTodo, getTodos} = require('../controllers/todos')

const router = Router()

router.get('/api/todos', getTodos)
router.post('/api/todos', createTodo)
router.patch('/api/todos/:id', editTodo)
router.delete('/api/todos/:id', deleteTodo)

module.exports = router
