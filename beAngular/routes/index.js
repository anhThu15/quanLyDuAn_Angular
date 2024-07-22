var express = require('express');
var router = express.Router();
var modelProduct = require('../models/productModel')
var modelUser = require('../models/userModel')
var modelTask = require('../models/taskModel')
var modelTaskDetail = require('../models/task_detailModel')
var modelUserTask = require('../models/user_taskModel')

/* GET home page. */
router.get('/', async function(req, res, next) {
  // res.render('index', { title: 'Express' });
  var data = await modelProduct.find();
  res.json(data)
});

router.get('/:id', async function(req, res, next) {
  try{
    var {id} = req.params
    var data = await modelProduct.find({id_user:id});
    res.json(data)
  }catch(e){
    res.json({status:-1, message:"có lỗi xảy ra "});
  }
});

router.get('/search', async function(req, res, next) {
  try{
    var {key} = req.query
    var data = await modelProduct.find({_id:key});
    res.json(data)
  }catch(e){
      res.json({status:-1, message:"có lỗi xảy ra "});
  }
});

router.post('/add', async function(req, res, next) {
  try{
    var {name, description,background,member, id_user } = req.body;
    var roomAdd = {name, description,background,member, id_user };
    var result = await modelProduct.create(roomAdd); 
    console.log(result);
    if(result != null){
        res.json({status: 1, message:"Thành công"});
    }else{
        res.json({status: 0, message:"thất bại"});
    }
  }catch(e){
      res.json({status:-1, message:"có lỗi xảy ra "});
  }
});
router.get('/detail/:id', async function(req, res, next) {
  // res.render('index', { title: 'Express' });
  var {id} = req.params
  var data = await modelProduct.findById(id);
  res.json(data)
});

router.get('/delete/:id', async function(req, res, next) {
  try{
    var {id} = req.params;
    var result = await modelProduct.findByIdAndDelete(id);
    if(result != null){
        res.json({status: 1, message:"xóa thành công "})
    }else{
        res.json({status: -1, message:"xóa thất bại"})
    }
  }catch(e){
      res.json({status: 0, message:"không tìm thấy sản phẩm "})
  }
});



// thêm và xóa task   
router.get('/detail/task/:id', async function(req, res, next) {
  // res.render('index', { title: 'Express' });
  var {id} = req.params
  var data = await modelTask.find({id_room:id});
  res.json(data)
});

router.post('/detail/task/add', async function(req, res, next) {
  try{
    var {name, description,id_room } = req.body;
    var taskAdd = {name, description,id_room};
    var result = await modelTask.create(taskAdd); 
    console.log(result);
    if(result != null){
        res.json({status: 1, message:"Thành công"});
    }else{
        res.json({status: 0, message:"thất bại"});
    }
  }catch(e){
      res.json({status:-1, message:"có lỗi xảy ra "});
  }
});

router.get('/detail/task/delete/:id', async function(req, res, next) {
  try{
    var {id} = req.params;
    var result = await modelTask.findByIdAndDelete(id);
    if(result != null){
        res.json({status: 1, message:"xóa thành công "})
    }else{
        res.json({status: -1, message:"xóa thất bại"})
    }
  }catch(e){
      res.json({status: 0, message:"không tìm thấy sản phẩm "})
  }
});

// thêm và xóa task   
// router.get('/detail/task_detail/:id', async function(req, res, next) {
//   // res.render('index', { title: 'Express' });
//   var {id} = req.params
//   var data = await modelTaskDetail.find({id_task:id});
//   res.json(data)
// });

// router.get('/detail/task_detail/:id', async function (req, res) {
//   try {
//     const {id}= req.params;
//     const product = await modelTask.findById(id);

//     if (!product) {
//       return res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
//     }
//     res.json(product.taskDetail)
    
//   } catch (e) {
//      res.json({status: 0, message:"không tìm thấy sản phẩm "})
//   }
// });
router.get('/detail/task_detail/:taskId', async function(req, res, next) {
  try{
    const { taskId } = req.params;

    const task = await modelTask.findById(taskId);

    if (!task) {
      return res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
    }

    res.json(task.taskDetail)
}catch(e){
    res.json({status: 0, message:"không tìm thấy sản phẩm "})
}
});

router.post('/detail/task_detail/add', async function (req, res) {
  try {
    const {id}= req.body;
    const product = await modelTask.findById(id);

    if (!product) {
      return res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
    }

    const newTask = {
      description: req.body.description,
      date: req.body.date,
      name: req.body.name,
      user: req.body.user
    };

    product.taskDetail.push(newTask);
    await product.save();

    res.status(201).json(product.taskDetail); // Trả về taskDetail của sản phẩm sau khi đã được thêm
  } catch (error) {
    res.status(500).json({ message: error.message }); // Trả về lỗi nếu có lỗi xảy ra
  }
});

router.get('/detail/task_detail/update/:taskId/:idDetail', async function(req, res, next) {
  try{
    const { taskId, idDetail } = req.params;
    const {name, description, date} = req.body;

    var taskEdit = await modelTask.findById(taskId);

    const taskIndex = taskEdit.taskDetail.findIndex(task => task._id.toString() === idDetail);

    if (taskIndex === -1) {
      return res.status(404).json({ message: 'Không tìm thấy taskDetail' });
    }

    // res.json(taskIndex)
    
    // Cập nhật thông tin mới cho taskDetail
    if (name) {
      taskEdit.taskDetail[taskIndex].name = name;
    }
    if (description) {
      taskEdit.taskDetail[taskIndex].description = description;
    }
    if (date) {
      taskEdit.taskDetail[taskIndex].date = date;
    }

    // Lưu lại toàn bộ tài liệu
    await taskEdit.save();

  }catch(e){
      res.json({status:-1, message:"có lỗi xảy ra "});
  }
});

router.delete('/detail/task_detail/delete/:taskId/:idDetail', async function(req, res, next) {
  try{
    const { taskId, idDetail } = req.params;

    const task = await modelTask.findById(taskId);

    if (!task) {
      return res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
      }
      
      // // Lọc ra các mục mà id không trùng với taskId để xóa mục cần xóa
      task.taskDetail = task.taskDetail.filter(task => task._id.toString() !== idDetail);

      // res.json(task.taskDetail = task.taskDetail.filter(task => task._id.toString() !== idDetail))

    await task.save();
}catch(e){
    res.json({status: 0, message:"không tìm thấy sản phẩm "})
}
});




module.exports = router;
