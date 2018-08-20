const Todo = require('../models/todo');
const jwt = require('jsonwebtoken');


module.exports = {

    createTask: (req, res) => {
        let decoded = jwt.decode(req.headers.token)
        // res.send(decoded)
        Todo.create({
            task: req.body.task,
            status: req.body.status,
            doneBy: req.body.doneBy,
            userId: decoded.id
        })
            .then(newTask => {
                res.status(200).json({
                    msg: `New task added successfully!`,
                    newTask
                });
            })
            .catch(err => {
                res.status(500).json(err);
            })
    },

    showTasks: (req, res) => {
        let decoded = jwt.decode(req.headers.token);
        console.log(decoded)
        Todo.find({
            userId: decoded.id
        })
            .then(allTasks => {
                console.log(allTasks)
                res.status(200).json({
                    msg: `All Tasks`,
                    data: allTasks
                })
            })
            .catch(err => {
                res.status(500).json(err);
            })
    },

    updateTask: (req, res) => {
        let decoded = jwt.decode(req.headers.token);

        Todo.update({
            _id: req.params.id
        }, {
            $set: {
                task: req.body.task,
                status: req.body.status,
                doneBy: req.body.doneBy
            }
            })
            .then(updatedTask => {
                res.status(200).json({
                    msg: `Task updated`,
                    updatedTask
                });
            })
            .catch(err => {
                res.status(500).json(err);
            })
    },

    deleteTask: (req, res) => {
        let decoded = jwt.decode(req.headers.token);

        Todo.deleteOne({ _id: req.params.id})
        .then(deleted => {
            res.status(200).json({
                msg: `Data deleted from record`,
                deleted
            });
        })
        .catch(err => {
            res.status(500).json(err);
        })
    }
}