const Router = require('express').Router
const { createTodo, deleteTodo, editTodo, getTodos, getTodo } = require('../controllers/todos')
const  middlewareAuth = require('../middleware/auth')

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger/docs');

const router = Router()

router.use('/swagger', swaggerUi.serve);
router.get('/swagger', swaggerUi.setup(swaggerDocument));

router.get('/api/todos', middlewareAuth,  getTodos)
router.get('/api/todos/:id', middlewareAuth, getTodo)
router.post('/api/todos', middlewareAuth, createTodo)
router.patch('/api/todos', middlewareAuth, editTodo)
router.delete('/api/todos/:id', middlewareAuth, deleteTodo)

module.exports = router
