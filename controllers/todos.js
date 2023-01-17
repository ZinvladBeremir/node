const Todos = require('../models/todos')
const getTodos = async (req, res) => {
    try {
        const list = await Todos.find()
        res.send(list)
    } catch (e) {
        console.log('some error ', e)
    }
}

const createTodo = async (req, res) => {
    try {
        const {text} = req.body;
        const newTodo = await new Todos({text}).save()
        res.send(newTodo)
    } catch (e) {
        console.log('some error ', e)
    }
}

const editTodo = async (req, res) => {
    try {
        const {id} = req.params
        const {text} = req.body

        await Todos.findByIdAndUpdate(id, text)
        res.send({status: 'OK'})
    } catch (e) {
        console.log('some error ', e)
    }
}

const deleteTodo = async (req, res) => {
    try {
        const {id} = req.params

        await Todos.findByIdAndDelete(id)
        res.send({status: 'OK'})
    } catch (e) {
        console.log('some error ', e)
    }
}

module.exports = {getTodos, createTodo, editTodo, deleteTodo}
