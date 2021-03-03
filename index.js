const express = require('express')
const exphbs = require('express-handlebars')
const path = require('path')
const os = require('os')

const app = express()

app.engine('handlebars', exphbs())
app.set('view engine', 'handlebars')

// body parser middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// homepage route
app.get('/', (req, res) => res.render('index', {
  title: 'Syntax highlighter for Git Bash',
  osName: os.userInfo().username
}))

// staic path
app.use(express.static(path.join(__dirname, 'views'))) 

const PORT = process.env.PORT || 5000 // hos kommer til å  bestemme port, den er lagret env variabel. hvis ikke env funnet, vil 5000 bli brukt.

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))




// const Person = require('./person') // commonjs
// const person1 = new Person('Pål', 213)

// person1.greeting()
