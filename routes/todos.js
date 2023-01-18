const Router = require('express').Router
const {createTodo, deleteTodo, editTodo, getTodos, getTodo} = require('../controllers/todos')

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger/docs');

const router = Router()

router.use('/swagger', swaggerUi.serve);
router.get('/swagger', swaggerUi.setup(swaggerDocument));

router.get('/api/todos', getTodos)
router.get('/api/todos/:id', getTodo)
router.post('/api/todos', createTodo)
router.patch('/api/todos', editTodo)
router.delete('/api/todos/:id', deleteTodo)

module.exports = router
