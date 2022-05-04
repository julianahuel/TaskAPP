const express = require ('express')
const morgan = require('morgan')
const taskRoute = require('./routes/task.routes')
require('./db')

const server = express()
const bodyParser = require('body-parser')

server.use(morgan('dev'))
server.use(bodyParser.json())
server.use('/task', taskRoute)
server.use(bodyParser.urlencoded({extended:true}))
server.use((err, req, res, next)=>{
    return res.json({message: err.errors.map(er => er.message)})
})

server.listen(3000, ()=>{
    console.log('Listening on port 3000')
})