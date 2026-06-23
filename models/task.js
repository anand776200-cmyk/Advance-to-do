const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    title: String,
    des: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now
    },
    isDone: {
        type: Boolean,
        default: false
    }
});


module.exports = TaskSchema;