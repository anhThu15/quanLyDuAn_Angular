const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const bang_user = new Schema({
    id: { type: ObjectId }, // khóa chính
    id_task: { 
        type: ObjectId,
        ref: 'task' 
    },
    id_user: { 
        type: ObjectId,
        ref: 'user' 
    } 
});
module.exports = mongoose.models.user_task || mongoose.model('user_task', bang_user);