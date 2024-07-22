const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const sanpham = new Schema({
    id: { type: ObjectId }, // khóa chính
    name: {
        type: String, // kiểu dữ liệu
        required: true, // bắt buộc phải có
    },
    description: {
        type: String,
        required: true
    },
    background: {
        type: String, // kiểu dữ liệu
        required: true, // bắt buộc phải có 
    },
    member:{
        type: Number, // kiểu dữ liệu
        required: true, // bắt buộc phải có 
    },
    id_user: { 
        type: ObjectId,
        ref:'user' 
    } 
});
module.exports = mongoose.models.room || mongoose.model('room', sanpham);