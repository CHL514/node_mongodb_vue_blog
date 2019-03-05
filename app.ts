const express = require('express')
const path = require('path')
const cors = require('cors')
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

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')


app.get('/', function(req, res) {
  res.render('index')
})

console.log('node server is runnig port: 3000 ...')
app.listen(3000)
