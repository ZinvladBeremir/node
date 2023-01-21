const Todos = require('../models/todos')

const getTodos = async (req, res) => {
    const {marked} = req.query
    const user_id = req.body.user_id
    try {
        let list
        if(!!marked) {
            list = await Todos.find({isMarked: marked, user_id})

        } else {
            list = await Todos.find({user_id})
        }
        res.send(list)
    } catch (e) {
        console.log('some error ', e)
    }

}

const getTodo = async (req, res) => {
    try {
        const {id} = req.params
        const user_id = req.body.user_id
        const todo = await Todos.find({_id: id, user_id})
        res.send(todo)
    } catch (e) {
        console.log('some error ', e)
    }
}

const createTodo = async (req, res) => {
    try {
        const user_id = req.body.user_id
        const {text, end_date} = req.body;
        const endDate = !!end_date ? new Date(end_date).toISOString() : null
        const newTodo = await new Todos({text, isMarked: false, end_date: endDate, user_id}).save()
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
