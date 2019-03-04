const http = require('http')
const fs = require('fs')
const Model = require('./mongodb')


let dir_url = './'
const server = http.createServer(function(request, response) {
  let url = 'views/index.html'
  if (request.url !== '/') {
    url = request.url
  }

  console.log('路径:', dir_url+url)

  fs.readFile(dir_url + url, function(err, data) {
    if (err) {
      return response.end('404 not Found .')
    } else {
      console.log('请求成功 !')
      response.end(data)
    }
  })
})

console.log('server is starting ...')
server.listen(3000)

