const express = require('express')
const path = require('path')
// const os = require('os')
// console.log('os.userInfo().username: ', os.userInfo().username)
const app = express()


app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(express.static(path.join(__dirname, 'public'))) 

const PORT = process.env.PORT || 5000 // hos kommer til å  bestemme port, den er lagret env variabel. hvis ikke env funnet, vil 5000 bli brukt.

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))




// const Person = require('./person') // commonjs
// const person1 = new Person('Pål', 213)

// person1.greeting()
