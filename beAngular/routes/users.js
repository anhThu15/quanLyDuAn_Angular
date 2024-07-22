var express = require('express');
var router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authen = require('../middleware/authen');
var modelUser = require('../models/userModel')
var modelProduct = require('../models/productModel')

/* GET users listing. */


// router.post('/', async function(req, res){
//     // res.json( await modelUser.find())
//   try{
//     var {email,password} = req.body
//     var data = await modelUser.find({email:email, password:password});
//     if(data != null){
//         res.json(data);
//     }else{
//         res.json({status: 0, message:"thất bại"});
//     }
//   }catch(e){
//     res.json({status:-1, message:"có lỗi xảy ra "});
//   };
// })

router.post('/login', async function (req, res, next) {
  try {
    const { email, password } = req.body;
    const user = await modelUser.findOne({ email: email });
    // kiểm tra password đã mã hóa
    if (user && bcrypt.compareSync(password, user.password)) {
      const access_token = jwt.sign({ user }, 'shhhhh', { expiresIn: 1 * 60 });
      const refresh_token = jwt.sign({ user }, 'shhhhh', { expiresIn: 90 * 24 * 60 * 60 });
      // access token là chuỗi ngẫu nhiên, dùng để xác thực người dùng
      // refresh token là chuỗi ngẫu nhiên, dùng để lấy lại access token
      res.status(200).json({ user, access_token, refresh_token });
    }
    else {
      res.status(401).json({ error: 'Sai email hoặc mật khẩu' });
    }
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

router.post('/sigin', async function(req, res, next) {
  // res.json( await modelUser.find())
  try{
    var {name,email,password} = req.body
       // Tạo salt và mã hóa mật khẩu
       const salt = bcrypt.genSaltSync(10);
       const hash = bcrypt.hashSync(password, salt); 
       const newUser = new modelUser({
         name,
         email,
         password: hash,
         role: 'user' 
       });
       await newUser.save();

       res.status(201).json({ message: 'Đăng ký thành công', user: newUser });
  }catch(e){
    res.json({status:-1, message:"có lỗi xảy ra "});
  }
});


router.get('/delete', async function(req, res, next) {
  try{
    var {id} = req.query;
    var result = await modelUser.findByIdAndDelete(id);
    if(result != null){
        res.json({status: 1, message:"xóa thành công "})
    }else{
        res.json({status: -1, message:"xóa thất bại"})
    }
}catch(e){
    res.json({status: 0, message:"không tìm thấy sản phẩm "})
}
});


module.exports = router;
