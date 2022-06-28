import { Server } from 'socket.io'
import http from 'http'
import app from '../../app.js'

export const server = http.createServer(app)

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
})

io.on('connection', (socket) => {
  console.log('connected')

  socket.on('join_chat', (data) => {
    socket.join(`${data} joined`)
  })

  socket.on('send_message', (data) => {
    socket.to(data.chat).emit('receive_message', data)
  })
})
