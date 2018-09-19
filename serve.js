const http = require('http')
const port = 3000
const os = require('os')

async function requestHandler(req, res) {
  const startUsage = process.cpuUsage()
  await simIO(50)
  simCPU(20)
  const cpuUsage = process.cpuUsage(startUsage).user
  console.log(`${req.url} | ${bytesToSize(process.memoryUsage().heapUsed)} | ${os.uptime()}s `)
  res.setHeader("Content-Type", "text/html")
  res.end(`<h2>Hello from Node.js on ${os.hostname()}, cpu usage: ${cpuUsage}, memory usage: ${bytesToSize(process.memoryUsage().heapUsed)}, uptime: ${os.uptime()} seconds</h2>\n`)
}

const server = http.createServer(requestHandler)
server.listen(port, (err) => {
  if (err) {
    return console.log('Whoops something went wrong :()', err)
  }
  console.log(`Node server is listening on ${port}`)
  console.log(`pid is ${process.pid}`)
})

const bytesToSize = (bytes) => {
   var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
   if (bytes == 0) return '0 Byte'
   var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)))
   return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i]
}

const simCPU = (ms) => {
  const now = Date.now()
  while (Date.now() - now < ms);
}

const simIO = (ms) => {
  return new Promise(resolve=>{
    setTimeout(resolve,ms)
  })
}

process.on('SIGTERM', function() {
  server.close(function () {
    process.exit(0);
  });
});
