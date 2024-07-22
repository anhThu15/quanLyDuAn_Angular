const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const bang = new Schema({
    id: { type: ObjectId }, // khóa chính
    name: {
        type: String, // kiểu dữ liệu
        required: true, // bắt buộc phải có
    },
    description: {
        type: String,
        required: true
    },
    taskDetail:[
        {
            name:{type:String},
            description:{type:String},
            date:{type:String},
            user:{type: String}
        }
    ],
    id_room: { 
        type: ObjectId,
        ref:'room' 
    }
});
module.exports = mongoose.models.task || mongoose.model('task', bang);