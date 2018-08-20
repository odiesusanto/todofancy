const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var todoSchema = new Schema({
    task: {
        type: String,
        required: [true, "Input task"]
    }, 
    status: String, 
    doneBy: Date, 
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, {timestamps: true});

var Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;
