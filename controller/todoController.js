const Todo = require('../models/Todos');

const getAllTodos = async (req, res) => {
    try {
        const todos = await Todo.find();
        if(todos) {
            res.status(200).json({
                status: 'success',
                todos
            })
        }
        else {
            res.status(404).json({
                status: 'success',
                message: 'No todos found!!'
            })
        }
    } catch (err) {
        res.status(500).json({
            status: 'failure',
            message: `Error occured : ${err}`
        })
    }
}


const createTodo = async (req, res) => {
    try {
        const newTodo = await Todo.create(req.body);

        res.status(201).json({
            status: 'success',
            newTodo
        })
    } catch (err) {
        res.status(400).json({
            status: 'failure',
            message: 'Bad request !!'
        })
    }
}

module.exports = {
    createTodo,
    getAllTodos
}



