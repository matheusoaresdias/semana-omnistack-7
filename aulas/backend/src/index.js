const express = require('express')
const path = require('path')
const cors = require('cors')
const mongoose = require('mongoose')

const app = express()

const server = require('http').Server(app)
const io = require('socket.io')(server, {
    cors: {
      origin: "http://localhost:3000",
      credentials: true
    }
    });

mongoose.connect('mongodb+srv://omni7:1234@cluster0.syi4p.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

app.use((req, res, next) => {
    req.io = io

    next()
})

app.use(cors())

app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads', 'resized')))

app.use(require('./routes'))
server.listen(3333)