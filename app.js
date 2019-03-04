const http = require('http')
const Account = require('./model')

const server = http.createServer(function(request, response) {
  if (request.url === '/') {
    response.writeHead(200, {
      "Content-Type": "text/html"
    })

    response.end('Hello node')
  }
})

server.listen(3000)

