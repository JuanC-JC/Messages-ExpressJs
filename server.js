const express = require('express');
const router = require('./network/routes')

var app = express()

app.use(express.json())
app.use(express.urlencoded({extended:false}))

router(app)


// app.use('/',express.static('public'))
app.listen(3000)

console.log('la aplicacion esta escuchando en http://localhost:3000')




