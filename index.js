const http = require('http')
const path = require('path')
const fs = require('fs')
const os = require('os')
console.log('os.userInfo().username: ', os.userInfo().username)

// app.set('view engine', 'pug')

const server = http.createServer((req, res) => {
  // build file path
  let filePath = path.join(
    __dirname,
    "public",
    req.url === "/" ? "index.html" : req.url
  )

  // extension of file
  let extname = path.extname(filePath)

  // initial content type
  let contentType = "text/html"

  // check ext and set content type
  switch (extname) {
    case ".js":
      contentType = "text/javascript"
      break
    case ".css":
      contentType = "text/css"
      break
    case ".json":
      contentType = "application/json"
      break
    case ".png":
      contentType = "image/png"
      break
    case ".jpg":
      contentType = "image/jpg"
      break
  }

  // Check if contenttype is text/html but no .html file extension
  if (contentType == "text/html" && extname == "") filePath += ".html"

  // filePath
  // console.log(filePath);

  // read file
  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code == "ENOENT") {
        // page most likely not found
        fs.readFile(
          path.join(__dirname, "public", "404.html"),
          (err, content) => {
            res.writeHead(404, { "Content-Type": "text/html" })
            res.end(content, "utf8")
          })
      } else {
        // some server error
        res.writeHead(500)
        res.end(`Server error: ${err.code}`)
      }
    } else {
      // Success
      res.writeHead(200, { "Content-Type": contentType })
      res.end(content, "utf8")
    }
  })
})

const PORT = process.env.PORT || 5000 // hos kommer til å  bestemme port, den er lagret env variabel. hvis ikke env funnet, vil 5000 bli brukt.

server.listen(PORT, () => console.log(`Server running on port ${PORT}`))




// const Person = require('./person') // commonjs
// const person1 = new Person('Pål', 213)

// person1.greeting()
