const http = require('http')
const Account = require('./src/model')

const server = http.createServer(function(request, response) {
  if (request.url === '/') {
    response.writeHead(200, {
      "Content-Type": "text/html"
    })

    response.end('Hello node mongodb')
  }
})

console.log('server is starting ...')
server.listen(3000)

