const mongoose = require('mongoose');
const TaskSchema = require('./task');

const ListSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    listTitle: {
        type: String,
        default: "List"
    },
    tasks: [TaskSchema]
});

module.exports = mongoose.model('list', ListSchema);