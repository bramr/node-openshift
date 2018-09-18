const http = require('http')
const port = 3000
const os = require('os')

const bytesToSize = (bytes) => {
   var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
   if (bytes == 0) return '0 Byte'
   var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)))
   return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i]
}

const requestHandler = (req, res) => {
  console.log(`${req.url} | ${bytesToSize(os.totalmem())} | ${os.uptime()}s | ${os.loadavg()}`)
  res.setHeader("Content-Type", "text/html")
  res.end(`<h2>Hello from Node.js on ${os.hostname()} , with memory: ${bytesToSize(os.totalmem())}, uptime: ${os.uptime()} seconds</h2>\n`)
}

const server = http.createServer(requestHandler)
server.listen(port, (err) => {
  if (err) {
    return console.log('Whoops something went wrong :()', err)
  }
  console.log(`Node server is listening on ${port}`)
})
