const Todos = require('../models/todos')

const getTodos = async (req, res) => {
    const {marked} = req.query

    if (!!marked) {
        try {
            const list = await Todos.find({isMarked:true})
            res.send(list)
        } catch (e) {
            console.log('some error ', e)
        }
    } else {
        try {
            const list = await Todos.find()
            res.send(list)
        } catch (e) {
            console.log('some error ', e)
        }
    }

}

const getTodo = async (req, res) => {
    try {
        const {id} = req.params

        const todo = await Todos.findById(id)
        res.send(todo)
    } catch (e) {
        console.log('some error ', e)
    }
}

const createTodo = async (req, res) => {
    try {
        const {text, end_date} = req.body;
        const endDate = !!end_date ? new Date(end_date).toISOString() : null
        const newTodo = await new Todos({text, isMarked: false, end_date: endDate}).save()
        res.send(newTodo)
    } catch (e) {
        console.log('some error ', e)
    }
}

const editTodo = async (req, res) => {
    try {
        const {id, text, isMarked, end_date} = req.body
        if (!id) {
            res.status(400).send({message: 'id isn\'t present'})
        } else {
            const endDate = !!end_date ? new Date(end_date).toISOString() : null
            await Todos.findByIdAndUpdate(id, {text: text || '', isMarked: isMarked || false, end_date: endDate})
            res.send({status: 'OK'})
        }

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

module.exports = {getTodos, getTodo, createTodo, editTodo, deleteTodo}
