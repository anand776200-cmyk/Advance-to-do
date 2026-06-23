const mongoose = require('mongoose');
const TaskSchema = require('./task');

module.exports = mongoose.model('task', TaskSchema);