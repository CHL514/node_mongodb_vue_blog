const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const cors = require('cors')
const UserModels = require('./mongodb/index.ts')
const router = express.Router()
const app = express()

app.use(cors())
// node.js 跨域问题
// app.all('*', function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "X-Requested-With");
//   res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
//   res.header("X-Powered-By",' 3.2.1')
//   res.header("Content-Type", "text/html;charset=utf-8");
//   next();
// });

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')


router.get('/', function(req, res) {
  UserModels.find(function(err, datas) {
    if (err) {
      console.error('查询失败 !')
    } else {
      console.dir('查询成功')
      res.render('index', {
        datas
      })
    }
  })
})

router.post('/add', function(req, res) {
  // 检查数据库中是否已经存在同名用户
  console.log(req.body)
  UserModels.findOne({
    username: req.body.username
  }, function(err, userinfo) {
    if (err) {
      console.log('查询失败 !')
    }
    if (userinfo) {
      res.send('该用户名已存在 !')
      return false;
    } else {
      // 可以注册这个用户名
      new UserModels({
        username: req.body.username,
        password: req.body.password,
        isadmin: req.body.isadmin
      }).save()
      res.send('添加成功 !')
    }
  })
})

router.post('/delete', function(req, res) {
  UserModels.findOne({
    username: req.body.username
  }, function(err, userinfo) {
    if (err) {
      console.log('查询失败 !')
    }
    if (userinfo) {
      console.log('删除了吗 ?')
      UserModels.deleteOne({
        username: req.body.username
      })
    }
    res.send('delete successful !')
  })
})

app.use('/', router)

app.listen(3000)
