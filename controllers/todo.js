const Todo = require('../models/todo')
 const getTodos = (req, res) => {
     Todo.find()
         .then(result => res.send(result))
         .catch(err => console.log('err post ', err))
}

const createTodo = (req, res) => {
    const {text} = req.body;
    const todo = new Todo({text})
    todo.save()
        .then(result => res.send(result))
        .catch(err => console.log('err post ', err))
}

const editTodo = (req, res) => {
    const {id} = req.params
    const {text} = req.body
    Todo.findByIdAndUpdate(id, {$set: {text: text}})
        .then(result => res.send(result))
        .catch(err => console.log('err edit ', err))
}

const deleteTodo = (req, res) => {
    const {id} = req.params
    Todo.findByIdAndDelete(id)
        .then(() => res.send({status: 'OK'}))
        .catch(err => console.log('err edit ', err))
}

module.exports = {getTodos, createTodo, editTodo, deleteTodo}
