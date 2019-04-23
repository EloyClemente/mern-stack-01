const mongoose = require('mongoose')
const { Schema } = mongoose


const TaskSchema = new Schema({
    title: String,
    description: String
})

module.exports = mongoose.model('Task', TaskSchema)