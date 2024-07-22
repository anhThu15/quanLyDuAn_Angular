const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const nguoidung = new Schema({
    id: { type: ObjectId }, // khóa chính
    name: {
        type: String, // kiểu dữ liệu
        required: true, // bắt buộc phải có
    },
    email: {
        type: String,
        required: true
    },  
    password: {
        type: String, // kiểu dữ liệu
        required: true, // bắt buộc phải có 
    },
    role:{
        type: String, // kiểu dữ liệu
        required: true, // bắt buộc phải có 
    }
});
module.exports = mongoose.models.user || mongoose.model('user', nguoidung);