const express = require('express')
const path = require('path')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
const router = require('./routes/index.ts')

// app.use(express.static(path.join(__dirname), '../client.dist'))

app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())
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

// 路由
app.use('/api', router)

app.listen(3000, () => {
  console.log('node server is runnig port: 3000 ...')
})
