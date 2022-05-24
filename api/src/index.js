const express = require ('express')
const morgan = require('morgan')
const cors = require('cors')
const taskRoute = require('./routes/task.routes')
require('./db')

const server = express()
const bodyParser = require('body-parser')

server.use(cors())
server.use(morgan('dev'))
server.use(bodyParser.json())
server.use('/task', taskRoute)
server.use(bodyParser.urlencoded({extended:true}))
server.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // update to match the domain you will make the request from
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  });
server.use((err, req, res, next)=>{
    return res.status(err.status).json({message: err.errors.map(er => er.message)})
})

server.listen(3001, ()=>{
    console.log('Listening on port 3001')
})