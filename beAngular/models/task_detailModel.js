const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const bang_chitiet = new Schema({
    id: { type: ObjectId }, // khóa chính
    description: {
        type: String,
        required: true
    },
    id_task: { 
        type: ObjectId,
        ref: 'task' 
    },
    id_room: { 
        type: ObjectId,
        ref: 'room' 
    } 
});
module.exports = mongoose.models.task_detail || mongoose.model('task_detail', bang_chitiet);